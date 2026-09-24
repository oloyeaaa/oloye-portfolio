import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const TITLE = "Systems & Automation Portfolio • Oloye Adeosun";
const DESCRIPTION =
  "Practical builds, lead routing architectures, and marketing operations systems built with enterprise rigor and lean automation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/portfolio` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/portfolio`,
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/portfolio",
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
        })}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span>Systems &amp; Architecture Lab</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Systems Built for Clarity, Speed &amp; Compliance.
          </h1>
          <p className="text-sm text-muted leading-relaxed sm:text-base">
            I don&apos;t build fragile, over-engineered stacks. Combining 14+ years in Tier-1 UK enterprise operations with modern automation tools, here are real working systems, diagnostics, and architectures I build.
          </p>
        </div>

        {/* Featured Portfolio Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Item 1: Interactive Tool */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between space-y-6 transition hover:border-accent/40">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-foreground">
                  Interactive Live Tool
                </span>
                <span className="text-xs font-mono text-muted">Tool #01</span>
              </div>

              <h2 className="text-xl font-bold text-foreground">
                Funnel &amp; UK GDPR Compliance Auditor
              </h2>

              <p className="text-xs text-muted leading-relaxed sm:text-sm">
                A real-time diagnostic engine that calculates marketing lead leakage, evaluates CRM taxonomy standards, and audits PECR/GDPR consent risks with instant remediation sprint generation.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">React 19</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">UK GDPR / PECR</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Lead Diagnostics</span>
              </div>
            </div>

            <Link
              href="/portfolio/funnel-auditor"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground py-2.5 text-xs font-semibold text-accent transition hover:bg-foreground/90 shadow-sm"
            >
              <span>Launch Live Auditor</span>
              <span>→</span>
            </Link>
          </div>

          {/* Item 2: Zero-Latency Lead Routing */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-foreground">
                  Enterprise Lead Ops
                </span>
                <span className="text-xs font-mono text-muted">Architecture #02</span>
              </div>

              <h2 className="text-xl font-bold text-foreground">
                Zero-Latency Webhook to Salesforce Router
              </h2>

              <p className="text-xs text-muted leading-relaxed sm:text-sm">
                Engineered automated inbound webhook ingestion capturing webforms instantly into Salesforce with custom E.164 phone sanitization, territory SLA routing, and real-time sales alerts.
              </p>

              <div className="space-y-2 rounded-lg bg-background p-3 text-[11px] font-mono text-muted border border-border">
                <div className="flex justify-between">
                  <span>Lead Response SLA:</span>
                  <span className="font-bold text-foreground">&lt; 30 Seconds</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Leakage:</span>
                  <span className="font-bold text-foreground">0% Manual CSVs</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Salesforce CRM</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Zapier Webhooks</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Data Sanitization</span>
              </div>
            </div>

            <div className="text-xs font-medium text-muted">
              Architected for High-Volume B2B Inbound Operations
            </div>
          </div>

          {/* Item 3: Closed-Loop Looker Studio */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-foreground">
                  Marketing Analytics
                </span>
                <span className="text-xs font-mono text-muted">Dashboard #03</span>
              </div>

              <h2 className="text-xl font-bold text-foreground">
                Closed-Loop Attribution &amp; Looker Studio Suite
              </h2>

              <p className="text-xs text-muted leading-relaxed sm:text-sm">
                Standardized corporate UTM taxonomy and multi-touch GA4 event telemetry, feeding directly into an executive Looker Studio dashboard tracking CAC, pipeline velocity, and channel ROI.
              </p>

              <div className="space-y-2 rounded-lg bg-background p-3 text-[11px] font-mono text-muted border border-border">
                <div className="flex justify-between">
                  <span>Reporting Prep Time:</span>
                  <span className="font-bold text-foreground">Cut by 8+ hrs/wk</span>
                </div>
                <div className="flex justify-between">
                  <span>Attribution Visibility:</span>
                  <span className="font-bold text-foreground">100% Multi-Touch</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Looker Studio</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">GA4 / GTM</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">UTM Taxonomy</span>
              </div>
            </div>

            <div className="text-xs font-medium text-muted">
              Deployed for Multi-Channel Attribution Governance
            </div>
          </div>

          {/* Item 4: Lean Airtable CRM OS */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-foreground">
                  Airtable OS
                </span>
                <span className="text-xs font-mono text-muted">Pipeline #04</span>
              </div>

              <h2 className="text-xl font-bold text-foreground">
                Automated Client Intake &amp; Airtable CRM Engine
              </h2>

              <p className="text-xs text-muted leading-relaxed sm:text-sm">
                Turnkey client onboarding and lead database with automated webform triggers, dynamic Slack alerts, welcome drip delivery, and smart AI brief summarization for non-technical teams.
              </p>

              <div className="space-y-2 rounded-lg bg-background p-3 text-[11px] font-mono text-muted border border-border">
                <div className="flex justify-between">
                  <span>Admin Overhead:</span>
                  <span className="font-bold text-foreground">Saved 10+ hrs/wk</span>
                </div>
                <div className="flex justify-between">
                  <span>Software Cost:</span>
                  <span className="font-bold text-foreground">£0 Free-Tier Stack</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Airtable</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Make.com</span>
                <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-mono text-muted">Gemini Prompts</span>
              </div>
            </div>

            <div className="text-xs font-medium text-muted">
              Architected for Creators &amp; Service Founders
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
