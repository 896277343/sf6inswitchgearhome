import { MetadataRoute } from "next";
import { getAllPages, getAllPostsForSitemap } from "@/lib/wordpress";
import { languageAlternates, localizedUrl, publishedLocales } from "@/lib/i18n/metadata";
import staticPaths from "@/lib/generated-static-paths.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([
    getAllPostsForSitemap(),
    getAllPages(),
  ]);

  const activeLocales = publishedLocales();
  const staticUrls: MetadataRoute.Sitemap = staticPaths.flatMap((path) => activeLocales.map((locale) => ({
    url: localizedUrl(path, locale),
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
    alternates: { languages: languageAlternates(path) },
  })));

  const postUrls: MetadataRoute.Sitemap = posts.flatMap((post) => activeLocales.map((locale) => ({
    url: localizedUrl(`/posts/${post.slug}`, locale),
    lastModified: new Date(post.modified),
    changeFrequency: "weekly",
    priority: 0.5,
    alternates: { languages: languageAlternates(`/posts/${post.slug}`) },
  })));

  const pageUrls: MetadataRoute.Sitemap = pages.flatMap((page) => activeLocales.map((locale) => ({
    url: localizedUrl(`/pages/${page.slug}`, locale),
    lastModified: new Date(page.modified || page.date),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: { languages: languageAlternates(`/pages/${page.slug}`) },
  })));

  return [...staticUrls, ...postUrls, ...pageUrls];
}
