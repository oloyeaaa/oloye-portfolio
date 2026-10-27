/* eslint-disable @next/next/no-img-element */

// Airtable's file is the mark only, so its name is written beside it.
const TOOLS: { name: string; src: string; h: string; label?: boolean }[] = [
  { name: "Claude", src: "/images/tools/claude-logo.svg", h: "h-7" },
  { name: "Airtable", src: "/images/tools/airtable-logo.svg", h: "h-8", label: true },
  { name: "Google Workspace", src: "/images/tools/google-workspace-logo.svg", h: "h-6" },
  { name: "Make", src: "/images/tools/make-logo.svg", h: "h-7" },
  { name: "ManyChat", src: "/images/tools/manychat-logo.svg", h: "h-7" },
  { name: "Loom", src: "/images/tools/loom-logo.svg", h: "h-8" },
  { name: "fal", src: "/images/tools/fal-logo.svg", h: "h-8" },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  // The list is doubled so the loop never shows a gap.
  const items = [...TOOLS, ...TOOLS];
  const ordered = reverse ? [...items].reverse() : items;
  return (
    <div className="marquee">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {ordered.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="flex h-20 w-48 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface px-6 sm:w-56"
            aria-hidden={i >= TOOLS.length ? true : undefined}
          >
            <img src={t.src} alt={t.label || i >= TOOLS.length ? "" : t.name} className={`${t.h} w-auto max-w-full object-contain`} />
            {t.label && <span className="ml-2.5 text-xl font-bold tracking-tight text-foreground">{t.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <div className="space-y-4">
      <Row />
      <Row reverse />
    </div>
  );
}
