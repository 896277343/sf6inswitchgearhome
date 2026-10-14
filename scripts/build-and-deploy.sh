#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-$HOME/sf6inswitchgearhome}"
DEPLOY_HOST="${DEPLOY_HOST:-root@43.135.134.204}"
REMOTE_ROOT="${REMOTE_ROOT:-/www/wwwroot/sf6inswitchgear-runtime}"
REMOTE_ARCHIVE="${REMOTE_ARCHIVE:-/opt/sf6inswitchgear-release.tar.gz}"
REMOTE_ENV="${REMOTE_ENV:-/opt/sf6inswitchgear.env}"
PM2_APP="${PM2_APP:-sf6inswitchgear}"
APP_PORT="${APP_PORT:-3000}"
ARCHIVE="${ARCHIVE:-$APP_DIR/sf6inswitchgear-release.tar.gz}"
RELEASE_DIR="$APP_DIR/release"
LOCAL_ENV=""
UPLOAD_DIR=""

die() {
  echo "错误：$*" >&2
  exit 1
}

[[ -d "$APP_DIR/.git" ]] || die "Git 项目不存在：$APP_DIR"
command -v node >/dev/null || die "没有安装 Node.js"
command -v npm >/dev/null || die "没有安装 npm"
command -v scp >/dev/null || die "没有安装 scp"
command -v ssh >/dev/null || die "没有安装 ssh"

NODE_MAJOR="$(node -p 'Number(process.versions.node.split(".")[0])')"
(( NODE_MAJOR >= 22 )) || die "需要 Node.js 22，当前版本：$(node -v)"

cd "$APP_DIR"
[[ -f package-lock.json ]] || die "缺少 package-lock.json"
[[ -f .env.production || -f .env.local ]] || die "缺少 .env.production 或 .env.local"
if [[ -f .env.production ]]; then
  LOCAL_ENV="$APP_DIR/.env.production"
else
  LOCAL_ENV="$APP_DIR/.env.local"
fi

# Keep the real secret only in ignored environment files. Generate it once
# when missing; never write it into this tracked script or print it to logs
# except for the one-time wp-config.php instruction below.
HEADLESS_SECRET="$(sed -n 's/^[[:space:]]*TRANSPOSH_HEADLESS_SECRET[[:space:]]*=[[:space:]]*//p' "$LOCAL_ENV" | tail -n 1 | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")"
if [[ ${#HEADLESS_SECRET} -lt 24 || "$HEADLESS_SECRET" == replace-* ]]; then
  command -v openssl >/dev/null || die "缺少 openssl，无法生成 Headless 密钥"
  HEADLESS_SECRET="$(openssl rand -hex 32)"
  if grep -q '^[[:space:]]*TRANSPOSH_HEADLESS_SECRET[[:space:]]*=' "$LOCAL_ENV"; then
    sed -i "s|^[[:space:]]*TRANSPOSH_HEADLESS_SECRET[[:space:]]*=.*$|TRANSPOSH_HEADLESS_SECRET=$HEADLESS_SECRET|" "$LOCAL_ENV"
  else
    printf '\nTRANSPOSH_HEADLESS_SECRET=%s\n' "$HEADLESS_SECRET" >> "$LOCAL_ENV"
  fi
  chmod 600 "$LOCAL_ENV"
  echo "已生成私有 Headless 密钥。请把下面这一行加入 content.sf6.asia 的 wp-config.php："
  printf "define('TRANSPOSH_HEADLESS_SECRET', '%s');\n" "$HEADLESS_SECRET"
  echo "添加完成后再继续本次部署；密钥已经保存到 $LOCAL_ENV"
  read -r -p "已经加入 WordPress？按回车继续，Ctrl+C 取消：" _
fi

GIT_BRANCH="${GIT_BRANCH:-$(git branch --show-current)}"
[[ -n "$GIT_BRANCH" ]] || GIT_BRANCH="main"

echo "1/7 拉取 GitHub 最新代码（$GIT_BRANCH）"
git pull --ff-only origin "$GIT_BRANCH"

echo "2/7 安装锁定版本依赖"
npm ci --no-audit --no-fund

echo "3/7 执行测试"
npm test -- --run

echo "4/7 编译 Next.js standalone"
rm -rf "$APP_DIR/.next-local"
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}" npm run build

[[ -f "$APP_DIR/.next-local/standalone/server.js" ]] || die "没有生成 .next-local/standalone/server.js"
[[ -d "$APP_DIR/.next-local/static" ]] || die "没有生成 .next-local/static"

echo "5/7 生成运行发布包"
rm -rf "$RELEASE_DIR" "$ARCHIVE"
mkdir -p "$RELEASE_DIR/.next-local"
cp -a "$APP_DIR/.next-local/standalone/." "$RELEASE_DIR/"
cp -a "$APP_DIR/.next-local/static" "$RELEASE_DIR/.next-local/static"
if [[ -d "$APP_DIR/public" ]]; then
  cp -a "$APP_DIR/public" "$RELEASE_DIR/public"
fi
tar -czf "$ARCHIVE" -C "$RELEASE_DIR" .
ls -lh "$ARCHIVE"
sha256sum "$ARCHIVE"

echo "6/7 上传运行包到 $DEPLOY_HOST"
REMOTE_ARCHIVE_DIR="$(dirname "$REMOTE_ARCHIVE")"
REMOTE_ENV_DIR="$(dirname "$REMOTE_ENV")"
[[ "$REMOTE_ARCHIVE_DIR" == "$REMOTE_ENV_DIR" ]] || die "REMOTE_ARCHIVE 和 REMOTE_ENV 必须位于同一远程目录"
UPLOAD_DIR="$(mktemp -d)"
trap 'rm -rf -- "$UPLOAD_DIR"' EXIT
cp "$ARCHIVE" "$UPLOAD_DIR/$(basename "$REMOTE_ARCHIVE")"
cp "$LOCAL_ENV" "$UPLOAD_DIR/$(basename "$REMOTE_ENV")"
scp \
  "$UPLOAD_DIR/$(basename "$REMOTE_ARCHIVE")" \
  "$UPLOAD_DIR/$(basename "$REMOTE_ENV")" \
  "$DEPLOY_HOST:$REMOTE_ARCHIVE_DIR/"

echo "7/7 腾讯服务器原子发布、健康检查和自动回滚"
ssh "$DEPLOY_HOST" bash -s -- \
  "$REMOTE_ROOT" \
  "$REMOTE_ARCHIVE" \
  "$REMOTE_ENV" \
  "$PM2_APP" \
  "$APP_PORT" \
  < "$APP_DIR/scripts/deploy-release.sh"

echo "全部完成：https://sf6inswitchgear.com"
