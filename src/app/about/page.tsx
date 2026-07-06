import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Oloye. — Agentic AI Systems for Owner-Operated Businesses",
  description:
    "Oloye. builds agentic AI systems that respond in under 60 seconds and complete the next step. Four modules under one back office. Priced under a single support seat.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Oloye. — Agentic AI Systems for Owner-Operated Businesses",
    description:
      "Four modules under one back office. The Front Desk, the Ad Watchdog, the Retention Rail, the Sunday Read.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const modules = [
  {
    name: "The Front Desk",
    body: "First-response agent. Reads, replies in your voice in under 60 seconds, does the next step. Six vertical action lists on day one.",
    live: true,
  },
  {
    name: "The Ad Watchdog",
    body: "Watches Meta and TikTok spend, flags anomaly campaigns before they burn a day of budget.",
    live: false,
  },
  {
    name: "The Retention Rail",
    body: "Klaviyo and Omnisend flows that adapt by RFM and behaviour, not \"if X then Y\".",
    live: false,
  },
  {
    name: "The Sunday Read",
    body: "Weekly PDF covering the numbers your platform can't show you. Real margin after fees + returns. Cross-marketplace P&L. Top 3 profit leaks.",
    live: false,
  },
];

const proof = [
  {
    number: "Under 60 seconds",
    label: "Response SLA. Any hour, every day.",
  },
  {
    number: "12 agents",
    label:
      "Our AI team runs on the Airtable Brain plus a scheduled worker. Same architecture we deploy for you.",
  },
  {
    number: "Every action logged",
    label:
      "Real time, real cost, real outcome. Recorded on production. Pricing set from unit economics.",
  },
];

export default function About() {
  const aboutPage = webPageSchema({
    path: "/about",
    title: "About Oloye. — Agentic AI Systems for Owner-Operated Businesses",
    description:
      "Oloye. builds agentic AI systems that respond in under 60 seconds and complete the next step.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    type: "AboutPage",
  });

  return (
    <>
      <JsonLd data={aboutPage} />

      {/* Intro */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-10 font-display leading-tight">
            Oloye<span className="text-accent">.</span> builds agentic AI systems for owner-operated businesses.
          </h1>
          <div className="text-primary-dim leading-relaxed space-y-6 text-lg">
            <p>
              Speed is the biggest lever most owners never touch. The message came in. You were on the job, on the call, on the school run. Three hours later you replied. By then they&apos;d booked with someone else. That&apos;s not a customer service problem, that&apos;s a revenue problem, and it repeats every day. Every one of those hours is a customer you already had and lost.
            </p>
            <p>
              We build agentic AI systems that take the first response off your plate. The Front Desk reads every inbound, replies in your voice in under 60 seconds, and does the next step. Books the slot. Sends the quote. Takes the deposit. Refunds under your rules. Priced under a single support seat. You&apos;re told what happened, not asked to do it.
            </p>
            <p>
              Everything we sell we run first. The Front Desk runs on our own scalp-wellness brand before it runs on yours. Every response, every action, every escalation is logged. That&apos;s how we prove it works and how we set the price.
            </p>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            What we build
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            The Front Desk is the entry. Same read-decide-act pattern extends across four modules.
          </p>
          <div className="space-y-4">
            {modules.map((m) => (
              <div
                key={m.name}
                className="bg-surface border border-border rounded-lg p-6 flex items-start justify-between gap-6"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-2 font-display text-lg">
                    {m.name}
                  </h3>
                  <p className="text-sm text-primary-dim leading-relaxed">
                    {m.body}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded shrink-0 ${
                    m.live
                      ? "bg-accent text-background"
                      : "border border-border-strong text-muted"
                  }`}
                >
                  {m.live ? "Live" : "Next"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-10 font-display">
            Where the discipline comes from
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proof.map((p) => (
              <div
                key={p.number}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <p className="text-2xl font-bold text-accent mb-3 font-display leading-tight">
                  {p.number}
                </p>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            How we work
          </h2>
          <p className="text-primary-dim leading-relaxed text-lg max-w-2xl">
            Send us 10 real messages from your last week. We show you what the Front Desk would have replied and done, side by side with what actually happened. If you like it, we install it on your live channels. If you don&apos;t, you keep the log. Nothing goes live without your approval on the thresholds.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
              Ready to see it on your own inbound?
            </h2>
            <p className="text-primary-dim mb-6 max-w-xl mx-auto">
              10 real messages. A side-by-side report. Yours to keep either way.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book my test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
