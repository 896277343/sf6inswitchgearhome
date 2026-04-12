import { Metadata } from "next";
import { siteConfig } from "@/site.config";
import ProjectContent from "./project-content";

const project = {
  name: "SF6 Gas handling for Underground Substation",
  description: "Comprehensive SF6 gas handling solutions for underground substations, including gas monitoring, leakage detection, and safety systems to ensure optimal performance and personnel safety.",
  shortDescription: "Complete SF6 gas handling solutions for underground substations with advanced monitoring and safety systems.",
};

export const metadata: Metadata = {
  title: `${project.name} | Underground Substation Solutions | ${siteConfig.site_name}`,
  description: project.description,
  keywords: [
    "SF6 gas handling",
    "underground substation",
    "SF6 safety",
    "gas monitoring",
    "leakage detection",
    "substation safety",
    siteConfig.brand.legalName
  ],
  alternates: {
    canonical: `${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`,
  },
  openGraph: {
    title: `${project.name} - Underground Substation Solutions`,
    description: project.description,
    type: "website",
    url: `${siteConfig.site_domain}/projects/sf6-gas-handling-for-underground-substation`,
    images: [
      {
        url: `${siteConfig.site_domain}/opengraph-image.jpeg`,
        width: 1200,
        height: 630,
        alt: project.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${project.name} | Underground Substation`,
    description: project.shortDescription,
    images: [`${siteConfig.site_domain}/twitter-image.jpeg`],
  },
};

export default function ProjectPage() {
  return <ProjectContent />;
}
