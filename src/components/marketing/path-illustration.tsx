import type { PathDefinition } from "@/lib/data";

const tones = {
  coral: { a: "#ff7d63", b: "#ffe3dc", c: "#153d34" },
  blue: { a: "#4f7df3", b: "#dce7ff", c: "#17345f" },
  violet: { a: "#8858e8", b: "#eadfff", c: "#3d286a" },
  amber: { a: "#f4b64f", b: "#fff0cf", c: "#503810" },
};

export function PathIllustration({ tone, kind }: { tone: PathDefinition["tone"]; kind: string }) {
  const t = tones[tone];
  if (kind === "technical-pm") {
    return <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Connected API and system services illustration">
      <rect width="360" height="220" rx="30" fill={t.b}/><path d="M78 66h74M208 66h72M117 110h126M78 156h74M208 156h72" stroke={t.c} strokeWidth="3" strokeDasharray="7 8" opacity=".45"/>
      {[{x:42,y:40,w:82,h:52},{x:140,y:40,w:82,h:52},{x:236,y:40,w:82,h:52},{x:80,y:130,w:96,h:58},{x:198,y:130,w:96,h:58}].map((r,i)=><g key={i}><rect {...r} rx="14" fill="white" stroke={t.c} strokeWidth="2"/><circle cx={r.x+18} cy={r.y+18} r="6" fill={t.a}/><path d={`M${r.x+32} ${r.y+18}h${r.w-46}M${r.x+16} ${r.y+34}h${r.w-32}`} stroke={t.c} strokeWidth="3" strokeLinecap="round" opacity=".65"/></g>)}
      <circle cx="180" cy="110" r="19" fill={t.a} stroke={t.c} strokeWidth="3"/><path d="M173 110h14M180 103v14" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>;
  }
  if (kind === "ai-product-pm") {
    return <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="AI prompt retrieval and evaluation illustration">
      <rect width="360" height="220" rx="30" fill={t.b}/><rect x="38" y="43" width="110" height="134" rx="22" fill="white" stroke={t.c} strokeWidth="2"/><rect x="212" y="43" width="110" height="134" rx="22" fill="white" stroke={t.c} strokeWidth="2"/><path d="M148 91h64M148 132h64" stroke={t.c} strokeWidth="3" strokeDasharray="6 7" opacity=".55"/><circle cx="180" cy="91" r="16" fill={t.a}/><circle cx="180" cy="132" r="16" fill={t.a}/><path d="M69 76h49M69 96h33M69 132h49M69 152h39M239 76h49M239 96h31M239 132h49M239 152h36" stroke={t.c} strokeWidth="4" strokeLinecap="round" opacity=".65"/><path d="M174 91l5 5 8-10M174 132l5 5 8-10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>;
  }
  if (kind === "portfolio-builder") {
    return <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Layered portfolio documents illustration">
      <rect width="360" height="220" rx="30" fill={t.b}/><g transform="translate(75 30) rotate(-6 105 80)"><rect width="210" height="160" rx="20" fill="#fff" stroke={t.c} strokeWidth="2"/><rect x="22" y="22" width="60" height="12" rx="6" fill={t.a}/><path d="M22 55h150M22 76h122M22 108h70" stroke={t.c} strokeWidth="5" strokeLinecap="round" opacity=".5"/><circle cx="157" cy="116" r="28" fill={t.a} opacity=".3"/></g><g transform="translate(112 54) rotate(5 95 70)"><rect width="190" height="140" rx="20" fill="#fff" stroke={t.c} strokeWidth="2"/><path d="M24 31h90M24 57h142M24 80h105" stroke={t.c} strokeWidth="5" strokeLinecap="round" opacity=".6"/><rect x="24" y="101" width="65" height="18" rx="9" fill={t.a}/></g>
    </svg>;
  }
  return <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label="Product discovery and decision illustration">
    <rect width="360" height="220" rx="30" fill={t.b}/><path d="M80 142C104 104 132 119 153 82s53-41 77-9 28 34 55 18" stroke={t.c} strokeWidth="4" fill="none" strokeDasharray="8 9" opacity=".48"/><rect x="34" y="42" width="92" height="72" rx="18" fill="#fff" stroke={t.c} strokeWidth="2"/><rect x="136" y="105" width="92" height="72" rx="18" fill="#fff" stroke={t.c} strokeWidth="2"/><rect x="238" y="44" width="88" height="72" rx="18" fill="#fff" stroke={t.c} strokeWidth="2"/><path d="M56 68h49M56 88h35M158 131h49M158 151h31M259 70h45M259 90h33" stroke={t.c} strokeWidth="4" strokeLinecap="round" opacity=".65"/><circle cx="181" cy="76" r="25" fill={t.a}/><path d="M170 76l8 8 15-18" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
