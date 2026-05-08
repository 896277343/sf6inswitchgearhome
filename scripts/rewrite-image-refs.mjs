import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(process.cwd());
const targetFiles = [
  "app/page.tsx",
  "app/projects/page.tsx",
  "app/products/page.tsx",
  "app/products/related-product-images.ts",
  "app/projects/sf6-gas-handling-for-underground-substation/project-content.tsx",
  "app/products/mobile-sf6-vacuum-pump-unit/page.tsx",
  "app/products/mobile-sf6-vacuum-pump-unit/product-content.tsx",
  "app/products/sf6-gas-analyzer/page.tsx",
  "app/products/sf6-gas-analyzer/product-content.tsx",
  "app/products/sf6-gas-filling-cart/page.tsx",
  "app/products/sf6-gas-filling-cart/product-content.tsx",
  "app/products/sf6-gas-filling-kit/page.tsx",
  "app/products/sf6-gas-filling-kit/product-content.tsx",
  "app/products/sf6-gas-fittings/page.tsx",
  "app/products/sf6-gas-fittings/product-content.tsx",
  "app/products/sf6-leak-detector/page.tsx",
  "app/products/sf6-leak-detector/product-content.tsx",
  "app/products/sf6-regeneration-system/page.tsx",
  "app/products/sf6-regeneration-system/product-content.tsx",
  "app/products/sf6-room-monitor/page.tsx",
  "app/products/sf6-room-monitor/product-content.tsx",
  "app/products/sf6-service-carts/page.tsx",
  "app/products/sf6-service-carts/product-content.tsx",
];

const replacements = [
  [/\.jpg\b/g, ".webp"],
  ["/pics/products/sf6-gas-fittings-1.webp", "/pics/products/SF6-Gas-Fittings-1.webp"],
  ["/pics/products/sf6-gas-fittings-2.webp", "/pics/products/SF6-Gas-Fittings-2.webp"],
  ["/pics/products/sf6-gas-fittings-3.webp", "/pics/products/SF6-Gas-Fittings-3.webp"],
  ["/pics/products/sf6-leak-detector.webp", "/pics/products/SF6-Leak-Detector.webp"],
  ["/pics/products/sf6-leak-detector-1.webp", "/pics/products/SF6-Leak-Detector-1.webp"],
  ["/pics/products/sf6-leak-detector-2.webp", "/pics/products/SF6-Leak-Detector-2.webp"],
  ["/pics/products/sf6-leak-detector-3.webp", "/pics/products/SF6-Leak-Detector-3.webp"],
];

for (const relativePath of targetFiles) {
  const absolutePath = path.join(projectRoot, relativePath);
  const original = await fs.readFile(absolutePath, "utf8");
  let updated = original;

  for (const [pattern, replacement] of replacements) {
    updated = updated.replace(pattern, replacement);
  }

  if (updated !== original) {
    await fs.writeFile(absolutePath, updated, "utf8");
    console.log(`Updated ${relativePath}`);
  }
}
