import React from "react";
import "./globals.css";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

import { siteConfig } from "@/site.config";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.site_name,
    template: "%s | " + siteConfig.site_name,
  },
  description: siteConfig.site_description,
  keywords: ["SF6 gas", "SF6 equipment", "SF6 leak detector", "SF6 gas analyzer", "SF6 gas handling", "SF6 regeneration", "SF6 gas management"],
  authors: [{ name: siteConfig.brand.legalName }],
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: siteConfig.site_name,
    description: siteConfig.site_description,
    siteName: siteConfig.site_name,
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: siteConfig.site_name,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.site_name,
    description: siteConfig.site_description,
    images: ["/twitter-image.jpeg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
