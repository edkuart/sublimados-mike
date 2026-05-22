"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema, type AuthActionState } from "./validation";

export async function loginAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      message: "Supabase Auth aun no esta configurado. Agrega las variables de entorno.",
    };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedFields.data);

  if (error) {
    return {
      message: "No pudimos iniciar sesion con esos datos.",
    };
  }

  redirect("/account");
}

export async function registerAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const validatedFields = registerSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      message: "Supabase Auth aun no esta configurado. Agrega las variables de entorno.",
    };
  }

  const { email, password, fullName } = validatedFields.data;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return {
      message: "No pudimos crear la cuenta. Revisa los datos o intenta mas tarde.",
    };
  }

  redirect("/account");
}

export async function signInWithGoogleAction(): Promise<AuthActionState> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      message: "Supabase Auth aun no esta configurado. Agrega las variables de entorno.",
    };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error || !data.url) {
    return {
      message: "No pudimos iniciar el flujo de Google.",
    };
  }

  redirect(data.url);
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  redirect("/");
}
