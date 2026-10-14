
import { T, TV } from "@/components/i18n/text";
import Link from "@/components/i18n/link";

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
              <T id="990b616fffb0ab04" /> {<TV>{name}</TV>} <T id="1e489684f14e487a" />
            </h2>
            <p className="mb-4 text-base leading-7 text-slate-600">
              {<TV>{name}</TV>} ({<TV>{model}</TV>}<T id="5826e21dad461a83" /> {primaryApplication.toLowerCase()} <T id="49e576633beefae3" />
            </p>
            <p className="text-base leading-7 text-slate-600">
              <T id="9d821fc1d6701681" /> {<TV>{highlightedApplications}</TV>}<T id="ce2b56a1d279272e" />
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              <T id="077227716d3ea6d5" />
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li><T id="05c40400da51b9bd" /></li>
              <li><T id="1a2858cedba228b9" /></li>
              <li>
                <T id="76019ed9718a863a" />{" "}
                <Link href="/products" className="font-medium text-blue-700 hover:underline">
                  <T id="fe2e66e6e5ba9b1a" />
                </Link>{" "}
                <T id="799cade94c157b14" />{" "}
                <Link href="/contact" className="font-medium text-blue-700 hover:underline">
                  <T id="d8b4b6289dd5032e" />
                </Link>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
