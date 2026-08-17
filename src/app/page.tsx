import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { webPageSchema, faqPageSchema, itemListSchema } from "@/lib/schema";
import { metaKeywords } from "@/lib/keywords";

// SEO / AEO / GEO note, deliberate:
// Answer engines quote whole sentences, so every answer below is written to
// stand alone with no surrounding page. Each H2 is the question somebody
// actually types, and the plain answer follows immediately, before any detail.
// The plain-language rule the brand runs on is also what makes copy quotable:
// short, jargon-free sentences survive being lifted. See MISSION.md.

const TITLE = "Practical AI Hub: use AI to build extra income";
const DESCRIPTION =
  "Free tools and plain steps for people with a full-time job who want to earn extra income using AI. No jargon, no install, nothing technical.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: metaKeywords("home"),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

const giveaways = [
  {
    name: "The Idea Scorecard",
    promise: "You already had the idea. This tells you if it is worth your evenings.",
    detail:
      "Four things decide whether an idea sells: whether the pain is real, whether anything like it already sells, whether you can name the buyer out loud, and whether you could reach them on a Tuesday night. Twenty five points each. Under 50, do not build it.",
  },
  {
    name: "The First Section",
    promise: "The blank page is not the hard part. It is the part already solved.",
    detail:
      "Paste your idea, get the full outline plus the first section actually written. Several hundred words in your voice, no placeholders. Then it stops, because section two is yours.",
  },
  {
    name: "Thirty Posts",
    promise: "You are not out of ideas. You are trying to invent them.",
    detail:
      "Every question somebody asks you is a post. Collect the ones you already get asked and turn them into about thirty posts, each with a hook and what to say.",
  },
  {
    name: "The Camera Answer",
    promise: "You do not have to be on camera. You do have to show up.",
    detail:
      "A ladder of formats that need no camera, cheapest first, and five posts written in whichever one fits what you already have.",
  },
  {
    name: "Idea to Finished Thing",
    promise: "The month of evenings is the part that changed.",
    detail:
      "Six answers in, a finished product out, with an honest list of what still needs you. It never hands you something half-built and calls it done.",
  },
];

// Real questions, plain answers, each one able to stand alone if lifted.
const faqs = [
  {
    question: "What is Practical AI Hub?",
    answer:
      "Practical AI Hub helps people with a full-time job use AI to build extra income. It gives away free tools and plain steps for people who are not technical and do not have months to spare. It is run by Oloye Adeosun, who builds the things he teaches and says what they actually cost.",
  },
  {
    question: "Do I need to be technical to use AI to make money?",
    answer:
      "No. Every tool here works by pasting text into whatever AI you already have open, such as ChatGPT, Claude or Gemini. There is nothing to install and no code. If you have ever sent an email, you can do this.",
  },
  {
    question: "How long does it take to build something you can sell with AI?",
    answer:
      "A weekend, for a first version. The part that used to take a month of evenings, which is the writing and the structure, is the part AI is genuinely good at. You still have to bring the judgement, the real numbers and the taste, and you still have to sell it.",
  },
  {
    question: "What can I actually sell?",
    answer:
      "Anything somebody already pays to avoid doing. A guide, a template pack, a service, editing clips for creators, product photos for small sellers, local content, or setting up a simple assistant inside somebody's business. Digital products earn the most because you make them once, but they are one route, not the only one.",
  },
  {
    question: "Is it too late to start making money with AI?",
    answer:
      "No, and the belief that it is late usually comes from a different worry, which is that starting will take months. That was true five years ago. The work is smaller now, so the honest answer is that the idea you already had is more finishable today than it has ever been.",
  },
  {
    question: "How do I know if my idea is any good before I waste weeks on it?",
    answer:
      "Score it on four things before you build: is the pain real, does anything similar already sell, can you name the buyer specifically, and could you reach those people without paid ads. The free Idea Scorecard walks through it in about four minutes.",
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
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={itemListSchema({
          path: "/",
          items: giveaways.map((g) => ({ name: g.name, path: "/free" })),
        })}
      />

      <section className="mx-auto max-w-3xl px-5 pt-16 pb-14 sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent,#587109)]">
          {SITE_NAME}
        </p>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          You already had the idea. AI just made it small enough to finish.
        </h1>

        {/* The lift paragraph. Self-contained on purpose. */}
        <p className="mt-6 max-w-[60ch] text-lg">
          Practical AI Hub helps people with a full-time job use AI to build
          extra income. Free tools, plain steps, honest numbers. Nothing
          technical, nothing to install.
        </p>

        <p className="mt-4 max-w-[60ch] text-[var(--muted,#555)]">
          Most people are not short of ideas. They are stuck on a sum they did
          in their head years ago: months of evenings, a skill to learn first,
          starting from nothing. That sum was right in 2020. It is not right
          now, and nobody sent a memo.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/free"
            className="rounded-md bg-[var(--fg,#0E0F12)] px-5 py-3 font-semibold text-[var(--bg,#fff)] transition hover:opacity-90"
          >
            Get the free tools
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-current/20 px-5 py-3 font-semibold transition hover:bg-current/5"
          >
            Read the blog
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="free-heading"
        className="mx-auto max-w-3xl border-t border-current/10 px-5 py-14"
      >
        <h2 id="free-heading" className="text-2xl font-extrabold tracking-tight">
          What can I get for free?
        </h2>
        <p className="mt-3 max-w-[60ch] text-[var(--muted,#555)]">
          Five tools, all free, none of them requiring an install. Each one is a
          short guide plus a prompt you paste into whatever AI you already use.
          They also run in order.
        </p>

        <ol className="mt-8 space-y-7">
          {giveaways.map((g, i) => (
            <li key={g.name} className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="pt-1 font-bold tabular-nums text-[var(--accent,#587109)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-bold">{g.name}</h3>
                <p className="mt-1 font-medium">{g.promise}</p>
                <p className="mt-1 text-[var(--muted,#555)]">{g.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/free"
          className="mt-9 inline-block font-semibold underline underline-offset-4"
        >
          Get all five, free
        </Link>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-3xl border-t border-current/10 px-5 py-14"
      >
        <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight">
          Questions people actually ask
        </h2>
        <dl className="mt-8 space-y-8">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-lg font-bold text-balance">{f.question}</dt>
              <dd className="mt-2 max-w-[62ch] text-[var(--muted,#555)]">
                {f.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
