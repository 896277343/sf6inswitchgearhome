// Next.js Imports
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

// Icons
import { ChevronRight, CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: `About ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
  description: "With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions. Learn more about our company, mission, and values.",
  keywords: [`about ${siteConfig.brand.legalName}`, "SF6 gas manufacturer", "SF6 gas experts", "company mission", "company values", "SF6 gas solutions"],
  alternates: {
    canonical: `${siteConfig.site_domain}/about`,
  },
  openGraph: {
    type: "website",
    title: `About ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
    description: "With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions. Learn more about our company, mission, and values.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: `About ${siteConfig.brand.legalName}`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.brand.legalName} | SF6 Gas Equipment Manufacturer`,
    description: "With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions. Learn more about our company, mission, and values.",
    images: ["/twitter-image.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <Script id="about-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": `About ${siteConfig.brand.legalName}`,
          "description": "With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions.",
          "url": `${siteConfig.site_domain}/about`,
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
                "name": "About Us",
                "item": `${siteConfig.site_domain}/about`
              }
            ]
          },
          "mainEntity": {
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
            "foundingDate": "1999",
            "foundingLocation": "China",
            "numberOfEmployees": "500+",
            "missionStatement": "To provide high-quality SF6 gas equipment and solutions that help our customers operate safely, efficiently, and sustainably. We are dedicated to reducing the environmental impact of SF6 gas through advanced recycling and regeneration technologies.",
            "values": [
              {
                "name": "Quality",
                "description": "We deliver products that meet the highest industry standards."
              },
              {
                "name": "Innovation",
                "description": "We continuously develop new technologies to improve SF6 gas management."
              },
              {
                "name": "Sustainability",
                "description": "We are committed to reducing the environmental impact of SF6 gas."
              },
              {
                "name": "Customer Service",
                "description": "We provide exceptional support to our customers worldwide."
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
                <BreadcrumbPage className="text-white">About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About {siteConfig.brand.legalName}</h1>
            <p className="text-xl mb-8 opacity-90">
              With 25 years of experience in SF6 gas equipment manufacturing, we are experts in sulfur hexafluoride gas solutions
            </p>
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
              <h3 className="text-3xl font-bold text-blue-800 mb-2">25</h3>
              <p className="text-gray-600">Years of experience</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <h3 className="text-3xl font-bold text-blue-800 mb-2">99.7+%</h3>
              <p className="text-gray-600">Recycling rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Contact us for all your SF6 gas solution needs. Our experts are ready to help you find the right equipment and services for your specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
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
            <div>
              <Button className="w-full bg-white text-blue-800 hover:bg-blue-50 text-lg py-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
