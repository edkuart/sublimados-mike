import { BadgeDollarSign, CloudUpload, Palette, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VALUE_PROPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Palette,
    title: "Diseño previo incluido",
    text: "Aprobás una prueba visual antes de producir.",
  },
  {
    icon: CloudUpload,
    title: "Archivo seguro en la nube",
    text: "Fotos, logos y referencias vinculadas a tu pedido.",
  },
  {
    icon: BadgeDollarSign,
    title: "Precio estimado al instante",
    text: "Cotización transparente sin sorpresas.",
  },
  {
    icon: Truck,
    title: "Entrega en toda Guatemala",
    text: "Recolección, encomienda o envío local en capital.",
  },
];

export function ValuePropsStrip() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface-subtle)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-12">
        {VALUE_PROPS.map((v) => (
          <div key={v.title} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--primary-muted)] text-[var(--primary)] shadow-[inset_0_-2px_0_rgba(91,33,161,0.08)]">
              <v.icon size={22} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-extrabold leading-tight">{v.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--muted-foreground)]">
                {v.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
