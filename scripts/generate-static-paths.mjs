import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const routeRoot = path.join(process.cwd(), "app", "[locale]");
const output = path.join(process.cwd(), "lib", "generated-static-paths.json");
const excluded = new Set([
  "/inquiry/success",
  "/pages",
  "/posts/authors",
  "/posts/categories",
  "/posts/tags",
]);

async function discover(directory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!entry.name.startsWith("[") && !entry.name.startsWith("(")) {
        routes.push(...await discover(path.join(directory, entry.name), [...segments, entry.name]));
      }
    } else if (entry.name === "page.tsx") {
      const route = `/${segments.join("/")}`;
      if (!excluded.has(route)) routes.push(route);
    }
  }
  return routes;
}

const routes = (await discover(routeRoot)).sort();
await writeFile(output, `${JSON.stringify(routes, null, 2)}\n`, "utf8");
console.log(`Generated ${routes.length} static sitemap paths`);
