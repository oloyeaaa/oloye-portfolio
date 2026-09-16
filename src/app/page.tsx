import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL, LINKEDIN_URL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";
import TerminalPromptCard from "@/components/TerminalPromptCard";
import CopyPrompt from "@/components/CopyPrompt";
import { FREEBIES } from "@/lib/freebies";

const TITLE = "Oloye Adeosun — Marketing Automation, Buyer Psychology & Google AI Stack";
const DESCRIPTION =
  "Enterprise Marketing Automation Specialist showing 9-to-5 operators how to build real AI systems and digital assets with Google AI Studio.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "profile",
  },
};

const scannerPrompt = FREEBIES.find((f) => f.slug === "problem-awareness-scanner")?.prompt || "";

export default function HomePage() {
  const featuredPrompts = FREEBIES.slice(0, 4);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
        })}
      />
      <JsonLd data={personSchema()} />

      <div className="space-y-16 py-8 sm:py-12">
        {/* ============================================================ */}
        {/* 1. SPLIT HERO SECTION (Visual 50/50 Layout)                  */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Punchy Hook & CTA */}
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Active 9-to-5 Operator • MarOps Lead</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.1]">
              Build Real AI Systems <br className="hidden sm:inline" />
              <span className="text-accent">& Digital Assets.</span>
            </h1>

            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-lg">
              Turn domain knowledge into automated workflows with Google’s AI stack. Built for active 9-to-5 operators and quiet builders.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/free"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-background transition hover:bg-accent/90 shadow-md"
              >
                <span>Explore Prompt Lab</span>
                <span>⚡</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-raised hover:border-border-hover"
              >
                <span>Read Case Studies</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive AI Studio Terminal Mockup */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/90 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/90 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-green-500/90 inline-block" />
                  <span className="ml-2 text-xs font-mono font-medium text-foreground">
                    awareness-scanner.v2
                  </span>
                </div>
                <span className="rounded bg-background px-2 py-0.5 text-[10px] font-mono text-accent border border-border">
                  Gemini 2.5 Flash
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span>// GOOGLE AI STUDIO SYSTEM PROMPT</span>
                  <span className="text-accent">1-CLICK EXECUTION</span>
                </div>
                <div className="rounded-lg bg-background p-3.5 text-[11px] leading-relaxed text-foreground/90 border border-border/60">
                  <p className="text-accent font-semibold mb-1">▶ Step 1: 2 AM Bleed Diagnosis</p>
                  <p className="text-muted">Map raw customer complaints from Reddit & G2 directly into Eugene Schwartz’s 5 awareness levels.</p>
                  <p className="text-accent font-semibold mt-2 mb-1">▶ Step 2: Friction Elimination</p>
                  <p className="text-muted">Translate features into instant psychological relief before ever pitching a solution.</p>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <CopyPrompt prompt={scannerPrompt} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. VISUAL 3-PILLAR FRAMEWORK (Max 2 Lines per Card)         */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              The 3-Pillar Systems Framework
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              How quiet 9-to-5 operators build automated media and customer engines without noise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Pillar 1 */}
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised border border-border text-lg">
                🪜
              </div>
              <span className="mt-3 inline-block rounded bg-background px-2 py-0.5 text-[10px] font-mono uppercase text-accent border border-border">
                Buyer Psychology
              </span>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                5 Awareness Rooms
              </h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                Meet the customer’s 2 AM bleed with Eugene Schwartz psychology. Stop proposing on the first date.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised border border-border text-lg">
                ⚡
              </div>
              <span className="mt-3 inline-block rounded bg-background px-2 py-0.5 text-[10px] font-mono uppercase text-accent border border-border">
                Google AI Stack
              </span>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                Google AI Studio Engine
              </h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                Deploy production workflows with Google AI Studio and Gemini 2.5 Flash. £0 setup, zero vendor lock-in.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-raised border border-border text-lg">
                ☕
              </div>
              <span className="mt-3 inline-block rounded bg-background px-2 py-0.5 text-[10px] font-mono uppercase text-accent border border-border">
                Operator Reality
              </span>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                Kitchen-Table Standard
              </h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                Plain English test for real operators. Build dependable assets that buy back your Saturday mornings.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. PROMPT LAB SHOWCASE (Interactive Cards)                   */}
        {/* ============================================================ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Prompt Lab Vault
              </h2>
              <p className="text-xs sm:text-sm text-muted">
                Battle-tested system prompts. Copy, paste, and run in Google AI Studio.
              </p>
            </div>
            <Link
              href="/free"
              className="text-xs font-semibold text-accent hover:underline"
            >
              View all 7 engines →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredPrompts.map((freebie) => (
              <TerminalPromptCard
                key={freebie.slug}
                slug={freebie.slug}
                name={freebie.name}
                tag="System Prompt"
                model="Gemini 2.5 Flash"
                promise={freebie.promise}
                prompt={freebie.prompt}
              />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FEATURED CASE STUDY BANNER (Visual Comparison)            */}
        {/* ============================================================ */}
        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <div className="space-y-3 md:col-span-8">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent border border-accent/20">
                  Featured Teardown
                </span>
                <span className="text-xs text-muted">• 5 Min Read</span>
              </div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl leading-snug">
                The $1.75 Billion Customer Awareness Mistake
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                Why Quibi burnt $1.75B pitching features, while Dollar Shave Club built a $1B exit addressing pain.
              </p>
            </div>

            <div className="md:col-span-4 md:text-right">
              <Link
                href="/blog/the-1-75-billion-dollar-mistake-customer-awareness"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition hover:bg-accent hover:text-background"
              >
                <span>Read Teardown</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
