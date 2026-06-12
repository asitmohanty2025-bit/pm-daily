import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PathDefinition } from "@/lib/data";
import { PathIllustration } from "./path-illustration";

export function PathCard({ path }: { path: PathDefinition }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-[var(--line)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(22,45,39,.14)]">
      <div className="aspect-[1.62] overflow-hidden p-3"><PathIllustration tone={path.tone} kind={path.slug} /></div>
      <div className="p-6 pt-4">
        <p className="mono-label">{path.eyebrow}</p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl tracking-[-0.04em]">{path.title}</h3>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--paper)] text-[var(--pine)] transition group-hover:bg-[var(--pine)] group-hover:text-white"><ArrowUpRight className="size-5" /></span>
        </div>
        <p className="mt-3 leading-7 text-[var(--ink-soft)]">{path.description}</p>
        <p className="mt-5 border-l-2 border-[var(--amber)] pl-4 text-sm font-semibold leading-6 text-[var(--ink)]">{path.outcome}</p>
        <div className="mt-5 flex flex-wrap gap-2">{path.skills.map(skill => <span key={skill} className="rounded-full bg-[var(--paper)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)]">{skill}</span>)}</div>
        <Link href={`/explore?path=${path.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--pine)]">Explore path <ArrowUpRight className="size-4" /></Link>
      </div>
    </article>
  );
}
