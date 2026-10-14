
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import Link from "@/components/i18n/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowRight, Calculator, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { Sf6CalculatorClient } from "./sf6-calculator-client";

const baseMetadata: Metadata = {
  title: `SF6 Calculator | Recovery, Vacuum, Density, Humidity and Leak Rate`,
  description:
    "Use our SF6 calculator for recovery time, vacuum pump-down time, residual gas quantity, SF6 density, humidity conversion, leak rate and common unit conversions.",
  keywords: [
    "SF6 calculator",
    "SF6 recovery time calculator",
    "SF6 vacuum pump down calculator",
    "SF6 density calculator",
    "SF6 humidity conversion",
    "SF6 leak rate calculator",
    "SF6 unit converter",
  ],
  alternates: {
    canonical: `${siteConfig.site_domain}/sf6-calculator`,
  },
  openGraph: {
    type: "website",
    title: "SF6 Calculator | Recovery, Vacuum, Density, Humidity and Leak Rate",
    description:
      "Calculate SF6 recovery, vacuum pump-down, density, humidity conversion, leak rate and unit conversions for gas handling workflows.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Calculator",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SF6 Calculator | Recovery, Vacuum, Density, Humidity and Leak Rate",
    description:
      "Calculate SF6 recovery, vacuum pump-down, density, humidity conversion, leak rate and unit conversions for gas handling workflows.",
    images: ["/twitter-image.jpeg"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/sf6-calculator");
}

export default function Sf6CalculatorPage() {
  return (
    <div className="min-h-screen">
      <Script id="sf6-calculator-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SF6 Calculator",
          "applicationCategory": "EngineeringApplication",
          "operatingSystem": "Web",
          "url": `${siteConfig.site_domain}/sf6-calculator`,
          "description": "Engineering guide calculator for SF6 recovery, vacuum pump-down, density, humidity, leak rate and unit conversion.",
          "publisher": {
            "@type": "Organization",
            "name": siteConfig.brand.legalName,
            "url": siteConfig.site_domain,
          },
        })}
      </Script>

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-blue-50">
              <Calculator className="h-4 w-4" />
              <T id="8b1c14a6099c91c1" />
            </div>
            <h1 className="text-3xl font-bold text-balance sm:text-5xl">
              <T id="747fe9ac59de51c9" />
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-50 sm:text-xl">
              <T id="c5a8938897f85d38" />
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                <Link href="#calculator"><T id="42bfaa3abf6002ed" /></Link>
              </Button>
              <Button asChild size="lg" className="border border-white bg-transparent hover:bg-white/10">
                <Link href="/contact"><T id="b2b30127508219b8" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            "Recovery time and residual gas guide values",
            "Vacuum pump-down time estimation",
            "SF6 density and mass estimation",
            "Dew point, ppmv and ppmw conversion",
            "Leak rate and mass flow estimation",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-md border border-slate-200 bg-white p-4">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-800" />
              <p className="text-sm leading-6 text-slate-700">{<TV>{item}</TV>}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="calculator">
        <Sf6CalculatorClient />
      </div>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950"><T id="0d20e3afc9f85e11" /></h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                <T id="030d1b684b86a786" />
              </p>
            </div>
            <Button asChild size="lg" className="mt-5 bg-blue-800 text-white hover:bg-blue-700 sm:mt-0">
              <Link href="/contact">
                <T id="0161a5f1198c308e" />
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
