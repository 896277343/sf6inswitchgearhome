"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check, ChevronRight, Download, Search, Zap } from "lucide-react";
import { buildProductSchema } from "../product-schema";

const product = {
  name: "SF6 Infrared Leak Detector",
  model: "PGAS-32",
  description: "Portable NDIR leak detector for locating and quantifying small SF6 leaks in GIS, switchgear and field maintenance.",
  availability: "In Stock",
  images: [
    { src: "/pics/products/SF6-Leak-Detector-1.webp", alt: "PGAS-32 SF6 infrared leak detector front view" },
    { src: "/pics/products/SF6-Leak-Detector-2.webp", alt: "PGAS-32 handheld SF6 leak detector side view" },
    { src: "/pics/products/SF6-Leak-Detector-3.webp", alt: "PGAS-32 SF6 leak detector display and probe" },
  ],
};

const metrics = [["0.1 ppm", "Sensitivity"], ["NDIR", "Measuring Technology"], ["1–5 s", "Response Time"], ["0–1500 ppm", "Measurement Range"]];

const applications = [
  "Locating and quantifying SF6 leaks in GIS, ring main units and other SF6-filled equipment",
  "Leak-rate measurement for tightness verification and final inspection",
  "Post-maintenance leak checks after gas handling, repair or component replacement",
];

const features = [
  "0.1 ppm resolution with dual measuring ranges of 0–50 ppm and 0–1,500 ppm",
  "Readings displayed in both ppm and g/y for quantitative leak assessment",
  "1–5 second response time with built-in pump sampling",
  "Extended probe for valves, flanges and confined inspection points",
  "Automatic zero correction for stable real-time readings",
];

const companyMetrics = [
  { value: "1997", label: "Founded", icon: "/pics/products/why-choose-us/founded-1997-icon.webp" },
  { value: "50+", label: "Exported Markets", icon: "/pics/products/why-choose-us/global-export-markets-icon.webp" },
  { value: "700+", label: "Skilled Personnel", icon: "/pics/products/why-choose-us/skilled-personnel-icon.webp" },
];

const capabilities = [
  { title: "Innovate", description: "Smart gas handling technology", icon: "/pics/products/why-choose-us/sf6-innovation-icon.webp" },
  { title: "Customize", description: "Tailored solutions for your application", icon: "/pics/products/why-choose-us/custom-sf6-solution-icon.webp" },
  { title: "Sustain", description: "Emission-free handling", icon: "/pics/products/why-choose-us/sustainable-sf6-handling-icon.webp" },
  { title: "Support", description: "Lifecycle service you can rely on", icon: "/pics/products/why-choose-us/sf6-lifecycle-support-icon.webp" },
];

const specifications = [
  ["Measuring principle", "NDIR (non-dispersive infrared)"], ["Measuring ranges", "0–1,000 ppm / 1,500 ppm"], ["Resolution", "0.1 ppm"], ["Accuracy", "±2% F.S."], ["Sampling method", "Built-in pump"], ["Response time", "1–5 seconds"], ["Warm-up time", "100 seconds"], ["Probe length", "22 cm"], ["Sensor life", "10 years"], ["Alarm method", "Sound and light"], ["Operating temperature", "−20 to +60 °C"], ["Battery", "4.2 V / 2,200 mAh lithium"], ["Dimensions", "300 × 100 × 80 mm"], ["Weight", "700 g"],
];

const related = [
  { model: "RA912F", title: "SF6 Gas Analyzer", description: "Multi-gas field analysis for SF6 purity, moisture and decomposition products.", image: "/pics/products/catalog/analysis-leak-detection/sf6-gas-analyzer-with-pump-back-system.webp", href: "/products/sf6-gas-analyzer" },
  { model: "RF-051", title: "Compact SF6 Service Unit", description: "Oil-free recovery, evacuation and controlled refilling in one mobile system.", image: "/pics/products/catalog/recovery-treatment-equipment/compact-sf6-service-unit.webp", href: "/products/sf6-service-carts" },
  { model: "Room Monitor", title: "SF6 Room Monitor", description: "Continuous SF6, oxygen, temperature and humidity monitoring for GIS rooms.", image: "/pics/products/sf6-room-monitor-p.webp", href: "/products/sf6-room-monitor" },
];

