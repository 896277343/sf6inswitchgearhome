import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-service-carts",
  name: "SF6 Service Carts",
  model: "SF6-SC-7000",
  description:
    "Comprehensive SF6 service carts with integrated vacuum pump, gas recovery, purification, and filling capabilities for complete lifecycle handling.",
  shortDescription:
    "Comprehensive SF6 service carts with recovery, purification, and filling capability.",
  titleSuffix: "SF6 Service Cart Equipment",
  openGraphTitle: "SF6 Service Carts - Complete Gas Handling Solution",
  twitterTitle: "SF6 Service Carts | SF6 Equipment",
  imagePath: "/pics/products/SF6-Service-Carts-p.webp",
  keywords: [
    "SF6 service carts",
    "SF6 gas handling cart",
    "SF6 recovery cart",
    "SF6 purification system",
    "SF6 maintenance equipment",
    "complete SF6 service solution",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
