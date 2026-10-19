"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Download, Grid2X2, List, ShieldCheck } from "lucide-react";
import productData from "@/data/product-singles.json";
import type { ProductSingle } from "./product-single-types";

type Category = { id: string; label: string; heading: string; products: ProductSingle[] };
const products = productData as ProductSingle[];
const categoryOrder = ["SF6 Leakage & Monitoring", "SF6 Analysis", "SF6 Recovery", "SF6 Treatment", "Kitting & Valves"];
const categories: Category[] = categoryOrder.map((label) => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  label,
  heading: label,
  products: products.filter((product) => product.category === label),
}));

function ProductCard({ product, listView }: { product: ProductSingle; listView: boolean }) {
  const href = `/products/${product.slug}`;
  return <article className={`group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-sky-300 hover:shadow-lg ${listView ? "md:grid md:grid-cols-[260px_1fr]" : ""}`}>
    <Link href={href} className={`relative block overflow-hidden bg-[#f6f8fa] ${listView ? "min-h-64" : "aspect-[4/3]"}`}><Image src={product.images[0]} alt={`${product.model} ${product.name}`} fill sizes={listView ? "260px" : "(min-width:1024px) 34vw, 100vw"} className="object-contain p-3 transition duration-500 group-hover:scale-105"/></Link>
    <div className="flex flex-col p-5 sm:p-6"><div><span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#003a79]">{product.model}</span><p className="mt-3 text-xs font-semibold uppercase tracking-[.1em] text-slate-500">{product.tag}</p><h3 className="mt-2 text-xl font-bold leading-snug text-[#003a79]">{product.name}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p></div><div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-slate-100 py-4">{product.keySpecifications.map(([value,label])=><div key={`${value}-${label}`}><p className="text-sm font-bold text-[#0b1b3d]">{value}</p><p className="mt-0.5 text-[11px] leading-4 text-slate-500">{label}</p></div>)}</div><div className="mt-5 flex items-center justify-between gap-3"><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"><Download size={14}/> Specifications</span><Link href={href} className="inline-flex items-center gap-2 rounded-full bg-[#003a79] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#002554]">Details <ArrowRight size={14}/></Link></div></div>
  </article>;
}

export function ProductCatalog() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const [listView, setListView] = useState(false);
  const active = categories.find((category) => category.id === activeId) ?? categories[0];
  return <>
    <section className="border-b border-slate-200 bg-white py-8"><div className="mx-auto max-w-7xl px-4 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#00a6df]">SF6 product portfolio</p><h1 className="mt-2 text-3xl font-black tracking-tight text-[#0b1b3d] sm:text-4xl">SF6 Gas Products & Solutions</h1><p className="mt-3 max-w-3xl leading-7 text-slate-600">Professional instruments and systems for SF6 gas analysis, leak detection, monitoring, recovery, treatment, handling and controlled filling.</p></div></section>
    <main className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-8 lg:grid-cols-12 lg:py-10"><aside aria-label="Product Categories" className="h-fit overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:sticky lg:top-5 lg:col-span-4"><div className="border-b border-slate-200 p-5"><h2 className="text-xl font-bold text-[#0b1b3d]">Products</h2><p className="mt-1 text-xs text-slate-500">{products.length} products in {categories.length} categories</p></div><div role="tablist" className="p-2">{categories.map((category)=><button key={category.id} role="tab" aria-selected={activeId===category.id} onClick={()=>setActiveId(category.id)} className={`flex w-full items-center justify-between gap-3 rounded-lg px-4 py-4 text-left text-sm font-semibold transition ${activeId===category.id?"bg-[#003a79] text-white":"text-slate-700 hover:bg-slate-50 hover:text-[#003a79]"}`}><span>{category.label}</span><ChevronRight size={17} className="shrink-0"/></button>)}</div><div className="m-4 rounded-lg bg-[#eef6fc] p-5"><ShieldCheck className="text-[#003a79]" size={24}/><h3 className="mt-3 font-bold text-[#0b1b3d]">EPA & IEC 62271-4 Compliance</h3><p className="mt-2 text-xs leading-5 text-slate-600">Equipment designed for international leak detection thresholds and zero-emission gas recycling practices.</p></div></aside>
      <section className="lg:col-span-8"><div className="mb-6 flex items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-[#0b1b3d] sm:text-3xl">{active.heading}</h2><p className="mt-1 text-sm text-slate-500">{active.products.length} {active.products.length===1?"Product":"Products"}</p></div><div className="hidden rounded-lg border border-slate-200 bg-white p-1 sm:flex"><button aria-label="Grid View" onClick={()=>setListView(false)} className={`rounded-md p-2 ${!listView?"bg-[#003a79] text-white":"text-slate-500"}`}><Grid2X2 size={18}/></button><button aria-label="List View" onClick={()=>setListView(true)} className={`rounded-md p-2 ${listView?"bg-[#003a79] text-white":"text-slate-500"}`}><List size={18}/></button></div></div><div role="tabpanel" aria-label={active.label} className={listView?"grid gap-5":"grid gap-5 md:grid-cols-2"}>{active.products.map((product)=><ProductCard key={product.slug} product={product} listView={listView}/>)}</div></section>
    </main>
    <section className="mt-8 bg-[#0b1b3d] px-4 py-12 text-white sm:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Application engineering</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Need specialized advice on SF6 gas handling systems?</h2><p className="mt-3 max-w-3xl leading-7 text-slate-300">Talk to our engineers about substation compliance, customized recovery flow rates, workstation configuration or retrofit adapters.</p></div><div className="flex shrink-0 flex-wrap gap-3"><Link href="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#003a79]">Request Quote</Link><Link href="#footer-inquiry" className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white">Find Sales Support</Link></div></div></section>
  </>;
}
