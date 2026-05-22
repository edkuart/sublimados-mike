import { Plus, Search } from "lucide-react";
import { adminProductRows } from "@/features/admin/admin-data";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">Catalogo</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight">Productos</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Inventario administrativo para productos, estados, variantes y precios base.
            </p>
          </div>
          <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white">
            <Plus aria-hidden="true" className="h-4 w-4" />
            Nuevo producto
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2">
          <Search aria-hidden="true" className="h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            aria-label="Buscar productos"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
            placeholder="Buscar por nombre, categoria o estado"
            type="search"
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
        {adminProductRows.map((product, index) => (
          <article
            className={`grid gap-3 px-5 py-4 text-sm md:grid-cols-[1.4fr_0.7fr_0.6fr_0.5fr_0.5fr] md:items-center ${
              index > 0 ? "border-t border-[var(--border)]" : ""
            }`}
            key={product.name}
          >
            <div>
              <h2 className="font-extrabold">{product.name}</h2>
              <p className="text-xs text-[var(--muted-foreground)]">{product.variants} variantes configuradas</p>
            </div>
            <p className="font-semibold text-[var(--muted-foreground)]">{product.category}</p>
            <p className="font-extrabold">{product.price}</p>
            <span className="w-fit rounded-md bg-[var(--primary-muted)] px-2 py-1 text-xs font-bold text-[var(--primary-strong)]">
              {product.status}
            </span>
            <button className="w-fit text-sm font-bold text-[var(--primary)]">Editar</button>
          </article>
        ))}
      </section>
    </div>
  );
}
