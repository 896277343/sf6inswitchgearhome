import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const socialSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0d1f32"/>
  <circle cx="1120" cy="-70" r="410" fill="#173e56"/>
  <circle cx="1100" cy="580" r="270" fill="#1b5065"/>
  <rect x="74" y="72" width="8" height="486" rx="4" fill="#48c9b0"/>
  <text x="122" y="140" fill="#48c9b0" font-family="Arial, sans-serif" font-size="29" font-weight="700">SF6 IN SWITCHGEAR</text>
  <text x="122" y="275" fill="#ffffff" font-family="Arial, sans-serif" font-size="75" font-weight="700">SF6 Gas Equipment</text>
  <text x="122" y="365" fill="#ffffff" font-family="Arial, sans-serif" font-size="75" font-weight="700">&amp; Solutions</text>
  <text x="122" y="438" fill="#c8dce6" font-family="Arial, sans-serif" font-size="31">Detection · Analysis · Handling · Regeneration</text>
  <text x="122" y="545" fill="#8daab9" font-family="Arial, sans-serif" font-size="25">sf6inswitchgear.com</text>
</svg>`;

const socialImage = await sharp(Buffer.from(socialSvg))
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();
for (const filename of ["opengraph-image.jpeg", "twitter-image.jpeg"]) {
  await writeFile(path.join(root, "app", filename), socialImage);
  console.log(`${filename}: ${socialImage.length} bytes`);
}

const productDir = path.join(root, "public", "pics", "products");
const original = await readFile(path.join(productDir, "SF6-Gas-Fittings-2.JPG"));
const resized = sharp(original).rotate().resize({
  width: 1600,
  height: 1600,
  fit: "inside",
  withoutEnlargement: true,
});
const [jpeg, webp] = await Promise.all([
  resized.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer(),
  resized.clone().webp({ quality: 76, effort: 5 }).toBuffer(),
]);
await writeFile(path.join(productDir, "SF6-Gas-Fittings-2.JPG"), jpeg);
await writeFile(path.join(productDir, "SF6-Gas-Fittings-2.webp"), webp);
console.log(`SF6-Gas-Fittings-2: JPEG ${jpeg.length} bytes; WebP ${webp.length} bytes`);
