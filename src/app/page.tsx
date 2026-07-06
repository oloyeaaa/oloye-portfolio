import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import {
  webPageSchema,
  serviceSchema,
  faqPageSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agentic AI Systems that Respond in Under 60 Seconds",
  description:
    "The Front Desk: an agentic AI first responder for owner-operated businesses. Reads inbound in under 60 seconds, replies in your voice, and does the next step. Priced under a single support seat.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Oloye. — Agentic AI Systems that Respond in Under 60 Seconds",
    description:
      "The Front Desk reads every message, replies in your voice in under 60 seconds, and does the next step. Books, quotes, refunds, dispatches.",
    url: SITE_URL,
    type: "website",
  },
};

const valueProps = [
  {
    title: "Under 60 seconds. Every message. Any hour.",
    body: "Reads the inbound, matches it to your voice, replies. Doesn't matter if it's 2am on a Sunday. The lead that would've gone cold gets a real answer while they're still looking.",
  },
  {
    title: "It doesn't just reply. It does the thing.",
    body: "Books the slot in your calendar. Sends the quote from your template. Takes the deposit through Stripe. Refunds under your threshold. Files the return and emails the label. The job is done, not just discussed.",
  },
  {
    title: "You're in the loop, not the bottleneck.",
    body: "Set your thresholds day one. Refunds under £50, quotes under £1k, standard bookings all auto. Anything above holds for your yes. Everything else moves. You get a log, not a queue.",
  },
];

const verticals = [
  {
    slug: "plumbers",
    name: "For plumbers, HVAC, roofers",
    body: "Books the job. Sends the estimate range by postcode. Dispatches. Confirms 24 hours ahead.",
  },
  {
    slug: "coaches",
    name: "For coaches and consultants",
    body: "Sends the Calendly + intake. Ships the proposal from template. Invoices via Stripe. Chases unpaid.",
  },
  {
    slug: "salons",
    name: "For salons, med spas, clinics",
    body: "Books the appointment. Takes the deposit. Sends prep instructions. Handles the reschedule.",
  },
  {
    slug: "ecom",
    name: "For ecom (£200+ AOV)",
    body: "Tracks the order. Refunds under threshold. Files the return + emails the label. Escalates the edge case.",
  },
  {
    slug: "real-estate",
    name: "For real estate + mortgage",
    body: "Schedules the viewing. Sends the brochure. Qualifies the buyer. Updates the CRM.",
  },
  {
    slug: "restaurants",
    name: "For restaurants",
    body: "Books the table. Answers hours + menu. Routes private dining. Waitlist add + notify.",
  },
];

const proofBuilds = [
  {
    brand: "CRWNscalp",
    problem: "Our own scalp-wellness brand.",
    result:
      "The Front Desk runs on our inbound first. Every response, every action, every escalation is logged before we sell it.",
  },
  {
    brand: "The Airtable Brain",
    problem: "Multi-agent operating system for a 12-employee AI team.",
    result:
      "Every draft, every approval, every send is logged. Same architecture, deployed for you.",
  },
  {
    brand: "Adzuna market research agent",
    problem: "Weekly pipeline processing 1,256 UK job ads.",
    result:
      "Read, classify, act. Same read-classify-act pattern powers the Front Desk.",
  },
];

