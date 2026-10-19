// Next.js Imports
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import productData from "@/data/product-singles.json";
import type { ProductSingle } from "@/app/products/product-single-types";

// Icons
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const productCategories = Array.from(new Set((productData as ProductSingle[]).map((product) => product.category)));

export const metadata: Metadata = {
  title: `Contact ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
  description: "Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.",
  keywords: [`contact ${siteConfig.brand.legalName}`, "SF6 gas equipment", "SF6 gas solutions", "contact form", "customer service", "SF6 gas experts"],
  alternates: {
    canonical: `${siteConfig.site_domain}/contact`,
  },
  openGraph: {
    type: "website",
    title: `Contact ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
    description: "Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: `Contact ${siteConfig.brand.legalName}`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
    description: "Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.",
    images: ["/twitter-image.jpeg"],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ message?: string }>;
}) {
  const initialMessage = (await searchParams)?.message ?? "";

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <Script id="contact-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": `Contact ${siteConfig.brand.legalName}`,
          "description": "Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.",
          "url": `${siteConfig.site_domain}/contact`,
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
                "name": "Contact Us",
                "item": `${siteConfig.site_domain}/contact`
              }
            ]
          },
          "mainEntity": {
            "@type": "Organization",
            "name": siteConfig.brand.legalName,
            "url": siteConfig.site_domain,
            "logo": siteConfig.brand.logoUrl,
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": siteConfig.contact.phone,
                "contactType": "customer service",
                "areaServed": ["Worldwide"],
                "availableLanguage": ["English", "Chinese"]
              },
              {
                "@type": "ContactPoint",
                "email": siteConfig.contact.email,
                "contactType": "customer service",
                "areaServed": ["Worldwide"],
                "availableLanguage": ["English", "Chinese"]
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteConfig.contact.address,
              "addressCountry": "China"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              }
            ]
          }
        })}
      </Script>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-8 text-white/80">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/80 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Contact Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Get in touch</h1>
            <p className="text-xl mb-8 opacity-90">
              Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-blue-800" />
                  <span>{siteConfig.contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={24} className="text-blue-800" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={24} className="text-blue-800" />
                  <span>{siteConfig.contact.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-blue-800" />
                  <span>{siteConfig.contact.hoursLong}</span>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-4">Why Choose {siteConfig.brand.legalName}</h3>
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
            <div className="lg:w-1/2">
              <div id="inquiry" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(0,44,108,.12)]">
                <div className="bg-[#003a79] px-6 py-7 text-white sm:px-8">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Direct inquiry</p>
                  <h3 className="mt-2 text-2xl font-black sm:text-3xl">Tell us what you need</h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100">Select a product category and send your requirements directly to our technical sales team.</p>
                </div>
                <form method="POST" action="/api/inquiry" className="space-y-5 p-6 sm:p-8">
                  <input type="hidden" name="from_company" value={siteConfig.brand.legalName} />
                  <input type="hidden" name="referer" value={`${siteConfig.site_domain}/contact`} />
                  <input type="hidden" name="success_path" value="/inquiry/success" />
                  <input type="hidden" name="failure_path" value="/contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Name <span className="text-red-500">*</span></label>
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name" 
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Email <span className="text-red-500">*</span></label>
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email" 
                        autoComplete="email"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="contact-company" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Company</label>
                      <input id="contact-company" type="text" name="company" autoComplete="organization" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100" placeholder="Company name"/>
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Phone / WhatsApp</label>
                      <input id="contact-phone" type="tel" name="phone" autoComplete="tel" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100" placeholder="Country code + number"/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="product-category" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Product category <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select id="product-category" name="product_category" required defaultValue="" className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm text-slate-700 outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100">
                        <option value="" disabled>Select a product category</option>
                        {productCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                        <option value="Project / Customized Solution">Project / Customized Solution</option>
                        <option value="Service & Technical Support">Service & Technical Support</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#003a79]">⌄</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-[#0b1b3d]">Message <span className="text-red-500">*</span></label>
                    <textarea 
                      id="contact-message"
                      name="content"
                      rows={6}
                      className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#00a6df] focus:ring-2 focus:ring-sky-100"
                      placeholder="Tell us the model, application, quantity, delivery country, or technical requirements."
                      defaultValue={initialMessage}
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="h-12 w-full rounded-full bg-[#003a79] text-sm font-bold text-white hover:bg-[#002554]">
                    Send Inquiry →
                  </Button>
                  <p className="text-center text-xs leading-5 text-slate-500">Your inquiry will be sent securely to our sales inquiry system.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss your SF6 gas solution needs and get a free consultation from our experts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-800 hover:bg-blue-700 text-white text-lg px-8 py-6">
                Request a Quote
              </Button>
              <Button className="bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
