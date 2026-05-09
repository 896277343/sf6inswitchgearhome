// Next.js Imports
import Image from "next/image";
import Link from "next/link";
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

const homepageProducts = featuredProducts.slice(0, 3);

const homepageProjects = [
  {
    title: "SF6 Gas handling for Underground Substation",
    description:
      "Safety monitoring and gas handling for confined underground substations with high-voltage equipment.",
    image: "/pics/projects/underground-substation-h.webp",
  },
  {
    title: "SF6 use for Gas Insulated Switchgear Manufacturers",
    description:
      "Reuse and handling solutions for SF6-intensive testing and manufacturing workflows.",
    image: "/pics/projects/gis-manufacturers-h.webp",
  },
];

export const metadata: Metadata = {
  title: `SF6 Gas Equipment Manufacturer | ${siteConfig.site_name}`,
  description: "With 25 years of experience in sulfur hexafluoride gas solutions, we provide high-quality SF6 gas equipment and comprehensive lifecycle management.",
  keywords: ["SF6 gas equipment", "SF6 gas manufacturer", "SF6 gas solutions", "SF6 leak detector", "SF6 room monitor", "SF6 analysis", "SF6 filling cart", "SF6 handling", "SF6 regeneration"],
  alternates: {
    canonical: siteConfig.site_domain,
  },
  openGraph: {
    type: "website",
    title: `SF6 Gas Equipment Manufacturer | ${siteConfig.site_name}`,
    description: "With 25 years of experience in sulfur hexafluoride gas solutions, we provide high-quality SF6 gas equipment and comprehensive lifecycle management.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Equipment Manufacturer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `SF6 Gas Equipment Manufacturer | ${siteConfig.site_name}`,
    description: "With 25 years of experience in sulfur hexafluoride gas solutions, we provide high-quality SF6 gas equipment and comprehensive lifecycle management.",
    images: ["/twitter-image.jpeg"],
  },
};

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
                SF6 Gas Equipment Manufacturer
              </h1>
              <p className="mb-6 max-w-2xl text-base leading-7 text-blue-50 sm:mb-8 sm:text-xl">
                With 25 years of experience in sulfur hexafluoride gas solutions
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button asChild size="lg" className="w-full bg-white text-blue-800 hover:bg-blue-50 sm:w-auto">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button asChild size="lg" className="w-full border border-white bg-transparent hover:bg-white/10 sm:w-auto">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-blue-50 sm:hidden">
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span>Leak detection and room monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span>Recovery, purification, and refilling systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true" className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-white/80" />
                  <span>25 years of SF6 lifecycle experience</span>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <div className="rounded-lg bg-white/10 p-5 shadow-sm sm:p-6">
                <h2 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">Full Lifecycle of SF6 Gas Solution</h2>
                <ul className="space-y-2.5 sm:space-y-3">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Sensor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Regeneration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Gas Analyzer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Gas Detector</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Gas Handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/85" />
                    <span>SF6 Gas Management</span>
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
          <h2 className="sr-only">Company highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">300,000+</p>
              <p className="text-gray-600">Square meters industrial park</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">500+</p>
              <p className="text-gray-600">Employees</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">4 tons</p>
              <p className="text-gray-600">Reuse of SF6 gas per year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="mb-2 text-3xl font-bold text-blue-800">99.7+%</p>
              <p className="text-gray-600">Recycling rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="defer-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive SF6 gas equipment solutions for various applications
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
                View all products
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
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Successful SF6 gas solutions for various industries and applications
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {homepageProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                image={project.image}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" variant="outline" className="min-w-44">
              <Link href="/projects">
                View all projects
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="defer-section py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions. Our commitment to quality and innovation has made us a trusted partner for businesses worldwide.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">Manufacturing Focus</h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  Dedicated to SF6 leak detection, monitoring, handling, purification, and lifecycle support for power-industry applications.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">Global Service</h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  Supporting utilities, OEMs, and engineering teams with equipment selection, delivery, and technical coordination.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">Quality Assurance</h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  Built around reliable performance, stable supply, and practical solutions for demanding substation workflows.
                </p>
              </div>
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">Sustainability</h3>
                <p className="text-sm leading-6 text-gray-600 sm:text-base">
                  Focused on safer SF6 management and more efficient recovery and reuse across the gas lifecycle.
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" variant="outline" className="min-w-44">
                <Link href="/about">
                  Learn more about us
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
              <h2 className="mb-4 text-3xl font-bold">Get in touch</h2>
              <p className="mx-auto mb-8 max-w-2xl text-blue-50">
                Contact us for SF6 leak detection, monitoring, recovery, purification, and gas handling solutions.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <Phone size={20} />
                  <span>{siteConfig.contact.phone}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4">
                <div className="flex items-center gap-3">
                  <Mail size={20} />
                  <span>{siteConfig.contact.email}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <MapPin size={20} />
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/8 p-4 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <Clock size={20} />
                  <span>{siteConfig.contact.hoursLong}</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                <Link href="/contact">Open contact page</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/products">Browse products</Link>
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
        {category}
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
        {title}
      </h3>
      <p className="mb-5 text-sm leading-6 text-slate-600">{description}</p>
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
        View product <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, image }: { title: string; description: string; image?: string }) => {
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
      <h3 className="text-xl font-semibold mb-3 text-blue-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href="/projects" className="text-blue-800 font-medium flex items-center gap-2">
        View details <ChevronRight size={16} />
      </Link>
    </div>
  );
};
