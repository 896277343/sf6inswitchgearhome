// Next.js Imports
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { siteConfig } from "@/site.config";
import leakDetectorImage from "@/public/pics/products/SF6-Leak-Detector-p.jpg";
import roomMonitorImage from "@/public/pics/products/sf6-room-monitor-p.jpg";
import gasAnalyzerImage from "@/public/pics/products/SF6-Gas-Analyzer-p.jpg";
import gasFillingCartImage from "@/public/pics/products/SF6-Gas-Filling-Cart-p.jpg";
import serviceCartsImage from "@/public/pics/products/SF6-Service-Carts-p.jpg";
import regenerationSystemImage from "@/public/pics/products/SF6-Regeneration-System-p.jpg";

// Icons
import { ChevronRight, MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

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
          "@type": "Organization",
          "name": siteConfig.brand.legalName,
          "url": siteConfig.site_domain,
          "logo": siteConfig.brand.logoUrl,
          "description": "SF6 Gas Solution - Full Lifecycle of SF6 Gas Solution",
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
          "sameAs": [
            ...siteConfig.brand.socialLinks
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "SF6 Gas Equipment",
            "itemListElement": [
              {
                "@type": "Product",
                "name": "SF6 Leak Detector",
                "description": "Portable infrared SF6 leak detector with ppm precision and a built-in air pump for reliable field inspection.",
                "url": `${siteConfig.site_domain}/products/sf6-leak-detector`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-LEAK-001",
                "category": "SF6 Gas Detection Equipment"
              },
              {
                "@type": "Product",
                "name": "SF6 Room Monitor",
                "description": "Continuous SF6 room monitoring with oxygen, temperature, and humidity detection for safer equipment rooms.",
                "url": `${siteConfig.site_domain}/products/sf6-room-monitor`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-MONITOR-001",
                "category": "SF6 Gas Monitoring Equipment"
              },
              {
                "@type": "Product",
                "name": "SF6 Gas Analyzer",
                "description": "Advanced analyzer for SF6 purity, moisture, and decomposition product testing.",
                "url": `${siteConfig.site_domain}/products/sf6-gas-analyzer`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-ANALYSIS-001",
                "category": "SF6 Gas Analysis Equipment"
              },
              {
                "@type": "Product",
                "name": "SF6 Gas Filling Cart",
                "description": "Integrated SF6 filling and recovery cart for evacuation, charging, and maintenance service work.",
                "url": `${siteConfig.site_domain}/products/sf6-gas-filling-cart`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-FILL-001",
                "category": "SF6 Gas Handling Equipment"
              },
              {
                "@type": "Product",
                "name": "SF6 Service Carts",
                "description": "Comprehensive SF6 service carts for recovery, purification, vacuuming, and refilling.",
                "url": `${siteConfig.site_domain}/products/sf6-service-carts`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-HANDLING-001",
                "category": "SF6 Gas Handling Equipment"
              },
              {
                "@type": "Product",
                "name": "SF6 Regeneration System",
                "description": "SF6 regeneration equipment that reclaims and purifies used gas to meet reuse requirements.",
                "url": `${siteConfig.site_domain}/products/sf6-regeneration-system`,
                "brand": {
                  "@type": "Organization",
                    "name": siteConfig.brand.legalName
                },
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "productID": "SF6-REGEN-001",
                "category": "SF6 Gas Regeneration Equipment"
              }
            ]
          }
        })}
      </Script>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                SF6 Gas Equipment Manufacturer
              </h1>
              <p className="text-xl mb-8">
                With 25 years of experience in sulfur hexafluoride gas solutions
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-blue-800 hover:bg-blue-50">
                  <Link href="/contact">Get in touch</Link>
                </Button>
                <Button className="bg-transparent border border-white hover:bg-white/10">
                  <Link href="/about">Learn more</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Full Lifecycle of SF6 Gas Solution</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Sensor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Regeneration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Gas Analyzer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Gas Detector</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Gas Handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>SF6 Gas Management</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-2">300,000+</h3>
              <p className="text-gray-600">Square meters industrial park</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-2">500+</h3>
              <p className="text-gray-600">Employees</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-2">4 tons</h3>
              <p className="text-gray-600">Reuse of SF6 gas per year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-2">99.7+%</h3>
              <p className="text-gray-600">Recycling rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Comprehensive SF6 gas equipment solutions for various applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Successful SF6 gas solutions for various industries and applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="SF6 Gas handling for Underground Substation"
              description="SF6 gas is increasingly used in confined Spaces. Underground substations use a lot of high-voltage equipment. SF6 Gas safety solutions."
              image="/pics/projects/underground-substation-h.jpg"
            />
            <ProjectCard 
              title="SF6 use for Gas Insulated Switchgear Manufacturers"
              description="A large amount of SF6 gas is needed to test the equipment during the R&D and manufacturing process. We provide solutions for reusing SF6 gas for experiments."
              image="/pics/projects/gis-manufacturers-h.jpg"
            />
            <ProjectCard 
              title="Ultra-high voltage SF6 Handling equipment"
              description="We have rich experience in field service 750KV and 1000KV substation working experience, including Gas Insulated Lines."
              image="/pics/projects/ultra-high-voltage-h.jpg"
            />
            <ProjectCard 
              title="SF6 Gas Handling and Regeneration base"
              description="SF6 handling base has a large recycling & regeneration & vacuum equipment. Efficient regeneration of SF6 and Achieving whole-life system management of SF6 gas."
              image="/pics/projects/regeneration-base-h.jpg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions. Our commitment to quality and innovation has made us a trusted partner for businesses worldwide.
            </p>
          </div>
          {/* Factory Gallery Carousel */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Factory Strength</h3>
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-scroll">
                {[1, 2, 3, 4, 1, 2, 3, 4].map((num, index) => (
                  <div key={index} className="flex-shrink-0 w-72 h-48 bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`/pics/company/company-${num}-h.jpg`}
                      alt={`Factory ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To provide high-quality SF6 gas equipment and solutions that help our customers operate safely, efficiently, and sustainably. We are dedicated to reducing the environmental impact of SF6 gas through advanced recycling and regeneration technologies.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-blue-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Quality</h4>
                  <p className="text-gray-600">We deliver products that meet the highest industry standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-blue-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Innovation</h4>
                  <p className="text-gray-600">We continuously develop new technologies to improve SF6 gas management.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-blue-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Sustainability</h4>
                  <p className="text-gray-600">We are committed to reducing the environmental impact of SF6 gas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={24} className="text-blue-800 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Customer Service</h4>
                  <p className="text-gray-600">We provide exceptional support to our customers worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Partners Carousel */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Our Partners</h3>
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-scroll">
                {[1, 2, 3, 4, 1, 2, 3, 4].map((num, index) => (
                  <div key={index} className="flex-shrink-0 w-72 h-48 bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`/pics/partners/partner-${num}-h.jpg`}
                      alt={`Partner ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
              <p className="mb-8">
                Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={24} />
                  <span>{siteConfig.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={24} />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={24} />
                  <span>{siteConfig.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={24} />
                  <span>{siteConfig.contact.hoursLong}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-lg text-gray-800">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 border rounded-lg h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-800 hover:bg-blue-700 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
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
