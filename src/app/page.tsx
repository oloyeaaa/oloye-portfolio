import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL, LINKEDIN_URL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";

const TITLE = "Oloye Adeosun — Buyer Psychology, AI Workflows & 0-Dollar Distribution";
const DESCRIPTION =
  "Helping solopreneurs and solo builders escape the 'Build & Pray' trap. Master buyer psychology, 0-dollar distribution, and AI-assisted workflows.";

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

const expertise = [
  {
    kicker: "01 · BUYER PSYCHOLOGY",
    title: "The 5 Levels of Customer Awareness",
    description:
      "Escaping the 'War Room Delusion'. Moving away from self-centered feature checklists to deep customer psychology, 2:00 AM bleeding-neck pain points, and Eugene Schwartz awareness levels.",
    bullets: [
      "Customer Language Mining (Reddit & G2)",
      "The 5 Levels of Buyer Awareness",
      "Story-Led Counter-Positioning",
      "Bleeding-Neck Pain Point Audits",
    ],
  },
  {
    kicker: "02 · AI WORKFLOWS & AUTOMATION",
    title: "AI-Powered Research & Content Engines",
    description:
      "Leveraging Claude, Gemini, and Python to execute deep buyer psychology in seconds. Automated customer research, high-CTR script architectures, and frictionless lead systems.",
    bullets: [
      "Automated Customer Voice & Language Miners",
      "High-CTR YouTube & Script Prompt Banks",
      "API & Speed-to-Lead Webhook Workflows",
      "AI Leverage for One-Person Media Engines",
    ],
  },
  {
    kicker: "03 · 0-DOLLAR DISTRIBUTION",
    title: "Organic Solopreneur Go-To-Market",
    description:
      "The organic distribution playbook to get your first 100 paying customers without spending a single pound on paid ads. Documenting the real journey to build high trust.",
    bullets: [
      "The Daily 'Signal Post' Content Loop",
      "Friction-Magnet Free Template Creation",
      "5-Minute Direct Conversation Outreach",
      "Audience-First Launch Frameworks",
    ],
  },
];

