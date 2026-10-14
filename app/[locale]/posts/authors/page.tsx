
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import { getAllAuthors } from "@/lib/wordpress";
import { ArchiveList } from "@/components/archive-list";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Author } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const revalidate = 3600;

const baseMetadata: Metadata = {
  title: "SF6 Gas Experts",
  description: "Meet our team of SF6 gas experts and industry professionals",
  keywords: ["SF6 gas experts", "SF6 industry professionals", "SF6 technology specialists", "SF6 gas consultants"],
  alternates: {
    canonical: `${siteConfig.site_domain}/posts/authors`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "SF6 Gas Experts",
    description: "Meet our team of SF6 gas experts and industry professionals",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Experts",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF6 Gas Experts",
    description: "Meet our team of SF6 gas experts and industry professionals",
    images: ["/twitter-image.jpeg"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/posts/authors");
}

export default async function Page() {
  const authors = await getAllAuthors();

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
            <BreadcrumbPage><T id="421795df756d000a" /></BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ArchiveList<Author>
        title="All Authors"
        items={authors}
        getItemHref={(a) => `/posts/?author=${a.id}`}
        getItemLabel={(a) => a.name}
        emptyMessage="No authors available yet."
      />
    </div>
  );
}
