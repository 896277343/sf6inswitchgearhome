// Next.js Imports
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

// Icons
import { ChevronRight, CheckCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: `SF6 Gas Projects | ${siteConfig.site_name}`,
  description: "Successful SF6 gas solutions for various industries and applications, including underground substations, gas insulated switchgear manufacturers, and ultra-high voltage projects.",
  keywords: ["SF6 gas projects", "SF6 gas solutions", "underground substation", "gas insulated switchgear", "ultra-high voltage", "SF6 gas handling"],
  alternates: {
    canonical: `${siteConfig.site_domain}/projects`,
  },
  openGraph: {
    type: "website",
    title: `SF6 Gas Projects | ${siteConfig.site_name}`,
    description: "Successful SF6 gas solutions for various industries and applications, including underground substations, gas insulated switchgear manufacturers, and ultra-high voltage projects.",
    images: [{
      url: "/opengraph-image.jpeg",
      width: 1200,
      height: 630,
      alt: "SF6 Gas Projects",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `SF6 Gas Projects | ${siteConfig.site_name}`,
    description: "Successful SF6 gas solutions for various industries and applications, including underground substations, gas insulated switchgear manufacturers, and ultra-high voltage projects.",
    images: ["/twitter-image.jpeg"],
  },
};

const featuredProducts = [
  { name: "SF6 Leak Detector", slug: "sf6-leak-detector", image: "/pics/products/sf6-leak-detector.jpg" },
  { name: "SF6 Room Monitor", slug: "sf6-room-monitor", image: "/pics/products/sf6-room-monitor.jpg" },
  { name: "SF6 Gas Analyzer", slug: "sf6-gas-analyzer", image: "/pics/products/sf6-analyzer.jpg" },
  { name: "SF6 Gas Filling Cart", slug: "sf6-gas-filling-cart", image: "/pics/products/sf6-gas-filling-cart.jpg" },
];

export default function ProjectsPage() {
  const structuredProjects = [
    {
      name: "SF6 Gas handling for Underground Substation",
      description:
        "SF6 gas is increasingly used in confined Spaces. Underground substations use a lot of high-voltage equipment. SF6 Gas safety solutions.",
      url: `${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <Script id="projects-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "SF6 Gas Projects",
          "description": "Successful SF6 gas solutions for various industries and applications",
          "url": `${siteConfig.site_domain}/projects`,
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
              }
            ]
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": structuredProjects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Project",
                "name": project.name,
                "description": project.description,
                "url": project.url
              }
            }))
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
                <BreadcrumbPage className="text-white">Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Our SF6 Gas Projects</h1>
            <p className="text-xl mb-8 opacity-90">
              Successful SF6 gas solutions for various industries and applications
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              id="underground-substation"
              title="SF6 Gas handling for Underground Substation"
              description="SF6 gas is increasingly used in confined Spaces. Underground substations use a lot of high-voltage equipment. SF6 Gas safety solutions."
              image="/pics/projects/underground-substation-h.jpg"
            />
            <ProjectCard 
              id="gis-manufacturers"
              title="SF6 use for Gas Insulated Switchgear Manufacturers"
              description="A large amount of SF6 gas is needed to test the equipment during the R&D and manufacturing process. We provide solutions for reusing SF6 gas for experiments."
              image="/pics/projects/gis-manufacturers-h.jpg"
            />
            <ProjectCard 
              id="ultra-high-voltage"
              title="Ultra-high voltage SF6 Handling equipment"
              description="We have rich experience in field service 750KV and 1000KV substation working experience, including Gas Insulated Lines."
              image="/pics/projects/ultra-high-voltage-h.jpg"
            />
            <ProjectCard 
              id="regeneration-base"
              title="SF6 Gas Handling and Regeneration base"
              description="SF6 handling base has a large recycling & regeneration & vacuum equipment. Efficient regeneration of SF6 and Achieving whole-life system management of SF6 gas."
              image="/pics/projects/regeneration-base-h.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your SF6 Gas Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today to discuss your specific requirements and how we can help you achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-blue-800 hover:bg-blue-50 text-lg px-8 py-6">
                Get a Free Consultation
              </Button>
              <Button className="bg-transparent border border-white hover:bg-white/10 text-lg px-8 py-6">
                View More Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Products Used In Our Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore a selection of SF6 equipment commonly used across our project deployments.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="group cursor-pointer rounded-lg border bg-white hover:shadow-lg transition-shadow"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="block h-full"
                  aria-label={`View details for ${product.name}`}
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-blue-600 mt-2 text-sm">
                      <span>View Details</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Project Card Component
const ProjectCard = ({
  id,
  title,
  description,
  image,
}: {
  id: string;
  title: string;
  description: string;
  image?: string;
}) => {
  // Map project IDs to their respective paths
  const projectPaths: Record<string, string> = {
    "underground-substation": "/projects/sf6-gas-handling-for-underground-substation",
    "gis-manufacturers": "#gis-manufacturers",
    "ultra-high-voltage": "#ultra-high-voltage",
    "regeneration-base": "#regeneration-base"
  };

  const href = projectPaths[id] || "#";

  return (
    <div id={id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
      <Link href={href} className="text-blue-800 font-medium flex items-center gap-2">
        View details <ChevronRight size={16} />
      </Link>
    </div>
  );
};
