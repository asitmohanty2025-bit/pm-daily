"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock3, FileText } from "lucide-react";
import { sampleChallenge } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function ChallengePreview() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid overflow-hidden rounded-[34px] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[.86fr_1.14fr]">
      <div className="bg-[var(--pine-deep)] p-7 text-white md:p-10">
        <p className="mono-label text-[var(--mint-strong)]">{sampleChallenge.eyebrow}</p>
        <h3 className="mt-4 font-display text-4xl tracking-[-0.045em] md:text-5xl">{sampleChallenge.title}</h3>
        <p className="mt-5 text-base leading-7 text-white/72">{sampleChallenge.summary}</p>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/8 p-4"><Clock3 className="size-5 text-[var(--amber)]" /><p className="mt-3 text-xs uppercase tracking-[.12em] text-white/55">Time</p><p className="mt-1 font-semibold">{sampleChallenge.duration}</p></div>
          <div className="rounded-2xl bg-white/8 p-4"><FileText className="size-5 text-[var(--amber)]" /><p className="mt-3 text-xs uppercase tracking-[.12em] text-white/55">You ship</p><p className="mt-1 font-semibold">{sampleChallenge.artifact}</p></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">{sampleChallenge.skills.map(skill => <span key={skill} className="rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-semibold text-white/78">{skill}</span>)}</div>
      </div>
      <div className="p-5 md:p-8">
        <div className="mb-6 flex items-center justify-between"><p className="mono-label">Problem {active + 1} of 3</p><p className="text-sm font-semibold text-[var(--ink-faint)]">One artifact at the finish</p></div>
        <div className="grid grid-cols-3 gap-2" aria-label="Challenge problem selector">
          {sampleChallenge.problems.map((problem, index) => <button key={problem.type} onClick={() => setActive(index)} className={`rounded-xl px-3 py-3 text-left transition ${active === index ? "bg-[var(--mint)] text-[var(--pine)]" : "bg-[var(--paper)] text-[var(--ink-faint)]"}`}><span className="block text-[10px] font-bold uppercase tracking-[.13em]">{index + 1}</span><span className="mt-1 block text-sm font-bold">{problem.type}</span></button>)}
        </div>
        <div className="mt-6 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4"><p className="mono-label">{sampleChallenge.problems[active].type}</p><span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink-soft)]">{sampleChallenge.problems[active].stat}</span></div>
          <h4 className="mt-4 font-display text-3xl tracking-[-0.04em]">{sampleChallenge.problems[active].title}</h4>
          <p className="mt-4 text-base leading-7 text-[var(--ink-soft)]">{sampleChallenge.problems[active].prompt}</p>
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white p-4"><span className="grid size-9 place-items-center rounded-xl bg-[var(--mint)] text-[var(--pine)]"><Check className="size-4" /></span><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--ink-faint)]">Output</p><p className="font-semibold">{sampleChallenge.problems[active].output}</p></div></div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><Link href="/challenges/sample">Try this challenge <ArrowRight className="size-4" /></Link></Button><Button size="lg" variant="outline" asChild><Link href="/explore">See more challenges</Link></Button></div>
      </div>
    </div>
  );
}
