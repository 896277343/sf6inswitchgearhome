import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { defaultLocale, isLocale, locales, localizePath, type Locale } from "./config";

export function publishedLocales(): Locale[] {
  const configured = (process.env.PUBLISHED_LOCALES || defaultLocale)
    .split(",")
    .map((value) => value.trim())
    .filter(isLocale);
  return configured.length ? configured : [defaultLocale];
}

export function localizedUrl(path: string, locale: Locale): string {
  return `${siteConfig.site_domain}${localizePath(path, locale) === "/" ? "" : localizePath(path, locale)}`;
}

export function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    publishedLocales().map((locale) => [locale, localizedUrl(path, locale)])
  );
}

export function withLocalizedMetadata(
  base: Metadata,
  localeValue: string,
  path: string
): Metadata {
  const locale = isLocale(localeValue) ? localeValue : defaultLocale;
  const canonical = localizedUrl(path, locale);
  return {
    ...base,
    alternates: {
      ...base.alternates,
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: base.openGraph
      ? {
          ...base.openGraph,
          url: canonical,
          locale,
          alternateLocale: locales.filter((item) => item !== locale),
        }
      : undefined,
  };
}
