import type { StaticImageData } from "next/image";

import leakDetectorImage from "@/public/pics/products/SF6-Leak-Detector.jpg";
import roomMonitorImage from "@/public/pics/products/sf6-room-monitor.jpg";
import gasAnalyzerImage from "@/public/pics/products/sf6-analyzer.jpg";
import gasFillingCartImage from "@/public/pics/products/sf6-gas-filling-cart.jpg";
import gasFillingKitImage from "@/public/pics/products/sf6-gas-filling-kit.jpg";
import gasFittingsImage from "@/public/pics/products/sf6-gas-fittings.jpg";
import regenerationSystemImage from "@/public/pics/products/sf6-regeneration-system.jpg";
import serviceCartsImage from "@/public/pics/products/sf6-service-carts.jpg";
import vacuumPumpUnitImage from "@/public/pics/products/mobile-sf6-vacuum-pump-unit.jpg";

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
