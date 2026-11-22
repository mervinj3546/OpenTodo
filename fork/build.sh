#!/bin/sh
# Build the custom OpenTodo image from the checked-out branch (see fork/UPGRADE.md).
#
#   fork/build.sh            builds opentodo:<label> and prints the label
#
# The label names the upstream commit the branch sits on, so Settings → About and
# `docker images` say exactly what runs:
#   on a release tag   v1.6.0           -> 1.6.0-custom.<ours>              (app version 1.6.0+custom.<ours>)
#   on upstream main   v1.6.0 + 292c1d0 -> 1.6.0-main.292c1d0-custom.<ours>
# where <ours> is our branch's commit, so every build keeps its own tag to roll back to.
# The app version must start with "v" or the web app reports 0.0.0-dev; build
# metadata (+...) is ignored when devices compare versions, so a later official
# release still counts as newer.
set -eu
cd "$(dirname "$0")/.."

[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "commit or stash your changes first" >&2; exit 1; }

base=$(git merge-base HEAD origin/main)
ours=$(git rev-parse --short=7 HEAD)
tag=$(git describe --tags --abbrev=0 "$base")
if [ "$(git rev-parse "$tag^{commit}")" = "$base" ]; then
  version="$tag+custom.$ours"
  label="${tag#v}-custom.$ours"
else
  short=$(git rev-parse --short=7 "$base")
  version="$tag+main.$short.custom.$ours"
  label="${tag#v}-main.$short-custom.$ours"
fi

docker build \
  --build-arg VERSION="$version" \
  --build-arg SOURCE_COMMIT="$ours" \
  -t "opentodo:$label" .

echo "built opentodo:$label (app version $version)"
