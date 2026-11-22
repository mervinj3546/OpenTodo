# Upgrading the custom build

Moving `custom` onto a newer OpenTodo, rebuilding, deploying. Setup and everyday changes: [DEPLOY.md](DEPLOY.md).

## Before you start

```sh
git fetch origin --tags
git tag --sort=-v:refname | head -3          # newest releases
git log --oneline custom..origin/main        # what upstream has that we don't
```

Choose the base:

- **A release tag** (`v1.7.0`): tested and announced. Prefer it.
- **Upstream `main`**: unreleased work, for a fix that isn't released yet. Fine when nothing in it touches data (below).

Read what changes before moving:

- For a release: its section in `CHANGELOG.md` (`git show v1.7.0:CHANGELOG.md | less`); look for *upgrade*, *migration*, *data format*, *breaking*.
- For `main`: `git log --oneline custom..origin/main` and `git diff --stat custom origin/main -- internal/store internal/sync/ops.go`. Changes there can migrate the database; once migrated, an older image may not open it, so rolling back means restoring the backup.

## Upgrade

```sh
git switch custom
git tag -f deployed/previous                 # bookmark what runs today
git rebase v1.7.0                            # or: git rebase origin/main
```

**On a conflict**, git stops at our commit. `git status` lists the files; keep upstream's change and re-apply ours on top, `git add` them, `git rebase --continue`. Two files conflict most:

- `web/src/locales/*.json`, `messages.json`: take upstream's version of the file, re-add our strings, then `node scripts/i18n/extract.mjs --write`.
- `web/src/index.css`: our rules are the blocks marked `roomy-density`; keep them where they were, after the phone row rules.

`git rebase --abort` returns to where you started.

Then check, build and deploy:

```sh
cd web && npm ci && npx vitest run && cd ..   # all pass, or fix before going on
node scripts/i18n-check.mjs
make web-lint
fork/build.sh                                 # prints the new image tag
```

Back up (Settings → Server → Backups → **Back up now**), put the new tag in `docker-compose.override.yml`, then:

```sh
docker compose up -d && docker compose ps     # wait for "healthy"
docker compose logs --tail 20 opentodo        # "opentodo listening ... version=..."
git push --force-with-lease fork custom       # the rebase rewrote our commits
```

Open the app; Settings → About shows the new version and **Self-built**. Force-quit the iPhone app once or twice so it loads the new web app.

## When upstream ships our change

If upstream merges an equivalent of a commit of ours, the rebase drops it or leaves it empty (`git rebase --skip`). Once `git log origin/main..custom` is empty, `custom` is plain upstream: switch the override back to the official `ghcr.io/opentodoapp/opentodo:<version>` image and stop building.

## Roll back

```sh
docker images opentodo                        # earlier builds are still there
```

Put the previous tag back in `docker-compose.override.yml` and `docker compose up -d`. If the upgrade migrated the database, restore the backup from before it as well (Settings → Server → Backups). `git switch -C custom deployed/previous` puts the branch back.
