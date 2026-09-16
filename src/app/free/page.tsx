import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { webPageSchema } from "@/lib/schema";
import { FREEBIES } from "@/lib/freebies";
import CopyPrompt from "@/components/CopyPrompt";

const TITLE = "Free AI Prompt Engines & Systems Vault — Oloye Adeosun";
const DESCRIPTION =
  "Production-grade system prompts for Google AI Studio & Gemini. Copy, paste, and run in 1 click.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/free` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/free`,
    type: "website",
  },
};

export default function FreePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/free",
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Prompt Lab", path: "/free" },
          ],
        })}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
        {/* Header */}
        <div className="space-y-2 border-b border-border pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-accent">
            <span>Google AI Studio & Gemini Stack</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Free AI Prompt Engines
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            Production-grade system prompts for Google AI Studio & Gemini. Copy, paste, and run in 1 click.
          </p>
        </div>

        {/* Prompt Engines Catalog */}
        <div className="space-y-8">
          {FREEBIES.map((freebie, idx) => (
            <article
              key={freebie.slug}
              id={freebie.slug}
              className="rounded-xl border border-border bg-surface p-5 sm:p-6 space-y-4 scroll-mt-24 transition hover:border-accent/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-raised font-mono text-[11px] font-bold text-accent border border-border">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-foreground sm:text-lg">
                      {freebie.name}
                    </h2>
                    <p className="text-xs text-muted line-clamp-1">
                      {freebie.promise}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded bg-background px-2 py-0.5 text-[10px] font-mono text-muted border border-border">
                    {freebie.time}
                  </span>
                  <span className="rounded bg-background px-2 py-0.5 text-[10px] font-mono text-accent border border-border">
                    Gemini 2.5 Flash
                  </span>
                </div>
              </div>

              {/* Execution Prompt Terminal */}
              <div>
                <CopyPrompt prompt={freebie.prompt} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
