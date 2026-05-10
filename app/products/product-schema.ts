import { siteConfig } from "@/site.config";

type ProductImage = {
  src: string;
  alt: string;
};

type ProductSpec = {
  label: string;
  value: string;
};

type ProductSchemaInput = {
  slug: string;
  name: string;
  model: string;
  description: string;
  shortDescription: string;
  availability: string;
  minOrder?: string;
  deliveryTime?: string;
  warranty?: string;
  certification?: string[];
  applications?: string[];
  images: ProductImage[];
  specifications?: ProductSpec[];
};

export function buildProductSchema(input: ProductSchemaInput) {
  const pageUrl = `${siteConfig.site_domain}/products/${input.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": input.name,
    "description": input.description,
    "url": pageUrl,
    "sku": input.model,
    "mpn": input.model,
    "category": "SF6 Gas Equipment",
    "image": input.images.map((image) => `${siteConfig.site_domain}${image.src}`),
    "brand": {
      "@type": "Brand",
      "name": siteConfig.brand.legalName,
    },
    "manufacturer": {
      "@type": "Organization",
      "name": siteConfig.brand.legalName,
      "url": siteConfig.site_domain,
    },
    "offers": {
      "@type": "Offer",
      "url": pageUrl,
      "priceCurrency": "USD",
      "availability": input.availability === "In Stock"
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": siteConfig.brand.legalName,
      },
    },
    "additionalProperty": [
      ...(input.specifications ?? []).map((specification) => ({
        "@type": "PropertyValue",
        "name": specification.label,
        "value": specification.value,
      })),
      ...(input.minOrder
        ? [{
            "@type": "PropertyValue",
            "name": "Minimum order quantity",
            "value": input.minOrder,
          }]
        : []),
      ...(input.deliveryTime
        ? [{
            "@type": "PropertyValue",
            "name": "Typical delivery time",
            "value": input.deliveryTime,
          }]
        : []),
      ...(input.warranty
        ? [{
            "@type": "PropertyValue",
            "name": "Warranty",
            "value": input.warranty,
          }]
        : []),
      ...((input.certification ?? []).map((item) => ({
        "@type": "PropertyValue",
        "name": "Certification",
        "value": item,
      }))),
      ...((input.applications ?? []).map((item) => ({
        "@type": "PropertyValue",
        "name": "Application",
        "value": item,
      }))),
    ],
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.site_domain,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": `${siteConfig.site_domain}/products`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": input.name,
          "item": pageUrl,
        },
      ],
    },
  };
}
