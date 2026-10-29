import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Post } from "@/lib/wordpress.d";

const cacheStore = vi.hoisted(() => new Map<string, unknown>());
vi.mock("server-only", () => ({}));
vi.mock("next/cache", () => ({
  unstable_cache: (callback: () => Promise<unknown>, parts: string[]) => async () => {
    const key = parts.join("|");
    if (cacheStore.has(key)) return cacheStore.get(key);
    const value = await callback();
    cacheStore.set(key, value);
    return value;
  },
}));

describe("completed article translation cache", () => {
  beforeEach(() => {
    cacheStore.clear();
    vi.resetModules();
    vi.stubEnv("TRANSPOSH_API_URL", "https://wp.example.test");
    vi.stubEnv("TRANSPOSH_HEADLESS_SECRET", "a".repeat(32));
  });

  it("does not cache partial English content but caches the later completed result", async () => {
    let textRequests = 0;
    const fetch = vi.fn().mockImplementation(async (_url: string, options: { body: string }) => {
      const request = JSON.parse(options.body);
      if (request.format === "text") {
        textRequests++;
        return { ok: true, json: async () => ({
          results: textRequests === 1 ? ["Hallo", "World"] : ["Hallo", "Welt"],
          translated_mask: textRequests === 1 ? [true, false] : [true, true],
        }) };
      }
      return { ok: true, json: async () => ({ results: ["Titel", "Zusammenfassung"], translated_mask: [true, true] }) };
    });
    vi.stubGlobal("fetch", fetch);
    const { getCachedTranslatedPost } = await import("@/lib/transposh");
    const post = {
      id: 42, slug: "sample", modified: "2026-10-29T00:00:00",
      title: { rendered: "Title" }, excerpt: { rendered: "Summary" },
      content: { rendered: "<p>Hello</p><p>World</p>" },
    } as Post;
    expect((await getCachedTranslatedPost(post, "de")).content.rendered).toContain("<p>World</p>");
    expect((await getCachedTranslatedPost(post, "de")).content.rendered).toContain("<p>Welt</p>");
    expect((await getCachedTranslatedPost(post, "de")).content.rendered).toContain("<p>Welt</p>");
    expect(textRequests).toBe(2);
  });
});
