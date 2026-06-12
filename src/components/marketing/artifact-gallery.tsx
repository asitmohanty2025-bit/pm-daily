import { artifacts } from "@/lib/data";

const toneMap: Record<string, string> = {
  coral: "from-[#ff7d63] to-[#f8a28f]",
  blue: "from-[#4f7df3] to-[#83a5ff]",
  amber: "from-[#e9a238] to-[#f4c56f]",
  violet: "from-[#8457dd] to-[#b590ff]",
  green: "from-[#267b66] to-[#65aa91]",
};

export function ArtifactGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {artifacts.map((artifact, index) => (
        <article key={artifact.title} className={`group relative min-h-[285px] overflow-hidden rounded-[26px] bg-gradient-to-br ${toneMap[artifact.tone]} p-5 text-white shadow-[0_18px_50px_rgba(25,43,38,.12)] transition duration-300 hover:-translate-y-2 ${index % 2 ? "md:translate-y-8" : ""}`}>
          <div className="absolute inset-x-5 top-5 h-2 rounded-full bg-white/30" />
          <div className="mt-8 rounded-[18px] bg-white/94 p-4 text-[var(--ink)] shadow-lg">
            <p className="mono-label">PM Daily artifact</p>
            <h3 className="mt-3 font-display text-2xl tracking-[-0.04em]">{artifact.title}</h3>
            <div className="mt-5 space-y-2"><div className="h-2 w-full rounded-full bg-black/8"/><div className="h-2 w-4/5 rounded-full bg-black/8"/><div className="h-2 w-2/3 rounded-full bg-black/8"/></div>
            <div className="mt-7 h-14 rounded-xl bg-[var(--paper)]" />
          </div>
          <p className="absolute bottom-5 left-5 text-sm font-semibold text-white/85">{artifact.subtitle}</p>
        </article>
      ))}
    </div>
  );
}
