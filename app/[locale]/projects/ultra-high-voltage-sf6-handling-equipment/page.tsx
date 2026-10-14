
import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";

import { ProjectPageContent } from "../project-page-content";
import { getProjectCaseStudy } from "../project-data";
import { siteConfig } from "@/site.config";

const project = getRequiredProject();

function getRequiredProject() {
  const matchedProject = getProjectCaseStudy("ultra-high-voltage-sf6-handling-equipment");
  if (!matchedProject) {
    throw new Error("Project case study not found.");
  }
  return matchedProject;
}

const baseMetadata: Metadata = {
  title: `${project.name} | UHV Substation Solutions | ${siteConfig.site_name}`,
  description: project.description,
  alternates: {
    canonical: `${siteConfig.site_domain}/projects/${project.slug}`,
  },
  openGraph: {
    type: "website",
    title: `${project.name} | ${siteConfig.site_name}`,
    description: project.description,
    url: `${siteConfig.site_domain}/projects/${project.slug}`,
    images: [
      {
        url: `${siteConfig.site_domain}${project.heroImage}`,
        width: 1200,
        height: 630,
        alt: project.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${project.name} | ${siteConfig.site_name}`,
    description: project.shortDescription,
    images: [`${siteConfig.site_domain}${project.heroImage}`],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/projects/ultra-high-voltage-sf6-handling-equipment");
}

export default function ProjectPage() {
  return <ProjectPageContent project={project} />;
}
