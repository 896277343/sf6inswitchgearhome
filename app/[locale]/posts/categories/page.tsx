
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import { getAllCategories } from "@/lib/wordpress";
import { ArchiveList } from "@/components/archive-list";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Category } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const revalidate = 3600;

const baseMetadata: Metadata = {
  title: "SF6 Gas Categories",
  description: "Browse all categories of SF6 gas related content, including equipment, technology, and industry news",
  keywords: ["SF6 gas categories", "SF6 equipment categories", "SF6 technology topics", "SF6 industry categories"],
  alternates: {
    canonical: `${siteConfig.site_domain}/posts/categories`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "SF6 Gas Categories",
    description: "Browse all categories of SF6 gas related content, including equipment, technology, and industry news",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Categories",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF6 Gas Categories",
    description: "Browse all categories of SF6 gas related content, including equipment, technology, and industry news",
    images: ["/twitter-image.jpeg"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/posts/categories");
}

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/"><T id="3a78695388b38b5c" /></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/posts"><T id="d504a108958b1a24" /></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage><T id="4b3987c25db5893d" /></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ArchiveList<Category>
        title="All Categories"
        items={categories}
        getItemHref={(c) => `/posts/?category=${c.id}`}
        getItemLabel={(c) => c.name}
        emptyMessage="No categories available yet."
      />
    </div>
  );
}
