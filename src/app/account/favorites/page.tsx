import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { favoriteProducts } from "@/features/account/account-data";

export default function AccountFavoritesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <Badge tone="coral">Favoritos</Badge>
        <h1 className="mt-3 text-3xl font-black">Productos guardados</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
          Guarda productos frecuentes para cotizarlos mas rapido.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {favoriteProducts.map((product) => (
          <article className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm" key={product.name}>
            <Heart aria-hidden="true" className="h-7 w-7 text-[var(--coral)]" />
            <h2 className="mt-4 text-lg font-bold">{product.name}</h2>
            <p className="mt-2 text-sm font-semibold text-[var(--primary)]">{product.price}</p>
            <ButtonLink className="mt-5 w-full" href={product.href} variant="secondary">
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              Cotizar
            </ButtonLink>
          </article>
        ))}
      </section>
    </div>
  );
}
