import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, LINKEDIN_URL, SOCIAL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";

const TITLE = "About Oloye Adeosun — Product Marketing & Marketing Operations";
const DESCRIPTION =
  "Oloye Adeosun is a senior Product Marketer and Marketing Operations leader with 10+ years in PMO systems, accessible technology GTM, and automated revenue operations.";

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

      <article className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20">
        {/* Header Avatar & Tagline */}
        <div className="flex items-center gap-5">
          <Image
            src="/images/oloye-avatar.png"
            alt="Oloye Adeosun"
            width={84}
            height={84}
            className="rounded-full ring-2 ring-accent shadow-md"
            priority
          />
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-accent">
              Senior GTM & Operations Leader
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Oloye Adeosun
            </h1>
            <p className="text-xs font-mono text-muted">
              London, UK · Product Marketing & Operations Leader · Founder, GSS & Practical AI Hub
            </p>
          </div>
        </div>

        {/* Narrative Intro */}
        <h2 className="mt-12 text-3xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-4xl">
          Bridging narrative positioning with operational reality.
        </h2>

        <div className="mt-6 space-y-5 text-lg text-primary-dim leading-relaxed">
          <p>
            In modern business, there is a fundamental divide that costs companies millions in lost pipeline: <strong className="text-foreground">the disconnect between what marketing promises and how operations executes.</strong>
          </p>
          <p>
            Product Marketing teams craft compelling narratives that never translate into CRM data models. Marketing Operations teams build intricate automation pipelines that lack message resonance. I sit directly at the intersection of both disciplines.
          </p>
        </div>

        {/* Background & Foundation */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground">
          The Foundation: 10 Years of Systems & PMO Rigor
        </h3>
        <div className="mt-5 space-y-4 text-primary-dim leading-relaxed">
          <p>
            Before pivoting fully into marketing leadership, I spent a decade as a PMO analyst and project manager across complex corporate programme offices. That background gives me a rare analytical foundation in an industry often filled with guesswork:
          </p>
          <ul className="mt-4 space-y-2.5 border-l-2 border-border pl-5 text-sm text-foreground">
            <li>
              <strong>Systems-First Thinking:</strong> Every marketing campaign is treated as a repeatable, measurable architecture rather than a one-off creative whim.
            </li>
            <li>
              <strong>Data Governance & Attribution:</strong> Understanding how data flows across databases, webhooks, and CRM fields to eliminate pipeline leakage.
            </li>
            <li>
              <strong>Stakeholder Governance:</strong> Aligning executive leadership, sales reps, product managers, and engineering teams around clear go-to-market milestones.
            </li>
          </ul>
        </div>

        {/* Accessible Tech & Multi-Stakeholder Ecosystems */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground">
          Specialized GTM: Accessible Tech & Complex Ecosystems
        </h3>
        <div className="mt-5 space-y-4 text-primary-dim leading-relaxed">
          <p>
            In my day-to-day enterprise marketing leadership across accessible communication technology and service ecosystems, I navigate the complex dynamics of marketing hardware, software, and critical public/private sector frameworks.
          </p>
          <p>
            This experience gives me deep insight into <strong className="text-accent">The Curb-Cut Effect</strong>: how building products for high-constraint, mission-critical accessibility requirements accidentally unlocks category-dominating advantages in the broader commercial market.
          </p>
        </div>

        {/* Ventures Section */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground">
          The Builder Mindset: Proprietary Products
        </h3>
        <div className="mt-5 space-y-4 text-primary-dim leading-relaxed">
          <p>
            I believe the best marketing leaders are active builders. That is why I design and operate two dedicated proprietary ventures:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xs font-mono font-semibold text-secondary uppercase">
                GTM Signal Studio (GSS)
              </p>
              <h4 className="mt-1 font-bold text-foreground">Signal Intelligence</h4>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                An AI-driven operational listening engine that monitors buyer sentiment, competitor repositioning, and unmet forum complaints.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xs font-mono font-semibold text-accent uppercase">
                Practical AI Hub
              </p>
              <h4 className="mt-1 font-bold text-foreground">Workflow Ecosystem</h4>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                An actionable prompt vault and workflow library helping creators turn domain knowledge into scalable digital assets.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Next Steps */}
        <div className="mt-16 border-t border-border pt-10">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            Let&apos;s Connect
          </h3>
          <p className="mt-3 text-base text-primary-dim">
            I am always open to discussing buyer psychology, solopreneur GTM strategy, and AI-powered distribution engines.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-background transition hover:bg-accent-light"
            >
              Connect on LinkedIn ↗
            </a>
            <a
              href="https://www.youtube.com/@oloyeadeosun"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border bg-surface px-6 py-3 font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Watch on YouTube ↗
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
