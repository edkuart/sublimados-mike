import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:bg-[var(--primary-strong)]",
  secondary:
    "border border-[var(--border)] bg-white text-[var(--foreground)] shadow-sm hover:border-[var(--primary-soft)]",
  ghost: "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
};

const baseClasses =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:pointer-events-none disabled:opacity-50";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </a>
  );
}
