import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--focus)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--pine)] text-white shadow-[0_10px_30px_rgba(22,57,49,.22)] hover:-translate-y-0.5 hover:bg-[var(--pine-strong)]",
        outline: "border border-[var(--line-strong)] bg-white/75 text-[var(--ink)] hover:-translate-y-0.5 hover:border-[var(--pine)] hover:bg-white",
        amber: "bg-[var(--amber)] text-[var(--pine-deep)] shadow-[0_10px_25px_rgba(245,174,72,.25)] hover:-translate-y-0.5 hover:bg-[var(--amber-strong)]",
        ghost: "text-[var(--ink-soft)] hover:bg-[var(--mint)] hover:text-[var(--pine)]",
      },
      size: {
        default: "h-11",
        lg: "h-13 px-7 text-base",
        sm: "h-9 min-h-9 px-4 text-xs",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
