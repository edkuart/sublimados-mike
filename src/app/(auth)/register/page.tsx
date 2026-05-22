import Link from "next/link";
import { AuthForm } from "@/features/auth/auth-form";
import { registerAction, signInWithGoogleAction } from "@/features/auth/actions";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[var(--primary)]">Nuevo cliente</p>
        <h1 className="mt-2 text-3xl font-black">Crea tu cuenta</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
          Guarda tus datos para futuras compras y da seguimiento a tus pedidos.
        </p>
      </div>
      <AuthForm action={registerAction} googleAction={signInWithGoogleAction} mode="register" />
      <p className="mt-5 text-center text-sm text-[var(--muted-foreground)]">
        Ya tienes cuenta?{" "}
        <Link className="font-semibold text-[var(--primary)]" href="/login">
          Iniciar sesion
        </Link>
      </p>
    </div>
  );
}
