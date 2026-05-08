import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-regeneration-system",
  name: "SF6 Regeneration System",
  model: "SF6-RS-9000",
  description:
    "Advanced SF6 regeneration system for purifying, reclaiming, and reusing used SF6 gas to IEC 60480 standards.",
  shortDescription:
    "Advanced SF6 regeneration system for purifying and reclaiming used SF6 gas.",
  titleSuffix: "SF6 Gas Regeneration Equipment",
  openGraphTitle: "SF6 Regeneration System - Gas Purification Solution",
  twitterTitle: "SF6 Regeneration System | SF6 Equipment",
  imagePath: "/pics/products/SF6-Regeneration-System-p.webp",
  keywords: [
    "SF6 regeneration system",
    "SF6 gas purification",
    "SF6 gas reclaiming",
    "IEC 60480 regeneration",
    "SF6 recycling equipment",
    "gas purification system",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
