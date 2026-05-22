import type { ReactNode } from "react";
import { AccountShell } from "@/components/layout/account-shell";
import { requireUser } from "@/lib/auth/session";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return <AccountShell email={user.email}>{children}</AccountShell>;
}
