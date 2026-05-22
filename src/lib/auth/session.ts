import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { canAccessAdmin, type AppRole } from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function parseRoleNames(value: unknown): AppRole[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((role): role is AppRole => typeof role === "string") as AppRole[];
}

export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
    roleNames: parseRoleNames(user.app_metadata?.roles),
  };
});

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdminUser() {
  const user = await requireUser();

  if (!canAccessAdmin(user.roleNames)) {
    redirect("/account");
  }

  return user;
}
