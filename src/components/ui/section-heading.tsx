import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, body, align = "left", className }: { eyebrow: string; title: string; body?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-balance font-display text-4xl leading-[1.02] tracking-[-0.045em] text-[var(--ink)] md:text-6xl">{title}</h2>
      {body ? <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-[var(--ink-soft)]">{body}</p> : null}
    </div>
  );
}
