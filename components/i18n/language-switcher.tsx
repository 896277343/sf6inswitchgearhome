"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localeNames, localizePath } from "@/lib/i18n/config";
import { useI18n } from "./provider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale, availableLocales, t } = useI18n();

  return (
    <details className="relative">
      <summary
        className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-md border px-2.5 text-sm marker:content-none"
        aria-label={t("language.label")}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
        <span className="hidden lg:inline">{locale.toUpperCase()}</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] min-w-36 rounded-md border bg-white p-1 text-slate-900 shadow-lg">
        {availableLocales.map((item) => (
          <Link
            key={item}
            href={localizePath(pathname, item)}
            hrefLang={item}
            lang={item}
            aria-current={item === locale ? "page" : undefined}
            className={`block rounded px-3 py-2 text-sm hover:bg-slate-100 ${item === locale ? "font-semibold text-blue-800" : ""}`}
          >
            {localeNames[item]}
          </Link>
        ))}
      </div>
    </details>
  );
}
