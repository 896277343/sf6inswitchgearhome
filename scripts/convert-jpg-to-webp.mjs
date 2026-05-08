import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const includeDirs = [
  path.join(projectRoot, "public"),
  path.join(projectRoot, "app"),
  path.join(projectRoot, "pics"),
];

const excludedFiles = new Set([
  path.join(projectRoot, "app", "opengraph-image.jpeg"),
  path.join(projectRoot, "app", "twitter-image.jpeg"),
]);

const imageExtensions = new Set([".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    })
  );

  return files.flat();
}

async function main() {
  const discoveredFiles = [];

  for (const dir of includeDirs) {
    try {
      const stat = await fs.stat(dir);
      if (stat.isDirectory()) {
        discoveredFiles.push(...(await walk(dir)));
      }
    } catch {
      // Ignore missing optional directories.
    }
  }

  const imageFiles = discoveredFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return imageExtensions.has(ext) && !excludedFiles.has(filePath);
  });

  let convertedCount = 0;

  for (const inputPath of imageFiles) {
    const outputPath = inputPath.replace(/\.(jpe?g)$/i, ".webp");

    await sharp(inputPath)
      .webp({
        quality: 82,
        effort: 4,
      })
      .toFile(outputPath);

    convertedCount += 1;
    console.log(`${path.relative(projectRoot, inputPath)} -> ${path.relative(projectRoot, outputPath)}`);
  }

  console.log(`Converted ${convertedCount} image(s) to WebP.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
