import { ArrowDownUp, ChevronLeft, ChevronRight, Grid3x3, List, Search, X } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog-repository";

const ACTIVE_FILTERS = ["Tazas", "Termos", "Almohadas", "24 horas"];

export const metadata: Metadata = {
  title: "Catalogo de productos personalizados",
  description:
    "Explora tazas, playeras, termos, cojines, llaveros y regalos personalizados por sublimacion con cotizacion por WhatsApp.",
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    title: "Catalogo de Sublimados Mike",
    description:
      "Productos sublimados y personalizados con prueba visual antes de imprimir.",
    url: "/catalogo",
  },
};

export default async function CatalogPage() {
  const [categories, products] = await Promise.all([getCatalogCategories(), getCatalogProducts()]);

  const expanded = [...products, ...products.slice(0, 3)];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--background)]">
        {/* Page header */}
        <section className="border-b border-[var(--border)] bg-[var(--surface-subtle)]">
          <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12.5px] text-[var(--muted-foreground)]">
              <Link href="/" className="font-medium hover:text-[var(--primary)]">Inicio</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <span className="font-semibold text-[var(--foreground)]">Catálogo</span>
            </nav>

            <div className="mt-5 flex items-end justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-muted)] px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-[var(--primary-strong)]">
                  <span className="block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" /> Catálogo
                </span>
                <h1 className="mt-3 font-display text-[40px] font-black leading-[1.05] tracking-tight">
                  Todo lo que personalizamos, en un solo lugar
                </h1>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                  Más de 100 productos sublimados con prueba visual antes de imprimir y entrega rápida en toda Guatemala.
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-3 shadow-card">
                  <Search size={16} className="text-[var(--primary)]" aria-hidden="true" />
                  <input
                    className="w-[280px] bg-transparent text-[13.5px] outline-none placeholder:text-[var(--muted-foreground)]"
                    placeholder="Buscar en el catálogo…"
                    aria-label="Buscar productos"
                  />
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="font-bold text-[var(--muted-foreground)]">{ACTIVE_FILTERS.length} filtros activos:</span>
              {ACTIVE_FILTERS.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary-muted)] px-3 py-1 font-bold text-[var(--primary-strong)]"
                >
                  {f} <X size={11} aria-hidden="true" />
                </span>
              ))}
              <button className="ml-1 text-[12px] font-bold text-[var(--primary)] underline-offset-2 hover:underline">
                Limpiar todo
              </button>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-start gap-8">
            <FilterSidebar categories={categories} />

            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-[13.5px] text-[var(--muted-foreground)]">
                  Mostrando <span className="font-bold text-[var(--foreground)]">{expanded.length}</span> de{" "}
                  <span className="font-bold text-[var(--foreground)]">142</span> productos
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[12.5px] font-semibold text-[var(--foreground)]">
                    <ArrowDownUp size={13} className="text-[var(--muted-foreground)]" aria-hidden="true" />
                    Más populares
                    <ChevronRight size={13} className="rotate-90 text-[var(--muted-foreground)]" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-white p-1">
                    <button
                      aria-label="Vista cuadrícula"
                      className="grid h-7 w-7 place-items-center rounded-md bg-[var(--primary-muted)] text-[var(--primary-strong)]"
                    >
                      <Grid3x3 size={14} aria-hidden="true" />
                    </button>
                    <button
                      aria-label="Vista lista"
                      className="grid h-7 w-7 place-items-center rounded-md text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                    >
                      <List size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                {expanded.map((p, i) => (
                  <CatalogProductCard key={`${p.slug}-${i}`} product={p} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-white px-5 py-4 shadow-card">
                <p className="text-[12.5px] text-[var(--muted-foreground)]">
                  Página <span className="font-bold text-[var(--foreground)]">1</span> de 6
                </p>
                <div className="flex items-center gap-1">
                  <button
                    aria-label="Página anterior"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] bg-white text-[var(--muted-foreground)]"
                  >
                    <ChevronLeft size={14} aria-hidden="true" />
                  </button>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      className={`h-9 min-w-9 rounded-lg px-3 text-[12.5px] font-bold ${
                        n === 1
                          ? "bg-[var(--primary)] text-white"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    aria-label="Página siguiente"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] bg-white text-[var(--foreground)]"
                  >
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
