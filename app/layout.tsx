import React from "react";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react";
import { ResizeObserverErrorHandler } from "@/components/utils/resize-observer-error-handler";

import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ResizeObserverErrorHandler />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