const faqs = [
  ["How does NDIR compare with corona discharge detectors?", "NDIR selectively measures SF6 by infrared absorption, offering stable readings, minimal cross-sensitivity and a long sensor life without sensor burn-out."],
  ["Can the detector show quantitative leak rates?", "Yes. The PGAS-32 provides concentration readings in ppm and supports quantitative assessment of leak rates in g/y."],
  ["How often is calibration recommended?", "Annual calibration is recommended for normal professional use, with shorter intervals for intensive regulatory or quality-control programs."],
  ["Is it suitable for outdoor switchyard inspections?", "Yes. Its portable enclosure, extended probe and wide operating temperature range support routine field inspection."],
];

export default function ProductContent() {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white text-slate-800">
      <Script id="product-schema" type="application/ld+json">{JSON.stringify(buildProductSchema({ slug: "sf6-leak-detector", ...product, shortDescription: product.description, minOrder: "1 Unit", deliveryTime: "7–15 Days", warranty: "1 Year", certification: ["CE", "ISO 9001", "IEC 60480"], specifications: specifications.map(([label, value]) => ({ label, value })), applications }))}</Script>

      <nav aria-label="Breadcrumb" className="border-b border-slate-200 bg-[#f0f4f8]"><div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-slate-600 sm:px-8"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>SF6 Gas Solutions</span><span>/</span><span className="font-semibold text-[#003a79]">{product.name}</span></div></nav>

      <main>
        <section className="mx-auto grid max-w-7xl gap-9 px-5 py-9 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:py-12">
          <div aria-label="Product Gallery">
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-[#f6f8fa] shadow-sm"><span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 backdrop-blur"><Search size={13}/> Interactive Zoom</span><div className="relative aspect-[4/3]"><Image src={product.images[activeImage].src} alt={product.images[activeImage].alt} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-contain p-5 transition duration-500 group-hover:scale-105"/></div><div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-white px-5 py-3 text-xs"><span className="mr-auto flex items-center gap-2 font-semibold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500"/>{product.availability}</span>{["High sensitivity", "Quick response", "Portable"].map(x=><span key={x} className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">{x}</span>)}</div></div>
            <div className="mt-3 grid grid-cols-3 gap-3">{product.images.map((image,index)=><button key={image.src} onClick={()=>setActiveImage(index)} className={`relative aspect-[4/3] overflow-hidden rounded-lg border bg-[#f6f8fa] ${activeImage===index?"border-[#003a79] ring-1 ring-[#003a79]":"border-slate-200 hover:border-slate-400"}`} aria-label={`View ${image.alt}`}><Image src={image.src} alt={image.alt} fill sizes="16vw" className="object-contain p-2"/></button>)}</div>
          </div>

          <div aria-label="Product Information" className="self-center"><span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-[#003a79]">{product.model}</span><h1 className="mt-4 text-4xl font-black leading-tight tracking-[-.03em] text-[#0b1b3d] sm:text-5xl">{product.name}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{product.description}</p><div className="my-7 grid grid-cols-2 gap-x-5 gap-y-6 border-y border-slate-200 py-6 sm:grid-cols-4">{metrics.map(([value,label])=><div key={label}><p className="text-xl font-black text-[#003a79]">{value}</p><p className="mt-1 text-xs leading-4 text-slate-500">{label}</p></div>)}</div><div className="flex flex-col gap-3 sm:flex-row"><Link href="#footer-inquiry" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#003a79] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#002554]">Contact Us <ArrowRight size={16}/></Link><Link href="#specifications" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#003a79] px-7 py-3.5 text-sm font-bold text-[#003a79] hover:bg-sky-50"><Download size={16}/> Data Sheet</Link></div>
          </div>
        </section>

        <nav className="sticky top-0 z-30 border-y border-slate-200 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold text-[#003a79] sm:px-8"><Link href="#applications" className="whitespace-nowrap">Applications & Features</Link><Link href="#description" className="whitespace-nowrap">Description</Link><Link href="#specifications" className="whitespace-nowrap">Specifications</Link><Link href="#related" className="whitespace-nowrap">Related Products</Link><Link href="#faq" className="whitespace-nowrap">FAQ</Link></div></nav>

        <section id="applications" className="scroll-mt-20 bg-[#f4f7fa] py-14 sm:py-16"><div className="mx-auto max-w-5xl space-y-6 px-5 sm:px-8"><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"><h2 className="text-2xl font-black text-[#0b1b3d] sm:text-3xl">Applications</h2><ul className="mt-6 grid gap-x-12 gap-y-4 md:grid-cols-2">{applications.map(x=><li key={x} className="flex gap-3 leading-7 text-slate-600"><Check className="mt-1 h-5 w-5 shrink-0 text-[#00a6df]"/>{x}</li>)}</ul></div><div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10"><h2 className="text-2xl font-black text-[#0b1b3d] sm:text-3xl">Special Features</h2><ul className="mt-6 grid gap-x-12 gap-y-4 md:grid-cols-2">{features.map(x=><li key={x} className="flex gap-3 leading-7 text-slate-600"><Zap className="mt-1 h-5 w-5 shrink-0 text-[#00a6df]"/>{x}</li>)}</ul></div></div></section>

        <section id="description" className="scroll-mt-20 py-14"><div className="mx-auto max-w-5xl px-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#00a6df]">Product overview</p><h2 className="mt-2 text-3xl font-black text-[#0b1b3d]">Description</h2><div className="mt-8 grid gap-8 text-slate-600 md:grid-cols-3"><div><h3 className="text-lg font-bold text-[#003a79]">Mobile operation</h3><p className="mt-3 leading-7">Designed for locating and quantifying SF6 leaks in GIS, ring main units and gas-insulated equipment during inspection, maintenance and final verification.</p></div><div><h3 className="text-lg font-bold text-[#003a79]">Infrared technology</h3><p className="mt-3 leading-7">NDIR measurement delivers selective, stable readings. A built-in sampling pump continuously draws gas and responds within 1–5 seconds.</p></div><div><h3 className="text-lg font-bold text-[#003a79]">Simple operation</h3><p className="mt-3 leading-7">The handheld design and extended probe provide easy access around valves, flanges, joints and difficult inspection points.</p></div></div></div></section>

        <section id="specifications" className="scroll-mt-20 bg-[#f4f7fa] py-14"><div className="mx-auto max-w-5xl px-5 sm:px-8"><h2 className="text-3xl font-black text-[#0b1b3d]">Technical Specifications</h2><p className="mt-3 text-slate-600">Factory-calibrated parameters for professional SF6 inspection and maintenance.</p><div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white"><table className="w-full text-left text-sm"><thead className="bg-[#003a79] text-white"><tr><th className="px-5 py-4">Parameter</th><th className="px-5 py-4">Specification</th></tr></thead><tbody>{specifications.map(([label,value],index)=><tr key={label} className={`border-t border-slate-100 ${index%2===0?"bg-white":"bg-slate-50"}`}><th className="w-2/5 px-5 py-3.5 font-semibold text-slate-700">{label}</th><td className="px-5 py-3.5 text-slate-600">{value}</td></tr>)}</tbody></table></div></div></section>

        <section className="bg-white py-14 sm:py-16"><div className="mx-auto max-w-5xl px-5 sm:px-8"><div className="relative overflow-hidden rounded-2xl border border-[#dce8f2] bg-[#edf6fc] shadow-sm"><Image src="/pics/products/why-choose-us/sf6-solutions-capability-background.webp" alt="" fill sizes="(min-width:1024px) 960px, 100vw" className="z-0 object-cover object-center"/><div className="absolute inset-0 z-[1] bg-white/5"/><div className="relative z-10 grid gap-8 px-5 py-8 sm:px-7 lg:min-h-[320px] lg:grid-cols-[255px_1fr] lg:gap-10 lg:px-8 lg:py-7"><div className="grid grid-cols-3 gap-3 border-[#9bb5cc] lg:grid-cols-1 lg:content-center lg:gap-3 lg:border-r lg:pr-7">{companyMetrics.map(item=><div key={item.label} className="flex flex-col items-center gap-2 text-center lg:flex-row lg:text-left"><div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#d8e6f1] bg-white shadow-sm lg:h-16 lg:w-16"><Image src={item.icon} alt={`${item.label} icon`} fill sizes="64px" className="object-contain"/></div><div><p className="text-2xl font-black leading-none text-[#003a79] lg:text-[32px]">{item.value}</p><p className="mt-1 text-[11px] font-medium text-[#536b86] lg:text-sm">{item.label}</p></div></div>)}</div><div className="flex flex-col"><div><h2 className="text-3xl font-black leading-none tracking-[-.03em] text-[#003a79] lg:text-[38px]">What We Can Do</h2><p className="mt-1.5 text-sm text-[#60758f] lg:text-lg">From your challenges to reliable solutions</p></div><div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4">{capabilities.map(item=><div key={item.title} className="text-center"><div className="relative mx-auto h-[72px] w-[72px] overflow-hidden rounded-full border border-[#e2edf5] bg-white shadow-[0_8px_24px_rgba(0,58,121,.12)]"><Image src={item.icon} alt={`${item.title} icon`} fill sizes="72px" className="object-contain"/></div><h3 className="mt-2 text-base font-black text-[#003a79] lg:text-lg">{item.title}</h3><span className="mx-auto mt-1.5 block h-[3px] w-9 rounded-full bg-[#00a6df]"/><p className="mx-auto mt-2 max-w-[140px] text-xs font-medium leading-4 text-[#536b86] lg:text-sm lg:leading-[18px]">{item.description}</p></div>)}</div></div></div></div></div></section>

        <section id="related" className="scroll-mt-20 py-14"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="mb-7 flex items-end justify-between"><h2 className="text-3xl font-black text-[#0b1b3d]">Related SF6 Instrumentation</h2><Link href="/products" className="hidden text-sm font-bold text-[#003a79] sm:block">View all products →</Link></div><div className="grid gap-5 md:grid-cols-3">{related.map(item=><Link href={item.href} key={item.title} className="group overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="relative aspect-[4/3] bg-[#f6f8fa]"><Image src={item.image} alt={item.title} fill sizes="33vw" className="object-contain p-4 transition duration-500 group-hover:scale-105"/></div><div className="p-5"><p className="text-xs font-bold text-[#00a6df]">Model {item.model}</p><h3 className="mt-2 text-lg font-bold text-[#003a79]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#003a79]">View Product <ArrowRight size={15}/></span></div></Link>)}</div></div></section>

        <section id="faq" className="scroll-mt-20 bg-[#f4f7fa] py-14"><div className="mx-auto max-w-5xl px-5 sm:px-8"><h2 className="text-3xl font-black text-[#0b1b3d]">Frequently Asked Questions</h2><p className="mt-3 text-slate-600">Common technical and operational questions about the PGAS-32.</p><div className="mt-7 grid gap-3 md:grid-cols-2">{faqs.map(([q,a])=><details key={q} className="group rounded-xl border border-slate-200 bg-white p-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-bold text-[#0b1b3d]">{q}<ChevronRight className="mt-0.5 shrink-0 transition group-open:rotate-90" size={18}/></summary><p className="mt-3 text-sm leading-6 text-slate-600">{a}</p></details>)}</div></div></section>
      </main>
    </div>
  );
}
