#!/usr/bin/env bash
# Publish the static output through the repository's configured origin.
set -euo pipefail
project_root=$(git rev-parse --show-toplevel)
git_dir=$(git rev-parse --absolute-git-dir)
cd "$project_root"
python3 scripts/check-content.py
python3 scripts/build.py --base "${1:-/NEBULIS-Atlas}" --out dist-pages
git fetch origin gh-pages
pages_parent=$(git rev-parse refs/remotes/origin/gh-pages)
publish_tmp=$(mktemp -d)
trap 'rm -rf "$publish_tmp"' EXIT
export GIT_INDEX_FILE="$publish_tmp/index"
git -C "$project_root/dist-pages" --git-dir="$git_dir" --work-tree="$project_root/dist-pages" add -A -- .
pages_tree=$(git --git-dir="$git_dir" write-tree)
pages_commit=$(printf '%s\n' 'deploy: publish NEBULIS research adventure' | git --git-dir="$git_dir" commit-tree "$pages_tree" -p "$pages_parent")
git push origin "$pages_commit:refs/heads/gh-pages"
printf 'Published Pages commit: %s\n' "$pages_commit"
