
import { T, TV } from "@/components/i18n/text";
import { getPostBySlug } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

import Link from "@/components/i18n/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { isLocale, localizePath } from "@/lib/i18n/config";
import { getCachedTranslatedPost } from "@/lib/transposh";
import { cache } from "react";

export const dynamic = "force-dynamic";

const getTranslatedPost = cache(async (slug: string, locale: "en" | "de" | "fr" | "es") => {
  const sourcePost = await getPostBySlug(slug);
  return sourcePost ? getCachedTranslatedPost(sourcePost, locale) : undefined;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getTranslatedPost(slug, locale);
  if (!post) {
    return {};
  }

  return generateContentMetadata({
    title: post.title.rendered,
    description: stripHtml(post.excerpt.rendered),
    slug: post.slug,
    basePath: "posts",
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getTranslatedPost(slug, locale);
  if (!post) {
    notFound();
  }

  const author = post._embedded?.author?.[0];
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const category = post._embedded?.["wp:term"]?.[0]?.[0];
  const canonicalPath = localizePath(`/posts/${post.slug}`, locale);
  const canonicalUrl = `${siteConfig.site_domain}${canonicalPath}`;
  const date = new Date(post.date).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Section>
      <Container>
        <Script id={`post-schema-${post.id}`} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": stripHtml(post.title.rendered),
            "description": stripHtml(post.excerpt.rendered),
            "datePublished": post.date,
            "dateModified": post.modified,
            "mainEntityOfPage": canonicalUrl,
            "url": canonicalUrl,
            "author": author?.name
              ? {
                  "@type": "Person",
                  "name": author.name,
                }
              : undefined,
            "publisher": {
              "@type": "Organization",
              "name": siteConfig.brand.legalName,
              "logo": {
                "@type": "ImageObject",
                "url": siteConfig.brand.logoUrl,
              },
            },
            "image": featuredMedia?.source_url
              ? [featuredMedia.source_url]
              : [`${siteConfig.site_domain}/opengraph-image.jpeg`],
            "articleSection": category?.name,
          })}
        </Script>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={localizePath("/", locale)}><T id="3a78695388b38b5c" /></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={localizePath("/posts", locale)}><T id="d504a108958b1a24" /></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{<TV>{post.title.rendered}</TV>}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Prose>
          <h1>
            <span
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></span>
          </h1>
          <div className="flex justify-between items-center gap-4 text-sm mb-4">
            <h5>
              <T id="2ef42ec21d9300dd" /> {<TV>{date}</TV>}
              {author?.name && (
                <>
                  {" "}<T id="a7e2d26e8d15814d" />{" "}
                  <span>
                    <a href={`${localizePath("/posts", locale)}?author=${author.id}`}>{<TV>{author.name}</TV>}</a>
                  </span>
                </>
              )}
            </h5>

            {category && (
              <Link
                href={`${localizePath("/posts", locale)}?category=${category.id}`}
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "no-underline!"
                )}
              >
                {<TV>{category.name}</TV>}
              </Link>
            )}
          </div>
          {featuredMedia?.source_url && (
            <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
              {/* eslint-disable-next-line */}
              <img
                className="w-full h-full object-cover"
                src={featuredMedia.source_url}
                alt={post.title.rendered}
              />
            </div>
          )}
        </Prose>

        <Article dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Container>
    </Section>
  );
}
