
import { T, TV } from "@/components/i18n/text";
import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { Section, Container, Prose } from "@/components/craft";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { translatePage } from "@/lib/transposh";

// Revalidate pages every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const sourcePage = await getPageBySlug(slug);

  if (!sourcePage) {
    return {};
  }
  const page = await translatePage(sourcePage, locale);

  const description = page.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : stripHtml(page.content.rendered).slice(0, 200) + "...";

  return generateContentMetadata({
    title: page.title.rendered,
    description,
    slug: page.slug,
    basePath: "pages",
    locale,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const sourcePage = await getPageBySlug(slug);

  if (!sourcePage) {
    notFound();
  }
  const page = await translatePage(sourcePage, locale);

  return (
    <Section>
      <Container>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/"><T id="3a78695388b38b5c" /></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{<TV>{page.title.rendered}</TV>}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Prose>
          <h1>{<TV>{page.title.rendered}</TV>}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Prose>
      </Container>
    </Section>
  );
}
