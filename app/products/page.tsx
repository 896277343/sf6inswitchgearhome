// Next.js Imports
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import type { StaticImageData } from "next/image";

import leakDetectorImage from "@/public/pics/products/SF6-Leak-Detector-p.jpg";
import roomMonitorImage from "@/public/pics/products/sf6-room-monitor-p.jpg";
import gasFillingKitImage from "@/public/pics/products/SF6-Gas-Filling-kit-p.jpg";
import vacuumPumpUnitImage from "@/public/pics/products/mobile-sf6-vacuum-pump-unit-p.jpg";
import gasFillingCartImage from "@/public/pics/products/SF6-Gas-Filling-Cart-p.jpg";
import serviceCartsImage from "@/public/pics/products/SF6-Service-Carts-p.jpg";
import regenerationSystemImage from "@/public/pics/products/SF6-Regeneration-System-p.jpg";
import gasAnalyzerImage from "@/public/pics/products/SF6-Gas-Analyzer-p.jpg";
import gasFittingsImage from "@/public/pics/products/SF6-Gas-Fittings-p.jpg";

// Icons
import { ChevronRight, CheckCircle, ArrowRight, Shield, Zap, RefreshCw, BarChart3, Globe, Clock, Phone, Mail } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { siteConfig } from "@/site.config";

type ProductItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  productID: string;
  category: string;
  image: StaticImageData;
  reverse?: boolean;
};

const products: ProductItem[] = [
  {
    id: "sf6-leak-detector",
    title: "SF6 Leak Detector",
    slug: "sf6-leak-detector",
    description:
      "Infrared Principle Portable SF6 Leakage Detection, Built-in Air Pump, ppm Precision, Stability and Durability, 10 Years of Sensor Life",
    features: [
      "Infrared principle for accurate detection",
      "Built-in air pump for efficient sampling",
      "ppm precision for sensitive leaks",
      "Stable and durable design",
      "10 years of sensor life",
    ],
    productID: "SF6-LEAK-001",
    category: "SF6 Gas Detection Equipment",
    image: leakDetectorImage,
  },
  {
    id: "sf6-room-monitor",
    title: "SF6 Room Monitor",
    slug: "sf6-room-monitor",
    description:
      "7 * 24-hour full-day detection of SF6 gas leakage and detection of oxygen concentration and environmental temperature and humidity.",
    features: [
      "24/7 continuous monitoring",
      "SF6 gas leakage detection",
      "Oxygen concentration monitoring",
      "Temperature and humidity sensing",
      "Alarm system for safety",
    ],
    productID: "SF6-MONITOR-001",
    category: "SF6 Gas Monitoring Equipment",
    image: roomMonitorImage,
    reverse: true,
  },
  {
    id: "sf6-gas-filling-kit",
    title: "SF6 Gas Filling Kit",
    slug: "sf6-gas-filling-kit",
    description:
      "Comprehensive SF6 gas filling system with precise pressure control, vacuum pump, and gas recovery capabilities.",
    features: [
      "Precise pressure control system",
      "Built-in vacuum pump",
      "SF6 gas recovery capability",
      "Digital pressure and temperature display",
      "High flow rate for efficient filling",
    ],
    productID: "SF6-FILL-KIT-001",
    category: "SF6 Gas Handling Equipment",
    image: gasFillingKitImage,
  },
  {
    id: "mobile-sf6-vacuum-pump-unit",
    title: "Mobile SF6 Vacuum Pump Unit",
    slug: "mobile-sf6-vacuum-pump-unit",
    description:
      "High-performance mobile vacuum pump unit designed for SF6 gas evacuation and dehydration.",
    features: [
      "High vacuum capacity (40 m3/h)",
      "Ultimate vacuum <=10 Pa",
      "Mobile design with wheels",
      "Digital vacuum gauge",
      "Automatic temperature control",
    ],
    productID: "SF6-VAC-001",
    category: "SF6 Gas Handling Equipment",
    image: vacuumPumpUnitImage,
    reverse: true,
  },
  {
    id: "sf6-gas-filling-cart",
    title: "SF6 Gas Filling Cart",
    slug: "sf6-gas-filling-cart",
    description:
      "Mobile SF6 gas filling cart with integrated vacuum pump, gas recovery system, and precise filling capabilities.",
    features: [
      "Mobile design with sturdy wheels",
      "Integrated vacuum pump (30 m3/h)",
      "SF6 gas recovery capability",
      "Precise pressure control system",
      "Digital display for pressure and temperature",
    ],
    productID: "SF6-FILL-001",
    category: "SF6 Gas Handling Equipment",
    image: gasFillingCartImage,
  },
  {
    id: "sf6-service-carts",
    title: "SF6 Service Carts",
    slug: "sf6-service-carts",
    description:
      "Comprehensive SF6 service cart with integrated vacuum pump, gas recovery, purification, and filling capabilities.",
    features: [
      "Complete SF6 gas management solution",
      "High capacity vacuum pump (40 m3/h)",
      "SF6 gas recovery and purification",
      "Precise filling and pressure control",
      "Digital touchscreen control",
    ],
    productID: "SF6-HANDLING-001",
    category: "SF6 Gas Handling Equipment",
    image: serviceCartsImage,
    reverse: true,
  },
  {
    id: "sf6-regeneration-system",
    title: "SF6 Regeneration System",
    slug: "sf6-regeneration-system",
    description:
      "Advanced SF6 gas regeneration system for purifying and reclaiming used SF6 gas.",
    features: [
      "High purification efficiency (99.9%)",
      "Removes moisture, impurities, and decomposition products",
      "Continuous operation capability",
      "Digital monitoring and control",
      "Large processing capacity",
    ],
    productID: "SF6-REGEN-001",
    category: "SF6 Gas Regeneration Equipment",
    image: regenerationSystemImage,
  },
  {
    id: "sf6-gas-analyzer",
    title: "SF6 Gas Analyzer",
    slug: "sf6-gas-analyzer",
    description:
      "Advanced SF6 gas analyzer for comprehensive analysis of SF6 gas quality, including moisture, purity, and decomposition products.",
    features: [
      "Comprehensive SF6 gas analysis",
      "Moisture measurement (ppm)",
      "Purity analysis (volume%)",
      "Decomposition product detection",
      "Real-time data display",
    ],
    productID: "SF6-ANALYSIS-001",
    category: "SF6 Gas Analysis Equipment",
    image: gasAnalyzerImage,
    reverse: true,
  },
  {
    id: "sf6-gas-fittings",
    title: "SF6 Gas Fittings",
    slug: "sf6-gas-fittings",
    description:
      "High-quality SF6 gas fittings and accessories for safe and reliable SF6 gas handling.",
    features: [
      "High-quality stainless steel construction",
      "Leak-proof design",
      "Corrosion resistant",
      "Wide range of sizes and types",
      "Compliant with international standards",
    ],
    productID: "SF6-FITTINGS-001",
    category: "SF6 Gas Accessories",
    image: gasFittingsImage,
  },
];

