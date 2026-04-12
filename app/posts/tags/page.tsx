import { getAllTags } from "@/lib/wordpress";
import { ArchiveList } from "@/components/archive-list";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Tag } from "@/lib/wordpress.d";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const revalidate = 3600;

export const metadata: Metadata = {
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

export default async function Page() {
  const tags = await getAllTags();

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/posts">SF6 Gas News & Insights</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>SF6 Gas Tags</BreadcrumbPage>
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
