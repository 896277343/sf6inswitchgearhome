import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

const product = {
  name: "SF6 Leak Detector",
  model: "SF6-LD-3000",
  description: "High-precision infrared SF6 leak detection system with built-in air pump, ppm-level accuracy, and 10-year sensor lifespan. Ideal for power substations and industrial applications.",
  shortDescription: "Professional SF6 gas leak detector with infrared principle, ppm precision, and 10-year sensor life.",
};

export const metadata = createProductMetadata({
  slug: "sf6-leak-detector",
  name: product.name,
  model: product.model,
  description: product.description,
  shortDescription: product.shortDescription,
  titleSuffix: "SF6 Gas Leak Detection Equipment",
  openGraphTitle: `${product.name} - Professional SF6 Leak Detection`,
  twitterTitle: `${product.name} | SF6 Leak Detection`,
  imagePath: "/pics/products/SF6-Leak-Detector-p.webp",
  keywords: [
    "SF6 leak detector",
    "SF6 gas detection",
    "infrared SF6 detector",
    "SF6 monitoring equipment",
    "gas leak detection system",
    "SF6 ppm detector",
  ],
});

export default function ProductPage() {
  return <ProductContent />;
}
