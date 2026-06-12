"use client";

import { useEffect, useState } from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";

const steps = [
  { label: "Diagnose", text: "Find the real drop-off", color: "var(--coral)" },
  { label: "Decide", text: "Choose the best intervention", color: "var(--blue)" },
  { label: "Build", text: "Create an experiment-ready flow", color: "var(--violet)" },
];

export function HeroWorkspace() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActive((value) => (value + 1) % 4), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[590px]" aria-label="A PM Daily challenge progressing into an artifact">
      <div className="absolute -left-7 top-12 hidden h-32 w-32 rounded-full bg-[var(--coral-soft)] blur-2xl md:block" />
      <div className="absolute -right-8 bottom-16 hidden h-36 w-36 rounded-full bg-[var(--violet-soft)] blur-2xl md:block" />
      <div className="relative rotate-[1.3deg] rounded-[34px] border border-[var(--line)] bg-white p-4 shadow-[0_35px_90px_rgba(27,46,41,.16)] md:p-6">
        <div className="rounded-[26px] bg-[var(--pine-deep)] p-5 text-white md:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mono-label text-[var(--mint-strong)]">Technical PM · Day 08</p>
              <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">Improve login success</h3>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">55 min</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/72">Diagnose an OTP funnel, make a product decision, and leave with evidence you can show.</p>
        </div>

        <div className="space-y-2 p-2 pt-5">
          {steps.map((step, index) => {
            const complete = active > index;
            const current = active === index;
            return (
              <button key={step.label} onClick={() => setActive(index)} className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-500 ${current ? "translate-x-1 border-[var(--pine)] bg-[var(--mint)] shadow-sm" : "border-transparent bg-[var(--paper)] hover:border-[var(--line-strong)]"}`}>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold" style={{ background: complete ? "var(--pine)" : `color-mix(in srgb, ${step.color} 22%, white)`, color: complete ? "white" : "var(--ink)" }}>
                  {complete ? <Check className="size-5" /> : index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mono-label">{step.label}</span>
                  <span className="mt-1 block truncate font-semibold text-[var(--ink)]">{step.text}</span>
                </span>
                <ChevronRight className={`size-5 text-[var(--ink-faint)] transition ${current ? "translate-x-1 text-[var(--pine)]" : ""}`} />
              </button>
            );
          })}
        </div>

        <div className={`mx-2 mb-2 mt-4 overflow-hidden rounded-2xl border transition-all duration-500 ${active === 3 ? "max-h-40 border-[var(--amber)] bg-[var(--amber-soft)] p-4 opacity-100" : "max-h-0 border-transparent p-0 opacity-0"}`}>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[var(--amber)] text-[var(--pine-deep)]"><Sparkles className="size-5" /></span>
            <div>
              <p className="mono-label">Artifact shipped</p>
              <p className="font-display text-xl font-semibold">Login Success Case Study</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 -left-5 hidden rotate-[-6deg] rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xl md:block">
        <p className="mono-label">Skill demonstrated</p>
        <p className="mt-1 font-semibold">Experimentation +1</p>
      </div>
    </div>
  );
}
