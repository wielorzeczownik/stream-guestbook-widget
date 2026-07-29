#!/usr/bin/env bash
set -euo pipefail

emit_outputs() {
  {
    echo "released=$1"
    echo "version=$2"
    echo "tag=$3"
    echo "commit_changes=$4"
  } >>"$GITHUB_OUTPUT"
}

current_version=$(node -p "require('./package.json').version")
next_tag=$(echo "${CLIFF_BUMPED_VERSION:-}" | tr -d '[:space:]')

if [[ -z "$next_tag" ]]; then
  echo "Unable to determine next version from git-cliff"
  exit 1
fi

if [[ "$next_tag" != v* ]]; then
  next_tag="v$next_tag"
fi

next_version="${next_tag#v}"
current_tag="v$current_version"
has_current_tag="false"
if git rev-parse -q --verify "refs/tags/${current_tag}" >/dev/null; then
  has_current_tag="true"
fi

if [[ "$next_version" == "$current_version" ]]; then
  if [[ "$has_current_tag" == "false" ]]; then
    echo "No bump from git-cliff, but no current tag exists. Creating initial release for ${current_tag}."
    emit_outputs true "$current_version" "$current_tag" false
    exit 0
  fi

  echo "No user-facing commits since ${current_tag}. Nothing to release."
  emit_outputs false "$current_version" "$current_tag" false
  exit 0
fi

if [[ "$(printf '%s\n' "$current_version" "$next_version" | sort -V | tail -1)" != "$next_version" ]]; then
  echo "git-cliff returned $next_version which is lower than current $current_version. Nothing to release."
  emit_outputs false "$current_version" "$current_tag" false
  exit 0
fi

npm version "$next_version" --no-git-tag-version

node -e "
  const fs = require('fs');
  const tixyel = JSON.parse(fs.readFileSync('widget/.tixyel', 'utf8'));
  tixyel.version = '$next_version';
  fs.writeFileSync('widget/.tixyel', JSON.stringify(tixyel, null, 2) + '\n');
"

node -e "
  const fs = require('fs');
  const fields = JSON.parse(fs.readFileSync('widget/src/fields.json', 'utf8'));
  fields.widgetVersion.value = '$next_version';
  fs.writeFileSync('widget/src/fields.json', JSON.stringify(fields, null, 2) + '\n');
"

emit_outputs true "$next_version" "$next_tag" true
