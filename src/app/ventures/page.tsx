import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL } from "@/lib/site";
import { webPageSchema } from "@/lib/schema";

const TITLE = "Ventures & Products Owned — GSS & Practical AI Hub";
const DESCRIPTION =
  "Explore the proprietary platforms and ventures built and owned by Oloye Adeosun: GTM Signal Studio (GSS) and Practical AI Hub.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/ventures` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/ventures`,
    type: "website",
  },
};

export default function VenturesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/ventures",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Ventures", path: "/ventures" },
          ],
        })}
      />

      <div className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:pt-20">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
            Built & Owned by Oloye
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Ventures & Products
          </h1>
          <p className="mt-4 text-lg text-primary-dim leading-relaxed">
            I don&apos;t just consult on go-to-market and marketing operations—I build and operate proprietary products. Here is the architecture behind my two core ventures.
          </p>
        </div>

        {/* Venture 1: GTM Signal Studio (GSS) */}
        <div id="gss" className="mt-16 scroll-mt-24 rounded-2xl border border-border bg-surface p-8 sm:p-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-mono font-semibold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
              GTM SIGNAL INTELLIGENCE PLATFORM
            </div>
            <span className="text-xs font-mono text-muted">Status: Active Engine</span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            GTM Signal Studio (GSS)
          </h2>
          <p className="mt-2 text-base text-accent font-medium">
            AI-Driven Market Visibility, Competitor Drift & Buyer Intent Monitoring
          </p>

          <p className="mt-5 text-base text-primary-dim leading-relaxed">
            GTM Signal Studio was engineered to solve a critical product marketing bottleneck: <strong className="text-foreground">market blindness</strong>. Most marketing leaders rely on stale quarterly surveys or generic SEO data. GSS functions as a continuous intelligence listening post across public forums, review sites, and competitor changes.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                01 · Intent Signal Mining
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">Customer Pain Clusters</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Extracts unaddressed user complaints from Reddit, G2, and community channels to identify feature gaps and messaging wedges.
              </p>
            </div>

            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-secondary uppercase tracking-wider font-semibold">
                02 · Competitor Drift
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">Repositioning Alerts</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Tracks when competitors update landing page copy, pricing tiers, or target ICPs, giving early signals for counter-positioning.
              </p>
            </div>

            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                03 · Playbook Generation
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">Actionable Briefs</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Translates raw market signals into consultant-grade PMM briefs, TikTok/LinkedIn hooks, and copy recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Venture 2: Practical AI Hub */}
        <div id="practical-ai-hub" className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-surface p-8 sm:p-12 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono font-semibold text-accent">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
              AI SYSTEMS & DIGITAL ASSETS
            </div>
            <span className="text-xs font-mono text-muted">Status: Active Creator Ecosystem</span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Practical AI Hub
          </h2>
          <p className="mt-2 text-base text-accent font-medium">
            Actionable AI Workflows & Digital Product Systems for Busy Professionals
          </p>

          <p className="mt-5 text-base text-primary-dim leading-relaxed">
            Practical AI Hub (<code className="text-xs text-accent">@practicalaihub1</code>) is a dedicated educational ecosystem built on the premise that you do not need to be a developer to build valuable, monetizable software workflows. It provides step-by-step frameworks that help knowledge workers turn domain expertise into products.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3 border-t border-border pt-8">
            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                18-Prompt Master Vault
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">Single-Page Prompt Cards</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Curated, battle-tested prompt systems for product validation, SOP creation, competitor extraction, and sales page generation.
              </p>
            </div>

            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Workflow Carousels
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">Visual Social Micro-Lessons</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Step-by-step visual guides on TikTok and Instagram demonstrating real automation without theoretical fluff.
              </p>
            </div>

            <div className="rounded-lg bg-surface-alt p-5 border border-border">
              <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Lead Magnet Funnels
              </p>
              <h3 className="mt-2 text-base font-bold text-foreground">MailerLite Engine</h3>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                An automated email capture and PDF distribution pipeline running asynchronously to deliver high-value resources.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-border">
            <Link
              href="/practical-ai-hub"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-accent-light"
            >
              Open Practical AI Hub →
            </Link>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition"
            >
              TikTok (@practicalaihub1) ↗
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition"
            >
              Instagram (@practicalaihub1) ↗
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-border pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Want to collaborate or discuss a custom GTM engine?
          </h2>
          <p className="mt-3 text-sm text-primary-dim">
            I am available for strategic advisory, product marketing audits, and executive leadership roles.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href={`mailto:${AUTHOR.email}?subject=Collaboration%20Inquiry%20regarding%20Ventures`}
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-background hover:bg-accent-light transition"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
