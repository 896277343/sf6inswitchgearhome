import "server-only";

import type { Page, Post } from "@/lib/wordpress.d";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { escapeHtmlText, prepareHtmlTranslation, splitTranslationText } from "@/lib/html-translation";
import { unstable_cache } from "next/cache";

const apiBase = (process.env.TRANSPOSH_API_URL || process.env.WORDPRESS_URL || "").replace(/\/$/, "");
const apiSecret = process.env.TRANSPOSH_HEADLESS_SECRET || "";

type TranslationResponse = {
  language: string;
  source_language: string;
  provider: string;
  results: string[];
  translated_mask?: boolean[];
};

export async function translateStrings(
  strings: string[],
  locale: Locale,
  options: { format?: "text" } = {}
): Promise<{ results: string[]; translated: boolean; accepted: boolean[] }> {
  if (locale === defaultLocale || strings.length === 0) {
    return { results: strings, translated: locale === defaultLocale, accepted: strings.map(() => locale === defaultLocale) };
  }
  if (!apiBase || apiSecret.length < 24) {
    console.warn("Transposh Headless API is not configured; returning source content");
    return { results: strings, translated: false, accepted: strings.map(() => false) };
  }

  // The WordPress endpoint rejects empty items. Keep their positions intact.
  const nonEmpty = strings.map((value, index) => ({ value, index })).filter(({ value }) => value.trim());
  if (nonEmpty.length === 0) return { results: strings, translated: true, accepted: strings.map(() => false) };

  try {
    const response = await fetch(`${apiBase}/wp-json/transposh/v1/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Transposh-Key": apiSecret,
      },
      body: JSON.stringify({
        source_language: defaultLocale,
        language: locale,
        strings: nonEmpty.map(({ value }) => value),
        ...(options.format ? { format: options.format } : {}),
      }),
      cache: options.format === "text" ? "no-store" : "force-cache",
      ...(options.format === "text" ? {} : { next: {
        revalidate: 86400,
        tags: [`transposh-${locale}`],
      } }),
      // WordPress may retry and fall back after a provider's 30-second timeout.
      signal: AbortSignal.timeout(65000),
    });

    if (!response.ok) {
      console.warn(`Transposh translation failed with HTTP ${response.status}`);
      return { results: strings, translated: false, accepted: strings.map(() => false) };
    }
    const payload = (await response.json()) as TranslationResponse;
    if (!Array.isArray(payload.results) || payload.results.length !== nonEmpty.length) {
      console.warn("Transposh returned an invalid translation batch");
      return { results: strings, translated: false, accepted: strings.map(() => false) };
    }
    const results = [...strings];
    const accepted = strings.map(() => false);
    nonEmpty.forEach(({ index }, resultIndex) => {
      results[index] = payload.results[resultIndex];
      accepted[index] = payload.translated_mask?.[resultIndex] ?? true;
    });
    return { results, translated: accepted.some(Boolean), accepted };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`Transposh translation request failed: ${message}`);
    return { results: strings, translated: false, accepted: strings.map(() => false) };
  }
}

async function translateArticleHtml(html: string, locale: Locale): Promise<{ html: string; complete: boolean }> {
  const { tokens, indices } = prepareHtmlTranslation(html);
  const pieces = indices.flatMap((index) =>
    splitTranslationText(tokens[index]).map((value) => ({ index, value }))
  );
  const batches: Array<typeof pieces> = [];
  let batch: typeof pieces = [];
  let batchBytes = 0;

  const flush = () => {
    if (batch.length === 0) return;
    batches.push(batch);
    batch = [];
    batchBytes = 0;
  };

  for (const piece of pieces) {
    const bytes = new TextEncoder().encode(piece.value).length;
    if (batch.length >= 4 || batchBytes + bytes > 4800) flush();
    batch.push(piece);
    batchBytes += bytes;
  }
  flush();

  const translated = new Map<number, string[]>();
  let complete = true;
  // Bound concurrency so one long article does not overwhelm WordPress or the AI proxy.
  let nextBatch = 0;
  const workers = Array.from({ length: Math.min(2, batches.length) }, async () => {
    while (nextBatch < batches.length) {
      const index = nextBatch++;
      const current = batches[index];
      const { results, accepted } = await translateStrings(current.map(({ value }) => value), locale, { format: "text" });
      if (accepted.some((value) => !value)) complete = false;
      batches[index] = current.map((piece, position) => ({
        index: piece.index,
        value: accepted[position] ? escapeHtmlText(results[position]) : piece.value,
      }));
    }
  });
  await Promise.all(workers);
  for (const piece of batches.flat()) {
    const values = translated.get(piece.index) || [];
    values.push(piece.value);
    translated.set(piece.index, values);
  }
  for (const [index, values] of translated) tokens[index] = values.join("");
  return { html: tokens.join(""), complete };
}

export async function translatePostWithStatus(post: Post, locale: Locale): Promise<{ post: Post; complete: boolean }> {
  if (locale === defaultLocale) return { post, complete: true };
  const source = [post.title.rendered, post.excerpt.rendered];
  const { results, accepted } = await translateStrings(source, locale);
  const content = await translateArticleHtml(post.content.rendered, locale);
  return {
    complete: content.complete && accepted.every((value, index) => !source[index].trim() || value),
    post: {
      ...post,
      title: { ...post.title, rendered: results[0] },
      excerpt: { ...post.excerpt, rendered: results[1] },
      content: { ...post.content, rendered: content.html },
    },
  };
}

export async function translatePost(post: Post, locale: Locale): Promise<Post> {
  return (await translatePostWithStatus(post, locale)).post;
}

class IncompletePostTranslation extends Error {
  constructor(public post: Post) { super("Post translation is incomplete"); }
}

/** Only complete translations enter the persistent Next.js data cache. */
export async function getCachedTranslatedPost(post: Post, locale: Locale): Promise<Post> {
  if (locale === defaultLocale) return post;
  const cached = unstable_cache(async () => {
    const outcome = await translatePostWithStatus(post, locale);
    if (!outcome.complete) throw new IncompletePostTranslation(outcome.post);
    return outcome.post;
  }, ["headless-post-v2", String(post.id), post.slug, post.modified, locale], {
    tags: ["translated-posts", `translated-post-id-${post.id}`, `translated-post-slug-${post.slug}`],
    revalidate: 86400,
  });
  try {
    return await cached();
  } catch (error) {
    if (error instanceof IncompletePostTranslation) return error.post;
    throw error;
  }
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
