
import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import { getAllPages } from "@/lib/wordpress";
import { ArchiveList } from "@/components/archive-list";
import type { Page as WPPage } from "@/lib/wordpress.d";
import type { Metadata } from "next";

export const revalidate = 3600;

const baseMetadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our site",
  alternates: {
    canonical: "/pages",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/pages");
}

export default async function Page() {
  const pages = await getAllPages();

  return (
    <ArchiveList<WPPage>
      title="All Pages"
      items={pages}
      getItemHref={(p) => `/pages/${p.slug}`}
      getItemLabel={(p) => p.title.rendered}
      emptyMessage="No pages available yet."
    />
  );
}
