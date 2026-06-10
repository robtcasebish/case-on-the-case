#!/usr/bin/env bash
#
# Build Case on the Case and publish the static output into the Kinsta web root.
# Run this ON THE SERVER, from inside the repo checkout.
#
#   ./deploy.sh /www/caseonthecase_753/public
#
# (Pass your actual public path, or set PUBLIC_DIR in the environment.)
set -euo pipefail

PUBLIC_DIR="${1:-${PUBLIC_DIR:-}}"
if [ -z "$PUBLIC_DIR" ]; then
  echo "ERROR: provide the web root, e.g. ./deploy.sh /www/caseonthecase_753/public" >&2
  exit 1
fi

echo "==> Node $(node -v 2>/dev/null || echo 'NOT FOUND'), npm $(npm -v 2>/dev/null || echo 'NOT FOUND')"

echo "==> Installing dependencies (npm ci)"
npm ci

echo "==> Building (npm run build)"
npm run build

if [ ! -d dist ]; then
  echo "ERROR: build did not produce a dist/ directory" >&2
  exit 1
fi

echo "==> Publishing dist/ -> $PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"
# Clear the web root but preserve .well-known (used for SSL/domain verification).
find "$PUBLIC_DIR" -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +
cp -a dist/. "$PUBLIC_DIR/"

echo "==> Done. Deployed $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "    Files in web root: $(find "$PUBLIC_DIR" -type f | wc -l)"
