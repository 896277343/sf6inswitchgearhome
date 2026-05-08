'use client';

import { siteConfig } from "@/site.config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText,
  ArrowRight,
  Shield,
  Zap,
  Award,
  Clock,
  Wifi,
  Bell,
  Monitor,
  Video,
  MapPin,
  Calendar,
  Users
} from "lucide-react";

// Project data
const project = {
  name: "SF6 Gas handling for Underground Substation",
  description: "Comprehensive SF6 gas handling solutions for underground substations, including gas monitoring, leakage detection, and safety systems to ensure optimal performance and personnel safety.",
  shortDescription: "Complete SF6 gas handling solutions for underground substations with advanced monitoring and safety systems.",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // 示例视频链接
  images: [
    { src: "/pics/products/sf6-room-monitor-1.webp", alt: "Underground Substation SF6 Monitoring" },
    { src: "/pics/products/sf6-room-monitor-2.webp", alt: "SF6 Gas Handling Equipment" },
    { src: "/pics/products/SF6-Leak-Detector-1.webp", alt: "SF6 Leak Detection System" },
  ],
  features: [
    "24/7 SF6 gas monitoring",
    "Advanced leakage detection",
    "Oxygen level monitoring",
    "Real-time alert system",
    "Remote monitoring capabilities",
    "Compliance with safety standards",
    "Energy-efficient design",
    "Easy integration with existing systems"
  ],
  specifications: [
    { label: "Monitoring Range", value: "0-1000 ppm SF6" },
    { label: "Oxygen Monitoring", value: "0-30% VOL" },
    { label: "Alert Threshold", value: "100 ppm SF6" },
    { label: "Communication", value: "WiFi, Ethernet, RS485" },
    { label: "Power Supply", value: "AC 110-240V or DC 24V" },
    { label: "Backup Battery", value: "8 hours continuous" },
    { label: "Installation", value: "Wall-mounted or panel" },
    { label: "Protection Class", value: "IP65" },
  ],
  applications: [
    "Urban underground substations",
    "Tunnel-based power facilities",
    "Metro and railway substations",
    "Underground industrial complexes",
    "Deep mining operations",
    "Underwater power stations"
  ],
  projectDetails: {
    location: "Urban Area, China",
    completionDate: "2024-06-15",
    client: "City Power Grid Corporation",
    scope: "Complete SF6 gas handling system installation and maintenance",
    value: "$1.2 Million",
    duration: "3 months"
  },
  relatedProjects: [
    { name: "SF6 use for Gas Insulated Switchgear Manufacturers", slug: "sf6-use-for-gas-insulated-switchgear-manufacturers" },
    { name: "Ultra-high voltage SF6 Handling equipment", slug: "ultra-high-voltage-sf6-handling-equipment" },
    { name: "SF6 Gas Handling and Regeneration base", slug: "sf6-gas-handling-and-regeneration-base" },
  ]
};

export default function ProjectContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <Script id="project-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Project",
          "name": project.name,
          "image": project.images.map(img => `${siteConfig.site_domain}${img.src}`),
          "description": project.description,
          "url": `${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`,
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
                "name": "Projects",
                "item": `${siteConfig.site_domain}/projects`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": project.name,
                "item": `${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`
              }
            ]
          }
        })}
      </Script>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section - Project Overview */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {project.images.slice(0, 2).map((img, index) => (
                  <div key={index} className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-opacity hover:opacity-80">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {project.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-500">Location</span>
                      <p className="font-semibold">{project.projectDetails.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-500">Completion Date</span>
                      <p className="font-semibold">{project.projectDetails.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-500">Client</span>
                      <p className="font-semibold">{project.projectDetails.client}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-500">Scope</span>
                      <p className="font-semibold">{project.projectDetails.scope}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <a href="#inquiry">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Get Project Details
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1"
                  asChild
                >
                  <a href="#contact">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Introduction Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Video className="w-6 h-6" />
              Project Introduction Video
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Watch our video to learn more about the SF6 gas handling solutions for underground substations
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-video">
              <iframe 
                src={project.videoUrl} 
                title="SF6 Gas handling for Underground Substation"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Project Description
                  </h2>
                  <div className="prose max-w-none text-gray-600 space-y-4">
                    <p>
                      The {project.name} project provides comprehensive SF6 gas handling solutions for underground substations. 
                      As urban areas continue to expand, underground substations are becoming increasingly important for 
                      efficient power distribution in limited space.
                    </p>
                    <p>
                      This project focuses on the safe and efficient management of SF6 gas in confined underground spaces, 
                      where proper monitoring and safety measures are critical. Our solution includes advanced gas detection, 
                      monitoring systems, and safety protocols to ensure optimal performance and protect personnel.
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mt-6">Key Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    Technical Specifications
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {project.specifications.map((spec, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="py-3 px-4 font-medium text-gray-900 w-1/3">
                              {spec.label}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Applications */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Applications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.applications.map((app, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{app}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Inquiry Form */}
            <div className="space-y-6">
              <Card id="inquiry" className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Get Project Details
                  </h3>
                  <form 
                    method="POST" 
                    action="//inquiry.sf6sf6.com/updata_ppc.php"
                    className="space-y-4"
                    suppressHydrationWarning
                  >
                    <input type="hidden" name="from_company" value={siteConfig.brand.legalName} />
                    <input type="hidden" name="referer" value={`${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`} />
                    <input type="hidden" name="product_name" value={project.name} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="content"
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your message"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                  </form>

                  {/* Contact Info */}
                  <div id="contact" className="mt-6 pt-6 border-t space-y-3">
                    <h4 className="font-semibold text-gray-900">Contact Information</h4>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span>{siteConfig.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-blue-500" />
                      <span>{siteConfig.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span>{siteConfig.contact.hoursShort}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.relatedProjects.map((related, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">
                    {related.name}
                  </h3>
                  <div className="flex items-center text-blue-600 text-sm">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Technical Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
