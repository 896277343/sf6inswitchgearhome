import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-gas-fittings",
  name: "SF6 Gas Fittings",
  model: "SF6-GF-2000",
  description:
    "High-quality SF6 gas fittings and accessories designed for safe, leak-proof, and reliable SF6 gas handling applications.",
  shortDescription:
    "High-quality SF6 gas fittings and accessories for reliable gas handling.",
  titleSuffix: "SF6 Gas Fittings and Accessories",
  openGraphTitle: "SF6 Gas Fittings - Leak-Proof Handling Accessories",
  twitterTitle: "SF6 Gas Fittings | SF6 Accessories",
  imagePath: "/pics/products/SF6-Gas-Fittings-p.jpg",
  keywords: [
    "SF6 gas fittings",
    "SF6 accessories",
    "gas handling fittings",
    "leak-proof SF6 connectors",
    "SF6 hose fittings",
    "stainless steel gas fittings",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
