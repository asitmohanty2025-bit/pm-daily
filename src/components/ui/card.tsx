import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[28px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]", className)} {...props} />;
}
