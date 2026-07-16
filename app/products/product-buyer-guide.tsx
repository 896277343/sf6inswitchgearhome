import Link from "next/link";

type ProductBuyerGuideProps = {
  name: string;
  model: string;
  applications: string[];
};

export function ProductBuyerGuide({
  name,
  model,
  applications,
}: ProductBuyerGuideProps) {
  const highlightedApplications = applications.slice(0, 3).join(", ");
  const primaryApplication = applications[0] ?? "SF6 gas maintenance";

  return (
    <section className="border-y bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              What Is {name} Used For?
            </h2>
            <p className="mb-4 text-base leading-7 text-slate-600">
              {name} ({model}) is selected for {primaryApplication.toLowerCase()} and related SF6 gas
              work where stable performance, clear specifications, and practical field support matter.
            </p>
            <p className="text-base leading-7 text-slate-600">
              Typical applications include {highlightedApplications}. Use the specifications, applications,
              and FAQ on this page to compare whether this model fits your switchgear, GIS, or substation
              maintenance workflow before requesting a quotation or technical discussion.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Next Step for Buyers
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li>Review the specifications and applications below to confirm fit.</li>
              <li>Use the inquiry form for pricing, lead time, and configuration details.</li>
              <li>
                Compare with related equipment in our{" "}
                <Link href="/products" className="font-medium text-blue-700 hover:underline">
                  SF6 gas equipment catalog
                </Link>{" "}
                or contact us through the{" "}
                <Link href="/contact" className="font-medium text-blue-700 hover:underline">
                  SF6 equipment inquiry page
                </Link>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
