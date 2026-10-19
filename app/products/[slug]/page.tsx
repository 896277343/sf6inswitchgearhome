import type { Metadata } from "next";
import { notFound } from "next/navigation";
import productData from "@/data/product-singles.json";
import { siteConfig } from "@/site.config";
import type { ProductSingle } from "../product-single-types";
import ProductSingleContent from "./product-single-content";

const products = productData as ProductSingle[];

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  const title = `${product.model} ${product.name}`;
  const url = `${siteConfig.site_domain}/products/${product.slug}`;
  return {
    title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: { title, description: product.description, url, type: "website", images: product.images[0] ? [{ url: product.images[0] }] : undefined },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  return <ProductSingleContent product={product} related={related.length ? related : products.filter((item) => item.slug !== product.slug).slice(0, 3)} />;
}
