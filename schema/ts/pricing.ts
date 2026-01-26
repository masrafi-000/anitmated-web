export interface Package {
  id: string;
  title: string;
  price: string;
  slug: string;
  description?: string;
  features: { id: string; feature: string }[];
  cta?: string;
  isPopular: boolean;
  createdAt: string;
}
