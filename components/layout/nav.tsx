"use client";

import { Button } from "@/components/ui/button";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "@/components/i18n/link";
import { MobileNav } from "@/components/nav/mobile-nav";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/i18n/provider";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ className, children, id }: NavProps) {
  const { t, href: localizedHref } = useI18n();
  return (
    <nav
      className={cn("z-50 bg-background md:sticky md:top-0", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href={localizedHref("/")}
        >
          <Image
            src={Logo}
            alt={`${siteConfig.site_name} Logo`}
            loading="eager"
            width={42}
            height={26.44}
          />
          <h2 className="text-sm leading-none">{siteConfig.site_name}</h2>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={localizedHref(href)}>
                  {t(`nav.${key}` as Parameters<typeof t>[0])}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild size="lg" className="hidden sm:flex bg-blue-800 text-white hover:bg-blue-700">
            <Link href={localizedHref("/contact")}>{t("nav.cta")}</Link>
          </Button>
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
