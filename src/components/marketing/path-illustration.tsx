const colors = {
  coral: { bg: "#ffe3dc", accent: "#ff7d63" },
  blue: { bg: "#dce7ff", accent: "#527df2" },
  violet: { bg: "#eadfff", accent: "#8658e5" },
  amber: { bg: "#fff0cf", accent: "#f3b14c" },
};

export function PathIllustration({ tone, kind }: { tone: keyof typeof colors; kind: string }) {
  const color = colors[tone];
  return (
    <div className="h-full w-full overflow-hidden rounded-[24px]" style={{ background: color.bg }}>
      <svg viewBox="0 0 360 220" className="h-full w-full" role="img" aria-label={`${kind} path illustration`}>
        <rect x="38" y="47" width="112" height="126" rx="20" fill="white" stroke="#173f36" strokeWidth="2" />
        <rect x="192" y="35" width="126" height="150" rx="20" fill="white" stroke="#173f36" strokeWidth="2" />
        <path d="M66 76h58M66 99h42M66 122h52M220 69h66M220 94h44M220 132h62" stroke="#173f36" strokeWidth="5" strokeLinecap="round" opacity=".48" />
        <circle cx="171" cy="110" r="27" fill={color.accent} />
        <path d="m159 110 9 9 17-20" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
