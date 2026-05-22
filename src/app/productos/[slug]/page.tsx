import { BadgeDollarSign, Check, ChevronRight, Clock, Flame, Package2, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { ProductMockup, SM_TONES } from "@/components/home/visuals";
import type { ProductKind, ToneName } from "@/components/home/visuals";
import { CatalogProductCard } from "@/components/catalog/catalog-product-card";
import { ProductCustomizer } from "@/features/products/product-customizer";
import { getProductDetail, getCatalogProducts } from "@/features/catalog/catalog-repository";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const INFO_ROWS = [
  { icon: BadgeDollarSign, label: "Precio base", hint: "antes de cantidad y opciones" },
  { icon: Clock,           label: "Tiempo de producción", hint: "luego de aprobada la prueba" },
  { icon: Package2,        label: "Mínimo de pedido", hint: "sin cargo extra por cantidad baja" },
  { icon: Truck,           label: "Entrega", hint: "envío local a partir de Q25" },
];

const FAQS = [
  {
    q: "¿Qué resolución necesita tener mi foto?",
    a: "Recomendamos 1500 × 1500 px o superior. Si tu archivo es más bajo, te avisamos antes de imprimir y te ayudamos a buscar una alternativa.",
  },
  {
    q: "¿Puedo pedir solo una unidad?",
    a: "Por supuesto. No tenemos mínimo. El precio se mantiene desde 1 unidad hasta pedidos corporativos.",
  },
  {
    q: "¿Cuándo recibo la prueba visual?",
    a: "Dentro de las primeras horas luego de recibir tu pedido. Producción inicia solo después de tu aprobación.",
  },
];

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const description = `${product.description} Cotiza ${product.name.toLowerCase()} con precio estimado ${product.price} y prueba visual antes de imprimir.`;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `/productos/${product.slug}`,
    },
    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: `/productos/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductDetail(slug),
    getCatalogProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const toneName = (product.imageTone ?? "purple") as ToneName;
  const tone = SM_TONES[toneName];
  const kind: ProductKind = (product.productKind as ProductKind) ?? "mug";
  const related = allProducts.filter((p) => p.slug !== slug).slice(0, 4);

  const infoValues = [
    product.price,
    product.productionTime,
    "1 unidad",
    "Recolección o envío GT",
  ];

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto max-w-[1280px] px-4 pt-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12.5px] text-[var(--muted-foreground)]">
            <Link href="/" className="font-medium hover:text-[var(--primary)]">Inicio</Link>
            <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
            <Link href="/catalogo" className="font-medium hover:text-[var(--primary)]">Catálogo</Link>
            <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
            <Link
              href={`/categorias/${product.categorySlug}`}
              className="font-medium hover:text-[var(--primary)]"
            >
              {product.category}
            </Link>
            <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
            <span className="font-semibold text-[var(--foreground)]">{product.name}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT: image + info */}
            <div>
              {/* Main image */}
              <div
                className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--border)] shadow-card"
                style={{ background: `linear-gradient(155deg, ${tone.surface} 0%, #ffffff 100%)` }}
              >
                <div className="stripes-soft absolute inset-0 opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <ProductMockup
                    kind={kind}
                    palette={[tone.from, tone.ink, "#ffffff"]}
                    className="h-[75%] w-[75%]"
                  />
                </div>
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-bold backdrop-blur"
                    style={{ color: tone.ink }}
                  >
                    {product.category}
                  </span>
                  {product.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--coral)] px-3 py-1.5 text-[11.5px] font-bold text-white">
                      <Flame size={12} aria-hidden="true" /> {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="mt-3 grid grid-cols-5 gap-2">
                {[kind, "mug", kind, kind, kind].map((k, i) => (
                  <button
                    key={i}
                    className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                      i === 0
                        ? "border-[var(--primary)]"
                        : "border-[var(--border)] hover:border-[var(--primary-soft)]"
                    }`}
                    style={{ background: i === 0 ? tone.surface : "white" }}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <ProductMockup
                        kind={k as ProductKind}
                        palette={[tone.from, tone.ink, "#ffffff"]}
                        className="h-[80%] w-[80%]"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Product info */}
              <div className="mt-8">
                <h1 className="font-display text-[34px] font-black leading-[1.05] tracking-tight">
                  {product.name}
                </h1>
                <div className="mt-2 flex items-center gap-3 text-[13px] text-[var(--muted-foreground)]">
                  <span className="inline-flex items-center gap-1 text-[var(--foreground)]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className="fill-[var(--gold)] text-[var(--gold)]" strokeWidth={0} aria-hidden="true" />
                    ))}
                    <span className="ml-1 font-bold">4.9</span>
                  </span>
                  <span>· 87 reseñas</span>
                  <span>· SKU SM-{product.slug.slice(0, 4).toUpperCase()}</span>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                  {product.description} Ideal para regalo, eventos y campañas corporativas. Sublimado a todo color con tinta de alta resistencia.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {product.personalization.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary-muted)] px-3 py-1.5 text-[12px] font-bold text-[var(--primary-strong)]"
                    >
                      <Check size={11} strokeWidth={3} aria-hidden="true" /> {t}
                    </span>
                  ))}
                </div>

                {/* Info table */}
                <div className="mt-7 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card">
                  {INFO_ROWS.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center gap-4 px-5 py-3.5 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary-muted)] text-[var(--primary)]">
                        <row.icon size={16} aria-hidden="true" />
                      </span>
                      <div className="flex-1">
                        <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">{row.label}</p>
                        <p className="text-[13.5px] font-extrabold">{infoValues[i]}</p>
                      </div>
                      <p className="max-w-[180px] text-right text-[11.5px] text-[var(--muted-foreground)]">{row.hint}</p>
                    </div>
                  ))}
                </div>

                {/* Security note */}
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-muted)]/40 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[var(--accent)] text-white">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[13.5px] font-extrabold text-[var(--accent-strong)]">Tus archivos están protegidos</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted-foreground)]">
                      Subís fotos y logos a una carpeta privada. Solo Mike y vos pueden verlos. Se borran 60 días después de entregar tu pedido.
                    </p>
                  </div>
                </div>

                {/* FAQ */}
                <div id="faq" className="mt-8">
                  <p className="text-[12.5px] font-extrabold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Preguntas frecuentes
                  </p>
                  <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                    {FAQS.map((f, i) => (
                      <details
                        key={i}
                        open={i === 0}
                        className={`group ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                          <span className="text-[13.5px] font-extrabold">{f.q}</span>
                          <Plus size={16} className="shrink-0 text-[var(--muted-foreground)] transition-transform group-open:rotate-45" aria-hidden="true" />
                        </summary>
                        <p className="px-5 pb-4 text-[13px] leading-relaxed text-[var(--muted-foreground)]">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: customizer (sticky) */}
            <div>
              <ProductCustomizer product={product} />
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section className="mt-20">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--gold-muted)] px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider text-[var(--gold-strong)]">
                    <span className="block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                    También te puede gustar
                  </span>
                  <h2 className="mt-3 font-display text-[28px] font-black tracking-tight">Productos relacionados</h2>
                </div>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-[var(--primary)]"
                >
                  Ver más <ChevronRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {related.map((p) => (
                  <CatalogProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
