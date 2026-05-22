"use client";

import { Clock, Eye, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import type { CatalogProduct } from "@/features/catalog/catalog-types";
import { ProductMockup, SM_TONES } from "@/components/home/visuals";
import type { ProductKind } from "@/components/home/visuals";

const TONE_TO_KIND: Record<CatalogProduct["imageTone"], ProductKind> = {
  purple: "mug",
  teal:   "shirt",
  coral:  "pillow",
  ink:    "thermos",
  gold:   "keychain",
};

export function ProductCard({ product }: { product: CatalogProduct }) {
  const [fav, setFav] = useState(false);

  const toneName = product.imageTone === "ink" ? "ink" : product.imageTone;
  const tone = SM_TONES[toneName];
  const kind = TONE_TO_KIND[product.imageTone];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      {/* Image area */}
      <a href={`/productos/${product.slug}`} tabIndex={-1} aria-hidden="true">
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ background: `linear-gradient(155deg, ${tone.surface} 0%, #ffffff 100%)` }}
        >
          <div className="stripes-soft absolute inset-0 opacity-50" />
          <div className="absolute inset-0 grid place-items-center">
            <ProductMockup
              kind={kind}
              palette={[tone.from, tone.ink, "#ffffff"]}
              className="h-[78%] w-[78%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <span
              className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10.5px] font-bold backdrop-blur"
              style={{ color: tone.ink }}
            >
              {product.category}
            </span>
          </div>

          {/* Favorites toggle */}
          <button
            aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
            onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[var(--foreground)] shadow-card backdrop-blur transition-colors hover:bg-white"
          >
            <Heart
              size={16}
              aria-hidden="true"
              className={fav ? "fill-[var(--coral)] text-[var(--coral)]" : ""}
              strokeWidth={fav ? 0 : 2}
            />
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)]/90 px-4 py-2.5 text-[12.5px] font-bold text-white backdrop-blur">
              <Eye size={14} aria-hidden="true" /> Vista rápida
            </span>
          </div>
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <a href={`/productos/${product.slug}`}>
          <h3 className="text-[15px] font-extrabold leading-snug tracking-tight hover:text-[var(--primary)]">
            {product.name}
          </h3>
        </a>
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
            <p className="font-display text-[20px] font-black leading-none">
              {product.price}
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
