import type { StaticImageData } from "next/image";

import leakDetectorImage from "@/public/pics/products/SF6-Leak-Detector.webp";
import roomMonitorImage from "@/public/pics/products/sf6-room-monitor.webp";
import gasAnalyzerImage from "@/public/pics/products/sf6-analyzer.webp";
import gasFillingCartImage from "@/public/pics/products/sf6-gas-filling-cart.webp";
import gasFillingKitImage from "@/public/pics/products/sf6-gas-filling-kit.webp";
import gasFittingsImage from "@/public/pics/products/sf6-gas-fittings.webp";
import regenerationSystemImage from "@/public/pics/products/sf6-regeneration-system.webp";
import serviceCartsImage from "@/public/pics/products/sf6-service-carts.webp";
import vacuumPumpUnitImage from "@/public/pics/products/mobile-sf6-vacuum-pump-unit.webp";

export type RelatedProductItem = {
  name: string;
  slug: string;
  image: StaticImageData;
};

export const relatedProductImages: Record<string, StaticImageData> = {
  "sf6-leak-detector": leakDetectorImage,
  "sf6-room-monitor": roomMonitorImage,
  "sf6-gas-analyzer": gasAnalyzerImage,
  "sf6-gas-filling-cart": gasFillingCartImage,
  "sf6-gas-filling-kit": gasFillingKitImage,
  "sf6-gas-fittings": gasFittingsImage,
  "sf6-regeneration-system": regenerationSystemImage,
  "sf6-service-carts": serviceCartsImage,
  "mobile-sf6-vacuum-pump-unit": vacuumPumpUnitImage,
};
