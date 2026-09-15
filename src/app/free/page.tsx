import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, NOTION_PACK_URL, ICP_MATRIX_GOOGLE_SHEET_URL, SOCIAL } from "@/lib/site";
import SignupForm from "@/components/SignupForm";
import { webPageSchema, faqPageSchema } from "@/lib/schema";

const TITLE = "Free Solopreneur Playbooks, Google Sheets & Prompt Vaults";
const DESCRIPTION =
  "Plug-and-play Google Sheets, Eugene Schwartz customer language mining matrices, 0-dollar distribution checklists, and AI prompt architectures. 100% free with zero gatekeeping.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/free` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/free`,
    type: "website",
  },
};

const featuredAssets = [
  {
    badge: "FEATURED PROMPT ENGINE • VIDEO 01",
    title: "The 10-Minute Market Research Engine",
    description:
      "The exact Eugene Schwartz buyer psychology prompt to turn competitor 1-star reviews into validated digital product offers in 10 minutes on Google AI Studio.",
    link: "/free/market-research-engine",
    actionText: "Get Free System Prompt →",
    format: "Google AI Studio Prompt • Free",
    isExternal: false,
  },
  {
    badge: "FEATURED SPREADSHEET · VIDEO 02",
    title: "The Customer Language Mining & ICP Discovery Matrix",
    description:
      "A complete 3-tab Google Sheet to diagnose your customer across all 5 Eugene Schwartz awareness levels, mine Reddit & G2 for bleeding-neck phrases, and assemble high-converting hooks.",
    link: ICP_MATRIX_GOOGLE_SHEET_URL,
    actionText: "Open Google Sheet (Free) ↗",
    format: "Google Sheets · Instant Access",
    isExternal: true,
  },
  {
    badge: "FEATURED FRAMEWORK · VIDEO 03",
    title: "The 0-Dollar Solopreneur Distribution Checklist",
    description:
      "The plug-and-play framework to build organic attention from scratch. Includes the 3-step Signal Post formula, the Friction-Magnet quality audit, and 5-minute DM language mining scripts.",
    link: "/blog/how-to-build-an-audience-from-scratch-0-dollar-marketing",
    actionText: "View Full Checklist Breakdown →",
    format: "Interactive Playbook & Template",
    isExternal: false,
  },
];

const tools = [
  {
    n: "01",
    name: "The 5 Levels of Customer Awareness Audit",
    promise: "Diagnose where your buyers sit before you write a single line of copy.",
    detail:
      "Never pitch 'Buy Now' to a cold audience. This prompt and framework diagnoses your market between Unaware, Problem-Aware, and Solution-Aware so your messaging resonates immediately.",
    time: "5 minutes",
  },
  {
    n: "02",
    name: "The Customer Language Mining Prompt Vault",
    promise: "Extract high-converting headlines from 1-star competitor reviews.",
    detail:
      "Paste 20 raw customer reviews into Claude or Gemini and get back the exact 2:00 AM bleeding-neck words and emotional pain phrases your prospects use.",
    time: "2 minutes",
  },
  {
    n: "03",
    name: "The Signal Post Daily Hook Generator",
    promise: "Never stare at a blank screen wondering what to post.",
    detail:
      "Transform your daily build struggles, bug fixes, and customer conversations into high-engagement organic posts that stop the scroll.",
    time: "10 minutes",
  },
  {
    n: "04",
    name: "The Friction-Magnet Lead Magnet Checklist",
    promise: "Audit your free tools and templates before sharing them.",
    detail:
      "A 5-point quality checklist to ensure your free asset delivers instant value in under 60 seconds with zero signup friction.",
    time: "3 minutes",
  },
  {
    n: "05",
    name: "The 1-Person AI Media Engine Setup",
    promise: "The complete one-to-many repurposing workflow for solo builders.",
    detail:
      "How to take 1 raw video take and transform it into an SEO blog post, social carousels, and an email newsletter in under 15 minutes.",
    time: "15 minutes",
  },
];

