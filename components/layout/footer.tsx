"use client";

import { Section, Container } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "@/components/i18n/link";
import { useI18n } from "@/components/i18n/provider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              <Image
                src={Logo}
                alt="Logo"
                width={42}
                height={26.44}
              />
            </Link>
            <div className="space-y-3">
              <p>{siteConfig.site_description}</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {siteConfig.footer.summary}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h2 className="font-medium text-base">{t("footer.website")}</h2>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {t(`nav.${key}` as Parameters<typeof t>[0])}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h2 className="font-medium text-base">{t("footer.blog")}</h2>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {t(`nav.${key}` as Parameters<typeof t>[0])}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col gap-6 md:flex-row md:items-center md:justify-end md:gap-2">
          <p className="text-muted-foreground">
            &copy; {siteConfig.footer.copyrightName}. {t("footer.rights")}{" "}
            {siteConfig.footer.copyrightYears}.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
