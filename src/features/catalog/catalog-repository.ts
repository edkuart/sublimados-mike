import "server-only";
import { getPrismaClient } from "@/lib/db/client";
import { hasUsableDatabaseUrl } from "@/lib/env/server";
import type { CustomizationFieldType } from "../../../generated/prisma/client";
import { fallbackCategories, fallbackProductDetails, fallbackProducts } from "./fallback-catalog";
import type { CatalogCategory, CatalogProduct, ProductDetail, VisualTone } from "./catalog-types";

const toneCycle: VisualTone[] = ["purple", "teal", "ink", "coral"];

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  if (!hasUsableDatabaseUrl()) {
    return fallbackCategories;
  }

  try {
    const db = getPrismaClient();
    const categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (categories.length === 0) {
      return fallbackCategories;
    }

    return categories.map((category) => ({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      itemCount: String(category._count.products),
    }));
  } catch {
    return fallbackCategories;
  }
}

export async function getCatalogProducts(categorySlug?: string): Promise<CatalogProduct[]> {
  if (!hasUsableDatabaseUrl()) {
    return filterFallbackProducts(categorySlug);
  }

  try {
    const db = getPrismaClient();
    const products = await db.product.findMany({
      where: {
        status: "ACTIVE",
        category: categorySlug ? { slug: categorySlug } : undefined,
      },
      orderBy: [{ createdAt: "desc" }],
      include: {
        category: true,
        customizationFields: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (products.length === 0) {
      return filterFallbackProducts(categorySlug);
    }

    return products.map((product, index) => ({
      name: product.name,
      slug: product.slug,
      category: product.category.name,
      categorySlug: product.category.slug,
      price: formatPrice(product.basePriceCents, product.currency),
      productionTime: product.productionTimeLabel ?? "Por confirmar",
      imageTone: toneCycle[index % toneCycle.length],
      personalization: product.customizationFields.slice(0, 3).map((field) => field.label),
      description: product.shortDescription ?? product.description ?? "",
    }));
  } catch {
    return filterFallbackProducts(categorySlug);
  }
}

export async function getProductDetail(slug: string): Promise<ProductDetail | null> {
  if (!hasUsableDatabaseUrl()) {
    return fallbackProductDetails.find((item) => item.slug === slug) ?? null;
  }

  try {
    const db = getPrismaClient();
    const product = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        options: {
          orderBy: { sortOrder: "asc" },
          include: {
            values: {
              orderBy: { sortOrder: "asc" },
            },
          },
        },
        customizationFields: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!product || product.status !== "ACTIVE") {
      return fallbackProductDetails.find((item) => item.slug === slug) ?? null;
    }

    return {
      name: product.name,
      slug: product.slug,
      category: product.category.name,
      categorySlug: product.category.slug,
      price: formatPrice(product.basePriceCents, product.currency),
      productionTime: product.productionTimeLabel ?? "Por confirmar",
      imageTone: "purple",
      personalization: product.customizationFields.slice(0, 3).map((field) => field.label),
      description: product.description ?? product.shortDescription ?? "",
      options: product.options.map((option) => ({
        name: option.name,
        values: option.values.map((value) => value.value),
      })),
      customizationFields: product.customizationFields.map((field) => ({
        label: field.label,
        helperText: field.helperText ?? "",
        required: field.isRequired,
        inputType: mapCustomizationFieldType(field.type),
      })),
    };
  } catch {
    return fallbackProductDetails.find((item) => item.slug === slug) ?? null;
  }
}

function filterFallbackProducts(categorySlug?: string) {
  if (!categorySlug) {
    return fallbackProducts;
  }

  return fallbackProducts.filter((product) => product.categorySlug === categorySlug);
}

function formatPrice(amountCents: number, currency: string) {
  const amount = amountCents / 100;

  if (currency === "GTQ") {
    return `Desde Q${amount.toFixed(0)}`;
  }

  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function mapCustomizationFieldType(type: CustomizationFieldType): ProductDetail["customizationFields"][number]["inputType"] {
  switch (type) {
    case "TEXTAREA":
      return "textarea";
    case "IMAGE":
    case "LOGO":
    case "FILE":
      return "file";
    case "SELECT":
      return "select";
    case "COLOR":
      return "color";
    case "DATE":
      return "date";
    case "TEXT":
    default:
      return "text";
  }
}
