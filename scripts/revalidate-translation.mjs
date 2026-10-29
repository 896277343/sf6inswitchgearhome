import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
if (!((args.length === 1 && args[0] === "--all") ||
      (args.length === 2 && ["--post-id", "--slug"].includes(args[0])))) {
  throw new Error("Usage: node scripts/revalidate-translation.mjs --post-id 42 | --slug post-slug | --all");
}
const id = args[0] === "--post-id" ? Number(args[1]) : undefined;
const slug = args[0] === "--slug" ? args[1] : undefined;
const all = args[0] === "--all";
if ((id !== undefined && (!Number.isSafeInteger(id) || id <= 0)) ||
    (slug !== undefined && !/^[\p{L}\p{N}%._-]+$/u.test(slug)))
  throw new Error("Specify a valid post ID or slug");

const envPath = [".env.production", ".env.local"].map((name) => path.resolve(name))
  .find((file) => fs.existsSync(file));
if (!envPath) throw new Error("Missing .env.production or .env.local");
const env = fs.readFileSync(envPath, "utf8");
const line = env.split(/\r?\n/).find((item) => /^\s*WORDPRESS_WEBHOOK_SECRET\s*=/.test(item));
const secret = process.env.WORDPRESS_WEBHOOK_SECRET || line?.replace(/^\s*WORDPRESS_WEBHOOK_SECRET\s*=\s*/, "")
  .trim().replace(/^['"]|['"]$/g, "");
if (!secret) throw new Error("WORDPRESS_WEBHOOK_SECRET is not configured");

const site = process.env.NEXT_SITE_URL || "https://sf6inswitchgear.com";
const response = await fetch(new URL("/api/revalidate", site), {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-webhook-secret": secret },
  body: JSON.stringify({ contentType: "translation", ...(id ? { contentId: id } : {}),
    ...(slug ? { contentSlug: slug } : {}) }),
  signal: AbortSignal.timeout(15000),
});
if (!response.ok) throw new Error(`Cache invalidation failed with HTTP ${response.status}`);
console.log(all ? "All translated article caches cleared." : "Translated article cache cleared.");
