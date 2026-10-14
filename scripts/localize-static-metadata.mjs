import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const routes = {
  "app/[locale]/page.tsx": "/",
  "app/[locale]/about/page.tsx": "/about",
  "app/[locale]/contact/page.tsx": "/contact",
  "app/[locale]/inquiry/success/page.tsx": "/inquiry/success",
  "app/[locale]/pages/page.tsx": "/pages",
  "app/[locale]/products/page.tsx": "/products",
  "app/[locale]/projects/page.tsx": "/projects",
  "app/[locale]/sf6-calculator/page.tsx": "/sf6-calculator",
  "app/[locale]/posts/authors/page.tsx": "/posts/authors",
  "app/[locale]/posts/categories/page.tsx": "/posts/categories",
  "app/[locale]/posts/tags/page.tsx": "/posts/tags",
  "app/[locale]/products/mobile-sf6-vacuum-pump-unit/page.tsx": "/products/mobile-sf6-vacuum-pump-unit",
  "app/[locale]/products/sf6-gas-analyzer/page.tsx": "/products/sf6-gas-analyzer",
  "app/[locale]/products/sf6-gas-filling-cart/page.tsx": "/products/sf6-gas-filling-cart",
  "app/[locale]/products/sf6-gas-filling-kit/page.tsx": "/products/sf6-gas-filling-kit",
  "app/[locale]/products/sf6-gas-fittings/page.tsx": "/products/sf6-gas-fittings",
  "app/[locale]/products/sf6-leak-detector/page.tsx": "/products/sf6-leak-detector",
  "app/[locale]/products/sf6-regeneration-system/page.tsx": "/products/sf6-regeneration-system",
  "app/[locale]/products/sf6-room-monitor/page.tsx": "/products/sf6-room-monitor",
  "app/[locale]/products/sf6-service-carts/page.tsx": "/products/sf6-service-carts",
  "app/[locale]/projects/sf6-gas-handling-and-regeneration-base/page.tsx": "/projects/sf6-gas-handling-and-regeneration-base",
  "app/[locale]/projects/sf6-gas-handling-for-underground-substation/page.tsx": "/projects/sf6-gas-handling-for-underground-substation",
  "app/[locale]/projects/sf6-use-for-gas-insulated-switchgear-manufacturers/page.tsx": "/projects/sf6-use-for-gas-insulated-switchgear-manufacturers",
  "app/[locale]/projects/ultra-high-voltage-sf6-handling-equipment/page.tsx": "/projects/ultra-high-voltage-sf6-handling-equipment",
};

let changed = 0;
for (const [relative, route] of Object.entries(routes)) {
  const file = path.join(root, relative);
  let source = fs.readFileSync(file, "utf8");
  if (source.includes("withLocalizedMetadata(baseMetadata")) continue;
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let statement;
  for (const candidate of ast.statements) {
    if (!ts.isVariableStatement(candidate)) continue;
    const declaration = candidate.declarationList.declarations[0];
    if (declaration && ts.isIdentifier(declaration.name) && declaration.name.text === "metadata") {
      statement = candidate;
      break;
    }
  }
  if (!statement) throw new Error(`No exported metadata variable found in ${relative}`);
  const statementText = source.slice(statement.pos, statement.end);
  const renamed = statementText
    .replace(/export\s+const\s+metadata/, "const baseMetadata")
    .replace(/const\s+metadata/, "const baseMetadata");
  const generator = `\n\nexport async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {\n  const { locale } = await params;\n  return withLocalizedMetadata(baseMetadata, locale, ${JSON.stringify(route)});\n}`;
  source = source.slice(0, statement.pos) + renamed + generator + source.slice(statement.end);
  const directive = source.match(/^(["']use client["'];\s*)/);
  const insertAt = directive ? directive[0].length : 0;
  source = source.slice(0, insertAt) + '\nimport { withLocalizedMetadata } from "@/lib/i18n/metadata";\n' + source.slice(insertAt);
  fs.writeFileSync(file, source);
  changed++;
}
console.log(`Localized metadata for ${changed} static routes.`);
