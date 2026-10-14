
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import { getAllTags } from "@/lib/wordpress";
import { ArchiveList } from "@/components/archive-list";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Tag } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const revalidate = 3600;

const baseMetadata: Metadata = {
  title: "SF6 Gas Tags",
  description: "Browse all tags related to SF6 gas equipment, technology, and industry topics",
  keywords: ["SF6 gas tags", "SF6 equipment tags", "SF6 technology tags", "SF6 industry tags"],
  alternates: {
    canonical: `${siteConfig.site_domain}/posts/tags`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "SF6 Gas Tags",
    description: "Browse all tags related to SF6 gas equipment, technology, and industry topics",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Tags",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF6 Gas Tags",
    description: "Browse all tags related to SF6 gas equipment, technology, and industry topics",
    images: ["/twitter-image.jpeg"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/posts/tags");
}

export default async function Page() {
  const tags = await getAllTags();

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
            <BreadcrumbPage><T id="99f64b2eb7980ed9" /></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ArchiveList<Tag>
        title="All Tags"
        items={tags}
        getItemHref={(t) => `/posts/?tag=${t.id}`}
        getItemLabel={(t) => t.name}
        emptyMessage="No tags available yet."
      />
    </div>
  );
}
