#!/usr/bin/env bash
set -uo pipefail

: "${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

report="${REPORT_FILE:-audit-report.txt}"

emit() {
  echo "$1=$2" >>"$GITHUB_OUTPUT"
}

emit_report() {
  {
    echo 'report<<AUDIT_REPORT_EOF'
    if [[ -s "$report" ]]; then
      cat "$report"
    else
      echo 'npm audit produced no output, see the workflow logs.'
    fi
    echo 'AUDIT_REPORT_EOF'
  } >>"$GITHUB_OUTPUT"
}

production=false
npm audit --omit=dev >/dev/null 2>&1 || production=true

if npm audit 2>&1 | tee "$report"; then
  emit changed false
  emit unresolved false
  emit production false
  emit_report
  exit 0
fi

echo "Advisories found, attempting npm audit fix"
npm audit fix || echo "npm audit fix could not resolve everything"

changed=false
if ! git diff --quiet -- package-lock.json; then
  changed=true
fi

unresolved=true
if npm audit 2>&1 | tee "$report"; then
  unresolved=false
fi

emit changed "$changed"
emit unresolved "$unresolved"
emit production "$production"
emit_report
echo "lockfile changed: $changed, unresolved: $unresolved, production: $production"
