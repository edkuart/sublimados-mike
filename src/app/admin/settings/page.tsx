import { adminSettings } from "@/features/admin/admin-data";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--primary)]">Operacion</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Configuracion</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Parametros iniciales para ventas por WhatsApp, aprobacion de diseno y modo de cotizacion.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {adminSettings.map((setting) => {
          const Icon = setting.icon;

          return (
            <article className="rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm" key={setting.label}>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-sm font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                {setting.label}
              </h2>
              <p className="mt-2 text-lg font-black">{setting.value}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
