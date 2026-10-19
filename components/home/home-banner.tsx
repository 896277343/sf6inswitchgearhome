"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/pics/home/banner/sf6-gas-handling-service-banner.webp",
    alt: "SF6 gas handling services for substations and GIS equipment",
    eyebrow: "SF6SOULTION.COM",
    title: "One SF6 Solution. Every Stage.",
    description: "Complete SF6 lifecycle expertise—from leak detection and analysis to recovery, treatment, and controlled refilling.",
    align: "left" as const,
  },
  {
    image: "/pics/home/banner/onsite-sf6-gas-services-banner.webp",
    alt: "On-site SF6 gas service team working at a high-voltage substation",
    title: "On-Site SF6 Gas Services",
    description: "We bring specialized SF6 gas handling equipment directly to your site, supporting gas recovery, evacuation, and refilling for GIS and substations.",
    align: "left" as const,
  },
  {
    image: "/pics/home/banner/sf6-lifecycle-gas-services-banner.webp",
    alt: "SF6 gas handling services throughout the equipment lifecycle",
    title: "SF6 Services at Every Stage",
    description: "From gas recovery and purification to refilling and maintenance support, we provide reliable SF6 gas handling services throughout the equipment lifecycle.",
    align: "right" as const,
  },
  {
    image: "/pics/home/banner/sf6-company-industrial-park-banner.webp",
    alt: "SF6 Soultion company industrial park and headquarters",
  },
];

export function HomeBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [active]);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      aria-label="Homepage highlights"
      className="relative overflow-hidden bg-[#071a3d] text-white"
      style={{ height: "clamp(270px, 33.333vw, 580px)" }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={active !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${active === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {slide.title ? (
            <>
              <div className={`relative mx-auto flex h-full max-w-[1600px] items-center px-6 sm:px-10 lg:px-16 ${slide.align === "right" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xl rounded-xl bg-white/95 p-5 text-[#002c6c] shadow-[0_14px_50px_rgba(15,23,42,.2)] backdrop-blur-sm sm:p-7 lg:p-9">
                  {slide.eyebrow ? <p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-[#00a6df] sm:text-sm">{slide.eyebrow}</p> : null}
                  {index === 0 ? (
                    <h1 className="text-2xl font-black leading-tight tracking-[-.03em] sm:text-4xl lg:text-5xl">{slide.title}</h1>
                  ) : (
                    <h2 className="text-2xl font-black leading-tight tracking-[-.03em] sm:text-4xl lg:text-5xl">{slide.title}</h2>
                  )}
                  <p className="mt-3 text-sm leading-6 text-slate-700 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">{slide.description}</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      ))}

      <button type="button" aria-label="Previous banner" onClick={() => goTo(active - 1)} className="absolute flex items-center justify-center bg-white text-[#002c6c] transition hover:scale-110 hover:bg-sky-50" style={{ zIndex: 50, left: 16, top: "50%", width: 42, height: 42, borderRadius: "9999px", transform: "translateY(-50%)", boxShadow: "0 4px 18px rgba(15,23,42,.28)" }}><ChevronLeft size={23}/></button>
      <button type="button" aria-label="Next banner" onClick={() => goTo(active + 1)} className="absolute flex items-center justify-center bg-white text-[#002c6c] transition hover:scale-110 hover:bg-sky-50" style={{ zIndex: 50, right: 16, top: "50%", width: 42, height: 42, borderRadius: "9999px", transform: "translateY(-50%)", boxShadow: "0 4px 18px rgba(15,23,42,.28)" }}><ChevronRight size={23}/></button>

      <div className="absolute flex items-center gap-2 bg-white px-2.5 py-2" style={{ zIndex: 50, left: "50%", bottom: 16, borderRadius: "9999px", transform: "translateX(-50%)", boxShadow: "0 4px 18px rgba(15,23,42,.24)" }}>
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show banner ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => goTo(index)}
            className="rounded-full transition-all"
            style={{ width: active === index ? 28 : 10, height: 10, backgroundColor: active === index ? "#10bfe8" : "#94a3b8" }}
          />
        ))}
      </div>
    </section>
  );
}
