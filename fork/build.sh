#!/bin/sh
# Build the custom OpenTodo image from the checked-out branch (see fork/UPGRADE.md).
#
#   fork/build.sh            builds opentodo:<label> and prints the label
#
# The label names the upstream commit the branch sits on, so Settings → About and
# `docker images` say exactly what runs:
#   on a release tag   v1.6.0          -> 1.6.0-custom          (app version 1.6.0+custom)
#   on upstream main   v1.6.0 + 292c1d0 -> 1.6.0-main.292c1d0-custom
# The app version must start with "v" or the web app reports 0.0.0-dev; build
# metadata (+...) is ignored when devices compare versions, so a later official
# release still counts as newer.
set -eu
cd "$(dirname "$0")/.."

[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "commit or stash your changes first" >&2; exit 1; }

base=$(git merge-base HEAD origin/main)
tag=$(git describe --tags --abbrev=0 "$base")
if [ "$(git rev-parse "$tag^{commit}")" = "$base" ]; then
  version="$tag+custom"
  label="${tag#v}-custom"
else
  short=$(git rev-parse --short=7 "$base")
  version="$tag+main.$short.custom"
  label="${tag#v}-main.$short-custom"
fi

docker build \
  --build-arg VERSION="$version" \
  --build-arg SOURCE_COMMIT="$(git rev-parse --short HEAD)" \
  -t "opentodo:$label" .

echo "built opentodo:$label (app version $version)"
