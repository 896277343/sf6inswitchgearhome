import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/site.config";
import { HomeBanner } from "@/components/home/home-banner";

export const revalidate = 0;

export const metadata: Metadata = {
  title: `SF6 Gas Handling & Monitoring Equipment | ${siteConfig.site_name}`,
  description: "Professional SF6 gas analysis, leak detection, recovery, purification and lifecycle service solutions for power transmission and switchgear.",
  alternates: { canonical: siteConfig.site_domain },
};

const products = [
  { code: "RA912F", title: "SF6 Free-emission Analyzer", description: "Zero-emission SF6 gas analysis for high-precision purity, humidity and decomposition product inspection.", image: "/pics/home/sf6-emission-free-gas-analyzer.webp", href: "/products/sf6-gas-analyzer", detail: "Gas analysis series", benefit: "Eco-friendly recovery" },
  { code: "PGAS-32", title: "SF6 Leak Detector", description: "Portable high-sensitivity infrared detector for locating SF6 gas leaks in switchgear and GIS equipment.", image: "/pics/home/sf6-leak-detector.webp", href: "/products/sf6-leak-detector", detail: "Rapid 1–5s response", benefit: "0.1 ppm sensitivity" },
  { code: "Recovery & regeneration", title: "SF6 Purification System", description: "Integrated recovery, purification, evacuation and recycling for high-voltage substations and service teams.", image: "/pics/home/sf6-gas-purification-system.webp", href: "/products/sf6-regeneration-system", detail: "High-purity treatment", benefit: "Closed-loop protection" },
];

const services = [
  { title: "Product Sales & Leasing", description: "Flexible equipment supply and rental programs for planned maintenance and urgent field projects.", image: "/pics/home/sf6-product-sales-and-leasing.webp", href: "/products", className: "lg:col-span-4 lg:row-span-1" },
  { title: "On-line Monitoring Instrumentation", description: "Continuous condition visibility for safer substations, GIS rooms and critical assets.", image: "/pics/home/online-sf6-monitoring-instrumentation.webp", href: "/products/sf6-room-monitor", className: "lg:col-span-4 lg:row-span-1" },
  { title: "Reconditioning Service", description: "Professional recovery and treatment that returns contaminated gas to reusable quality.", image: "/pics/home/sf6-gas-reconditioning-service.webp", href: "/contact", className: "lg:col-span-4 lg:row-span-2" },
  { title: "SF6 Reuse & Regeneration", description: "Closed-loop solutions that reduce gas loss, operating cost and environmental impact.", image: "/pics/home/sf6-gas-reuse-and-regeneration.webp", href: "/products/sf6-regeneration-system", className: "lg:col-span-4 lg:row-span-1" },
  { title: "Intelligent Sensor", description: "Connected sensing for dependable gas density, pressure and environmental monitoring.", image: "/pics/home/intelligent-sf6-sensor.webp", href: "/products/sf6-room-monitor", className: "lg:col-span-4 lg:row-span-1" },
];

