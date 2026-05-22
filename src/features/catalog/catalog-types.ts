import type { LucideIcon } from "lucide-react";

export type VisualTone = "purple" | "teal" | "coral" | "ink" | "gold";

export type CatalogCategory = {
  name: string;
  slug: string;
  description: string;
  icon?: LucideIcon;
  itemCount: string;
  tone?: VisualTone;
  blurb?: string;
  count?: number;
};

export type CatalogProduct = {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: string;
  productionTime: string;
  imageTone: VisualTone;
  personalization: string[];
  description: string;
  badge?: string | null;
  productKind?: string;
};

export type ProductDetail = CatalogProduct & {
  options: Array<{
    name: string;
    values: string[];
  }>;
  customizationFields: Array<{
    label: string;
    helperText: string;
    required: boolean;
    inputType: "text" | "textarea" | "file" | "select" | "color" | "date";
    options?: string[];
  }>;
};
