#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export APP_DIR
export DEPLOY_HOST="${DEPLOY_HOST:-root@43.135.134.204}"
export REMOTE_ROOT="${REMOTE_ROOT:-/www/wwwroot/sf6inswitchgear-runtime}"
export REMOTE_ARCHIVE="${REMOTE_ARCHIVE:-/opt/sf6inswitchgear-release.tar.gz}"
export REMOTE_ENV="${REMOTE_ENV:-/opt/sf6inswitchgear.env}"
export PM2_APP="${PM2_APP:-sf6inswitchgear}"
export APP_PORT="${APP_PORT:-3000}"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"

cd "$APP_DIR"

echo "SF6 in Switchgear one-command production deployment"
echo "Source: $APP_DIR"
echo "Target: $DEPLOY_HOST"
echo "Port: $APP_PORT"

git fetch origin
git checkout codex/headless-i18n-deploy
git pull --ff-only origin codex/headless-i18n-deploy

exec bash "$APP_DIR/scripts/build-and-deploy.sh"
