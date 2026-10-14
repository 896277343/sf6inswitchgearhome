#!/usr/bin/env bash
set -Eeuo pipefail

REMOTE_ROOT="${1:-/www/wwwroot/sf6inswitchgear-runtime}"
ARCHIVE="${2:-/opt/sf6inswitchgear-release.tar.gz}"
ENV_FILE="${3:-/opt/sf6inswitchgear.env}"
PM2_APP="${4:-sf6inswitchgear}"
APP_PORT="${5:-3001}"
RELEASES_DIR="$REMOTE_ROOT/releases"
CURRENT_LINK="$REMOTE_ROOT/current"
RELEASE_ID="$(date +%Y%m%d-%H%M%S)"
NEW_RELEASE="$RELEASES_DIR/$RELEASE_ID"
PREVIOUS_RELEASE=""

die() {
  echo "错误：$*" >&2
  exit 1
}

command -v node >/dev/null || die "腾讯服务器没有安装 Node.js"
command -v pm2 >/dev/null || die "腾讯服务器没有安装 PM2"
command -v curl >/dev/null || die "腾讯服务器没有安装 curl"
[[ -f "$ARCHIVE" ]] || die "发布包不存在：$ARCHIVE"
[[ -f "$ENV_FILE" ]] || die "运行环境文件不存在：$ENV_FILE"
chmod 600 "$ENV_FILE"

NODE_MAJOR="$(node -p 'Number(process.versions.node.split(".")[0])')"
(( NODE_MAJOR >= 22 )) || die "腾讯服务器需要 Node.js 22，当前版本：$(node -v)"

mkdir -p "$RELEASES_DIR"
if [[ -L "$CURRENT_LINK" ]]; then
  PREVIOUS_RELEASE="$(readlink -f "$CURRENT_LINK")"
fi

mkdir -p "$NEW_RELEASE"
tar -xzf "$ARCHIVE" -C "$NEW_RELEASE"
cp "$ENV_FILE" "$NEW_RELEASE/.env.production"
chmod 600 "$NEW_RELEASE/.env.production"
[[ -f "$NEW_RELEASE/server.js" ]] || die "发布包缺少 server.js"
[[ -d "$NEW_RELEASE/.next-local/static" ]] || die "发布包缺少 .next-local/static"

ln -sfn "$NEW_RELEASE" "$CURRENT_LINK.new"
mv -Tf "$CURRENT_LINK.new" "$CURRENT_LINK"

start_app() {
  if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
    pm2 delete "$PM2_APP" >/dev/null
  fi
  cd "$CURRENT_LINK"
  PORT="$APP_PORT" HOSTNAME="127.0.0.1" NODE_ENV="production" \
    pm2 start server.js --name "$PM2_APP" --time
}

start_app

HEALTH_URL="http://127.0.0.1:$APP_PORT/"
healthy=0
for _ in $(seq 1 30); do
  if curl -fsS --max-time 5 "$HEALTH_URL" >/dev/null; then
    healthy=1
    break
  fi
  sleep 2
done

if (( healthy == 0 )); then
  echo "新版本健康检查失败，准备回滚" >&2
  if [[ -n "$PREVIOUS_RELEASE" && -d "$PREVIOUS_RELEASE" ]]; then
    ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK.new"
    mv -Tf "$CURRENT_LINK.new" "$CURRENT_LINK"
    start_app
    pm2 save --force >/dev/null
    rm -rf "$NEW_RELEASE"
    die "已自动回滚到：$PREVIOUS_RELEASE"
  fi
  die "健康检查失败，而且没有可用的旧版本"
fi

pm2 save --force >/dev/null
rm -f "$ARCHIVE"

# 只保留最近 5 个版本。current 指向的版本不会被删除。
mapfile -t OLD_RELEASES < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | tail -n +6 | cut -d' ' -f2-)
for old_release in "${OLD_RELEASES[@]:-}"; do
  if [[ -n "$old_release" && "$old_release" != "$(readlink -f "$CURRENT_LINK")" ]]; then
    rm -rf -- "$old_release"
  fi
done

echo "发布成功：$NEW_RELEASE"
echo "PM2：$PM2_APP"
echo "本机地址：$HEALTH_URL"
