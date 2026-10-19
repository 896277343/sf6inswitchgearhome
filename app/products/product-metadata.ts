import type { Metadata } from "next";

import { siteConfig } from "@/site.config";

type ProductMetadataInput = {
  slug: string;
  name: string;
  model: string;
  description: string;
  shortDescription: string;
  titleSuffix: string;
  openGraphTitle: string;
  twitterTitle: string;
  imagePath: string;
  keywords: string[];
};

export function createProductMetadata(
  input: ProductMetadataInput
): Metadata {
  const imageUrl = `${siteConfig.site_domain}${input.imagePath}`;
  const pageUrl = `${siteConfig.site_domain}/products/${input.slug}`;

  return {
    title: `${input.name} Manufacturer & Supplier | ${input.titleSuffix} | ${siteConfig.site_name}`,
    description: input.description,
    keywords: [...input.keywords, input.model, siteConfig.brand.legalName],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${input.openGraphTitle} | ${siteConfig.site_name}`,
      description: input.shortDescription,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.twitterTitle} | ${siteConfig.site_name}`,
      description: input.shortDescription,
      images: [imageUrl],
    },
  };
}
