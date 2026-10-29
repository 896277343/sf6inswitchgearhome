import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("headless plain-text translations", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("TRANSPOSH_API_URL", "https://wp.example.test");
    vi.stubEnv("TRANSPOSH_HEADLESS_SECRET", "a".repeat(32));
  });

  it("keeps positions and handles individual rejected items without caching the response", async () => {
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: ["Hallo", "original"], translated_mask: [true, false] }),
    });
    vi.stubGlobal("fetch", fetch);
    const { translateStrings } = await import("@/lib/transposh");
    const result = await translateStrings(["Hello", "", "original"], "de", { format: "text" });
    expect(result.results).toEqual(["Hallo", "", "original"]);
    expect(result.accepted).toEqual([true, false, false]);
    const options = fetch.mock.calls[0][1];
    expect(options.cache).toBe("no-store");
    expect(JSON.parse(options.body).strings).toEqual(["Hello", "original"]);
    expect(JSON.parse(options.body).format).toBe("text");
  });
});
