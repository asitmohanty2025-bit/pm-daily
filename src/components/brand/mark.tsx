export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-[14px] bg-[var(--pine)] text-white shadow-[0_8px_24px_rgba(18,43,38,.22)]" aria-hidden="true">
        <svg viewBox="0 0 40 40" className="size-7" fill="none">
          <path d="M11 13.5h18M11 20h12M11 26.5h15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="28" cy="20" r="4.4" fill="var(--amber)" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      {!compact && (
        <div>
          <p className="font-display text-xl font-semibold leading-none tracking-[-0.03em]">PM Daily</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-faint)]">Learning by shipping</p>
        </div>
      )}
    </div>
  );
}
