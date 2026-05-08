import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "sf6-gas-analyzer",
  name: "SF6 Gas Analyzer",
  model: "SF6-GA-8000",
  description:
    "Advanced SF6 gas analyzer for comprehensive analysis of SF6 gas quality, including moisture, purity, and decomposition products. Features high precision and user-friendly interface.",
  shortDescription:
    "Advanced SF6 gas analyzer for moisture, purity, and decomposition product analysis.",
  titleSuffix: "SF6 Gas Analysis Equipment",
  openGraphTitle: "SF6 Gas Analyzer - Moisture and Purity Analysis",
  twitterTitle: "SF6 Gas Analyzer | SF6 Testing Equipment",
  imagePath: "/pics/products/SF6-Gas-Analyzer-p.webp",
  keywords: [
    "SF6 gas analyzer",
    "SF6 purity analyzer",
    "SF6 moisture measurement",
    "decomposition product detection",
    "SF6 gas testing equipment",
    "portable SF6 analyzer",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
