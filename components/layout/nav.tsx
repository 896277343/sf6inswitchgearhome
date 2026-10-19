"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Globe2, Menu, Search, X } from "lucide-react";
import Logo from "@/public/logo.svg";
import { siteConfig } from "@/site.config";
import productData from "@/data/product-singles.json";
import type { ProductSingle } from "@/app/products/product-single-types";

const products = productData as ProductSingle[];
const categoryOrder = ["SF6 Leakage & Monitoring", "SF6 Analysis", "SF6 Recovery", "SF6 Treatment", "Kitting & Valves"];
const categories = categoryOrder.map((name) => ({
  name,
  links: products.filter((product) => product.category === name).map((product) => ({ model: product.model, label: product.name, href: `/products/${product.slug}` })),
}));

const productHref = (item: { href: string }) => item.href;

const navLinks = [["Solutions", "/projects"], ["Services", "/contact"], ["Support", "/contact"], ["Company", "/about"], ["Knowledge", "/posts"]];

export function Nav({ className = "", id }: { className?: string; children?: React.ReactNode; id?: string }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMegaOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMegaOpen(false); setMobileOpen(false); } };
    document.addEventListener("mousedown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  return (
    <header ref={headerRef} id={id} className={`relative z-50 border-b border-slate-200 bg-white ${className}`}>
      <div className="mx-auto hidden max-w-[1600px] items-center justify-end gap-6 px-6 pt-3 text-xs font-medium text-slate-600 md:flex"><Link href="/posts" className="hover:text-[#003a79]">Blog</Link><span className="flex items-center gap-1.5"><Globe2 size={15} className="text-[#003a79]" />Worldwide | EN <ChevronDown size={13}/></span></div>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 md:px-6">
        <div className="flex max-w-2xl flex-1 items-center gap-6 lg:gap-8"><Link href="/" className="flex shrink-0 items-center"><Image src={Logo} alt={`${siteConfig.site_name} logo`} width={224} height={49} priority className="h-10 w-auto sm:h-11"/></Link><form action="/products" className="relative hidden w-full max-w-lg lg:block"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input name="search" aria-label="Search products" placeholder="What are you looking for?" className="w-full rounded-full border border-slate-300 py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#003a79] focus:ring-1 focus:ring-[#003a79]"/></form></div>
        <div className="hidden items-center gap-3 md:flex"><Link href="/products" className="rounded-full border border-[#003a79] px-6 py-2 text-sm font-semibold text-[#003a79] hover:bg-slate-50">Product center</Link><Link href="/contact" className="rounded-full bg-[#003a79] px-6 py-2 text-sm font-semibold text-white hover:bg-[#002554]">Contact</Link></div>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
      <div className="mx-auto hidden max-w-[1600px] px-6 pb-3 pt-1 md:block"><nav className="flex items-center gap-7 text-sm font-semibold leading-none text-slate-950"><button onClick={() => setMegaOpen(!megaOpen)} aria-expanded={megaOpen} className={`flex h-9 items-center gap-1.5 border-b-2 px-0 font-semibold leading-none transition-colors ${megaOpen ? "border-[#003a79] text-[#003a79]" : "border-transparent hover:text-[#003a79]"}`}>Products <ChevronDown size={14} className={`shrink-0 transition-transform ${megaOpen ? "rotate-180" : ""}`}/></button>{navLinks.map(([label, href]) => <Link key={label} href={href} className="flex h-9 items-center gap-1.5 border-b-2 border-transparent font-semibold leading-none transition-colors hover:border-[#003a79] hover:text-[#003a79]">{label}<ChevronDown size={14} className="shrink-0 text-slate-400"/></Link>)}</nav></div>
      {megaOpen && <div className="absolute left-0 top-full w-full border-t border-slate-200 bg-white shadow-2xl"><div className="mx-auto flex max-h-[72vh] max-w-[1600px] gap-8 overflow-y-auto px-6 py-8"><aside className="w-80 shrink-0 border-r border-slate-200 pr-6"><h2 className="mb-5 text-xl font-bold text-[#0b1b3d]">Products</h2><div className="space-y-1">{categories.map((category, index) => <button key={category.name} onClick={() => setActive(index)} className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-sm font-semibold ${active === index ? "border-sky-400 bg-sky-50 text-[#003a79]" : "border-transparent hover:bg-slate-50"}`}>{category.name}<ChevronRight size={16}/></button>)}</div></aside><div className="flex-1"><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#00a6df]">Product category</p><h3 className="mt-1 text-2xl font-bold text-[#0b1b3d]">{categories[active].name}</h3></div><span className="text-sm text-slate-500">{categories[active].links.length} {categories[active].links.length === 1 ? "Product" : "Products"}</span></div><div className="grid grid-cols-2 gap-4">{categories[active].links.map((item) => <Link href={productHref(item)} key={`${item.model}-${item.label}`} onClick={() => setMegaOpen(false)} className="group flex min-h-24 items-center justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-[#003a79] hover:shadow-sm"><div><p className="text-xs font-bold uppercase tracking-wide text-[#00a6df]">{item.model}</p><p className="mt-1.5 font-bold leading-snug text-[#0b1b3d] group-hover:text-[#003a79]">{item.label}</p></div><ChevronRight className="ml-4 shrink-0 text-slate-400 group-hover:text-[#003a79]"/></Link>)}</div><Link href="/products" onClick={() => setMegaOpen(false)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#003a79]">View all products<ChevronRight size={16}/></Link></div></div></div>}
      {mobileOpen && <div className="max-h-[75vh] overflow-y-auto border-t bg-white p-5 md:hidden"><form action="/products" className="relative mb-4"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input name="search" placeholder="What are you looking for?" className="w-full rounded-full border py-3 pl-11 pr-4 text-sm"/></form><Link href="/products" onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-3 font-bold text-[#003a79]">All Products<ChevronRight size={17}/></Link><div className="mt-2 space-y-4">{categories.map((category)=><section key={category.name}><h3 className="px-3 text-xs font-bold uppercase tracking-[.12em] text-slate-500">{category.name}</h3><div className="mt-1">{category.links.map(item=><Link key={`${item.model}-${item.label}`} href={productHref(item)} onClick={()=>setMobileOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50"><span><strong className="mr-2 text-[#00a6df]">{item.model}</strong>{item.label}</span><ChevronRight size={15}/></Link>)}</div></section>)}</div><div className="mt-4 border-t pt-3">{navLinks.map(([label, href]) => <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold">{label}<ChevronRight size={17}/></Link>)}</div></div>}
    </header>
  );
}
