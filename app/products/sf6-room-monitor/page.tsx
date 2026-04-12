import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

const product = {
  name: "SF6 Room Monitor",
  model: "SF6-RM-5000",
  description: "24/7 continuous monitoring system for SF6 gas leakage, oxygen concentration, and environmental conditions. Features real-time alerts and remote monitoring capabilities for maximum safety.",
  shortDescription: "Advanced SF6 room monitoring system with 24/7 detection, oxygen monitoring, and real-time alerts.",
};

export const metadata = createProductMetadata({
  slug: "sf6-room-monitor",
  name: product.name,
  model: product.model,
  description: product.description,
  shortDescription: product.shortDescription,
  titleSuffix: "SF6 Gas Room Monitoring System",
  openGraphTitle: `${product.name} - 24/7 SF6 Room Monitoring`,
  twitterTitle: `${product.name} | SF6 Room Monitoring`,
  imagePath: "/pics/products/sf6-room-monitor-p.jpg",
  keywords: [
    "SF6 room monitor",
    "SF6 gas monitoring",
    "oxygen concentration monitor",
    "gas leak detection system",
    "environmental monitoring",
    "24/7 gas detection",
  ],
});

export default function ProductPage() {
  return <ProductContent />;
}