const homeFaqs = [
  {
    question: "What is an agentic AI system?",
    answer:
      "An agentic AI system reads context, decides what to do, and takes an action. It differs from a chatbot in that it doesn't just reply, it books the slot, sends the quote, processes the refund, or escalates the edge case. Ours are trained per business and gated by owner-set thresholds.",
  },
  {
    question: "How fast does the Front Desk respond?",
    answer:
      "Under 60 seconds on every inbound message, any hour of the day. Studies show responding in under 5 minutes converts up to 100 times more leads than responding in an hour, so speed is the whole game.",
  },
  {
    question: "How much does the Front Desk cost?",
    answer:
      "Priced under a single support seat. A hired seat costs £50 to £500 a month. The Front Desk runs 24/7 across your channels for less. Final price is set from unit economics after a paid pilot.",
  },
  {
    question: "Which businesses is the Front Desk for?",
    answer:
      "Owner-operated businesses across plumbing, HVAC, roofing, coaching, salons, med spas, ecom (£200+ AOV), real estate, mortgage, and restaurants. If you own the inbox, we can train the Front Desk on it.",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  const service = serviceSchema({
    name: "The Front Desk",
    description:
      "Agentic AI first responder for owner-operated businesses. Reads inbound messages, replies in the owner's voice in under 60 seconds, and completes the next action (book, quote, refund, dispatch) under owner-set thresholds.",
    serviceType: "AI First-Response Agent",
    areaServed: "Global",
    audience: [
      "Plumbing and HVAC contractors",
      "Coaches and consultants",
      "Salons and med-spas",
      "Ecommerce brands",
      "Real estate and mortgage brokers",
      "Restaurants",
    ],
  });

  const webPage = webPageSchema({
    path: "/",
    title: "Agentic AI Systems that Respond in Under 60 Seconds",
    description:
      "The Front Desk: an agentic AI first responder for owner-operated businesses. Reads inbound in under 60 seconds, replies in your voice, and does the next step.",
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={service} />
      <JsonLd data={faqPageSchema(homeFaqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            Agentic AI systems for owner-operated businesses
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-8 max-w-4xl text-foreground font-display">
            You&apos;re losing to whoever replies first.
            <br />
            <span className="text-muted">Right now that&apos;s not you.</span>
          </h1>
          <p className="text-lg text-primary-dim max-w-2xl mb-10 leading-relaxed">
            A message comes in. You&apos;re on a job, on a call, on the school run. Three hours later you reply. By then they&apos;ve booked the plumber who answered in four minutes. Bought from the store that replied. Called the salon that took the deposit. The Front Desk reads every inbound, replies in your voice in under 60 seconds, and does the next step. Books. Quotes. Takes the deposit. Refunds under your rules. You&apos;re told what happened, not asked to do it.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/test-drive"
              className="bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Test the Front Desk on your business
            </Link>
            <Link
              href="/about"
              className="border border-border-strong hover:border-accent text-foreground px-6 py-3 rounded-md font-medium transition-colors"
            >
              See how it works
            </Link>
          </div>
          <p className="text-sm text-muted mt-8 max-w-2xl">
            First response under 60 seconds, any hour. Actions completed while you sleep. You only touch the ones that need your judgment.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <Image
            src="/images/pages/home-ai-first-response-agent.png"
            alt="An owner captured by an unread customer message glowing on their phone late at night — the first-response leak agentic AI systems close for owner-operated businesses"
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
            className="w-full h-auto rounded-xl border border-border"
          />
        </div>
      </section>

      {/* Speed data panel */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-2xl md:text-3xl text-foreground font-display leading-tight max-w-4xl">
            Responding in under 5 minutes converts up to{" "}
            <span className="text-accent">100 times</span> more leads than responding in an hour. Most owners reply in hours because they&apos;re doing the actual work.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">What you get</h2>
          <p className="text-muted mb-12 max-w-2xl">
            One agent, three shifts in how your business handles the front door.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map((v) => (
              <div
                key={v.title}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-foreground mb-3 font-display text-lg leading-snug">
                  {v.title}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Trained on your business, not a template
          </h2>
          <p className="text-muted mb-12 max-w-2xl">
            Same core loop, different action list per vertical. Send this site to a plumber it works. Send it to a coach it works.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/for/${v.slug}`}
                className="group bg-surface border border-border hover:border-accent rounded-lg p-6 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2 font-display group-hover:text-accent transition-colors">
                  {v.name}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed">
                  {v.body}
                </p>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted mt-8">
            Not on the list?{" "}
            <Link href="/test-drive" className="text-accent hover:text-accent-light">
              Tell us what you do &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Where the discipline comes from
          </h2>
          <p className="text-muted mb-12 max-w-2xl">
            The Front Desk sits on a proven read-classify-act pattern we&apos;ve been shipping for months.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proofBuilds.map((p) => (
              <div
                key={p.brand}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3 font-display">
                  {p.brand}
                </p>
                <p className="text-sm text-primary-dim mb-3 leading-relaxed">
                  {p.problem}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {p.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
                  From the blog
                </h2>
                <p className="text-muted">
                  Agentic AI systems for first-response workflows across industries.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:text-accent-light transition-colors hidden md:block"
              >
                Read all posts &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Common questions
          </h2>
          <p className="text-muted mb-12 max-w-2xl">
            What the Front Desk does, what it costs, and who it's for.
          </p>
          <div className="space-y-4">
            {homeFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface border border-border rounded-lg p-6"
              >
                <summary className="cursor-pointer text-foreground font-semibold font-display list-none flex justify-between items-center">
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

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="border border-accent/40 rounded-xl p-10 md:p-14 bg-surface">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display leading-tight">
              Test the Front Desk on your own business.
            </h2>
            <p className="text-primary-dim mb-8 max-w-2xl leading-relaxed">
              Send us 10 real messages from last week. We show you your actual response time on each, what the Front Desk would have replied in under 60 seconds, what action it would have taken, and where it would have flagged for you. You keep the log.
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