export default function Home() {
  return (
    <div className="bg-white text-slate-800">
      <Script id="organization-schema" type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: siteConfig.brand.legalName, url: siteConfig.site_domain, email: siteConfig.contact.email, telephone: siteConfig.contact.phone })}</Script>

      <HomeBanner />

      <section className="mx-auto grid max-w-[1600px] gap-5 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-12">
        <Link href="/projects" className="group relative min-h-64 overflow-hidden rounded-2xl bg-[#0b1b3d] p-7 text-white lg:col-span-4"><Image src="/pics/home/online-sf6-monitoring-instrumentation.webp" alt="SF6 online monitoring solutions" fill sizes="(min-width:1024px) 34vw, 100vw" className="object-cover opacity-55 transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#071a3d] via-[#071a3d]/55 to-transparent" /><div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">Solutions</p><h2 className="mt-2 max-w-sm text-xl font-black leading-snug">Digital monitoring for reliable power transmission</h2><span className="mt-5 flex items-center gap-2 text-sm font-bold">Explore solutions <ArrowRight size={16}/></span></div></Link>
        <Link href="/posts" className="group relative min-h-64 overflow-hidden rounded-2xl bg-slate-100 p-7 lg:col-span-4"><Image src="/pics/home/intelligent-sf6-sensor.webp" alt="Intelligent SF6 sensor technology" fill sizes="(min-width:1024px) 34vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" /><div className="relative flex h-full flex-col justify-end"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#003a79]">Know-how</p><h2 className="mt-2 max-w-sm text-xl font-black leading-snug text-[#0b1b3d]">Building safer substations with connected sensing</h2><span className="mt-5 flex items-center gap-2 text-sm font-bold text-[#003a79]">Read insights <ArrowRight size={16}/></span></div></Link>
        <div className="rounded-2xl bg-[#003a79] p-7 text-white lg:col-span-4"><p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">Sales contact</p><h2 className="mt-2 text-2xl font-black">Find the right SF6 solution</h2><p className="mt-3 text-sm leading-6 text-blue-100">Tell our engineers what you need and receive a solution matched to your equipment and application.</p><div className="mt-6 grid gap-3"><Link href="/products" className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">Browse all products <ChevronRight size={17}/></Link><Link href="/contact" className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#003a79] hover:bg-cyan-50">Contact our team <ArrowRight size={17}/></Link></div></div>
      </section>

      <section className="bg-[#f4f6f9] py-14 sm:py-16"><div className="mx-auto max-w-[1600px] px-5 sm:px-6"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#00a6df]">Main products</p><h2 className="mt-2 text-3xl font-black tracking-tight text-[#0b1b3d] sm:text-4xl">Engineered for critical SF6 work</h2></div><Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-[#003a79] hover:text-[#00a6df]">View all products <ArrowRight size={17}/></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{products.map((product) => <Link key={product.title} href={product.href} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-[4/3] w-full overflow-hidden bg-white md:h-56"><Image src={product.image} alt={product.title} fill sizes="(min-width:768px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex h-[205px] flex-col p-3 sm:h-auto sm:p-6"><span className="w-fit rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[9px] font-bold text-[#003a79] sm:px-3 sm:py-1 sm:text-xs">{product.code}</span><h3 className="mt-2 text-sm font-bold leading-snug text-[#003a79] group-hover:underline sm:mt-3 sm:text-lg">{product.title}</h3><p className="mt-2 line-clamp-2 text-[11px] leading-4 text-slate-600 sm:line-clamp-3 sm:text-sm sm:leading-5">{product.description}</p><div className="mt-auto border-t border-slate-100 pt-2 text-[10px] text-slate-500 sm:mt-5 sm:pt-3 sm:text-xs"><p className="font-semibold text-slate-700">{product.detail}</p><p className="mt-1 hidden sm:block">{product.benefit}</p></div></div></Link>)}</div>
      </div></section>

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-6 sm:py-16"><div className="mb-12 flex items-center"><div className="h-px flex-1 bg-slate-300"/><h2 className="px-5 text-center text-2xl font-black tracking-tight text-[#0b1b3d] sm:px-7 sm:text-3xl">Support &amp; Service</h2><div className="h-px flex-1 bg-slate-300"/></div>
        <div className="grid gap-5 lg:grid-cols-12 lg:grid-rows-2">{services.map((service, index) => <Link key={service.title} href={service.href} className={`group relative flex min-h-[285px] overflow-hidden rounded-3xl p-6 shadow-md ${service.className} ${index === 2 ? "lg:min-h-[610px]" : ""}`}><Image src={service.image} alt={service.title} fill sizes="(min-width:1024px) 34vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" /><div className="relative mt-auto flex w-full items-end justify-between gap-4"><div className="max-w-[82%]"><h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{service.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-200">{service.description}</p></div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition group-hover:scale-110"><ArrowUpRight size={17}/></span></div></Link>)}</div>
      </section>
    </div>
  );
}
