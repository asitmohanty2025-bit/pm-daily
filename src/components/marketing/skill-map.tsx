"use client";

import { useState } from "react";

const skills = [
  { name: "Product thinking", x: 50, y: 46, evidence: "12 challenges", artifact: "Decision memos" },
  { name: "Discovery", x: 18, y: 24, evidence: "8 challenges", artifact: "Research plans" },
  { name: "Execution", x: 82, y: 24, evidence: "9 challenges", artifact: "PRDs" },
  { name: "Data", x: 18, y: 74, evidence: "10 challenges", artifact: "Metric trees" },
  { name: "Technology", x: 82, y: 74, evidence: "14 challenges", artifact: "System designs" },
  { name: "AI", x: 50, y: 88, evidence: "15 challenges", artifact: "AI product specs" },
];

export function SkillMap() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid items-center gap-8 rounded-[34px] border border-[var(--line)] bg-white p-5 shadow-[var(--shadow-soft)] md:p-8 lg:grid-cols-[1.2fr_.8fr]">
      <div className="relative aspect-[1.2] overflow-hidden rounded-[28px] bg-[var(--pine-deep)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 46L18 24M50 46L82 24M50 46L18 74M50 46L82 74M50 46L50 88" stroke="rgba(255,255,255,.18)" strokeWidth=".7" strokeDasharray="2 2"/></svg>
        {skills.map((skill, index) => <button key={skill.name} onClick={() => setSelected(index)} className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-bold transition md:px-4 md:py-3 ${selected === index ? "scale-110 border-[var(--amber)] bg-[var(--amber)] text-[var(--pine-deep)] shadow-xl" : "border-white/15 bg-white/8 text-white hover:bg-white/16"}`} style={{ left: `${skill.x}%`, top: `${skill.y}%` }}>{skill.name}</button>)}
      </div>
      <div className="p-2 md:p-5">
        <p className="mono-label">Evidence-backed skill</p>
        <h3 className="mt-4 font-display text-4xl tracking-[-0.04em]">{skills[selected].name}</h3>
        <p className="mt-4 leading-7 text-[var(--ink-soft)]">Skills grow when you complete relevant challenges, ship artifacts, attach proof, and reflect—not when you merely watch content.</p>
        <dl className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[var(--paper)] p-4"><dt className="mono-label">Practice</dt><dd className="mt-2 font-semibold">{skills[selected].evidence}</dd></div>
          <div className="rounded-2xl bg-[var(--paper)] p-4"><dt className="mono-label">Evidence</dt><dd className="mt-2 font-semibold">{skills[selected].artifact}</dd></div>
        </dl>
      </div>
    </div>
  );
}
