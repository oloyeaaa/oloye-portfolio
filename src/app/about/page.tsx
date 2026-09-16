import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, LINKEDIN_URL, SOCIAL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";

const TITLE = "About Oloye Adeosun — Marketing Automation Specialist & Systems Operator";
const DESCRIPTION =
  "Enterprise Marketing Automation Specialist showing 9-to-5 operators how to build AI systems and buy back time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

const timelineSteps = [
  {
    icon: "📻",
    era: "1990s",
    badge: "Analog Foundation",
    title: "Analog Roots & Discipline",
    desc: "Rewinding cassette tapes with a Bic biro and writing by hand. The early discipline of manual systems and craftsmanship.",
  },
  {
    icon: "🏢",
    era: "2009 — Present",
    badge: "14+ Years Corporate",
    title: "London Arrival & Enterprise PMO",
    desc: "Stepping out into Barking rain. 14+ years in UK banking operations, stakeholder management, and marketing automation.",
  },
  {
    icon: "🔨",
    era: "Late 2023",
    badge: "Resilience & Grit",
    title: "The Demolition Sledgehammer",
    desc: "Redundancy and the real-world test. Breaking down HMO walls with a sledgehammer to rebuild true resilience and clarity.",
  },
  {
    icon: "⚡",
    era: "July 2025 — Today",
    badge: "Current Mission",
    title: "AI Systems & Time Buy-Back",
    desc: "Marketing Automation Specialist fusing buyer psychology with Google’s AI stack to build assets and buy back Saturday mornings.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/about",
          title: TITLE,
          description: DESCRIPTION,
          type: "AboutPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ],
        })}
      />
      <JsonLd data={personSchema()} />

      <div className="space-y-16 py-8 sm:py-12">
        {/* Top Profile Header */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 border-b border-border pb-8">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-2 ring-border">
            <Image
              src="/images/oloye-avatar.png"
              alt="Oloye Adeosun"
              fill
              className="object-cover"
              sizes="96px"
              priority
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-accent">
              <span>Active 9-to-5 Enterprise Specialist</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Operator. Builder. System Architect.
            </h1>
            <p className="text-sm text-muted max-w-xl">
              Marketing Automation Specialist by day. Building AI systems and buying back time by night.
            </p>
          </div>
        </section>

        {/* Visual Timeline Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              The Journey Timeline
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              From analog tape decks to enterprise marketing automation and Google AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {timelineSteps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{step.icon}</span>
                      <span className="text-xs font-mono font-semibold text-foreground">{step.era}</span>
                    </div>
                    <span className="rounded bg-background px-2 py-0.5 text-[10px] font-mono text-accent border border-border">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operating Values (Visual Cards) */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Core Operating Rules
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              The non-negotiables that guide every system and prompt we build.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-lg">🚫</span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">Zero Guru Fluff</h3>
              <p className="mt-1 text-xs text-muted">No fake revenue screenshots, rented lambos, or hustle porn.</p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-lg">💼</span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">Active 9-to-5 Reality</h3>
              <p className="mt-1 text-xs text-muted">Grounded in corporate enterprise ops. Systems built for real calendars.</p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="text-lg">⚽</span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">Buy Back Saturdays</h3>
              <p className="mt-1 text-xs text-muted">Building automated assets so you can enjoy Saturday mornings with family.</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-6">
          <Link
            href="/free"
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-background transition hover:bg-accent/90"
          >
            <span>Explore Prompt Lab ⚡</span>
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-surface"
          >
            <span>Connect on LinkedIn ↗</span>
          </a>
        </section>
      </div>
    </>
  );
}
