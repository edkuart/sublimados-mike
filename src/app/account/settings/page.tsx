import { Bell, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Badge tone="purple">Preferencias</Badge>
        <h1 className="mt-3 text-3xl font-black">Configuracion</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Preferencias de contacto, privacidad y uso de archivos.
        </p>
      </section>

      <section className="space-y-4">
        <Preference
          description="Recibir confirmaciones y seguimiento de pedidos por WhatsApp."
          icon={<Bell aria-hidden="true" className="h-5 w-5" />}
          label="Notificaciones por WhatsApp"
        />
        <Preference
          description="Permitir guardar archivos para reutilizarlos en futuras compras."
          icon={<ShieldCheck aria-hidden="true" className="h-5 w-5" />}
          label="Guardar archivos para futuras compras"
        />
      </section>
    </div>
  );
}

function Preference({
  description,
  icon,
  label,
}: {
  description: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--muted)] text-[var(--primary)]">
          {icon}
        </span>
        <div>
          <h2 className="font-bold">{label}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
        </div>
      </div>
      <input aria-label={label} className="mt-2 h-5 w-5" type="checkbox" />
    </article>
  );
}
