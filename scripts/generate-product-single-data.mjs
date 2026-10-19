import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "pics", "source", "pro");
const imageRoot = path.join(root, "public", "pics", "products", "single");
const dataPath = path.join(root, "data", "product-singles.json");

const slugify = (value) => value.toLowerCase().replaceAll("₆", "6").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const clean = (line) => line.replace(/^●\s*/, "").replace(/;$/, "").trim();

function valueAfter(lines, label) {
  const line = lines.find((item) => item.startsWith(`${label}:`));
  return line ? line.slice(label.length + 1).trim() : "";
}

function section(lines, start, ends) {
  const from = lines.findIndex((line) => line === `${start}:` || line.startsWith(`${start}:`));
  if (from < 0) return [];
  const result = [];
  for (let index = from + 1; index < lines.length; index += 1) {
    if (ends.some((end) => lines[index] === `${end}:` || lines[index].startsWith(`${end}:`))) break;
    if (lines[index]) result.push(clean(lines[index]));
  }
  return result;
}

function parseFaq(lines) {
  const start = lines.findIndex((line) => line === "FAQ:");
  if (start < 0) return [];
  const faq = [];
  let question = "";
  let answer = [];
  const push = () => {
    if (question && answer.length) faq.push([question, answer.join(" ")]);
    question = "";
    answer = [];
  };
  for (const raw of lines.slice(start + 1)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("Q:") || line.endsWith("?")) {
      push();
      question = line.replace(/^Q:\s*/, "");
    } else if (line.startsWith("A:")) {
      answer.push(line.replace(/^A:\s*/, ""));
    } else if (question) {
      answer.push(line);
    }
  }
  push();
  return faq;
}

function parseSpec(line) {
  const parts = line.split(/\s+--\s+|\s+—\s+/);
  return parts.length > 1 ? [parts[0].trim(), parts.slice(1).join(" — ").trim()] : [line, "Specification"];
}

function parseDetailedSpecs(lines) {
  const rows = [];
  let group = "";
  for (const line of lines) {
    const cells = line.split(/\t+/).map((cell) => cell.trim()).filter(Boolean);
    if (cells.length < 2) {
      group = line.replace(/\s*technical data\s*/i, "Technical data").trim();
      continue;
    }
    if (/^parameter name$/i.test(cells[0]) || /^parameter value$/i.test(cells[1])) continue;
    const label = group ? `${group} — ${cells[0]}` : cells[0];
    rows.push([cells.slice(1).join(" "), label]);
  }
  return rows;
}

await fs.mkdir(imageRoot, { recursive: true });
await fs.mkdir(path.dirname(dataPath), { recursive: true });
const folders = (await fs.readdir(sourceRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory());
const products = [];

for (const folder of folders) {
  const folderPath = path.join(sourceRoot, folder.name);
  const files = await fs.readdir(folderPath);
  const textFile = files.find((name) => name.toLowerCase().endsWith(".txt"));
  if (!textFile) continue;
  const text = await fs.readFile(path.join(folderPath, textFile), "utf8");
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const model = valueAfter(lines, "Model Name") || folder.name.split(" ")[0];
  const name = valueAfter(lines, "Product Name") || folder.name.slice(model.length).trim();
  const slug = slugify(`${model} ${name}`);
  const outputDir = path.join(imageRoot, slug);
  await fs.mkdir(outputDir, { recursive: true });
  const sourceImages = files
    .filter((file) => /\.(png|jpe?g)$/i.test(file))
    .sort((a, b) => (a.includes("(2)") ? 1 : 0) - (b.includes("(2)") ? 1 : 0) || a.localeCompare(b));
  const images = [];
  for (let index = 0; index < sourceImages.length; index += 1) {
    const outputName = `${slug}-${index + 1}.webp`;
    await sharp(path.join(folderPath, sourceImages[index])).webp({ quality: 88, alphaQuality: 100 }).toFile(path.join(outputDir, outputName));
    images.push(`/pics/products/single/${slug}/${outputName}`);
  }
  const keySpecifications = section(lines, "Key specifications", ["Applications"]).map(parseSpec).slice(0, 4);
  const applications = section(lines, "Applications", ["Special Features", "Product Overview", "FAQ"]);
  const features = section(lines, "Special Features", ["Product Overview", "FAQ"]);
  const overview = section(lines, "Product Overview", ["Specifications", "FAQ"]);
  const detailedSpecifications = parseDetailedSpecs(section(lines, "Specifications", ["FAQ"]));
  const specifications = detailedSpecifications.length ? detailedSpecifications : keySpecifications;
  const category = model.startsWith("LA") ? "SF6 Analysis" : model.startsWith("LR") ? "SF6 Recovery" : model.startsWith("LT") ? "SF6 Treatment" : model.startsWith("LK") ? "Kitting & Valves" : "SF6 Leakage & Monitoring";
  products.push({
    slug,
    folder: folder.name,
    model,
    name,
    category,
    tag: valueAfter(lines, "Tag"),
    description: valueAfter(lines, "One-sentence description"),
    images,
    keySpecifications,
    specifications,
    applications,
    features,
    overview,
    faq: parseFaq(lines),
  });
}

products.sort((a, b) => a.model.localeCompare(b.model, undefined, { numeric: true }));
await fs.writeFile(dataPath, `${JSON.stringify(products, null, 2)}\n`, "utf8");
console.log(`Generated ${products.length} product records at ${dataPath}`);
