import type { ReactNode } from "react";
import { Heart, History, Home, LogOut, Settings, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";

const navItems = [
  { label: "Resumen", href: "/account", icon: Home },
  { label: "Perfil", href: "/account/profile", icon: UserRound },
  { label: "Historial", href: "/account/history", icon: History },
  { label: "Favoritos", href: "/account/favorites", icon: Heart },
  { label: "Preferencias", href: "/account/settings", icon: Settings },
];

export function AccountShell({
  children,
  email,
}: {
  children: ReactNode;
  email: string | null;
}) {
  return (
    <main className="min-h-screen bg-[var(--surface-subtle)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-[var(--border)] bg-white p-4 shadow-sm">
          <div className="border-b border-[var(--border)] pb-4">
            <p className="text-sm font-semibold text-[var(--primary)]">Panel comprador</p>
            <p className="mt-1 truncate text-sm text-[var(--muted-foreground)]">{email}</p>
          </div>
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  className="flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>
          <form action={logoutAction} className="mt-4 border-t border-[var(--border)] pt-4">
            <Button className="w-full" type="submit" variant="secondary">
              <LogOut aria-hidden="true" className="h-4 w-4" />
              Cerrar sesion
            </Button>
          </form>
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}
