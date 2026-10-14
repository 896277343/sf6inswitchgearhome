import { siteConfig } from "@/site.config";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { withLocalizedMetadata } from "@/lib/i18n/metadata";

interface ContentMetadataOptions {
  title: string;
  description: string;
  slug: string;
  basePath: "posts" | "pages";
  locale?: Locale;
}

export function generateContentMetadata({
  title,
  description,
  slug,
  basePath,
  locale = "en",
}: ContentMetadataOptions): Metadata {
  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", title);
  ogUrl.searchParams.append("description", description);
  const canonicalUrl = `${siteConfig.site_domain}/${basePath}/${slug}`;

  return withLocalizedMetadata({
    title,
    description,
    keywords: ["SF6 gas", "SF6 equipment", "SF6 technology", "SF6 best practices", ...title.split(/\s+/).filter(word => word.length > 3)],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  }, locale, `/${basePath}/${slug}`);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function truncateHtml(html: string, maxWords: number): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}
