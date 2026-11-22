import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]",
        accent:
          "border-[var(--accent)]/30 bg-[var(--accent-soft)] text-[var(--accent-text)]",
        cyan:
          "border-sky-500/25 bg-[var(--cyan-soft)] text-[var(--cyan-text)]",
        emerald:
          "border-emerald-500/30 bg-[var(--emerald-soft)] text-[var(--emerald-text)]",
        amber:
          "border-amber-500/30 bg-[var(--amber-soft)] text-[var(--amber-text)]",
        rose:
          "border-rose-500/30 bg-[var(--rose-soft)] text-[var(--rose-text)]",
        violet:
          "border-violet-500/25 bg-[var(--violet-soft)] text-[var(--violet-text)]",
        outline:
          "border-[var(--border-strong)] bg-transparent text-[var(--muted-foreground)]",
        muted:
          "border-[var(--border)] bg-transparent text-[var(--muted-foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
