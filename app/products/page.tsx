import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ProductCatalog } from "./product-catalog";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "SF6 Gas Products, Analyzers & Handling Systems",
  description: "Browse SF6 gas analyzers, leak detectors, recovery and treatment equipment, mobile workstations, filling kits and universal adapters.",
  keywords: ["SF6 gas products", "SF6 gas analyzer", "SF6 leak detector", "SF6 recovery system", "SF6 service cart", "SF6 workstation", "SF6 filling kit"],
  alternates: { canonical: `${siteConfig.site_domain}/products` },
  openGraph: { title: `SF6 Gas Products | ${siteConfig.site_name}`, description: "Professional SF6 gas analysis, recovery, treatment and handling equipment.", url: `${siteConfig.site_domain}/products`, type: "website" },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fa]">
      <Script id="products-schema" type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "CollectionPage", name: "SF6 Gas Products & Solutions", url: `${siteConfig.site_domain}/products`, description: "SF6 gas analysis, leak detection, recovery, treatment, workstations and filling equipment." })}</Script>
      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-[#f0f4f8]"><ol className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 text-xs text-slate-600 sm:px-8 sm:text-sm"><li><Link href="/" className="hover:text-[#003a79]">Home</Link></li><li>/</li><li className="font-semibold text-[#003a79]">Products</li></ol></nav>
      <ProductCatalog />
    </div>
  );
}
