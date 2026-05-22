import { ArrowDown, ArrowRight, CheckCircle2, Package, ShoppingBag, Upload } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const STEPS: { num: string; icon: LucideIcon; title: string; text: string }[] = [
  {
    num: "01",
    icon: ShoppingBag,
    title: "Elegí tu producto",
    text: "Explorá el catálogo y configurá talla, color y cantidad.",
  },
  {
    num: "02",
    icon: Upload,
    title: "Subí tu diseño",
    text: "Subí foto, logo o describí la idea. La guardamos contigo.",
  },
  {
    num: "03",
    icon: CheckCircle2,
    title: "Aprobá la prueba",
    text: "Recibís un mockup digital. Confirmás o pedís cambios.",
  },
  {
    num: "04",
    icon: Package,
    title: "Recibí tu pedido",
    text: "Producción y entrega — listo en 24 h a 5 días.",
  },
];

export function HowItWorks() {
  return (
    <section id="nosotros" className="relative bg-[var(--muted)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Proceso"
          eyebrowTone="teal"
          title="¿Cómo funciona?"
          subtitle="Cuatro pasos simples desde la idea hasta el producto en tus manos. Sin sorpresas, sin demoras."
        />

        <div className="relative mt-14">
          {/* Desktop dotted connector line */}
          <div
            className="step-connector absolute left-[12.5%] right-[12.5%] top-[44px] hidden h-0.5 lg:block"
            aria-hidden="true"
          />

          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative flex flex-col items-center text-center">
                {/* Background number */}
                <span
                  className="absolute -top-2 right-4 select-none font-display text-[64px] font-black leading-none text-[var(--primary)]/[0.08] lg:-top-6 lg:right-auto"
                  aria-hidden="true"
                >
                  {step.num}
                </span>

                {/* Icon disc */}
                <span className="relative z-10 grid h-[88px] w-[88px] place-items-center rounded-2xl bg-white text-[var(--primary)] shadow-card ring-1 ring-[var(--border)]">
                  <span
                    className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 blur-md"
                    aria-hidden="true"
                  />
                  <step.icon size={34} strokeWidth={1.9} aria-hidden="true" />
                </span>

                <h3 className="mt-6 text-[18px] font-extrabold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-[240px] text-[13.5px] leading-relaxed text-[var(--muted-foreground)]">
                  {step.text}
                </p>

                {/* Mobile down arrow between steps */}
                {idx < 3 && (
                  <span className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-white lg:hidden">
                    <ArrowDown size={14} aria-hidden="true" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="https://wa.me/50243218800"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-[14px] font-bold text-white shadow-pop transition-transform hover:scale-[1.02]"
          >
            Empezar ahora <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
