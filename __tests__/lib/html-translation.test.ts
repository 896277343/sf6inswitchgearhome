import { describe, expect, it } from "vitest";
import { prepareHtmlTranslation, splitTranslationText } from "@/lib/html-translation";

describe("article translation preparation", () => {
  it("keeps HTML markup and code untouched", () => {
    const html = '<p class="intro">Hello <strong>world</strong>.</p><pre>const a = 1;</pre>';
    const { tokens, indices } = prepareHtmlTranslation(html);
    expect(tokens.join("")).toBe(html);
    expect(indices.map((index) => tokens[index])).toEqual(["Hello ", "world", "."]);
  });

  it("splits long unicode text below the API byte limit without losing characters", () => {
    const source = "测试内容。".repeat(3000);
    const parts = splitTranslationText(source);
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.join("")).toBe(source);
    expect(parts.every((part) => new TextEncoder().encode(part).length <= 8000)).toBe(true);
  });
});
