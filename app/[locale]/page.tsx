
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
// Next.js Imports
import Image from "next/image";
import Link from "@/components/i18n/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { siteConfig } from "@/site.config";
import leakDetectorImage from "@/public/pics/products/SF6-Leak-Detector-p.webp";
import roomMonitorImage from "@/public/pics/products/sf6-room-monitor-p.webp";
import gasAnalyzerImage from "@/public/pics/products/SF6-Gas-Analyzer-p.webp";
import gasFillingCartImage from "@/public/pics/products/SF6-Gas-Filling-Cart-p.webp";
import serviceCartsImage from "@/public/pics/products/SF6-Service-Carts-p.webp";
import regenerationSystemImage from "@/public/pics/products/SF6-Regeneration-System-p.webp";

// Icons
import { ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react";

export const revalidate = 0;

type ProductHighlight = {
  title: string;
  description: string;
  href: string;
  image: StaticImageData;
  category: string;
};

const featuredProducts: ProductHighlight[] = [
  {
    title: "SF6 Leak Detector",
    description:
      "Portable infrared leak detection with ppm precision, a built-in air pump, and long-life sensor performance for daily field inspection.",
    href: "/products/sf6-leak-detector",
    image: leakDetectorImage,
    category: "SF6 Leak Detection",
  },
  {
    title: "SF6 Room Monitor",
    description:
      "24/7 online monitoring for SF6 leakage, oxygen concentration, temperature, and humidity in high-voltage equipment rooms.",
    href: "/products/sf6-room-monitor",
    image: roomMonitorImage,
    category: "SF6 Safety Monitoring",
  },
  {
    title: "SF6 Gas Analyzer",
    description:
      "Comprehensive gas analysis for purity, moisture, and decomposition products to support maintenance and compliance checks.",
    href: "/products/sf6-gas-analyzer",
    image: gasAnalyzerImage,
    category: "SF6 Gas Analysis",
  },
  {
    title: "SF6 Gas Filling Cart",
    description:
      "Integrated filling and recovery system with vacuum support for efficient gas charging and servicing in the field.",
    href: "/products/sf6-gas-filling-cart",
    image: gasFillingCartImage,
    category: "SF6 Gas Filling",
  },
  {
    title: "SF6 Service Carts",
    description:
      "All-in-one service carts for recovery, purification, vacuuming, and refilling across demanding substation workflows.",
    href: "/products/sf6-service-carts",
    image: serviceCartsImage,
    category: "SF6 Gas Handling",
  },
  {
    title: "SF6 Regeneration System",
    description:
      "High-efficiency regeneration equipment designed to reclaim used SF6 gas and restore it to reusable condition.",
    href: "/products/sf6-regeneration-system",
    image: regenerationSystemImage,
    category: "SF6 Regeneration",
  },
];

const homepageProducts = featuredProducts;

const homepageProjects = [
  {
    title: "SF6 Gas handling for Underground Substation",
    description:
      "Safety monitoring and gas handling for confined underground substations with high-voltage equipment.",
    image: "/pics/projects/underground-substation-h.webp",
    href: "/projects/sf6-gas-handling-for-underground-substation",
  },
  {
    title: "SF6 use for Gas Insulated Switchgear Manufacturers",
    description:
      "Reuse and handling solutions for SF6-intensive testing and manufacturing workflows.",
    image: "/pics/projects/gis-manufacturers-h.webp",
    href: "/projects/sf6-use-for-gas-insulated-switchgear-manufacturers",
  },
];

const homepageResources = [
  {
    title: "SF6 Calculator for recovery and vacuum workflows",
    description:
      "Use the SF6 calculator to estimate recovery time, pump-down time, density, leak rate, and gas handling conversions.",
    href: "/sf6-calculator",
  },
  {
    title: "Browse SF6 gas equipment categories",
    description:
      "Explore leak detectors, room monitors, analyzers, filling carts, service carts, fittings, and regeneration systems.",
    href: "/products",
  },
  {
    title: "Review SF6 project references",
    description:
      "See underground substation, GIS manufacturer, and ultra-high-voltage project examples with linked equipment pages.",
    href: "/projects",
  },
  {
    title: "Learn about our SF6 manufacturing capability",
    description:
      "Read about our factory background, lifecycle experience, and support approach for utilities and switchgear teams.",
    href: "/about",
  },
];

const baseMetadata: Metadata = {
  title: `SF6 Gas Equipment Manufacturer in China | ${siteConfig.site_name}`,
  description: "SF6 gas equipment manufacturer for leak detectors, room monitors, gas analyzers, filling carts, service carts, and regeneration systems for substations and switchgear projects.",
  keywords: ["SF6 gas equipment", "SF6 gas manufacturer", "SF6 gas solutions", "SF6 leak detector", "SF6 room monitor", "SF6 analysis", "SF6 filling cart", "SF6 handling", "SF6 regeneration"],
  alternates: {
    canonical: siteConfig.site_domain,
  },
  openGraph: {
    type: "website",
    title: `SF6 Gas Equipment Manufacturer in China | ${siteConfig.site_name}`,
    description: "SF6 gas equipment manufacturer for leak detectors, room monitors, gas analyzers, filling carts, service carts, and regeneration systems.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Equipment Manufacturer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `SF6 Gas Equipment Manufacturer in China | ${siteConfig.site_name}`,
    description: "SF6 gas equipment manufacturer for detection, monitoring, handling, and regeneration systems.",
    images: ["/twitter-image.jpeg"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/");
}

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": siteConfig.brand.legalName,
              "url": siteConfig.site_domain,
              "logo": siteConfig.brand.logoUrl,
              "description": siteConfig.site_description,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.contact.address,
                "addressCountry": "China"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": siteConfig.contact.phone,
                  "contactType": "customer service"
                },
                {
                  "@type": "ContactPoint",
                  "email": siteConfig.contact.email,
                  "contactType": "customer service"
                }
              ],
              "sameAs": siteConfig.brand.socialLinks
            },
            {
              "@type": "WebSite",
              "name": siteConfig.site_name,
              "url": siteConfig.site_domain
            }
          ]
        })}
      </Script>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-14 text-white sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="mb-4 text-3xl font-bold text-balance sm:mb-6 sm:text-5xl">
                <T id="ed7ca73610183be4" />
              </h1>
              <p className="mb-6 max-w-2xl text-base leading-7 text-blue-50 sm:mb-8 sm:text-xl">
                <T id="b28119966218ac4f" />
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button asChild size="lg" className="w-full bg-white text-blue-800 hover:bg-blue-50 sm:w-auto">
                  <Link href="/contact"><T id="115e410f01dc4013" /></Link>
                </Button>
                <Button asChild size="lg" className="w-full border border-white bg-transparent hover:bg-white/10 sm:w-auto">
                  <Link href="/about"><T id="01f6f073d67562f7" /></Link>
                </Button>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-blue-50 sm:hidden">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span><T id="f6a366e2a81b6554" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span><T id="fe6415ff8ca43593" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span><T id="2324b47d4b901067" /></span>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <div className="rounded-lg bg-white/10 p-5 shadow-sm sm:p-6">
                <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl"><T id="b460ddc2aaf2163d" /></h2>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="438928e376208e49" /></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="27adf423104a85e3" /></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="bf19ad5ed7c00902" /></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="4d15dc29d84b9dc2" /></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="f4418b4ff2c42835" /></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span><T id="b7061c7734482b39" /></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="defer-section bg-gray-50 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only"><T id="4d6ce3ef89a876dd" /></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">300,000+</p>
              <p className="text-gray-600"><T id="8a31ff3f0055b5b5" /></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">500+</p>
              <p className="text-gray-600"><T id="c98270317b51cbb3" /></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800"><T id="8ad806721d83cd4f" /></p>
              <p className="text-gray-600"><T id="4c1516d7491bce63" /></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">99.7+%</p>
              <p className="text-gray-600"><T id="5361429582efeca9" /></p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="defer-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4"><T id="cfbc30ff73a20e3e" /></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <T id="cd74c863aeed8a1b" />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homepageProducts.map((product) => (
              <ProductCard
                key={product.href}
                title={product.title}
                description={product.description}
                image={product.image}
                href={product.href}
                category={product.category}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="outline" className="min-w-44">
              <Link href="/products">
                <T id="55990a2b19936456" />
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="defer-section bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4"><T id="1fc3c80c069ce1fb" /></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <T id="55a7d338d18d1e3c" />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {homepageProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="outline" className="min-w-44">
              <Link href="/projects">
                <T id="bb574dbf6769c59a" />
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="defer-section border-y bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4"><T id="54a35f3fbd50f3fc" /></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <T id="2c86568252b20e04" />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {homepageResources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <h3 className="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-800">
                  {<TV>{resource.title}</TV>}
                </h3>
                <p className="mb-4 text-sm leading-6 text-slate-600">{<TV>{resource.description}</TV>}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <T id="a91b18cba496ed30" /> <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="defer-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4"><T id="5d8c71abc527284c" /></h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              <T id="25291e4af6b6cb7f" />
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold"><T id="45610fa4d5d0397a" /></h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  <T id="6edc74515fb1059b" />
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold"><T id="a19ac21bd5382843" /></h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  <T id="afa42083458f3239" />
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold"><T id="49252934c11d1f7a" /></h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  <T id="5a7df5f852505d78" />
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold"><T id="3d21775cd60083e9" /></h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  <T id="5df7bcd7e89486a6" />
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="outline" className="min-w-44">
                <Link href="/about">
                  <T id="eea0b291b6e4ddfe" />
                  <ChevronRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="defer-section bg-blue-800 py-16 text-white sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white/10 p-6 shadow-sm sm:p-8">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold"><T id="115e410f01dc4013" /></h2>
              <p className="mx-auto mb-8 max-w-2xl text-blue-50">
                <T id="a164bf5dc05a78da" />
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>{<TV>{siteConfig.contact.phone}</TV>}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <span>{<TV>{siteConfig.contact.email}</TV>}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>{<TV>{siteConfig.contact.address}</TV>}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <Clock size={20} />
                  <span>{<TV>{siteConfig.contact.hoursLong}</TV>}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                <Link href="/contact"><T id="2c3d7cf958aa8a6b" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/products"><T id="0f96c11707fec7be" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Product Card Component
const ProductCard = ({
  title,
  description,
  image,
  href,
  category,
}: {
  title: string;
  description: string;
  image: StaticImageData;
  href: string;
  category: string;
}) => {
  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
        {<TV>{category}</TV>}
      </div>
      <div className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden mb-5">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-800">
        {<TV>{title}</TV>}
      </h3>
      <p className="mb-5 text-sm leading-6 text-slate-600">{<TV>{description}</TV>}</p>
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
        <T id="3b73900b8d29f963" /> {<TV>{title}</TV>} <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

// Project Card Component
const ProjectCard = ({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image?: string;
  href: string;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {image && (
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3 text-blue-800">{<TV>{title}</TV>}</h3>
      <p className="text-gray-600 mb-4">{<TV>{description}</TV>}</p>
      <Link href={href} className="text-blue-800 font-medium flex items-center gap-2">
        <T id="6c8de69884635a78" /> <ChevronRight size={16} />
      </Link>
    </div>
  );
};