const faqs = [
  {
    question: "Are these spreadsheets and playbooks really free?",
    answer:
      "Yes, 100% free with no payment, no paywalls, and no credit card required. You can make a copy of the Google Sheets directly into your Google Drive and start using them immediately.",
  },
  {
    question: "Do I need to sign up or give an email to open the Google Sheet?",
    answer:
      "No. The Customer Language Mining & ICP Matrix Google Sheet is a direct public link. You can open it, inspect it, and click 'File > Make a copy' with zero barriers.",
  },
  {
    question: "Which AI models do these prompt frameworks work in?",
    answer:
      "They work in Claude (Sonnet/Opus), Google Gemini, and ChatGPT. The prompts are based on qualitative research constraints rather than specific software plugins.",
  },
  {
    question: "Where should I start first?",
    answer:
      "Start by opening The Customer Language Mining & ICP Discovery Matrix Google Sheet. It gives you the foundational clarity you need on your customer's awareness stage before writing copy.",
  },
];

export default function FreePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/free",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Free Playbooks", path: "/free" },
          ],
        })}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      {/* Hero Header */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-12 sm:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-accent uppercase mb-6">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          100% Free Resources · Zero Gatekeeping
        </div>
        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl font-display">
          Free Solopreneur Playbooks & <span className="text-accent">Google Sheets.</span>
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-primary-dim leading-relaxed">
          Plug-and-play tools to help you escape the &lsquo;Build & Pray&rsquo; trap. Master buyer psychology, mine customer pain, and deploy a 0-dollar distribution engine without ad spend.
        </p>
      </section>

      {/* Top Featured Google Sheet & Playbook Cards */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredAssets.map((asset) => (
            <div
              key={asset.title}
              className="rounded-2xl border-2 border-accent/40 bg-surface p-7 flex flex-col justify-between shadow-md hover:border-accent transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                    {asset.badge}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {asset.format}
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground font-display leading-snug">
                  {asset.title}
                </h2>
                <p className="mt-3 text-sm text-primary-dim leading-relaxed">
                  {asset.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-border">
                {asset.isExternal ? (
                  <a
                    href={asset.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center block rounded-md bg-accent px-6 py-3.5 font-semibold text-background transition hover:bg-accent-light shadow-sm"
                  >
                    {asset.actionText}
                  </a>
                ) : (
                  <Link
                    href={asset.link}
                    className="w-full text-center block rounded-md border border-border-strong bg-surface-alt px-6 py-3.5 font-semibold text-foreground transition hover:border-accent hover:text-accent"
                  >
                    {asset.actionText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Core Frameworks List */}
      <section className="mx-auto max-w-4xl px-6 pb-16 border-t border-border pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-foreground font-display mb-8">
          The 5 Core Solopreneur Frameworks
        </h2>
        <ol className="space-y-8">
          {tools.map((t) => (
            <li
              key={t.name}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border pt-6"
            >
              <span className="pt-1 font-mono font-bold tabular-nums text-accent text-lg">
                {t.n}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-foreground font-display">
                    {t.name}
                  </h3>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                    {t.time}
                  </span>
                </div>
                <p className="mt-2 font-medium text-foreground text-sm">{t.promise}</p>
                <p className="mt-2 text-sm text-primary-dim leading-relaxed">
                  {t.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Optional Newsletter Form */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <SignupForm notionUrl={NOTION_PACK_URL} />
      </section>

      {/* FAQs */}
      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16"
      >
        <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-foreground font-display">
          Frequently Asked Questions
        </h2>
        <dl className="mt-8 space-y-8">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-lg font-bold text-foreground font-display">{f.question}</dt>
              <dd className="mt-2 text-sm text-primary-dim leading-relaxed">
                {f.answer}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex items-center gap-4">
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:text-accent-light underline underline-offset-4"
          >
            Watch Video Breakdowns on YouTube (@oloyeadeosun) →
          </a>
        </div>
      </section>
    </>
  );
}
