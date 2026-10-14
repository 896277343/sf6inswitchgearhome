import { afterEach, describe, expect, it } from "vitest";
import {
  getPublishedLocales,
  localizePath,
} from "@/lib/i18n/config";

const originalPublishedLocales = process.env.PUBLISHED_LOCALES;

afterEach(() => {
  if (originalPublishedLocales === undefined) {
    delete process.env.PUBLISHED_LOCALES;
  } else {
    process.env.PUBLISHED_LOCALES = originalPublishedLocales;
  }
});

describe("headless locale routing", () => {
  it("keeps the default language unprefixed", () => {
    expect(localizePath("/products/sf6-gas-analyzer", "en")).toBe(
      "/products/sf6-gas-analyzer"
    );
  });

  it("prefixes non-default languages without changing the slug", () => {
    expect(localizePath("/products/sf6-gas-analyzer", "de")).toBe(
      "/de/products/sf6-gas-analyzer"
    );
    expect(localizePath("/fr/products/sf6-gas-analyzer", "es")).toBe(
      "/es/products/sf6-gas-analyzer"
    );
  });

  it("builds only configured, valid and unique locales", () => {
    process.env.PUBLISHED_LOCALES = "en,de,de,invalid,fr";
    expect(getPublishedLocales()).toEqual(["en", "de", "fr"]);
  });

  it("falls back to English when no valid locale is configured", () => {
    process.env.PUBLISHED_LOCALES = "invalid";
    expect(getPublishedLocales()).toEqual(["en"]);
  });
});
