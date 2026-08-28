import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL, LINKEDIN_URL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";

const TITLE = "Oloye Adeosun — Product Marketing & Marketing Operations Leader";
const DESCRIPTION =
  "Senior Product Marketer and Marketing Operations leader bridging narrative positioning with scalable revenue infrastructure. Founder of GTM Signal Studio (GSS) and Practical AI Hub.";

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
    kicker: "PMM & POSITIONING",
    title: "Product Marketing & Narrative Design",
    description:
      "Transforming complex, technical products into undeniable, story-led positioning. Moving away from generic feature checklists to counter-positioning, category disruption, and message-market fit.",
    bullets: [
      "Counter-Positioning & Incumbent Displacement",
      "Story-Led Messaging Architectures",
      "Accessible Tech GTM (The Curb-Cut Effect)",
      "Win/Loss Analysis & Customer Intelligence",
    ],
  },
  {
    kicker: "MOPS & REVENUE ENGINE",
    title: "Marketing Operations & Infrastructure",
    description:
      "Eliminating the invisible operational leaks that silently drain pipeline. Architecting CRM lifecycles, precision data scoring, and speed-to-lead automation.",
    bullets: [
      "Fit × Intent Lead Scoring & Routing",
      "Full-Funnel CRM & Tech Stack Orchestration",
      "Attribution Models vs. Pipeline Reality",
      "Speed-to-Lead & API Workflow Optimization",
    ],
  },
  {
    kicker: "SYSTEMS & AI STRATEGY",
    title: "GTM Intelligence & Scalable Systems",
    description:
      "10+ years of PMO and systems rigor applied to go-to-market. Building intelligent signal monitoring engines and automated workflows that scale.",
    bullets: [
      "AI-Powered Market Signal Tracking (GSS)",
      "B2B/B2G Multi-Stakeholder Enablement",
      "Cross-Functional Team & Agency Governance",
      "No-Code Workflow Automation",
    ],
  },
];

const teardowns = [
  {
    tag: "CASE STUDY • PMM",
    title: "The Billion-Dollar Strategy Most Marketers Ignore: The Curb-Cut Effect",
    description:
      "How designing and positioning products for extreme accessibility constraints created undisputed market leaders like Oxo Good Grips, Apple Accessibility, and Microsoft Adaptive.",
    badge: "Accessibility & Tech",
  },
  {
    tag: "TEARDOWN • POSITIONING",
    title: "Why Linear Built 80% Fewer Features (And Beat a $40B Incumbent)",
    description:
      "The counter-positioning masterclass: weaponizing speed as a feature, opinionated workflows over customization, and winning the end-user before the buyer.",
    badge: "B2B SaaS Teardown",
  },
  {
    tag: "REVENUE OPS • CRIME SCENE",
    title: "The $2M Pipeline Leak: Why 90% of B2B Lead Scoring Is Broken",
    description:
      "Inside the 'Activity Illusion' — how uncalibrated CRM workflows flood sales reps with junk leads while high-intent enterprise buyers slip through the cracks.",
    badge: "Marketing Operations",
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
          Product Marketing • Marketing Operations • GTM Strategy
        </div>

        <h1 className="mt-8 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-6xl md:text-7xl">
          Where product narrative meets{" "}
          <span className="text-accent">scalable revenue infrastructure.</span>
        </h1>

        <p className="mt-7 max-w-[58ch] text-lg text-primary-dim sm:text-xl leading-relaxed">
          I am <strong className="text-foreground">Oloye Adeosun</strong>. I bridge the gap between high-level go-to-market positioning and the technical marketing operations required to scale pipeline.
        </p>

        {/* Dual Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#contact"
            className="rounded-md bg-accent px-6 py-3.5 font-semibold text-background transition hover:bg-accent-light shadow-md"
          >
            Start a Conversation
          </Link>
          <Link
            href="/ventures"
            className="rounded-md border border-border-strong bg-surface px-6 py-3.5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Explore My Ventures (GSS & Practical AI)
          </Link>
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-5 py-3.5 font-medium text-muted transition hover:text-foreground"
          >
            Watch YouTube Teardowns ↗
          </a>
        </div>

        {/* Credibility & Experience Badges */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-10 sm:grid-cols-4">
          <div>
            <p className="text-2xl font-bold font-mono text-accent">10+ Yrs</p>
            <p className="mt-1 text-xs text-muted">Systems, PMO & Project Governance</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-accent">6+ Yrs</p>
            <p className="mt-1 text-xs text-muted">Marketing Ops, Automation & Growth</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">Sorenson UK</p>
            <p className="mt-1 text-xs text-muted">Accessible Tech & Enterprise Comm</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-foreground">2 Products</p>
            <p className="mt-1 text-xs text-muted">Built & Owned: GSS & Practical AI</p>
          </div>
        </div>
      </section>

      {/* Core Expertise & Disciplines */}
      <section id="expertise" className="border-t border-border bg-surface/30 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-xl">
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
              Core Capabilities
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Disciplines built for modern revenue growth.
            </h2>
            <p className="mt-3 text-muted">
              Most teams have great storytellers who don’t understand CRM data, or technical operators who can’t write messaging. I combine both.
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

      {/* Story-Led Teardowns & YouTube Section */}
      <section id="teardowns" className="border-t border-border bg-surface/30 py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
                Video Teardowns & Case Studies
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Deconstructing how great products win.
              </h2>
            </div>
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:text-accent-light underline underline-offset-4"
            >
              Subscribe on YouTube (@oloyeadeosun) →
            </a>
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
                <div className="mt-6 border-t border-border pt-4">
                  <a
                    href={SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    Watch Breakdown on YouTube ↗
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
            Let&apos;s discuss your product positioning or revenue ops.
          </h2>
          <p className="mt-5 text-lg text-primary-dim leading-relaxed text-balance">
            Whether you are an employer seeking a senior Product Marketing / MOPs leader, or a founder looking for a strategic GTM audit, I am always open to high-impact conversations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${AUTHOR.email}?subject=Strategic%20Inquiry%20from%20Oloye.co.uk`}
              className="w-full sm:w-auto rounded-md bg-accent px-8 py-4 font-semibold text-background transition hover:bg-accent-light shadow-md"
            >
              Email {AUTHOR.email}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto rounded-md border border-border-strong bg-surface px-8 py-4 font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Connect on LinkedIn ↗
            </a>
          </div>

          <p className="mt-8 text-xs font-mono text-muted">
            Based in the UK · Available for Executive Roles, Advisory & GTM Teardowns
          </p>
        </div>
      </section>
    </>
  );
}
