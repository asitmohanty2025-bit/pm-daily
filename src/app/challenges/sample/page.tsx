"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Lightbulb, LockKeyhole, Save } from "lucide-react";
import { sampleChallenge } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/mark";

export default function SampleChallengePage() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [responses, setResponses] = useState(["", "", ""]);
  const current = sampleChallenge.problems[active];
  const canContinue = responses[active].trim().length >= 20;
  const progress = useMemo(() => Math.round((completed.length / 3) * 100), [completed]);

  function saveAndContinue() {
    if (!canContinue) return;
    setCompleted((items) => Array.from(new Set([...items, active])));
    if (active < 2) setActive(active + 1);
  }

  return <main className="min-h-screen bg-[var(--paper)]"><header className="border-b border-[var(--line)] bg-white"><div className="container-shell flex h-20 items-center justify-between"><Link href="/"><BrandMark /></Link><Button variant="ghost" asChild><Link href="/"><ArrowLeft className="size-4" /> Exit preview</Link></Button></div></header><div className="container-shell grid gap-8 py-8 lg:grid-cols-[300px_1fr] lg:py-12"><aside><p className="mono-label">Sample challenge</p><h1 className="mt-3 font-display text-4xl tracking-[-0.045em]">{sampleChallenge.title}</h1><p className="mt-4 text-sm leading-6 text-[var(--ink-soft)]">{sampleChallenge.summary}</p><div className="mt-7 h-2 overflow-hidden rounded-full bg-[var(--line)]"><div className="h-full rounded-full bg-[var(--pine)] transition-all" style={{width:`${progress}%`}} /></div><p className="mt-2 text-xs font-semibold text-[var(--ink-faint)]">{progress}% of the sample completed</p><div className="mt-8 space-y-2">{sampleChallenge.problems.map((problem,index)=>{const unlocked=index===0||completed.includes(index-1)||completed.includes(index);const done=completed.includes(index);return <button key={problem.type} disabled={!unlocked} onClick={()=>unlocked&&setActive(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${active===index?"border-[var(--pine)] bg-[var(--mint)]":"border-transparent bg-white"} ${!unlocked?"opacity-55":""}`}><span className={`grid size-9 place-items-center rounded-xl ${done?"bg-[var(--pine)] text-white":"bg-[var(--paper)] text-[var(--ink-soft)]"}`}>{done?<Check className="size-4"/>:unlocked?index+1:<LockKeyhole className="size-4"/>}</span><span><span className="mono-label">Problem {index+1}</span><span className="mt-1 block text-sm font-bold">{problem.type}</span></span></button>})}</div></aside><section className="rounded-[32px] border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-soft)] md:p-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="mono-label">Problem {active+1} of 3 · {current.type}</p><h2 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-5xl">{current.title}</h2></div><span className="rounded-full bg-[var(--paper)] px-4 py-2 text-sm font-bold text-[var(--ink-soft)]">{current.stat}</span></div><div className="mt-8 rounded-[24px] bg-[var(--paper)] p-6"><p className="mono-label">Your task</p><p className="mt-3 text-lg leading-8 text-[var(--ink)]">{current.prompt}</p><div className="mt-5 flex items-start gap-3 rounded-2xl bg-[var(--amber-soft)] p-4"><Lightbulb className="mt-0.5 size-5 shrink-0 text-[var(--pine)]"/><p className="text-sm leading-6 text-[var(--ink-soft)]">Strong answers explain the evidence, acknowledge uncertainty, and make the next decision easier.</p></div></div><label className="mt-8 block"><span className="mono-label">Your response</span><textarea value={responses[active]} onChange={(event)=>setResponses((all)=>all.map((value,index)=>index===active?event.target.value:value))} className="mt-3 min-h-56 w-full resize-y rounded-[22px] border border-[var(--line-strong)] bg-white p-5 leading-7 outline-none transition focus:border-[var(--pine)] focus:ring-4 focus:ring-[var(--focus)]" placeholder="Write your reasoning here…"/></label><div className="mt-5 flex flex-col justify-between gap-3 border-t border-[var(--line)] pt-6 sm:flex-row"><Button variant="ghost"><Save className="size-4"/> Save draft</Button><div className="flex gap-3">{active>0?<Button variant="outline" onClick={()=>setActive(active-1)}>Back</Button>:null}<Button onClick={saveAndContinue} disabled={!canContinue}>{active===2?"Finish sample":"Save and continue"}<ArrowRight className="size-4"/></Button></div></div>{!canContinue?<p className="mt-3 text-right text-xs text-[var(--ink-faint)]">Write at least a few sentences to continue.</p>:null}</section></div></main>;
}
