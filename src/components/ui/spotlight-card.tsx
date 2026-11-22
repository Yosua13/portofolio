"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--card-shadow)] backdrop-blur-md transition-colors duration-300 hover:border-[var(--border-strong)]",
          className
        )}
        {...props}
      >
        <div className="relative z-10 h-full">{children}</div>
      </div>
    );
  }
);
SpotlightCard.displayName = "SpotlightCard";
