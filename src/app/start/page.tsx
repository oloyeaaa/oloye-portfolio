import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { START_FOOTNOTE, START_LINKS, type StartArt } from "@/lib/startLinks";

// "Start here": Oloye's link-in-bio page (9 Nov 2026), opened from TikTok.
// No site header or footer (BARE_PATHS in SiteChrome). Words: content/start/WORDS.md.

export const metadata: Metadata = {
  title: { absolute: "Start Here | Oloye" },
  description:
    "Free tools from Oloye. Find what to post about and what to sell, or check where your business is losing leads.",
  alternates: { canonical: `${SITE_URL}/start` },
};

/** The small brand picture on each card: drawn here, so nothing extra loads. */
function Art({ kind }: { kind: StartArt }) {
  if (kind === "ideas") {
    const rows = ["What to post", "Who it's for", "A free thing", "Something to sell"];
    return (
      <div className="flex h-full flex-col justify-center gap-1.5 p-3">
        {rows.map((r, i) => (
          <div
            key={r}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px] font-semibold leading-none ${
              i === 0 ? "bg-accent text-[#0E0F12]" : "bg-[#1C1E24] text-[#EDEDED]"
            }`}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${i === 0 ? "bg-[#0E0F12]" : "bg-accent"}`} />
            {r}
          </div>
        ))}
      </div>
    );
  }
  // "score": a score ring and three leaks, no real person's numbers.
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
      <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="#2A2D35" strokeWidth="4" />
        <circle cx="18" cy="18" r="15" fill="none" stroke="#C6F23C" strokeWidth="4" strokeDasharray="62 100" strokeLinecap="round" />
      </svg>
      <div className="w-full space-y-1">
        {[70, 50, 35].map((w) => (
          <div key={w} className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#DC2626]" />
            <span className="h-1 rounded-full bg-[#3A3D45]" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-12 pt-10">
      <div className="mx-auto max-w-md">
        <header className="text-center">
          <Image
            src="/images/brand/avatar-lime-320.jpg"
            alt="Oloye"
            width={96}
            height={96}
            priority
            className="mx-auto h-24 w-24 rounded-full border-2 border-white shadow-sm"
          />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Oloye</h1>
          <p className="mx-auto mt-2 max-w-xs text-[15px] leading-snug text-primary-dim">
            Get your time back and stop losing leads. AI systems built for your business.
          </p>
        </header>

        <ul className="mt-8 space-y-4">
          {START_LINKS.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className="group flex overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:border-border-strong hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark active:scale-[0.99]"
              >
                <div aria-hidden className="w-28 shrink-0 bg-[#0E0F12]">
                  <Art kind={card.art} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-accent-dark">{card.label}</p>
                  <p className="mt-1 text-[17px] font-bold leading-snug text-foreground">{card.title}</p>
                  <p className="mt-1.5 text-[14px] leading-snug text-primary-dim">{card.description}</p>
                </div>
                <span aria-hidden className="flex items-center pr-3 text-xl text-muted transition group-hover:translate-x-0.5 group-hover:text-foreground">
                  &rsaquo;
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-muted">{START_FOOTNOTE}</p>
      </div>
    </div>
  );
}
