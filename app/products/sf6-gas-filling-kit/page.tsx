import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-gas-filling-kit",
  name: "SF6 Gas Filling Kit",
  model: "SF6-FK-3500",
  description:
    "Comprehensive SF6 gas filling kit with precise pressure control, vacuum pump, and gas recovery capability for efficient field operation.",
  shortDescription:
    "Comprehensive SF6 gas filling kit with pressure control and recovery capability.",
  titleSuffix: "SF6 Gas Filling Kit",
  openGraphTitle: "SF6 Gas Filling Kit - Portable Filling Solution",
  twitterTitle: "SF6 Gas Filling Kit | SF6 Tools",
  imagePath: "/pics/products/SF6-Gas-Filling-kit-p.webp",
  keywords: [
    "SF6 gas filling kit",
    "SF6 filling system",
    "portable gas filling kit",
    "SF6 service tools",
    "vacuum pump filling kit",
    "gas recovery filling unit",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
