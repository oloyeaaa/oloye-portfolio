import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, LINKEDIN_URL, AVATAR_URL } from "@/lib/site";

const GTM_URL = "https://www.gtmsignalstudio.com";

export const metadata: Metadata = {
  title: "Oloye Adeosun — Agentic AI Systems Builder",
  description:
    "Oloye Adeosun builds agentic AI systems that do real work for real businesses. Fifteen years turning manual systems into automated ones, now building The Front Desk and researching AI visibility at GTM Signal Studio.",
  alternates: { canonical: `${SITE_URL}/oloye` },
  openGraph: {
    title: "Oloye Adeosun — Agentic AI Systems Builder",
    description:
      "I build agentic AI systems that do real work for real businesses. Founder of The Front Desk, researcher at GTM Signal Studio.",
    url: `${SITE_URL}/oloye`,
    type: "profile",
  },
};

const shortVersion = [
  "15+ years turning manual systems into automated ones",
  "Builds agentic AI systems with Claude and Claude Code",
  "Founder of The Front Desk, AI first-response for local business",
  "Publishes original AI research at GTM Signal Studio",
  "Based in Kent, United Kingdom",
];

const building = [
  {
    name: "The Front Desk",
    body: "An AI first-responder for local businesses. It answers every call, message and enquiry in under a minute and books the job, so owners stop losing customers to whoever replied first.",
    href: "/",
    cta: "See the product",
  },
  {
    name: "GTM Signal Studio",
    body: "My research studio on AI visibility: how AI decides which companies it recommends to buyers. Home of the AI Visibility Benchmark 2026.",
    href: GTM_URL,
    cta: "Read the research",
    external: true,
  },
  {
    name: "Agentic systems, in the open",
    body: "I write about how these systems are actually built, and publish live proof, on the blog. Most people talk about AI. I would rather show you one working.",
    href: "/blog",
    cta: "Read the blog",
  },
];

export default function OloyeProfile() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/oloye#profilepage`,
    url: `${SITE_URL}/oloye`,
    name: "Oloye Adeosun",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Oloye Adeosun",
      image: AVATAR_URL,
      jobTitle: "Agentic AI Systems Builder",
      description:
        "Builder of agentic AI systems. Founder of The Front Desk and researcher at GTM Signal Studio.",
      url: `${SITE_URL}/oloye`,
      sameAs: [LINKEDIN_URL, GTM_URL],
      knowsAbout: [
        "Agentic AI Systems",
        "AI Agents",
        "Marketing Automation",
        "MarTech",
        "AI Visibility",
      ],
    },
  };

  return (
    <>
      <JsonLd data={profileSchema} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <div className="flex items-center gap-5 mb-8">
            <Image
              src="/images/oloye-avatar.png"
              alt="Oloye Adeosun"
              width={72}
              height={72}
              priority
              className="w-16 h-16 rounded-full object-cover shrink-0 border border-border"
            />
            <div>
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] font-display">
                Oloye Adeosun
              </p>
              <p className="text-sm text-muted mt-1">Kent, United Kingdom</p>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-8 font-display leading-[1.1]">
            I build agentic AI systems that do real work for real businesses.
          </h1>

          <p className="text-lg text-primary-dim leading-relaxed">
            I am Oloye. For fifteen years I have done one thing in different clothes: take messy, manual systems and make them clean, measurable, and automatic. It started inside banks and financial institutions, moved into marketing and automation, and today it lives in the most capable tools we have ever had, AI agents that can read, decide, and act.
          </p>
        </div>
      </section>

      {/* Short version */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5 font-display">
            The short version
          </p>
          <ul className="space-y-3">
            {shortVersion.map((line) => (
              <li key={line} className="flex gap-3 text-primary-dim">
                <span className="text-accent shrink-0">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
            How I got here
          </h2>
          <div className="prose">
            <p>
              I did not come from tech. I studied business, started in compliance and audit inside heavily regulated financial institutions, and spent years building dashboards, fixing broken processes, and making complicated things run without drama. That systems habit never left me.
            </p>
            <p>
              When marketing automation arrived, I recognised the same job: connect the messy parts, measure what matters, remove the manual grind. I spent years owning MarTech stacks, rebuilding attribution and lead scoring, and getting reporting to tell the truth. When AI agents arrived, I recognised the job again, only bigger. For the first time the system could not just track and route, it could read, decide, and act.
            </p>
          </div>
        </div>
      </section>

      {/* What I'm building */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 font-display">
            What I am building
          </h2>
          <div className="flex flex-col gap-4">
            {building.map((b) => (
              <div
                key={b.name}
                className="bg-surface border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-foreground mb-2 font-display text-lg">
                  {b.name}
                </h3>
                <p className="text-sm text-primary-dim leading-relaxed mb-4">
                  {b.body}
                </p>
                {b.external ? (
                  <a
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-accent hover:text-accent-light font-display"
                  >
                    {b.cta} ↗
                  </a>
                ) : (
                  <Link
                    href={b.href}
                    className="text-sm font-semibold text-accent hover:text-accent-light font-display"
                  >
                    {b.cta} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I believe */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
            What I believe
          </h2>
          <div className="prose">
            <p>
              Most people talk about AI. I would rather show you one working. I care about systems that outlast job titles, proof over hype, and building things that quietly earn while you sleep.
            </p>
            <p>
              I am problem-loyal, not industry-loyal. Give me a painful, repetitive process and I will find a way to make it run itself, then show you the receipts.
            </p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5 font-display">
            Find me
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GTM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border hover:border-accent rounded-lg px-5 py-3 text-sm font-semibold text-foreground hover:text-accent transition-colors font-display"
            >
              GTM Signal Studio ↗
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-border hover:border-accent rounded-lg px-5 py-3 text-sm font-semibold text-foreground hover:text-accent transition-colors font-display"
            >
              LinkedIn ↗
            </a>
            <Link
              href="/"
              className="bg-surface border border-border hover:border-accent rounded-lg px-5 py-3 text-sm font-semibold text-foreground hover:text-accent transition-colors font-display"
            >
              The Front Desk →
            </Link>
            <Link
              href="/blog"
              className="bg-surface border border-border hover:border-accent rounded-lg px-5 py-3 text-sm font-semibold text-foreground hover:text-accent transition-colors font-display"
            >
              Blog →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
