import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

import type { ProjectCaseStudy } from "./project-data";

export function ProjectPageContent({ project }: { project: ProjectCaseStudy }) {
  const projectUrl = `${siteConfig.site_domain}/projects/${project.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Script id={`project-schema-${project.slug}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Project",
          "name": project.name,
          "description": project.description,
          "url": projectUrl,
          "image": [`${siteConfig.site_domain}${project.heroImage}`],
          "provider": {
            "@type": "Organization",
            "name": siteConfig.brand.legalName,
            "url": siteConfig.site_domain,
          },
        })}
      </Script>

      <section className="border-b bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
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
                <BreadcrumbPage>{project.shortTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="py-14 lg:py-18">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Project Case Study
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {project.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {project.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-blue-800 text-white hover:bg-blue-700">
                <Link href="/contact">Discuss This Project</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/products">View Related Products</Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
            <Image
              src={project.heroImage}
              alt={project.name}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <InfoCard title="Applications" items={project.useCases} />
          <InfoCard title="Challenges" items={project.challenges} />
          <InfoCard title="Solutions" items={project.solutions} />
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="mb-5 text-3xl font-bold text-slate-900">Project Outcomes</h2>
              <ul className="space-y-4">
                {project.outcomes.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 shadow-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-3xl font-bold text-slate-900">Products Used</h2>
              <div className="space-y-4">
                {project.productsUsed.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm transition-colors hover:border-blue-200 hover:text-blue-800"
                  >
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm">View {product.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">{title}</h2>
      <ul className="space-y-3 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
