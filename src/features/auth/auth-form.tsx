"use client";

import { useActionState } from "react";
import { LoaderCircle, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuthActionState } from "./validation";

type AuthFormProps = {
  mode: "login" | "register";
  action: (state: AuthActionState, formData: FormData) => Promise<AuthActionState>;
  googleAction: () => Promise<AuthActionState>;
};

const initialState: AuthActionState = {};

export function AuthForm({ mode, action, googleAction }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [googleState, googleFormAction, googlePending] = useActionState(
    async () => googleAction(),
    initialState,
  );

  const isRegister = mode === "register";

  return (
    <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
      <form action={googleFormAction}>
        <Button className="w-full" disabled={googlePending} type="submit" variant="secondary">
          {googlePending ? (
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <MailCheck aria-hidden="true" className="h-4 w-4" />
          )}
          Continuar con Google
        </Button>
      </form>

      {googleState.message ? (
        <p className="mt-3 rounded-lg bg-[var(--coral-muted)] px-3 py-2 text-sm text-[var(--coral)]">
          {googleState.message}
        </p>
      ) : null}

      <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        <span className="h-px flex-1 bg-[var(--border)]" />
        Correo
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <form action={formAction} className="space-y-4">
        {isRegister ? (
          <Field
            error={state.fieldErrors?.fullName?.[0]}
            id="fullName"
            label="Nombre completo"
            name="fullName"
            placeholder="Mike Sublimados"
            type="text"
          />
        ) : null}

        <Field
          error={state.fieldErrors?.email?.[0]}
          id="email"
          label="Correo"
          name="email"
          placeholder="cliente@correo.com"
          type="email"
        />

        <Field
          error={state.fieldErrors?.password?.[0]}
          id="password"
          label="Contrasena"
          name="password"
          placeholder="Minimo 8 caracteres"
          type="password"
        />

        {state.message ? (
          <p className="rounded-lg bg-[var(--coral-muted)] px-3 py-2 text-sm text-[var(--coral)]">
            {state.message}
          </p>
        ) : null}

        <Button className="w-full" disabled={pending} type="submit">
          {pending ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
          {isRegister ? "Crear cuenta" : "Iniciar sesion"}
        </Button>
      </form>
    </div>
  );
}

function Field({
  error,
  id,
  label,
  name,
  placeholder,
  type,
}: {
  error?: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-2 min-h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3 text-sm outline-none transition-colors placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)]"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      {error ? <p className="mt-2 text-sm text-[var(--coral)]">{error}</p> : null}
    </div>
  );
}
