export const locales = ["en", "de", "fr", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function getPublishedLocales(): Locale[] {
  const configured = (process.env.PUBLISHED_LOCALES || defaultLocale)
    .split(",")
    .map((locale) => locale.trim())
    .filter(isLocale);

  return configured.length > 0 ? Array.from(new Set(configured)) : [defaultLocale];
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizePath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalized.split("/");
  if (parts[1] && isLocale(parts[1])) parts.splice(1, 1);
  const cleanPath = parts.join("/") || "/";
  return locale === defaultLocale
    ? cleanPath
    : `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
