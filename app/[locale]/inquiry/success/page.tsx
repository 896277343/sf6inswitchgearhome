
import { T, TV } from "@/components/i18n/text";

import { withLocalizedMetadata } from "@/lib/i18n/metadata";
import Link from "@/components/i18n/link";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";

type SuccessPageProps = {
  searchParams?: Promise<{
    product?: string | string[];
    product_slug?: string | string[];
    status?: string | string[];
  }>;
};

const baseMetadata: Metadata = {
  title: `Inquiry Status | ${siteConfig.site_name}`,
  description:
    "View the status of your SF6 product inquiry submission and continue browsing our product catalog.",
  alternates: {
    canonical: `${siteConfig.site_domain}/inquiry/success`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return withLocalizedMetadata(baseMetadata, locale, "/inquiry/success");
}

export default async function InquirySuccessPage({
  searchParams,
}: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const product = Array.isArray(resolvedSearchParams?.product)
    ? resolvedSearchParams?.product[0]
    : resolvedSearchParams?.product;
  const productSlug = Array.isArray(resolvedSearchParams?.product_slug)
    ? resolvedSearchParams?.product_slug[0]
    : resolvedSearchParams?.product_slug;
  const status = Array.isArray(resolvedSearchParams?.status)
    ? resolvedSearchParams?.status[0]
    : resolvedSearchParams?.status;
  const isSuccess = status !== "error";

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            <T id="0d4768c5ab5f3ae5" /> {isSuccess ? "Received" : "Needs Attention"}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {isSuccess ? "Thank you for your inquiry" : "We could not send your inquiry"}
          </h1>
          <p className="mb-8 text-base leading-7 text-gray-600 sm:text-lg">
            {isSuccess
              ? product
                ? `Your request for ${product} has been submitted successfully. Our team will review it and get back to you soon.`
                : "Your request has been submitted successfully. Our team will review it and get back to you soon."
              : product
                ? `We could not submit your request for ${product} just now. Please go back and try again, or contact us directly by email or phone.`
                : "We could not submit your request just now. Please go back and try again, or contact us directly by email or phone."}
          </p>

          <div className="grid gap-4 rounded-xl bg-gray-50 p-5 text-sm text-gray-700 sm:grid-cols-2">
            <div>
              <p className="mb-1 font-semibold text-gray-900"><T id="969ccbd3cf6300ec" /></p>
              <p>{<TV>{siteConfig.contact.email}</TV>}</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-gray-900"><T id="63dceb8800b2dd4a" /></p>
              <p>{<TV>{siteConfig.contact.phone}</TV>}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {productSlug ? (
              <Button asChild className="bg-blue-800 text-white hover:bg-blue-700">
                <Link href={`/products/${productSlug}`}><T id="cd9182ceab27df65" /> {product ?? "Product"}</Link>
              </Button>
            ) : (
              <Button asChild className="bg-blue-800 text-white hover:bg-blue-700">
                <Link href="/products"><T id="e21b09ebe2658384" /></Link>
              </Button>
            )}
            <Button asChild variant="outline">
              <Link href="/products"><T id="aad4931ec724e331" /></Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact"><T id="1ac282f02ec0c8af" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
