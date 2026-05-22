import { ShieldCheck, UserPlus } from "lucide-react";
import { adminUserRows } from "@/features/admin/admin-data";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">Accesos</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Usuarios</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Administracion inicial de compradores y equipo interno. Los permisos se leeran de
              Supabase y PostgreSQL cuando se habiliten datos reales.
            </p>
          </div>
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-bold">
            <UserPlus aria-hidden="true" className="h-4 w-4" />
            Invitar usuario
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
        {adminUserRows.map((user, index) => (
          <article
            className={`grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.2fr_1.2fr_0.7fr_0.4fr] md:items-center ${
              index > 0 ? "border-t border-[var(--border)]" : ""
            }`}
            key={user.email}
          >
            <div>
              <h2 className="font-extrabold">{user.name}</h2>
              <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
            </div>
            <p className="text-[var(--muted-foreground)]">{user.email}</p>
            <span className="inline-flex w-fit items-center gap-1 rounded-md bg-[var(--primary-muted)] px-2 py-1 text-xs font-bold text-[var(--primary-strong)]">
              <ShieldCheck aria-hidden="true" className="h-3 w-3" />
              {user.role}
            </span>
            <p className="font-extrabold">{user.orders}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
