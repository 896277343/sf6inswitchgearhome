import { Section, Container } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
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
            <h2 className="font-medium text-base">Website</h2>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h2 className="font-medium text-base">Blog</h2>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col gap-6 md:flex-row md:items-center md:justify-end md:gap-2">
          <p className="text-muted-foreground">
            &copy; {siteConfig.footer.copyrightName}. All rights reserved.{" "}
            {siteConfig.footer.copyrightYears}.
          </p>
        </Container>
      </Section>
    </footer>
  );
}
