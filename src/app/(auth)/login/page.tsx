import Link from "next/link";
import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/auth-form";
import { loginAction, signInWithGoogleAction } from "@/features/auth/actions";

export const metadata: Metadata = {
  title: "Iniciar sesion",
  description:
    "Accede a tu cuenta de Sublimados Mike para consultar historial, favoritos y cotizaciones personalizadas.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[var(--primary)]">Cuenta</p>
        <h1 className="mt-2 text-3xl font-black">Inicia sesion</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
          Entra para ver historial, favoritos y cotizaciones guardadas.
        </p>
      </div>
      <AuthForm action={loginAction} googleAction={signInWithGoogleAction} mode="login" />
      <p className="mt-5 text-center text-sm text-[var(--muted-foreground)]">
        No tienes cuenta?{" "}
        <Link className="font-semibold text-[var(--primary)]" href="/register">
          Crear cuenta
        </Link>
      </p>
    </div>
  );
}
