import { ArrowDownUp, ChevronRight, Clock, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { BlobShape, HeroWave, SM_TONES } from "@/components/home/visuals";
import type { ToneName } from "@/components/home/visuals";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog-repository";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCatalogCategories(),
    getCatalogProducts(slug),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const toneName = (category.tone ?? "purple") as ToneName;
  const tone = SM_TONES[toneName];
  const Icon = category.icon;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--background)]">
        {/* Hero banner */}
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{ background: `linear-gradient(135deg, ${tone.from} 0%, ${tone.to} 100%)` }}
          />
          <div className="hero-pattern absolute inset-0 -z-10 opacity-25" aria-hidden="true" />
          <BlobShape
            className="absolute -top-20 -right-16 -z-10 h-[340px] w-[340px]"
            color="#ffffff"
            opacity={0.12}
          />
          <BlobShape
            className="absolute -bottom-24 -left-20 -z-10 h-[300px] w-[300px]"
            color="#ffffff"
            opacity={0.08}
          />

          <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12.5px] text-white/70">
              <Link href="/" className="font-medium hover:text-white">Inicio</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <Link href="/catalogo" className="font-medium hover:text-white">Catálogo</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <span className="font-semibold text-white">{category.name}</span>
            </nav>

            <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
              {/* Category icon */}
              <div className="relative grid place-items-center">
                <span className="absolute h-44 w-44 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
                <span
                  className="relative grid h-36 w-36 place-items-center rounded-3xl bg-white/95 shadow-pop"
                  style={{ color: tone.ink }}
                >
                  {Icon ? (
                    <Icon size={64} strokeWidth={1.7} aria-hidden="true" />
                  ) : (
                    <span className="text-4xl font-black">{category.name[0]}</span>
                  )}
                </span>
              </div>

              {/* Category info */}
              <div className="text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <span className="block h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                  Categoría · {category.itemCount} productos
                </span>
                <h1 className="mt-4 font-display text-[48px] font-black leading-[0.95] tracking-tight sm:text-[56px]">
                  {category.name}
                </h1>
                <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-white/85">
                  {category.blurb ?? category.description}. Producción rápida en Guatemala, prueba visual incluida en cada pedido.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/80">
                  <span className="inline-flex items-center gap-2">
                    <Star size={15} className="text-[var(--gold)]" aria-hidden="true" /> 4.9★ en esta categoría
                  </span>
                  <span className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" aria-hidden="true" />
                  <span className="inline-flex items-center gap-2">
                    <Clock size={15} aria-hidden="true" /> Desde 24h
                  </span>
                  <span className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" aria-hidden="true" />
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={15} aria-hidden="true" /> Prueba visual
                  </span>
                </div>
              </div>
            </div>
          </div>

          <HeroWave className="absolute bottom-0 left-0 right-0 h-12 w-full" />
        </section>

        {/* Product grid */}
        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start gap-8">
            <FilterSidebar categories={categories} activeCategory={category.slug} />

            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-[13.5px] text-[var(--muted-foreground)]">
                  Mostrando <span className="font-bold text-[var(--foreground)]">{products.length}</span> productos en{" "}
                  <span className="font-bold text-[var(--foreground)]">{category.name}</span>
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[12.5px] font-semibold text-[var(--foreground)]">
                  <ArrowDownUp size={13} className="text-[var(--muted-foreground)]" aria-hidden="true" />
                  Recomendados
                  <ChevronRight size={13} className="rotate-90 text-[var(--muted-foreground)]" aria-hidden="true" />
                </div>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                  {products.map((p) => (
                    <CatalogProductCard key={p.slug} product={p} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-white py-20 text-center shadow-card">
                  <p className="text-[15px] font-extrabold">Aún no hay productos en esta categoría</p>
                  <p className="text-[13px] text-[var(--muted-foreground)]">
                    Pronto agregaremos productos. Mientras tanto, explora el catálogo completo.
                  </p>
                  <Link
                    href="/catalogo"
                    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-[13px] font-bold text-white"
                  >
                    Ver catálogo
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
