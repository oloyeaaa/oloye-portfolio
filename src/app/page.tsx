import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { webPageSchema, faqPageSchema, itemListSchema } from "@/lib/schema";
import { metaKeywords } from "@/lib/keywords";
import { FREEBIES } from "@/lib/freebies";

// SEO / AEO / GEO, deliberate:
// Answer engines quote whole sentences, so every FAQ answer stands alone with
// no surrounding page, and each heading is a question somebody actually types.
// The plain-language rule is also what makes copy quotable: short, jargon-free
// sentences survive being lifted. See MISSION.md.

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
      "Anything somebody already pays to avoid doing. A guide, a template pack, a service, editing clips for creators, product photos for small sellers, or setting up a simple assistant inside somebody's business. Digital products earn the most because you make them once, but they are one route, not the only one.",
  },
  {
    question: "Is it too late to start making money with AI?",
    answer:
      "No, and the belief that it is late usually comes from a different worry, which is that starting will take months. That was true five years ago. The work is smaller now, so the idea you already had is more finishable today than it has ever been.",
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
          items: FREEBIES.map((f) => ({
            name: f.name,
            path: `/free/${f.slug}`,
          })),
        })}
      />

      <section className="mx-auto max-w-3xl px-5 pt-20 pb-16 sm:pt-28">
        <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-balance sm:text-6xl">
          You already had the idea.
          <span className="block text-accent">
            AI just made it small enough to finish.
          </span>
        </h1>

        <p className="mt-7 max-w-[50ch] text-lg text-primary-dim">
          Free tools for people with a full-time job who want extra income.
          Nothing to install, nothing technical.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/free"
            className="rounded-md bg-accent px-5 py-3 font-semibold text-background transition hover:bg-accent-light"
          >
            Get the free tools
          </Link>
          <Link
            href="/blog"
            className="rounded-md border border-accent px-5 py-3 font-semibold text-accent transition hover:bg-accent/10"
          >
            Read the blog
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="free-heading"
        className="mx-auto max-w-3xl border-t border-border px-5 py-14"
      >
        <h2 id="free-heading" className="text-2xl font-extrabold tracking-tight">
          Five free tools
        </h2>
        <p className="mt-3 max-w-[50ch] text-muted">
          Each one is a prompt you paste into any AI. They run in order.
        </p>

        <ol className="mt-8 space-y-5">
          {FREEBIES.map((f, i) => (
            <li key={f.slug} className="grid grid-cols-[2rem_1fr] gap-4">
              <span className="pt-0.5 font-bold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <Link
                  href={`/free/${f.slug}`}
                  className="font-bold underline-offset-4 hover:text-accent hover:underline"
                >
                  {f.name}
                </Link>
                <p className="mt-0.5 text-muted">{f.promise}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-3xl border-t border-border px-5 py-14"
      >
        <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight">
          Questions people ask
        </h2>
        <dl className="mt-8 space-y-8">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-lg font-bold text-balance">{f.question}</dt>
              <dd className="mt-2 max-w-[62ch] text-muted">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
