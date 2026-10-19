import Script from "next/script";

type ProductFaqItem = {
  question: string;
  answer: string;
};

type ProductFaqProduct = {
  name: string;
  model: string;
  deliveryTime?: string;
  minOrder?: string;
  warranty?: string;
  applications?: string[];
};

export function createProductFaqs(product: ProductFaqProduct): ProductFaqItem[] {
  const applications = product.applications?.slice(0, 3).join(", ");

  return [
    {
      question: `What is ${product.name} used for?`,
      answer: applications
        ? `${product.name} is commonly used for ${applications}. It supports SF6 gas work in switchgear, GIS, substations, and related high-voltage maintenance environments.`
        : `${product.name} supports SF6 gas handling, monitoring, testing, or maintenance work in power equipment applications.`,
    },
    {
      question: `Which model is listed for ${product.name}?`,
      answer: `The listed model is ${product.model}. If your project needs a different flow rate, sensor range, voltage, or configuration, we can confirm the available options before quotation.`,
    },
    {
      question: `Can I order one unit of ${product.name}?`,
      answer: product.minOrder
        ? `Yes. The typical minimum order quantity is ${product.minOrder}. For project orders, spare parts, or customized configurations, please confirm the quantity with our team.`
        : "Please contact us for current minimum order quantity and project order details.",
    },
    {
      question: `How long does ${product.name} usually take to deliver?`,
      answer: product.deliveryTime
        ? `The usual delivery time is ${product.deliveryTime}. Final lead time depends on stock status, configuration, testing requirements, and order volume.`
        : "Delivery time depends on stock status, configuration, testing requirements, and order quantity. Please contact us for the current lead time.",
    },
    {
      question: `What is the warranty period for ${product.name}?`,
      answer: product.warranty
        ? `${product.name} is supplied with a standard warranty period of ${product.warranty}. Warranty support covers qualifying product quality issues under normal use conditions.`
        : "Please contact us to confirm the current warranty terms for this product.",
    },
  ];
}

export function ProductFaqSection({
  productName,
  faqItems,
}: {
  productName: string;
  faqItems: ProductFaqItem[];
}) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Script id={`${productName}-faq-schema`} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
              },
            })),
          })}
        </Script>

        <div className="max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
            {productName} FAQ
          </h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.question}</h3>
                <p className="text-gray-600 leading-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
