# Deploying the custom build

This fork runs OpenTodo with our own changes on top (today: the Roomy density). It ships as a Docker image built on the server itself; nothing is pulled from GHCR. To move to a newer OpenTodo, see [UPGRADE.md](UPGRADE.md).

## How the pieces fit

| Piece | Where | Committed? |
| --- | --- | --- |
| Upstream OpenTodo | remote `origin` (github.com/OpenTodoApp/OpenTodo), branch `main` and release tags | |
| Our changes | branch `custom` = upstream + our commits, pushed to remote `fork` | yes, public |
| The running image | `opentodo:<label>`, built by `fork/build.sh` | no, local Docker |
| Server settings (image tag, time zone, backups mount) | `docker-compose.override.yml` | **no**: private |
| Reverse proxy, theme files, tokens | `local/`, `~/.opentodo-token` | **no**: private |

The fork is public: never commit `docker-compose.override.yml`, `local/` or anything with the domain, a token or a password.

## Ship a change

1. Make the change on `custom` (a behaviour change gets an OpenSpec change, as upstream asks: `AGENTS.md`).
2. Check it: `cd web && npx vitest run` (or the affected tests) and `make web-lint`. `make check` needs Go.
3. Commit, then build:
   ```sh
   fork/build.sh            # prints e.g. "built opentodo:1.6.0-main.292c1d0-custom.239eaaf"
   ```
4. Back up (Settings → Server → Backups → **Back up now**).
5. Put the printed tag in `docker-compose.override.yml` (`image:`), then:
   ```sh
   docker compose up -d && docker compose ps     # wait for "healthy"
   ```
6. Push: `git push fork custom`.
7. Phones and browsers pick up the new web app on their next launch; force-quit the iPhone app once or twice.

## Set up a new machine

```sh
git clone git@github.com:<you>/OpenTodo.git to-do && cd to-do
git remote rename origin fork
git remote add origin https://github.com/OpenTodoApp/OpenTodo.git
git fetch origin --tags
git switch custom
fork/build.sh
```

Then create `docker-compose.override.yml` next to `docker-compose.yml` (Compose merges the two):

```yaml
services:
  opentodo:
    image: opentodo:1.6.0-main.292c1d0-custom.239eaaf   # the tag build.sh printed
    pull_policy: never                         # never look for it on a registry
    environment:
      - TZ=America/Los_Angeles
    volumes:
      - /path/to/backups:/backups              # owned by 65532:65532, mode 700
    security_opt: [no-new-privileges:true]
    cap_drop: [ALL]
    read_only: true
    tmpfs: ["/tmp:size=64m,mode=1777"]
```

and start it with `docker compose up -d`. Restore data from a backup archive in Settings → Server → Backups.

## Themes

Custom themes are server themes: `local/themes/push.sh <file>.opentodo-theme.json` checks contrast with OpenTodo's own code and replaces the theme in place, so everyone using it sees the change on their next load. People choose themes and the density under **Settings → Appearance**.

## Roll back

Every build keeps its image. Put the previous tag (`docker images opentodo`) back in `docker-compose.override.yml` and `docker compose up -d`; the official image is `ghcr.io/opentodoapp/opentodo:<version>` without `pull_policy: never`. Going back is safe while no upstream release in between changed the data format; [UPGRADE.md](UPGRADE.md#before-you-start) says how to tell. A setting only our build knows (Roomy) reads as Comfortable on the official image.
