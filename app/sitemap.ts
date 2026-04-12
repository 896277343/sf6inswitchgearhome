import { MetadataRoute } from "next";
import { getAllPages, getAllPostsForSitemap } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([
    getAllPostsForSitemap(),
    getAllPages(),
  ]);

  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/products",
    "/products/mobile-sf6-vacuum-pump-unit",
    "/products/sf6-gas-analyzer",
    "/products/sf6-gas-filling-cart",
    "/products/sf6-gas-filling-kit",
    "/products/sf6-gas-fittings",
    "/products/sf6-leak-detector",
    "/products/sf6-regeneration-system",
    "/products/sf6-room-monitor",
    "/products/sf6-service-carts",
    "/projects",
    "/projects/sf6-gas-handling-for-underground-substation",
    "/posts",
  ] as const;

  const staticLastModifiedMap: Partial<Record<(typeof staticPaths)[number], string>> = {
    "/": "2026-04-10",
    "/about": "2026-04-10",
    "/contact": "2026-04-10",
    "/products": "2026-04-10",
    "/projects": "2026-04-10",
    "/posts": "2026-04-10",
  };

  const staticUrls: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteConfig.site_domain}${path === "/" ? "" : path}`,
    lastModified: new Date(staticLastModifiedMap[path] ?? "2026-04-10"),
    changeFrequency:
      path === "/"
        ? "monthly"
        : path.startsWith("/posts")
          ? "weekly"
          : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/products" || path === "/projects"
          ? 0.9
          : path.startsWith("/products/")
            ? 0.8
            : 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.site_domain}/posts/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const pageUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${siteConfig.site_domain}/pages/${page.slug}`,
    lastModified: new Date(page.modified || page.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls, ...pageUrls];
}
