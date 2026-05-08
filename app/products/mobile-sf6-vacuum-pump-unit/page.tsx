import { createProductMetadata } from "../product-metadata";
import ProductContent from "./product-content";

export const metadata = createProductMetadata({
  slug: "mobile-sf6-vacuum-pump-unit",
  name: "Mobile SF6 Vacuum Pump Unit",
  model: "SF6-VP-4000",
  description:
    "High-performance mobile vacuum pump unit designed for SF6 gas evacuation and dehydration. Features powerful vacuum capacity and portable design for field operations.",
  shortDescription:
    "Mobile SF6 vacuum pump unit with high capacity and portable design for field maintenance.",
  titleSuffix: "SF6 Vacuum Pump Equipment",
  openGraphTitle: "Mobile SF6 Vacuum Pump Unit - Field Maintenance Equipment",
  twitterTitle: "Mobile SF6 Vacuum Pump Unit | SF6 Equipment",
  imagePath: "/pics/products/mobile-sf6-vacuum-pump-unit-p.webp",
  keywords: [
    "mobile SF6 vacuum pump unit",
    "SF6 vacuum pump",
    "SF6 evacuation equipment",
    "gas dehydration unit",
    "SF6 maintenance equipment",
    "field service vacuum pump",
  ],
});

const ProductPage = () => {
  return <ProductContent />;
};

export default ProductPage;
