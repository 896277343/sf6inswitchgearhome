# Headless multilingual deployment

## WordPress

Install the matching Transposh Headless plugin on `content.sf6.asia`, then add
the private server-to-server secret to `wp-config.php`:

```php
define('TRANSPOSH_HEADLESS_SECRET', 'replace-with-at-least-24-random-characters');
```

Never expose this value through a `NEXT_PUBLIC_` environment variable.

## Build environment

Create `.env.production` on the high-performance build VPS:

```dotenv
WORDPRESS_URL="https://content.sf6.asia"
WORDPRESS_HOSTNAME="content.sf6.asia"
WORDPRESS_WEBHOOK_SECRET="replace-with-the-existing-webhook-secret"
TRANSPOSH_API_URL="https://content.sf6.asia"
TRANSPOSH_HEADLESS_SECRET="the-same-secret-as-wordpress"
TRANSPOSH_TRANSLATE_STATIC_ON_BUILD="false"
PUBLISHED_LOCALES="en"
```

The first safe deployment should use English only and keep build-time static
translation disabled. Once the pipeline is verified, enable translation and
publish the reviewed locales:

```dotenv
TRANSPOSH_TRANSLATE_STATIC_ON_BUILD="true"
PUBLISHED_LOCALES="en,de,fr,es"
```

Only `PUBLISHED_LOCALES` are pre-rendered, emitted in the sitemap/hreflang, and
shown in the language switcher. This keeps low-resource deployments small.

## Article translation cache

Complete translated articles are cached by Next.js for up to 24 hours. A partial
translation is displayed but never stored in the frontend's persistent cache;
the missing text can be retried on the next request. WordPress remains the
source of truth for saved translations. Published post updates invalidate the
cached article for every language through `/api/revalidate` (both supported
WordPress webhook payload formats are accepted).

After manually correcting a stored Transposh translation, clear that article's
frontend cache from the build VPS, without displaying the webhook secret:

```bash
cd ~/sf6inswitchgearhome
node scripts/revalidate-translation.mjs --post-id 42
```

Use `--slug post-slug` when the post ID is unknown, or `--all` only when every
translated article needs to be refreshed. The command reads the existing
`WORDPRESS_WEBHOOK_SECRET` from `.env.production` or `.env.local`.

## Remote runtime environment

Store the runtime configuration on the Tencent server at
`/opt/sf6inswitchgear.env`, mode `600`. It uses the same values as the build
environment. The file is copied into each release and is never committed.

## One-command deployment

The build server compiles the `.next-local` standalone output and the Tencent
server only runs it:

```bash
cd ~/sf6inswitchgearhome
bash deploy-production.sh
```

Without SSH keys, `scp` and `ssh` prompt for the server password during each
deployment. The remote script performs an atomic release switch, a local HTTP
health check, and automatic rollback on failure.

## URL policy

English uses unprefixed URLs. Other languages retain stable English slugs:

```text
/products/sf6-gas-analyzer
/de/products/sf6-gas-analyzer
/fr/products/sf6-gas-analyzer
```

The unprefixed English URL is canonical. Internal rewrites keep `/` and other
unprefixed paths on the English route behind the HTTPS reverse proxy.

After changing visible TSX copy, refresh the source catalog before building:

```bash
npm run i18n:extract
npm test
npm run build
```