export const metadata: Metadata = {
  title: `SF6 Gas Equipment Products | ${siteConfig.site_name}`,
  description: "High-quality SF6 gas equipment including leak detectors, room monitors, analyzers, filling carts, handling systems, and regeneration systems for various industrial applications.",
  keywords: ["SF6 gas equipment", "SF6 leak detector", "SF6 room monitor", "SF6 analyzer", "SF6 filling cart", "SF6 handling", "SF6 regeneration", "SF6 gas solutions"],
  alternates: {
    canonical: `${siteConfig.site_domain}/products`,
  },
  openGraph: {
    type: "website",
    title: `SF6 Gas Equipment Products | ${siteConfig.site_name}`,
    description: "High-quality SF6 gas equipment including leak detectors, room monitors, analyzers, filling carts, handling systems, and regeneration systems for various industrial applications.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Equipment Products",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `SF6 Gas Equipment Products | ${siteConfig.site_name}`,
    description: "High-quality SF6 gas equipment including leak detectors, room monitors, analyzers, filling carts, handling systems, and regeneration systems for various industrial applications.",
    images: ["/twitter-image.jpeg"],
  },
};

type ProductsPageProps = {
  searchParams?: Promise<{
    product?: string | string[];
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedProductSlug = Array.isArray(resolvedSearchParams?.product)
    ? resolvedSearchParams?.product[0]
    : resolvedSearchParams?.product;
  const selectedProduct = products.find(
    (product) => product.slug === requestedProductSlug
  );
  const inquiryMessage = selectedProduct
    ? `I'm interested in ${selectedProduct.title}. Please send me more details and a quotation.`
    : "";

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "SF6 Gas Equipment Products",
          "description": "High-quality SF6 gas equipment including leak detectors, room monitors, analyzers, filling carts, handling systems, and regeneration systems for various industrial applications.",
          "url": `${siteConfig.site_domain}/products`,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.site_domain
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": `${siteConfig.site_domain}/products`
              }
            ]
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.title,
                "description": product.description,
                "url": `${siteConfig.site_domain}/products/${product.slug}`,
                "brand": {
                  "@type": "Organization",
                  "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": product.productID,
                "category": product.category,
                "image": `${siteConfig.site_domain}${product.image.src}`
              }
            }))
          }
        })}
      </Script>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 lg:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8 text-white/80">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/80 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">SF6 Gas Equipment Products</h1>
            <p className="text-lg sm:text-xl mb-6 opacity-90">
              High-quality SF6 gas equipment solutions for industrial applications. Our products are designed to meet the highest standards of performance, reliability, and safety.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                <Link href="#send-message">
                  Request a Quote
                </Link>
              </Button>
              <Button asChild className="bg-transparent border border-white hover:bg-white/10 text-lg px-8 py-6">
                <Link href="#send-message">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
            <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 p-8 text-white shadow-xl lg:sticky lg:top-24">
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-blue-100">
                Why Choose Us
              </div>
              <h2 className="mb-4 text-3xl font-bold leading-tight">
                Why Choose Our SF6 Gas Equipment
              </h2>
              <p className="text-base leading-7 text-blue-100/90">
                Our equipment is built for utilities, service teams, and industrial operators that need dependable SF6 performance in real working conditions.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="mt-1 text-sm text-blue-100/80">Years of SF6 experience</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="mt-1 text-sm text-blue-100/80">Support for critical operations</div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8 max-w-3xl">
                <p className="text-lg leading-7 text-slate-600">
                  From leak detection and room monitoring to gas recovery and regeneration, every solution is designed to reduce downtime, improve safety, and support long-term lifecycle management.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FeatureCard 
                  icon={<Shield size={28} />}
                  title="SF6 Safety Compliance"
                  description="Engineered to support safe operation in substations and service environments with dependable monitoring and handling workflows."
                />
                <FeatureCard 
                  icon={<Zap size={28} />}
                  title="SF6 Precision Performance"
                  description="Accurate measurement, stable control, and repeatable system performance for demanding inspection and gas management tasks."
                />
                <FeatureCard 
                  icon={<RefreshCw size={28} />}
                  title="SF6 Recovery Efficiency"
                  description="Designed to minimize gas loss and help teams recover, purify, and reuse SF6 more effectively across the service cycle."
                />
                <FeatureCard 
                  icon={<Clock size={28} />}
                  title="SF6 Long-Term Reliability"
                  description="Durable construction and practical maintenance design help extend service life in heavy-duty field applications."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-14 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of SF6 gas equipment for various industrial applications
            </p>
          </div>
          
          <div className="space-y-14 lg:space-y-16">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                slug={product.slug}
                category={product.category}
                description={product.description}
                features={product.features}
                image={product.image}
                reverse={product.reverse}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your SF6 Gas Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today to learn more about our SF6 gas equipment and how we can help you optimize your operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                <Link href="#send-message">
                  Get a Free Quote
                </Link>
              </Button>
              <Button asChild className="bg-transparent border border-white hover:bg-white/10 text-lg px-8 py-6">
                <Link href="#send-message">
                  Speak with an Expert
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="send-message" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Have questions about our products? Our team of experts is ready to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-6">
                {selectedProduct
                  ? `Send us a message about ${selectedProduct.title}`
                  : "Send us a message"}
              </h3>
              <form method="POST" action="/api/inquiry" className="space-y-4">
                <input type="hidden" name="from_company" value={siteConfig.brand.legalName} />
                <input type="hidden" name="referer" value={`${siteConfig.site_domain}/products`} />
                <input type="hidden" name="success_path" value="/inquiry/success" />
                <input type="hidden" name="failure_path" value="/products#send-message" />
                {selectedProduct ? (
                  <>
                    <input
                      type="hidden"
                      name="product_name"
                      value={selectedProduct.title}
                    />
                    <input
                      type="hidden"
                      name="product_slug"
                      value={selectedProduct.slug}
                    />
                  </>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Message</label>
                  <textarea 
                    name="content"
                    id="content"
                    defaultValue={inquiryMessage}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Submit your requirement."
                    required
                  ></textarea>
                </div>
                <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white py-3">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe size={24} className="text-blue-800" />
                    <span>{siteConfig.site_domain}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={24} className="text-blue-800" />
                    <span>{siteConfig.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={24} className="text-blue-800" />
                    <span>{siteConfig.contact.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold mb-6">Why Choose {siteConfig.brand.legalName}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>25 years of experience in SF6 gas solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>High-quality products with international certifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Expert technical support and after-sales service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Competitive pricing and flexible payment options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Fast delivery and worldwide shipping</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-800">{icon}</div>
      <h3 className="mb-3 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="leading-7 text-slate-600">{description}</p>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ 
  id, 
  title, 
  slug,
  category,
  description, 
  features, 
  image, 
  reverse = false,
  priority = false,
}: { 
  id: string; 
  title: string; 
  slug: string;
  category: string;
  description: string; 
  features: string[]; 
  image: StaticImageData;
  reverse?: boolean;
  priority?: boolean;
}) => {
  return (
    <div
      id={id}
      className={`group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl lg:p-6 ${reverse ? 'flex flex-col lg:flex-row-reverse' : 'flex flex-col lg:flex-row'} gap-6 lg:gap-8 items-center`}
    >
      <div className="w-full lg:w-1/2">
        <Link
          href={`/products/${slug}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
            <Image
              src={image}
              alt={`${title} product image`}
              priority={priority}
              placeholder="blur"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent px-5 py-4 text-white">
              <span className="text-sm font-medium tracking-wide">View product</span>
              <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      </div>
      <div className="lg:w-1/2 space-y-5">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
            {category}
          </div>
          <h3 className="mb-2 text-2xl font-bold text-slate-900">
            <Link
              href={`/products/${slug}`}
              className="transition-colors hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-4 text-base leading-7 text-slate-600">{description}</p>
        </div>
        
        <ul className="space-y-2.5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild className="bg-blue-800 hover:bg-blue-700 text-white">
            <Link href={`/products/${slug}`}>
              View Product
            </Link>
          </Button>
          <Button asChild className="bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-50">
            <Link href={`/products?product=${slug}#send-message`}>
              Request Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
