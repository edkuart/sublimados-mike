import { MapPin, Phone, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AccountProfilePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Badge tone="purple">Perfil</Badge>
        <h1 className="mt-3 text-3xl font-black">Datos de contacto</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Estos datos se usaran para completar futuras cotizaciones por WhatsApp.
        </p>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <form className="grid gap-5 md:grid-cols-2">
          <Field icon={<UserRound aria-hidden="true" className="h-4 w-4" />} label="Nombre completo" placeholder="Tu nombre" />
          <Field icon={<Phone aria-hidden="true" className="h-4 w-4" />} label="Telefono" placeholder="50200000000" />
          <Field icon={<MapPin aria-hidden="true" className="h-4 w-4" />} label="Ciudad o zona" placeholder="Ciudad, zona o municipio" />
          <Field label="Metodo de entrega preferido" placeholder="Recoger en tienda o envio" />
          <div className="md:col-span-2">
            <label className="text-sm font-bold" htmlFor="address">
              Direccion de entrega
            </label>
            <textarea
              className="mt-2 min-h-24 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-3 text-sm outline-none focus:border-[var(--primary)]"
              id="address"
              placeholder="Direccion o referencias de entrega"
            />
          </div>
          <div className="md:col-span-2">
            <Button type="button">Guardar datos</Button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  icon,
  label,
  placeholder,
}: {
  icon?: ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold" htmlFor={label}>
        {icon}
        {label}
      </label>
      <input
        className="mt-2 min-h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
        id={label}
        placeholder={placeholder}
      />
    </div>
  );
}
