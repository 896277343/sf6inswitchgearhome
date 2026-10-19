export type ProductSingle = {
  slug: string;
  folder: string;
  model: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  images: string[];
  keySpecifications: [string, string][];
  specifications: [string, string][];
  applications: string[];
  features: string[];
  overview: string[];
  faq: [string, string][];
};
