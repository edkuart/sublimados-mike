import { ArrowRight, CheckCircle2, Clock, MessageCircle, Palette, Search, ShieldCheck, Star } from "lucide-react";
import { BlobShape, HeroWave, ProductMockup, SM_TONES } from "./visuals";
import type { ProductKind, ToneName } from "./visuals";

const HERO_PRODUCTS: { kind: ProductKind; tone: ToneName; label: string; price: number }[] = [
  { kind: "mug",     tone: "purple", label: "Taza",     price: 55  },
  { kind: "shirt",   tone: "teal",   label: "Playera",  price: 85  },
  { kind: "thermos", tone: "gold",   label: "Termo",    price: 120 },
  { kind: "pillow",  tone: "coral",  label: "Almohada", price: 95  },
];

const CARD_OFFSETS = [
  "translate-y-0",
  "translate-y-6",
  "-translate-y-3",
  "translate-y-3",
];

export function HeroSection() {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #4c1d95 0%, #6f2dbd 50%, #a855f7 100%)",
        }}
      />
      <div className="hero-pattern absolute inset-0 -z-10" aria-hidden="true" />

      {/* Decorative blobs */}
      <BlobShape
        className="absolute -right-20 -top-24 -z-10 h-[420px] w-[420px]"
        color="#ffffff"
        opacity={0.08}
      />
      <BlobShape
        className="absolute -bottom-32 -left-24 -z-10 h-[380px] w-[380px]"
        color="#14b8a6"
        opacity={0.16}
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-28 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-8 lg:pb-32 lg:pt-24">
        {/* Copy */}
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-semibold backdrop-blur">
            <span className="text-[var(--gold)]">✦</span>
            Diseño aprobado antes de producir
          </span>

          <h1
            className="mt-6 font-display font-black leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
          >
            Productos sublimados que{" "}
            <span className="text-[var(--gold)]">cuentan tu historia</span>.
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-white/80 sm:text-lg">
            Tazas, playeras, termos y regalos personalizados desde Guatemala.
            Cotización transparente, prueba visual antes de imprimir y entrega rápida.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/50243218800"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 text-[15px] font-bold text-white shadow-pop transition-transform hover:scale-[1.02]"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Cotizar por WhatsApp
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/15"
            >
              <Search size={18} aria-hidden="true" />
              Ver catálogo
            </a>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/75">
            <span className="inline-flex items-center gap-2">
              <Star size={16} className="text-[var(--gold)]" aria-hidden="true" />
              4.9★ en 500+ pedidos
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-current opacity-40 sm:block" />
            <span className="inline-flex items-center gap-2">
              <Clock size={16} aria-hidden="true" />
              Entrega 24–72 h
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-current opacity-40 sm:block" />
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} aria-hidden="true" />
              Archivos privados
            </span>
          </div>
        </div>

        {/* Product mockup grid */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-white/10 to-transparent blur-2xl"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {HERO_PRODUCTS.map((p, idx) => {
              const tone = SM_TONES[p.tone];
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl border border-white/20 p-5 shadow-pop backdrop-blur transition-transform hover:-translate-y-1 ${CARD_OFFSETS[idx]}`}
                  style={{
                    background: `linear-gradient(160deg, ${tone.surface} 0%, #ffffff 100%)`,
                  }}
                >
                  <div
                    className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-black"
                    style={{ color: tone.ink }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <ProductMockup
                    kind={p.kind}
                    palette={[tone.from, tone.ink, "#ffffff"]}
                    className="h-32 w-full"
                  />
                  <div className="mt-3 flex items-center justify-between text-[12px] font-semibold">
                    <span style={{ color: tone.ink }}>{p.label}</span>
                    <span className="text-[var(--foreground)]">Desde Q{p.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating chips */}
          <div className="absolute -left-4 top-1/3 hidden -translate-y-1/2 items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-pop backdrop-blur md:flex">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--gold-muted)] text-[var(--gold-strong)]">
              <Palette size={14} aria-hidden="true" />
            </span>
            <span className="text-[12px] font-bold text-[var(--foreground)]">
              Prueba visual incluida
            </span>
          </div>
          <div className="absolute -right-4 bottom-12 hidden items-center gap-2 rounded-xl border border-white/20 bg-white/90 px-3 py-2 shadow-pop backdrop-blur md:flex">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--accent-muted)] text-[var(--accent-strong)]">
              <CheckCircle2 size={14} aria-hidden="true" />
            </span>
            <span className="text-[12px] font-bold text-[var(--foreground)]">
              Cotización al instante
            </span>
          </div>
        </div>
      </div>

      {/* Wave transition to next section */}
      <HeroWave className="absolute bottom-0 left-0 right-0 h-12 w-full" />
    </section>
  );
}