const teardowns = [
  {
    tag: "BUYER PSYCHOLOGY",
    title: "The War Room Delusion: Why 90% of Businesses Talk to Themselves",
    description:
      "A founder spends 6 months building in secret, buys a domain, and launches to complete crickets. The biological reason the human brain ignores company noise and the 3-step psychology shift to fix it.",
    badge: "Customer Awareness",
    slug: "the-war-room-delusion-why-90-percent-of-businesses-talk-to-themselves",
  },
  {
    tag: "0-DOLLAR GTM",
    title: "How to Build an Audience from Scratch: The 0-Dollar Marketing Blueprint",
    description:
      "Why paid ads do not fix a broken message. The 3-step zero-dollar distribution loop: Signal Posts, Friction Magnets, and 5-minute DM language mining.",
    badge: "Solopreneur Playbook",
    slug: "how-to-build-an-audience-from-scratch-0-dollar-marketing",
  },
  {
    tag: "AI & WORKFLOWS",
    title: "The Solo Media Engine: How 1 Solopreneur Uses Claude & Gemini to Run a 5-Person Team",
    description:
      "How to use AI without producing robotic garbage. The prompt frameworks and automated workflows 1 solo builder uses to research, script, and distribute content.",
    badge: "AI Automation",
    slug: "how-1-solopreneur-uses-claude-gemini-to-run-a-5-person-marketing-team",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          title: TITLE,
          description: DESCRIPTION,
        })}
      />
      <JsonLd data={personSchema()} />

      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-accent uppercase">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          Buyer Psychology • AI Workflows • 0-Dollar Distribution
        </div>

        <h1 className="mt-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-6xl md:text-7xl">
          Master the psychology of attention &{" "}
          <span className="text-accent">AI-powered distribution.</span>
        </h1>

        <p className="mt-7 max-w-[58ch] text-lg text-primary-dim sm:text-xl leading-relaxed">
          I am <strong className="text-foreground">Oloye Adeosun</strong>. I help solopreneurs and solo builders escape the 'Build & Pray' trap by combining deep buyer psychology with automated AI workflows to turn zero views into a queue of paying customers.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://www.youtube.com/@oloyeadeosun"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-accent px-6 py-3.5 font-semibold text-background transition hover:bg-accent-light shadow-md inline-flex items-center gap-2"
          >
            <span>▶</span> Watch on YouTube
          </a>
          <Link
            href="/free"
            className="rounded-md border border-border-strong bg-surface px-6 py-3.5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Free Playbooks & Templates
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-border px-5 py-3.5 font-medium text-muted transition hover:text-foreground hover:border-border-strong"
          >
            Read the Blog & Teardowns →
          </Link>
        </div>

        {/* Credibility & Trench Badges */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-10 sm:grid-cols-4">
          <div>
            <p className="text-2xl font-bold font-mono text-accent">6+ Years</p>
            <p className="mt-1 text-xs text-muted">In the Marketing Trenches</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-accent">0-Dollar GTM</p>
            <p className="mt-1 text-xs text-muted">Audience-First Distribution</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">5 Levels</p>
            <p className="mt-1 text-xs text-muted">Customer Awareness Engine</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">AI Workflows</p>
            <p className="mt-1 text-xs text-muted">One-Person Media Leverage</p>
          </div>
        </div>
      </section>

      {/* Core Expertise & Disciplines */}
      <section id="expertise" className="border-t border-border bg-surface/30 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
              HOW WE ESCAPE THE BUILD & PRAY TRAP
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The 3 engines that turn silent products into paying customers.
            </h2>
            <p className="mt-3 text-muted">
              Most builders spend months building in isolation only to get complete crickets on launch day. Here are the 3 systems to fix that.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {expertise.map((exp) => (
              <div
                key={exp.title}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-7 shadow-sm transition hover:border-border-strong hover:shadow-md"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                    {exp.kicker}
                  </span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                    {exp.title}
                  </h3>
                  <p className="mt-3 text-sm text-primary-dim leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                <ul className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures Owned: GSS & Practical AI Hub */}
      <section id="ventures" className="border-t border-border py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
                Proof of Building
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ventures & Products I Own.
              </h2>
            </div>
            <Link
              href="/ventures"
              className="text-sm font-semibold text-accent hover:text-accent-light underline underline-offset-4"
            >
              View Full Ventures Architecture →
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Venture 1: GSS */}
            <div className="rounded-xl border border-border bg-surface p-8 relative overflow-hidden group hover:border-accent/50 transition">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-secondary/10 border border-secondary/30 px-3 py-1 text-xs font-mono text-secondary font-semibold">
                  GTM INTELLIGENCE
                </span>
                <span className="text-xs font-mono text-muted">Active Engine</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                GTM Signal Studio (GSS)
              </h3>
              <p className="mt-2 text-accent font-medium text-sm">
                AI-Powered Go-To-Market Signal Intelligence
              </p>
              <p className="mt-4 text-sm text-primary-dim leading-relaxed">
                An operational intelligence platform designed to eliminate market blind spots. GSS monitors real-time market sentiment, buyer intent indicators, and competitor repositioning shifts to drive proactive product marketing decisions.
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <Link
                  href="/ventures#gss"
                  className="text-sm font-semibold text-foreground group-hover:text-accent transition"
                >
                  Explore GSS Architecture →
                </Link>
              </div>
            </div>

            {/* Venture 2: Practical AI Hub */}
            <div className="rounded-xl border border-border bg-surface p-8 relative overflow-hidden group hover:border-accent/50 transition">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent/10 border border-accent/30 px-3 py-1 text-xs font-mono text-accent font-semibold">
                  AI WORKFLOWS & EDUCATION
                </span>
                <span className="text-xs font-mono text-muted">Active Venture</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
                Practical AI Hub
              </h3>
              <p className="mt-2 text-accent font-medium text-sm">
                Actionable AI Systems for Busy Professionals
              </p>
              <p className="mt-4 text-sm text-primary-dim leading-relaxed">
                A structured educational and workflow ecosystem built to help professionals and creators productize their expertise. Home to the 18-Prompt Master System, digital product teardowns, and practical automation frameworks.
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <Link
                  href="/practical-ai-hub"
                  className="text-sm font-semibold text-foreground group-hover:text-accent transition"
                >
                  Visit Practical AI Hub →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story-Led Teardowns & Blog Section */}
      <section id="teardowns" className="border-t border-border bg-surface/30 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
                Case Studies & Teardowns
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Deconstructing how great products win.
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-sm font-semibold text-accent hover:text-accent-light underline underline-offset-4"
              >
                Read All Blog Posts →
              </Link>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary-dim hover:text-foreground underline underline-offset-4"
              >
                YouTube (@oloyeadeosun) ↗
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {teardowns.map((td) => (
              <div
                key={td.title}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>{td.tag}</span>
                    <span className="rounded bg-surface-alt px-2 py-0.5 border border-border text-foreground">
                      {td.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground leading-snug">
                    {td.title}
                  </h3>
                  <p className="mt-3 text-sm text-primary-dim leading-relaxed">
                    {td.description}
                  </p>
                </div>
                <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${td.slug}`}
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Read Breakdown →
                  </Link>
                  <a
                    href={SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-muted hover:text-foreground"
                  >
                    Watch Video ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Conversation Section */}
      <section id="contact" className="border-t border-border py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
            Start a Conversation
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            Let&apos;s talk about buyer psychology & distribution.
          </h2>
          <p className="mt-5 text-lg text-primary-dim leading-relaxed text-balance">
            Whether you are a solo builder looking to escape the 'Build & Pray' trap, an operator wanting to build an automated AI content engine, or a founder seeking an audience-first GTM strategy, let&apos;s connect.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 font-semibold text-background transition hover:bg-accent-light shadow-md font-mono"
            >
              Connect on LinkedIn ↗
            </a>
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-md border border-border-strong bg-surface px-8 py-4 font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Subscribe on YouTube ↗
            </a>
            <Link
              href="/free"
              className="w-full sm:w-auto rounded-md border border-border px-8 py-4 font-semibold text-primary-dim transition hover:border-accent hover:text-foreground"
            >
              Free Playbooks & Sheets →
            </Link>
          </div>

          <p className="mt-8 text-xs font-mono text-muted">
            Based in the UK · Buyer Psychology, AI Distribution & 0-Dollar GTM
          </p>
        </div>
      </section>
    </>
  );
}
