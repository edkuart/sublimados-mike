"use client";

import { ArrowRight, Clock, Eye, Heart, MessageCircle, Upload } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductMockup, SM_TONES } from "./visuals";
import type { ProductKind, ToneName } from "./visuals";

interface FeaturedProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  productionTime: string;
  tone: ToneName;
  badge: string | null;
  description: string;
  personalization: string[];
  productKind: ProductKind;
}

const FEATURED: FeaturedProduct[] = [
  {
    slug: "taza-blanca-personalizada",
    name: "Taza blanca personalizada",
    category: "Tazas",
    price: 55,
    productionTime: "24–48 h",
    tone: "purple",
    badge: "Popular",
    description: "Taza 11 oz sublimada con foto, nombre o frase.",
    personalization: ["Foto", "Nombre", "Frase"],
    productKind: "mug",
  },
  {
    slug: "playera-sublimada",
    name: "Playera sublimada full color",
    category: "Playeras",
    price: 85,
    productionTime: "2–3 días",
    tone: "teal",
    badge: "Nuevo",
    description: "Playera personalizada para eventos, equipos y empresas.",
    personalization: ["Talla", "Color", "Logo"],
    productKind: "shirt",
  },
  {
    slug: "termo-con-nombre",
    name: "Termo metálico con nombre",
    category: "Termos",
    price: 120,
    productionTime: "2 días",
    tone: "ink",
    badge: null,
    description: "Termo personalizado con nombre, frase o logo.",
    personalization: ["Nombre", "Color", "Estilo"],
    productKind: "thermos",
  },
  {
    slug: "cojin-con-foto",
    name: "Cojín con foto",
    category: "Almohadas",
    price: 95,
    productionTime: "2–4 días",
    tone: "coral",
    badge: "Temporada",
    description: "Cojín personalizado con foto, dedicatoria o fecha.",
    personalization: ["Foto", "Texto", "Fecha"],
    productKind: "pillow",
  },
  {
    slug: "llavero-acrilico",
    name: "Llavero de acrílico con foto",
    category: "Llaveros",
    price: 18,
    productionTime: "24 h",
    tone: "gold",
    badge: "Popular",
    description: "Llavero transparente con fotografía a todo color.",
    personalization: ["Foto", "Forma"],
    productKind: "keychain",
  },
  {
    slug: "combo-cumpleanos",
    name: "Combo de cumpleaños",
    category: "Regalos",
    price: 195,
    productionTime: "3–5 días",
    tone: "purple",
    badge: "Combo",
    description: "Taza + llavero + tarjeta personalizada en caja de regalo.",
    personalization: ["Foto", "Nombre", "Fecha"],
    productKind: "gift",
  },
];

const TABS = ["Todos", "Tazas", "Playeras", "Termos", "Almohadas", "Regalos"];

const BADGE_STYLES: Record<string, string> = {
  Popular:   "bg-[var(--coral-muted)] text-[var(--coral)]",
  Nuevo:     "bg-[var(--accent-muted)] text-[var(--accent-strong)]",
  Temporada: "bg-[var(--gold-muted)] text-[var(--gold-strong)]",
  Combo:     "bg-[var(--primary-muted)] text-[var(--primary-strong)]",
};

function ProductCard({ product }: { product: FeaturedProduct }) {
  const [fav, setFav] = useState(false);
  const tone = SM_TONES[product.tone];
  const badgeStyle = product.badge ? (BADGE_STYLES[product.badge] ?? "bg-[var(--muted)] text-[var(--muted-foreground)]") : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image area */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ background: `linear-gradient(155deg, ${tone.surface} 0%, #ffffff 100%)` }}
      >
        <div className="stripes-soft absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <ProductMockup
            kind={product.productKind}
            palette={[tone.from, tone.ink, "#ffffff"]}
            className="h-[78%] w-[78%] transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span
            className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10.5px] font-bold backdrop-blur"
            style={{ color: tone.ink }}
          >
            {product.category}
          </span>
          {product.badge && badgeStyle && (
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10.5px] font-bold ${badgeStyle}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Favorites */}
        <button
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={() => setFav((v) => !v)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[var(--foreground)] shadow-card backdrop-blur transition-colors hover:bg-white"
        >
          <Heart
            size={16}
            aria-hidden="true"
            className={fav ? "fill-[var(--coral)] text-[var(--coral)]" : ""}
            strokeWidth={fav ? 0 : 2}
          />
        </button>

        {/* Quick action overlay */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={`/productos/${product.slug}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)]/90 px-4 py-2.5 text-[12.5px] font-bold text-white backdrop-blur"
          >
            <Eye size={14} aria-hidden="true" /> Vista rápida
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-extrabold leading-snug tracking-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-[var(--muted-foreground)]">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.personalization.slice(0, 3).map((p) => (
            <span
              key={p}
              className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-[10.5px] font-semibold text-[var(--muted-foreground)]"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Desde
            </p>
            <p className="font-display text-[22px] font-black leading-none">
              Q{product.price}
              <span className="text-[13px] font-bold text-[var(--muted-foreground)]">.00</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-[var(--accent-muted)] px-2 py-1 text-[10.5px] font-bold text-[var(--accent-strong)]">
            <Clock size={11} aria-hidden="true" />
            {product.productionTime}
          </span>
        </div>

        <a
          href={`/productos/${product.slug}`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2.5 text-[13px] font-bold text-white shadow-card transition-transform hover:scale-[1.02]"
        >
          <MessageCircle size={15} aria-hidden="true" /> Cotizar
        </a>
      </div>
    </article>
  );
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("Todos");

  const visible =
    activeTab === "Todos"
      ? FEATURED
      : FEATURED.filter((p) => p.category === activeTab);

  return (
    <section id="productos" className="border-y border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          align="left"
          eyebrow="Populares"
          eyebrowTone="coral"
          title="Productos listos para personalizar"
          subtitle="Los favoritos de nuestros clientes. Todos con prueba visual antes de imprimir."
          cta={
            <a
              href="/catalogo"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-[13px] font-bold text-[var(--foreground)] shadow-card transition-colors hover:border-[var(--primary-soft)] hover:text-[var(--primary-strong)]"
            >
              <Upload size={15} aria-hidden="true" />
              Subir referencia
            </a>
          }
        />

        {/* Category tabs */}
        <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                activeTab === tab
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-card"
                  : "border-[var(--border)] bg-white text-[var(--muted-foreground)] hover:border-[var(--primary-soft)] hover:text-[var(--primary-strong)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--primary)]/15 bg-white px-6 py-3 text-[14px] font-bold text-[var(--primary-strong)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary-muted)]"
          >
            Ver catálogo completo <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
