import "server-only";

import type { Page, Post } from "@/lib/wordpress.d";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

const apiBase = (process.env.TRANSPOSH_API_URL || process.env.WORDPRESS_URL || "").replace(/\/$/, "");
const apiSecret = process.env.TRANSPOSH_HEADLESS_SECRET || "";

type TranslationResponse = {
  language: string;
  source_language: string;
  provider: string;
  results: string[];
};

export async function translateStrings(
  strings: string[],
  locale: Locale
): Promise<{ results: string[]; translated: boolean }> {
  if (locale === defaultLocale || strings.length === 0) {
    return { results: strings, translated: locale === defaultLocale };
  }
  if (!apiBase || apiSecret.length < 24) {
    console.warn("Transposh Headless API is not configured; returning source content");
    return { results: strings, translated: false };
  }

  const response = await fetch(`${apiBase}/wp-json/transposh/v1/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Transposh-Key": apiSecret,
    },
    body: JSON.stringify({
      source_language: defaultLocale,
      language: locale,
      strings,
    }),
    cache: "force-cache",
    next: {
      revalidate: 86400,
      tags: [`transposh-${locale}`],
    },
  });

  if (!response.ok) {
    console.warn(`Transposh translation failed with HTTP ${response.status}`);
    return { results: strings, translated: false };
  }
  const payload = (await response.json()) as TranslationResponse;
  if (!Array.isArray(payload.results) || payload.results.length !== strings.length) {
    console.warn("Transposh returned an invalid translation batch");
    return { results: strings, translated: false };
  }
  return { results: payload.results, translated: true };
}

export async function translatePost(post: Post, locale: Locale): Promise<Post> {
  if (locale === defaultLocale) return post;
  const source = [post.title.rendered, post.excerpt.rendered, post.content.rendered];
  const { results } = await translateStrings(source, locale);
  return {
    ...post,
    title: { ...post.title, rendered: results[0] },
    excerpt: { ...post.excerpt, rendered: results[1] },
    content: { ...post.content, rendered: results[2] },
  };
}

export async function translatePage(page: Page, locale: Locale): Promise<Page> {
  if (locale === defaultLocale) return page;
  const source = [page.title.rendered, page.excerpt.rendered, page.content.rendered];
  const { results } = await translateStrings(source, locale);
  return {
    ...page,
    title: { ...page.title, rendered: results[0] },
    excerpt: { ...page.excerpt, rendered: results[1] },
    content: { ...page.content, rendered: results[2] },
  };
}

export async function translatePosts(posts: Post[], locale: Locale): Promise<Post[]> {
  if (locale === defaultLocale || posts.length === 0) return posts;
  const source = posts.flatMap((post) => [post.title.rendered, post.excerpt.rendered]);
  const { results } = await translateStrings(source, locale);
  return posts.map((post, index) => ({
    ...post,
    title: { ...post.title, rendered: results[index * 2] },
    excerpt: { ...post.excerpt, rendered: results[index * 2 + 1] },
  }));
}

export async function translateCatalog(
  catalog: Record<string, string>,
  locale: Locale
): Promise<Record<string, string>> {
  const entries = Object.entries(catalog);
  if (locale === defaultLocale || process.env.TRANSPOSH_TRANSLATE_STATIC_ON_BUILD !== "true") {
    return catalog;
  }
  const translated: Record<string, string> = {};
  for (let offset = 0; offset < entries.length; offset += 50) {
    const batch = entries.slice(offset, offset + 50);
    const { results } = await translateStrings(batch.map(([, value]) => value), locale);
    batch.forEach(([key, source], index) => {
      translated[key] = results[index] || source;
    });
  }
  return translated;
}
