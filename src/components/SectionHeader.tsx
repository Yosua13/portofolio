"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index?: string;
  eyebrow: string;
  title: string;
  titleItalic?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  index,
  eyebrow,
  title,
  titleItalic,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between border-b border-[var(--border)] pb-7",
        className
      )}
    >
      <div className="space-y-3 text-left max-w-2xl">
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          {index && (
            <span className="font-semibold text-[var(--accent-text)]">
              {index}
            </span>
          )}
          {index && <span className="h-px w-4 bg-[var(--border-strong)]" />}
          <span>{eyebrow}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--foreground)]">
          {title}
          {titleItalic && (
            <>
              {" "}
              <span className="font-editorial italic font-normal text-[var(--accent-text)] tracking-normal">
                {titleItalic}
              </span>
            </>
          )}
        </h2>

        {subtitle && (
          <p className="max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)]">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
