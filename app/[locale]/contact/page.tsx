
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
// Next.js Imports
import Link from "@/components/i18n/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

// Icons
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const baseMetadata: Metadata = {
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/contact");
}

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
                <BreadcrumbLink href="/" className="text-white/80 hover:text-white"><T id="3a78695388b38b5c" /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white"><T id="98b67063cf8e584d" /></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6"><T id="115e410f01dc4013" /></h1>
            <p className="text-xl mb-8 opacity-90">
              <T id="9763c671b2cfc269" />
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6"><T id="7c01aec3b1d2f2fd" /></h2>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-blue-800" />
                  <span>{<TV>{siteConfig.contact.address}</TV>}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={24} className="text-blue-800" />
                  <span>{<TV>{siteConfig.contact.phone}</TV>}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={24} className="text-blue-800" />
                  <span>{<TV>{siteConfig.contact.email}</TV>}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-blue-800" />
                  <span>{<TV>{siteConfig.contact.hoursLong}</TV>}</span>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-4"><T id="bd224236c9c7bd31" /> {<TV>{siteConfig.brand.legalName}</TV>}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span><T id="d1164a4f9ab67047" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span><T id="1aca0a59620f0a99" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span><T id="0583dfa4a7980edd" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span><T id="61519155322be9a9" /></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span><T id="6df3fd0e921d2d59" /></span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6"><T id="db12dec8c345eb45" /></h3>
                <form method="POST" action="/api/inquiry" className="space-y-4">
                  <input type="hidden" name="from_company" value={siteConfig.brand.legalName} />
                  <input type="hidden" name="referer" value={`${siteConfig.site_domain}/contact`} />
                  <input type="hidden" name="success_path" value="/inquiry/success" />
                  <input type="hidden" name="failure_path" value="/contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium"><T id="dcd1d5223f73b3a9" /></label>
                      <input 
                        type="text" 
                        name="name" 
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium"><T id="969ccbd3cf6300ec" /></label>
                      <input 
                        type="email" 
                        name="email" 
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-medium"><T id="2f77668a9dfbf8d5" /></label>
                    <textarea 
                      name="content"
                      className="w-full px-4 py-2 border rounded-lg h-32"
                      placeholder="Your message"
                      defaultValue={initialMessage}
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white">
                    <T id="0fe0571facd9435c" />
                  </Button>
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
            <h2 className="text-3xl font-bold mb-6"><T id="9d1eae45a02e0d06" /></h2>
            <p className="text-xl mb-8">
              <T id="a868b54ad7e64da0" />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-blue-800 hover:bg-blue-700 text-white text-lg px-8 py-6">
                <T id="27a97907f0f3f594" />
              </Button>
              <Button className="bg-transparent border border-blue-800 text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                <T id="5b1486685be3baa4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
