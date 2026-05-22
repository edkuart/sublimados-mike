import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPolicyPage, policyPages } from "@/features/policies/policy-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyPage(slug);

  if (!policy) {
    return {
      title: "Politica no encontrada | Sublimados Mike",
    };
  }

  return {
    title: `${policy.title} | Sublimados Mike`,
    description: policy.summary,
  };
}

export function generateStaticParams() {
  return policyPages.map((policy) => ({ slug: policy.slug }));
}

export default async function PolicyDetailPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyPage(slug);

  if (!policy) {
    notFound();
  }

  const Icon = policy.icon;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--surface-subtle)]">
        <section className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-[12.5px] text-[var(--muted-foreground)]">
              <Link href="/" className="font-medium hover:text-[var(--primary)]">Inicio</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <Link href="/politicas" className="font-medium hover:text-[var(--primary)]">Politicas</Link>
              <ChevronRight size={12} className="opacity-50" aria-hidden="true" />
              <span className="font-semibold text-[var(--foreground)]">{policy.title}</span>
            </nav>
            <span className="mt-6 grid h-12 w-12 place-items-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight">{policy.title}</h1>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">{policy.summary}</p>
            <p className="mt-3 text-xs font-semibold text-[var(--muted-foreground)]">
              Ultima actualizacion: {policy.updatedAt}
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-8">
              {policy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-black">{section.heading}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted-foreground)]">
                      {section.bullets.map((bullet) => (
                        <li className="flex gap-2" key={bullet}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-[var(--gold)]/30 bg-[var(--gold-muted)] p-5 text-sm leading-6 text-[var(--gold-strong)]">
            Estas politicas son una base operativa para el proyecto. Antes de publicar en
            produccion conviene revisarlas con asesoria legal segun jurisdiccion, facturacion
            y operacion real del negocio.
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
