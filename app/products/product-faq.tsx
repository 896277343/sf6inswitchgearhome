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
        ? `${product.name} is typically used in ${applications} and other SF6 gas maintenance or monitoring workflows.`
        : `${product.name} is designed for SF6 gas handling, monitoring, testing, or maintenance applications.`,
    },
    {
      question: `What is the model number for this ${product.name}?`,
      answer: `The model number for this product is ${product.model}.`,
    },
    {
      question: `What is the minimum order quantity for ${product.name}?`,
      answer: product.minOrder
        ? `The typical minimum order quantity is ${product.minOrder}.`
        : "Please contact us for current minimum order quantity details.",
    },
    {
      question: `How long is the delivery time for ${product.name}?`,
      answer: product.deliveryTime
        ? `The usual delivery time is ${product.deliveryTime}, depending on configuration and order volume.`
        : "Delivery time depends on configuration and order quantity. Please contact us for the current production lead time.",
    },
    {
      question: `Does ${product.name} include warranty support?`,
      answer: product.warranty
        ? `Yes. This product is offered with a typical warranty period of ${product.warranty}.`
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
