#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"
mkdir -p dist

npx --yes lightningcss-cli --minify src/css/lkk.css -o dist/lkk.min.css
npx --yes terser src/js/lkk.js --compress --mangle -o dist/lkk.min.js

for file in src/css/critical.css src/css/lkk.css src/js/lkk.js dist/lkk.min.css dist/lkk.min.js; do
  printf '%-24s %8s bytes  %8s gzip bytes\n' \
    "$file" \
    "$(wc -c < "$file" | tr -d ' ')" \
    "$(gzip -c "$file" | wc -c | tr -d ' ')"
done

if grep -Eiq 'transition|animation|keyframes|box-shadow|backdrop-filter|position[[:space:]]*:[[:space:]]*(sticky|fixed)|transform|scroll-behavior[[:space:]]*:[[:space:]]*smooth|gradient|carousel|slider|filter[[:space:]]*:' \
  src/css/critical.css src/css/lkk.css src/js/lkk.js dist/lkk.min.css dist/lkk.min.js; then
  echo "Forbidden visual effect token found." >&2
  exit 1
fi

critical_bytes=$(wc -c < src/css/critical.css | tr -d ' ')
if [ "$critical_bytes" -gt 6144 ]; then
  echo "Critical CSS exceeds 6 KiB." >&2
  exit 1
fi

echo "Forbidden-token and critical-size checks passed."
