import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--line)] bg-white/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)]",
        className
      )}
      {...props}
    />
  );
}
