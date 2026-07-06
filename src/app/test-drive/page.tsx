import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  webPageSchema,
  offerSchema,
  faqPageSchema,
} from "@/lib/schema";
import { SITE_URL, CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Front Desk Test — AI First-Response Report",
  description:
    "Send 10 real messages. See your current response times, what the Front Desk would have replied and done, and where it would flag you. Yours to keep either way.",
  alternates: { canonical: `${SITE_URL}/test-drive` },
  openGraph: {
    title: "Free Front Desk Test — AI First-Response Report",
    description:
      "10 real messages. A side-by-side report. Yours to keep even if we never speak again.",
    url: `${SITE_URL}/test-drive`,
    type: "website",
  },
};

const covers = [
  {
    title: "Your current response time per message",
    body: "Not the average. Each one, real timestamps.",
  },
  {
    title: "What the Front Desk would have replied",
    body: "Full draft, in your voice, side by side with your actual reply.",
  },
  {
    title: "What action it would have taken",
    body: "Booked, quoted, refunded, dispatched, escalated. The next step, done.",
  },
  {
    title: "Where it would have flagged you",
    body: "The edge cases, the above-threshold requests, the VIPs. Where the human still sits in the loop.",
  },
];

const included = [
  "A written side-by-side report on 10 real messages.",
  "A 15-minute call to walk through the report, cameras optional.",
  "The Front Desk drafts and action logs are yours to keep.",
];

const excluded = [
  "A sales pitch on the call. If it's a fit we say so at the end. If it's not we say that too.",
  "A subscription lock-in. Month to month. Cancel by replying to the email.",
  "A retainer proposal on the call. If it's a fit we send a scoped install with a fixed setup + monthly.",
];

const proofNumbers = [
  { number: "£50-500/mo", label: "What a support seat costs, if you hire one." },
  { number: "Under a seat", label: "What the Front Desk costs, running 24/7 across channels." },
  { number: "Under 60 seconds", label: "Response SLA on every inbound." },
];

const faqs = [
  {
    question: "How fast does the Front Desk respond?",
    answer:
      "Under 60 seconds on every inbound message, any hour of the day. Responding in under 5 minutes converts up to 100 times more leads than responding in an hour.",
  },
  {
    question: "What does the free Front Desk test cover?",
    answer:
      "Response times on 10 real messages, side by side with what the Front Desk would have replied and done. Every edge case flagged. You keep the report either way.",
  },
  {
    question: "How much does the Front Desk cost after the test?",
    answer:
      "Priced under a single support seat. A hired seat costs £50-500 a month. The Front Desk runs 24/7 across your channels for less. Final price is set from unit economics after a paid pilot.",
  },
  {
    question: "Which businesses is the Front Desk for?",
    answer:
      "Owner-operated businesses across plumbing/HVAC/roofing, coaching, salons/med-spa, ecom (£200+ AOV), real estate, mortgage, and restaurants.",
  },
  {
    question: "Does the Front Desk send replies without me?",
    answer:
      "Only under your thresholds. Standard bookings, small refunds, and template quotes go automatically. Anything above your set line waits for your yes.",
  },
  {
    question: "What if the Front Desk makes a mistake?",
    answer:
      "We build the eval set from 50 of your real historical messages before we go live. You see the score. Every escalation and correction is logged and fed back into the loop.",
  },
];

export default function TestDrive() {
  const webPage = webPageSchema({
    path: "/test-drive",
    title: "Free Front Desk Test — AI First-Response Report",
    description:
      "Send 10 real messages. See your response times, what the Front Desk would have replied and done, and where it would flag you.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Test drive", path: "/test-drive" },
    ],
  });

  const offer = offerSchema({
    name: "Free Front Desk Test",
    description:
      "10 real messages analysed. Side-by-side report on response time, Front Desk drafts, actions taken, and flagged edge cases. Yours to keep.",
    price: "0",
    priceCurrency: "GBP",
    url: `${SITE_URL}/test-drive`,
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={offer} />
      <JsonLd data={faqPageSchema(faqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            Free test
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-tight">
            Test the Front Desk on your own business.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed mb-10 max-w-2xl">
            Send us 10 real messages from your last week. We show you: your actual response time on each, what the Front Desk would have replied in under 60 seconds, what next action it would have taken, and where it would have flagged you for a decision. You keep the report even if we never speak again.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Book my test
          </a>
          <p className="text-sm text-muted mt-4">
            Bookings open for the next 5 businesses this month. First come, first served.
          </p>
        </div>
      </section>

      {/* What we look at */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-10 font-display">
            What we look at
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {covers.map((c) => (
              <div
                key={c.title}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-foreground mb-2 font-display">
                  {c.title}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included / Excluded */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 font-display">
                What you get
              </h3>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-primary-dim leading-relaxed flex gap-2"
                  >
                    <span className="text-accent shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4 font-display">
                What you don&apos;t get
              </h3>
              <ul className="space-y-3">
                {excluded.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-primary-dim leading-relaxed flex gap-2"
                  >
                    <span className="text-muted shrink-0">&minus;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofNumbers.map((p) => (
              <div
                key={p.number}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <p className="text-xl font-bold text-accent mb-2 font-display leading-tight">
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

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Common questions
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            About the test, the price, and how the Front Desk works.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface border border-border rounded-lg p-6"
              >
                <summary className="cursor-pointer text-foreground font-semibold font-display list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-primary-dim leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
              Ready to book?
            </h2>
            <p className="text-primary-dim mb-6 max-w-xl mx-auto">
              15 minutes on Calendly. First report ships that week.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book my test
            </a>
            <p className="text-xs text-muted mt-4">
              Or{" "}
              <Link href="/contact" className="hover:text-accent">
                get in touch another way
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
