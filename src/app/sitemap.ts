import type { MetadataRoute } from "next";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog-repository";
import { policyPages } from "@/features/policies/policy-content";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getCatalogCategories(),
    getCatalogProducts(),
  ]);
  const now = new Date();

  return [
    { url: new URL("/", appUrl).href, lastModified: now, priority: 1 },
    { url: new URL("/catalogo", appUrl).href, lastModified: now, priority: 0.9 },
    { url: new URL("/politicas", appUrl).href, lastModified: now, priority: 0.5 },
    ...categories.map((category) => ({
      url: new URL(`/categorias/${category.slug}`, appUrl).href,
      lastModified: now,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: new URL(`/productos/${product.slug}`, appUrl).href,
      lastModified: now,
      priority: 0.85,
    })),
    ...policyPages.map((policy) => ({
      url: new URL(`/politicas/${policy.slug}`, appUrl).href,
      lastModified: now,
      priority: 0.45,
    })),
  ];
}
