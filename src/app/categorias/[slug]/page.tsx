import { ArrowDownUp, ChevronRight, Clock, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { BlobShape, HeroWave, SM_TONES } from "@/components/home/visuals";
import type { ToneName } from "@/components/home/visuals";
import { FilterSidebar } from "@/components/catalog/filter-sidebar";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { MobileCatalogShell } from "@/components/catalog/mobile-catalog-shell";
import { getCatalogCategories, getCatalogProducts } from "@/features/catalog/catalog-repository";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCatalogCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Categoria no encontrada",
    };
  }

  const description = `${category.description}. Productos personalizados por sublimacion con cotizacion guiada por WhatsApp.`;

  return {
    title: category.name,
    description,
    alternates: {
      canonical: `/categorias/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} personalizados por sublimacion`,
      description,
      url: `/categorias/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
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

          <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-6 sm:pb-20 sm:pt-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12.5px] text-white/70">
              <Link href="/" className="font-medium hover:text-white">Inicio</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <Link href="/catalogo" className="font-medium hover:text-white">Catálogo</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <span className="font-semibold text-white">{category.name}</span>
            </nav>

            <div className="mt-6 flex items-center gap-5 sm:mt-10 sm:grid sm:gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
              {/* Category icon — pequeño en móvil, grande en desktop */}
              <div className="relative shrink-0 grid place-items-center">
                <span className="absolute h-24 w-24 rounded-full bg-white/15 blur-2xl sm:h-44 sm:w-44" aria-hidden="true" />
                <span
                  className="relative grid h-20 w-20 place-items-center rounded-2xl bg-white/95 shadow-pop sm:h-36 sm:w-36 sm:rounded-3xl"
                  style={{ color: tone.ink }}
                >
                  {Icon ? (
                    <Icon size={36} strokeWidth={1.7} aria-hidden="true" className="sm:hidden" />
                  ) : (
                    <span className="text-2xl font-black sm:hidden">{category.name[0]}</span>
                  )}
                  {Icon ? (
                    <Icon size={64} strokeWidth={1.7} aria-hidden="true" className="hidden sm:block" />
                  ) : (
                    <span className="hidden text-4xl font-black sm:block">{category.name[0]}</span>
                  )}
                </span>
              </div>

              {/* Category info */}
              <div className="text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur">
                  <span className="block h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                  {category.itemCount} productos
                </span>
                <h1 className="mt-3 font-display text-[30px] font-black leading-[1] tracking-tight sm:mt-4 sm:text-[48px] sm:leading-[0.95] lg:text-[56px]">
                  {category.name}
                </h1>
                <p className="mt-2 text-[14px] leading-relaxed text-white/85 sm:mt-4 sm:max-w-xl sm:text-[16.5px]">
                  {category.blurb ?? category.description}. Prueba visual incluida en cada pedido.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/80 sm:mt-6 sm:gap-x-6 sm:text-[13px]">
                  <span className="inline-flex items-center gap-1.5">
                    <Star size={13} className="text-[var(--gold)]" aria-hidden="true" /> 4.9★
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} aria-hidden="true" /> Desde 24h
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} aria-hidden="true" /> Prueba visual
                  </span>
                </div>
              </div>
            </div>
          </div>

          <HeroWave className="absolute bottom-0 left-0 right-0 h-12 w-full" />
        </section>

        {/* Product grid */}
        <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <MobileCatalogShell
            filterContent={<FilterSidebar categories={categories} activeCategory={category.slug} />}
            activeFilterCount={1}
          >
            {/* Toolbar */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-[12.5px] text-[var(--muted-foreground)]">
                <span className="font-bold text-[var(--foreground)]">{products.length}</span>{" "}
                productos en{" "}
                <span className="font-bold text-[var(--foreground)]">{category.name}</span>
              </p>
              <div className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[12px] font-semibold text-[var(--foreground)]">
                <ArrowDownUp size={12} className="text-[var(--muted-foreground)]" aria-hidden="true" />
                <span className="hidden sm:inline">Recomendados</span>
                <span className="sm:hidden">Ordenar</span>
                <ChevronRight size={12} className="rotate-90 text-[var(--muted-foreground)]" aria-hidden="true" />
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {products.map((p) => (
                  <CatalogProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-white px-6 py-16 text-center shadow-card">
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
          </MobileCatalogShell>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
