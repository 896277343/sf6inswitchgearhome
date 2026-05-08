import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-gas-filling-cart",
  name: "SF6 Gas Filling Cart",
  model: "SF6-FC-6000",
  description:
    "Mobile SF6 gas filling cart with integrated vacuum pump, gas recovery system, and precise filling capabilities for power industry maintenance.",
  shortDescription:
    "Mobile SF6 gas filling cart with precise filling, vacuum pump, and recovery system.",
  titleSuffix: "SF6 Gas Filling Equipment",
  openGraphTitle: "SF6 Gas Filling Cart - Precision Gas Filling System",
  twitterTitle: "SF6 Gas Filling Cart | SF6 Equipment",
  imagePath: "/pics/products/SF6-Gas-Filling-Cart-p.webp",
  keywords: [
    "SF6 gas filling cart",
    "SF6 filling equipment",
    "gas recovery cart",
    "SF6 pressure control system",
    "SF6 maintenance cart",
    "portable SF6 filling machine",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
