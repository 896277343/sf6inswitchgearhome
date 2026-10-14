import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import ts from "typescript";

const root = process.cwd();
const scanRoots = [path.join(root, "app", "[locale]")];
const excluded = [
  `${path.sep}components${path.sep}i18n${path.sep}`,
  `${path.sep}components${path.sep}layout${path.sep}`,
  `${path.sep}components${path.sep}nav${path.sep}`,
  `${path.sep}components${path.sep}ui${path.sep}`,
];
const catalogPath = path.join(root, "messages", "source.json");
const previousCatalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const catalog = {};

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, files);
    else if (entry.name.endsWith(".tsx") && !excluded.some((part) => fullPath.includes(part))) files.push(fullPath);
  }
  return files;
}

function keyFor(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
}

let changedFiles = 0;
let extracted = 0;
for (const file of scanRoots.flatMap((directory) => walk(directory))) {
  let source = fs.readFileSync(file, "utf8");
  source = source.replace(/^\uFEFF+/, "");
  const alreadyImported = source.includes('from "@/components/i18n/text"');
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const replacements = [];

  for (const match of source.matchAll(/<T\s+id="([a-f0-9]{16})"\s*\/>/g)) {
    if (previousCatalog[match[1]]) catalog[match[1]] = previousCatalog[match[1]];
  }

  function visit(node) {
    if (ts.isJsxText(node)) {
      const raw = source.slice(node.pos, node.end);
      const text = raw.trim().replace(/\s+/g, " ");
      if (text.length > 1 && /[A-Za-z]/.test(text)) {
        const key = keyFor(text);
        catalog[key] = text;
        const leading = raw.match(/^\s*/)?.[0] ?? "";
        const trailing = raw.match(/\s*$/)?.[0] ?? "";
        replacements.push({ start: node.pos, end: node.end, value: `${leading}<T id="${key}" />${trailing}` });
        extracted++;
      }
    }
    if (
      ts.isStringLiteral(node) &&
      !ts.isImportDeclaration(node.parent) &&
      !ts.isExportDeclaration(node.parent) &&
      !ts.isJsxAttribute(node.parent)
    ) {
      const text = node.text.trim().replace(/\s+/g, " ");
      const looksLikePath = /^(?:https?:|\/|\.\/|\.\.\/|[A-Za-z0-9_-]+\.(?:jpg|jpeg|png|webp|svg))/.test(text);
      const looksLikeCode = /^(?:[a-z]+:|@context|@type|[a-z]+-[a-z-]+)$/i.test(text);
      const tokens = text.split(/\s+/);
      const utilityTokens = tokens.filter((token) => /^(?:sm:|md:|lg:|xl:|2xl:|hover:|focus:|group-|peer-|flex$|grid$|block$|hidden$|relative$|absolute$|fixed$|sticky$|items-|justify-|gap-|space-|p[trblxy]?[-\[]|m[trblxy]?[-\[]|w-|h-|min-|max-|rounded|border|bg-|text-|font-|leading-|tracking-|shadow|transition|duration|opacity|overflow|object-|z-)/.test(token)).length;
      const looksLikeClasses = tokens.length > 1 && utilityTokens / tokens.length >= 0.4;
      if (text.length > 2 && text.includes(" ") && /[A-Za-z]/.test(text) && !looksLikePath && !looksLikeCode && !looksLikeClasses) {
        catalog[keyFor(text)] = text;
      }
    }
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      !ts.isJsxAttribute(node.parent) &&
      (ts.isIdentifier(node.expression) || ts.isPropertyAccessExpression(node.expression)) &&
      !(ts.isJsxElement(node.parent) && ["T", "TV"].includes(node.parent.openingElement.tagName.getText(ast)))
    ) {
      const expression = source.slice(node.expression.pos, node.expression.end).trim();
      replacements.push({ start: node.pos, end: node.end, value: `{<TV>{${expression}}</TV>}` });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  if (!replacements.length) {
    fs.writeFileSync(file, source);
    continue;
  }

  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, replacement.start) + replacement.value + source.slice(replacement.end);
  }
  if (alreadyImported) {
    source = source.replace(
      /import \{\s*T\s*\} from "@\/components\/i18n\/text";/,
      'import { T, TV } from "@/components/i18n/text";'
    );
  } else {
    const directive = source.match(/^(["']use client["'];\s*)/);
    const insertAt = directive ? directive[0].length : 0;
    source = source.slice(0, insertAt) + '\nimport { T, TV } from "@/components/i18n/text";\n' + source.slice(insertAt);
  }
  fs.writeFileSync(file, source);
  changedFiles++;
}

fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Extracted ${extracted} visible strings from ${changedFiles} files (${Object.keys(catalog).length} unique).`);
