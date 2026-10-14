"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import { messages, type MessageKey } from "@/lib/i18n/messages";
import sourceCatalog from "@/messages/source.json";

const sourceKeyByText = new Map(
  Object.entries(sourceCatalog).map(([key, source]) => [source, key])
);

type I18nValue = {
  locale: Locale;
  availableLocales: Locale[];
  catalog: Record<string, string>;
  translateValue: (value: React.ReactNode) => React.ReactNode;
  t: (key: MessageKey) => string;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  availableLocales,
  catalog,
  children,
}: {
  locale: Locale;
  availableLocales: Locale[];
  catalog: Record<string, string>;
  children: React.ReactNode;
}) {
  const value: I18nValue = {
    locale,
    availableLocales,
    catalog,
    translateValue: (input) => {
      if (typeof input !== "string") return input;
      const key = sourceKeyByText.get(input);
      return key ? catalog[key] ?? input : input;
    },
    t: (key) => messages[locale][key] ?? messages.en[key] ?? key,
    href: (path) => localizePath(path, locale),
  };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
