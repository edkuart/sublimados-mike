import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "purple" | "teal" | "neutral" | "coral";

const toneClasses: Record<BadgeTone, string> = {
  purple: "bg-[var(--primary-muted)] text-[var(--primary)]",
  teal: "bg-[var(--accent-muted)] text-[var(--accent-strong)]",
  neutral: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  coral: "bg-[var(--coral-muted)] text-[var(--coral)]",
};

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
