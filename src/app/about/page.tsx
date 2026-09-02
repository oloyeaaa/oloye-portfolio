import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, LINKEDIN_URL, SOCIAL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";

const TITLE = "About Oloye Adeosun — Buyer Psychology & AI Distribution";
const DESCRIPTION =
  "Oloye Adeosun is a marketing practitioner and builder helping solopreneurs escape the 'Build & Pray' trap with buyer psychology, 0-dollar distribution, and AI workflows.";

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
        {/* Header Avatar & Identity */}
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
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[11px] font-mono font-semibold tracking-wider text-accent uppercase">
              The Guide 2 Steps Ahead
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Oloye Adeosun
            </h1>
            <p className="text-xs font-mono text-muted">
              London, UK · Buyer Psychology · AI Workflows · 0-Dollar Distribution
            </p>
          </div>
        </div>

        {/* Narrative Intro */}
        <h2 className="mt-12 text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl font-display">
          From 6 years in the marketing trenches to building in the open.
        </h2>

        <div className="mt-6 space-y-5 text-lg text-primary-dim leading-relaxed">
          <p>
            For almost six years, I fell into the exact same trap that kills ninety-five percent of solo founders and builders:
          </p>
          <p className="border-l-2 border-accent pl-5 italic text-foreground bg-surface/50 py-3 rounded-r-md">
            &ldquo;I would get an exciting idea for a product. I would lock myself away for months building it, tweaking every feature, perfecting the logo, and making sure the code was spotless. And then I would launch... and get hit with complete silence. Zero comments. Zero sales. Zero likes.&rdquo;
          </p>
          <p>
            I could build systems and technical workflows, but I had zero idea how to get attention. That disconnect delayed my progress for years.
          </p>
        </div>

        {/* The Epiphany */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground font-display">
          The War Room Delusion & Buyer Psychology
        </h3>
        <div className="mt-5 space-y-4 text-primary-dim leading-relaxed">
          <p>
            I realized that solopreneurs and solo founders don&apos;t fail because their products are bad. They fail because they are trapped in <strong className="text-foreground">The War Room Delusion</strong>: building based on what they think is cool in isolation, instead of what real buyers are desperately trying to fix in their daily lives.
          </p>
          <p>
            The human brain filters out 99% of company noise. It doesn&apos;t care about your feature updates or how many hours you worked. It only pays attention when you name its <strong className="text-accent">2:00 AM bleeding-neck headache</strong> in its own words.
          </p>
        </div>

        {/* The Guide 2 Steps Ahead */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground font-display">
          The Role: The Guide 2 Steps Ahead
        </h3>
        <div className="mt-5 space-y-4 text-primary-dim leading-relaxed">
          <p>
            I am not an untouchable billionaire guru preaching from an ivory tower. I am an active practitioner in the arena. 
          </p>
          <p>
            I am using YouTube, my blog, and free Google Sheet frameworks to document the real journey, test buyer psychology live, and help fellow builders who are two steps behind me escape the &lsquo;Build & Pray&rsquo; loop.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <h3 className="mt-14 text-2xl font-extrabold tracking-tight text-foreground font-display">
          The 3 Pillars of What I Preach (and Practice)
        </h3>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-surface p-6">
            <span className="text-xs font-mono font-bold text-accent uppercase">
              01 · Buyer Psychology
            </span>
            <h4 className="mt-1 text-lg font-bold text-foreground">
              The 5 Levels of Customer Awareness
            </h4>
            <p className="mt-2 text-sm text-primary-dim leading-relaxed">
              Applying Eugene Schwartz frameworks and customer language mining to write messaging that speaks directly to cold buyers before pitching.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <span className="text-xs font-mono font-bold text-accent uppercase">
              02 · AI Workflows & Automation
            </span>
            <h4 className="mt-1 text-lg font-bold text-foreground">
              The One-Person Media Engine
            </h4>
            <p className="mt-2 text-sm text-primary-dim leading-relaxed">
              Using Claude, Gemini, and Python to automate customer research, script drafting, and multi-format distribution without producing robotic fluff.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6">
            <span className="text-xs font-mono font-bold text-accent uppercase">
              03 · 0-Dollar Distribution
            </span>
            <h4 className="mt-1 text-lg font-bold text-foreground">
              Organic Audience Building
            </h4>
            <p className="mt-2 text-sm text-primary-dim leading-relaxed">
              Deploying daily Signal Posts, friction-magnet free templates, and direct DM outreach to get your first 100 paying customers without spending £1 on ads.
            </p>
          </div>
        </div>

        {/* Contact & Next Steps */}
        <div className="mt-16 border-t border-border pt-10">
          <h3 className="text-2xl font-bold tracking-tight text-foreground font-display">
            Let&apos;s Connect & Build
          </h3>
          <p className="mt-3 text-base text-primary-dim">
            I believe in pure value first. Grab my free playbooks, check out the weekly video teardowns on YouTube, or connect with me on LinkedIn.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-background transition hover:bg-accent-light inline-flex items-center gap-2 shadow-sm"
            >
              <span>▶</span> Subscribe on YouTube
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border-strong bg-surface px-6 py-3 font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Connect on LinkedIn ↗
            </a>
            <Link
              href="/free"
              className="rounded-md border border-border px-6 py-3 font-semibold text-primary-dim transition hover:border-accent hover:text-foreground"
            >
              Free Templates & Sheets →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
