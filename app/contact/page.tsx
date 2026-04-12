// Next.js Imports
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

// Icons
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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

export default function ContactPage() {
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
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form method="POST" action="/api/inquiry" className="space-y-4">
                  <input type="hidden" name="from_company" value={siteConfig.brand.legalName} />
                  <input type="hidden" name="referer" value={`${siteConfig.site_domain}/contact`} />
                  <input type="hidden" name="success_path" value="/inquiry/success" />
                  <input type="hidden" name="failure_path" value="/contact" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">Email</label>
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
                    <label className="block mb-2 font-medium">Message</label>
                    <textarea 
                      name="content"
                      className="w-full px-4 py-2 border rounded-lg h-32"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white">
                    Send Message
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
