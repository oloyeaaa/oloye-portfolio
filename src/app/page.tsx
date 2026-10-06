import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import AutomationFlowVisualizer from "@/components/AutomationFlowVisualizer";

const TITLE = "Oloye Adeosun • Marketing Automation, AI Pipelines & Systems Architecture";
const DESCRIPTION =
  "Senior Marketing Automation Specialist with 4+ years in automation engineering and 14+ years in Tier-1 UK enterprise operations. Turn social attention into an automated, owned pipeline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

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

      <main className="flex flex-col">
        {/* =========================================================================
            1. HERO SECTION: NATURAL.AGENCY INSPIRED PIPELINE ARCHITECTURE
        ========================================================================= */}
        <section className="relative overflow-hidden border-b border-border bg-background pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-mono font-semibold text-foreground shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>Marketing Automation &amp; AI Systems Architect</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-6xl sm:leading-[1.1]">
                Turn Client Attention into an{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-accent-dark bg-clip-text text-transparent underline decoration-accent decoration-4 underline-offset-8">
                  Automated, Owned Pipeline.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                4+ years designing high-converting automation funnels (long before ChatGPT) combined with 14+ years in Tier-1 UK enterprise governance. Replace £3,000/mo software bloat with clean, reliable systems using Make.com, Airtable, and Google Workspace.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
                <Link
                  href="/free/lean-owned-pipeline-blueprint"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-foreground px-7 py-3.5 text-sm font-bold text-accent shadow-md transition hover:bg-foreground/90 hover:scale-[1.02]"
                >
                  ⚡ Get Free Oloye Media OS Template
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-surface-alt"
                >
                  Explore Interactive Systems &rarr;
                </Link>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-mono text-muted">
                <span>✓ 4+ Yrs Automation Engine</span>
                <span>•</span>
                <span>✓ 14+ Yrs Enterprise Banking Ops</span>
                <span>•</span>
                <span>✓ 0% Code Overwhelm</span>
              </div>
            </div>

            {/* Live Interactive Visualizer */}
            <div className="mt-12 sm:mt-16">
              <AutomationFlowVisualizer />
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. THE 4+ YEARS AUTOMATION CREDIBILITY & ETHOS
        ========================================================================= */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="font-mono text-xs font-bold text-accent-dark uppercase tracking-wider">
                  The Honest Practitioner Journey
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Built on Real Operational Pipes, Not AI Hype.
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  My automation journey started well before 2022—back when email marketing funnels, webhook handoffs, and relational databases had to be built with zero AI assistance.
                </p>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  Managing operations, governance, and risk for over 14 years across Tier-1 UK financial institutions (Lloyds, RBS, OSB) taught me one non-negotiable rule: <strong>Systems don&apos;t fail at the start; they fail at the handoffs.</strong>
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-xs font-mono text-foreground">
                    <span className="text-lg">⏳</span>
                    <span>North Star: Building lean systems that buy back time for my son.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-background p-5 shadow-xs space-y-2">
                  <div className="text-2xl">⚡</div>
                  <h3 className="text-sm font-bold text-foreground">Zero-Latency Ingestion</h3>
                  <p className="text-xs text-muted">
                    Automated webhooks route leads from DMs, forms, and calendars into your owned database in under 200ms.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-5 shadow-xs space-y-2">
                  <div className="text-2xl">📊</div>
                  <h3 className="text-sm font-bold text-foreground">Dynamic Google Slides Proposals</h3>
                  <p className="text-xs text-muted">
                    Generate customized, branded client proposal decks and PDFs in 60 seconds directly from CRM deal records.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-5 shadow-xs space-y-2">
                  <div className="text-2xl">🚀</div>
                  <h3 className="text-sm font-bold text-foreground">1-Click Client Onboarding</h3>
                  <p className="text-xs text-muted">
                    Moving a deal to &quot;Won&quot; instantly provisions Google Drive folders, SOW milestone tasks, and kickoff emails.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-5 shadow-xs space-y-2">
                  <div className="text-2xl">🛡️</div>
                  <h3 className="text-sm font-bold text-foreground">UK GDPR &amp; Governance</h3>
                  <p className="text-xs text-muted">
                    Bank-grade compliance, PECR-compliant opt-in taxonomies, and audit-ready data retention structures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. THE FLAGSHIP LEAD MAGNET: OLOYE MEDIA OS
        ========================================================================= */}
        <section id="system" className="py-16 sm:py-24 border-b border-border bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1 text-xs font-bold text-foreground uppercase tracking-wider">
                  Featured Free System
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  The Oloye Media OS (Airtable + Make.com)
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  The exact 7-table operating system that powers our agency pipeline, client delivery, proposals, and task SLAs. Duplicate the entire base with one click and stop running your business out of messy spreadsheets.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-200 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>14-Stage CRM &amp; Deal Flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Automated Proposal Linkage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>5-Step SOW Task Provisioning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">✓</span>
                    <span>Google Drive Auto-Creation</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    href="/free/lean-owned-pipeline-blueprint"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-foreground transition hover:bg-accent-light shadow-md"
                  >
                    Duplicate Free Airtable OS &rarr;
                  </Link>
                  <Link
                    href="/portfolio/funnel-auditor"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Test Live Funnel Auditor
                  </Link>
                </div>
              </div>

              {/* Right Side: Mockup / Card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-white/10 border-b pb-3">
                    <span className="font-mono text-xs text-accent">OLOYE_MEDIA_OS.AIRTABLE</span>
                    <span className="rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-0.5 font-mono text-[10px]">
                      READY TO CLONE
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs text-gray-300">
                    <p>• <strong>Companies:</strong> Account segmentation &amp; revenue tiers.</p>
                    <p>• <strong>Contacts:</strong> Decision-maker tracking &amp; lead sources.</p>
                    <p>• <strong>Deals:</strong> Discovery ➔ Proposal ➔ Won / Lost pipeline.</p>
                    <p>• <strong>Proposals:</strong> Scope, goals, and automated deck links.</p>
                    <p>• <strong>Projects &amp; Tasks:</strong> 5-step turnkey client delivery.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 font-mono text-[11px] text-gray-400">
                    <code>make.com/blueprint/oloye-media-os-v2.json</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. THE 7-DAY TURNKEY IMPLEMENTATION SPRINT (COMMERCIAL OFFER)
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs font-bold text-muted uppercase tracking-wider">
                Productized Service
              </span>
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                The 7-Day Owned Pipeline Sprint
              </h2>
              <p className="text-sm sm:text-base text-muted">
                Don&apos;t want to spend 40 hours learning Make.com webhooks and Airtable schemas? We build, wire, and test your entire custom Media OS in 7 days.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background p-7 space-y-4 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-mono font-bold text-accent">
                  01
                </div>
                <h3 className="text-base font-bold text-foreground">Intake &amp; Architecture Audit</h3>
                <p className="text-xs text-muted leading-relaxed">
                  We audit your current lead sources, booking tools, and proposals, mapping out a custom 3-node relational data schema.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-7 space-y-4 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-mono font-bold text-accent">
                  02
                </div>
                <h3 className="text-base font-bold text-foreground">Airtable &amp; Make.com Integration</h3>
                <p className="text-xs text-muted leading-relaxed">
                  We wire up your webhooks, build Google Slides proposal generators, automate Google Drive client folders, and clean your data.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-7 space-y-4 shadow-xs">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-mono font-bold text-accent">
                  03
                </div>
                <h3 className="text-base font-bold text-foreground">QA Testing &amp; Loom Handover</h3>
                <p className="text-xs text-muted leading-relaxed">
                  We test end-to-end transactions, deliver a 1-on-1 team Loom video walkthrough, and provide 14 days of dedicated launch support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WEDNESDAY BLOG & PIPELINE TEARDOWNS
        ========================================================================= */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Every Wednesday
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                  Weekly Pipeline Teardowns &amp; Systems Builds
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-foreground hover:underline decoration-accent decoration-2"
              >
                View all articles &rarr;
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
