import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const eyebrowTones = {
  purple: "bg-[var(--primary-muted)] text-[var(--primary-strong)]",
  teal: "bg-[var(--accent-muted)] text-[var(--accent-strong)]",
  coral: "bg-[var(--coral-muted)] text-[var(--coral)]",
  gold: "bg-[var(--gold-muted)] text-[var(--gold-strong)]",
};

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowTone?: keyof typeof eyebrowTones;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  cta?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowTone = "purple",
  title,
  subtitle,
  align = "center",
  cta,
  className,
}: SectionHeaderProps) {
  if (align === "left") {
    return (
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end",
          className,
        )}
      >
        <div className="max-w-2xl">
          {eyebrow && (
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider",
                eyebrowTones[eyebrowTone],
              )}
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-current" />
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-[40px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--muted-foreground)]">
              {subtitle}
            </p>
          )}
        </div>
        {cta}
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider",
            eyebrowTones[eyebrowTone],
          )}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-current" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-black tracking-tight sm:text-[42px]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[var(--muted-foreground)]">
          {subtitle}
        </p>
      )}
      {cta}
    </div>
  );
}
