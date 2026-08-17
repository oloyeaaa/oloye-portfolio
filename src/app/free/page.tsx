import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { webPageSchema, faqPageSchema, itemListSchema } from "@/lib/schema";
import { metaKeywords } from "@/lib/keywords";

// This is the page the bio link points at. Its one job is to hand somebody
// something useful in under thirty seconds. Written for AEO and GEO too:
// each question is a heading with a plain, self-contained answer underneath.

const TITLE = "Free AI tools to build extra income";
const DESCRIPTION =
  "Five free tools for people with a full-time job. Each is a short guide plus a prompt you paste into any AI. No install, nothing technical, no payment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: metaKeywords("free"),
  alternates: { canonical: `${SITE_URL}/free` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/free`,
    type: "website",
  },
};

const tools = [
  {
    n: "01",
    name: "The Idea Scorecard",
    promise: "You already had the idea. This tells you if it is worth your evenings.",
    detail:
      "Score an idea out of 100 on four things: whether the pain is real, whether anything like it already sells, whether you can name the buyer out loud, and whether you could reach them on a Tuesday night. Under 50, do not build it, and be glad you found out in four minutes.",
    time: "4 minutes",
  },
  {
    n: "02",
    name: "The First Section",
    promise: "The blank page is not the hard part. It is the part already solved.",
    detail:
      "Paste your idea and get the full outline plus the first section written properly. Several hundred words in your voice, no placeholders. Then it stops on purpose, because section two is yours.",
    time: "One sitting",
  },
  {
    n: "03",
    name: "Thirty Posts",
    promise: "You are not out of ideas. You are trying to invent them.",
    detail:
      "Every question somebody asks you is a post. Collect the ones you already get asked, and get about thirty posts back, each with a hook of ten words or fewer and the angle of the answer.",
    time: "10 minutes",
  },
  {
    n: "04",
    name: "The Camera Answer",
    promise: "You do not have to be on camera. You do have to show up.",
    detail:
      "A ladder of formats that need no camera, cheapest first, and five real posts written in whichever one fits what you already have. It is honest that a face does help, and honest that it is not required.",
    time: "15 minutes",
  },
  {
    n: "05",
    name: "Idea to Finished Thing",
    promise: "The month of evenings is the part that changed.",
    detail:
      "Six answers in, a finished product out, plus a cover idea, a sales page and the steps to put it on sale. It gives you a straight list of what is done and what still needs you.",
    time: "A weekend",
  },
];

const faqs = [
  {
    question: "What do I get, and is it really free?",
    answer:
      "Five tools, completely free, with no payment and no card. Each one is a short guide plus a prompt you copy and paste. There is nothing to buy on this site at the moment.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. Nothing is installed and no code is involved. You copy a block of text and paste it into an AI you already use. That is the whole process.",
  },
  {
    question: "Which AI do these work in?",
    answer:
      "Any of them. ChatGPT, Claude, Gemini, Copilot, whichever you already have open. The prompts are plain instructions, so they are not tied to one product.",
  },
  {
    question: "Where should I start?",
    answer:
      "Start with The Idea Scorecard. It takes about four minutes and tells you whether the idea is worth your evenings before you spend any. If it scores well, The First Section is the next one.",
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
            { name: "Free tools", path: "/free" },
          ],
        })}
      />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={itemListSchema({
          path: "/free",
          items: tools.map((t) => ({ name: t.name, path: "/free" })),
        })}
      />

      <section className="mx-auto max-w-3xl px-5 pt-16 pb-12 sm:pt-20">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          Five free tools to build extra income with AI
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg">
          Each one is a short guide plus a prompt you paste into whatever AI you
          already have open. Nothing to install, nothing technical, no payment.
        </p>
        <p className="mt-4 max-w-[60ch] text-[var(--muted,#555)]">
          They also run in order: score the idea, start it, build it, get seen
          without the camera, and never run out of things to say.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-14">
        <ol className="space-y-9">
          {tools.map((t) => (
            <li
              key={t.name}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-current/10 pt-7"
            >
              <span className="pt-1 font-bold tabular-nums text-[var(--accent,#587109)]">
                {t.n}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-xl font-extrabold tracking-tight">
                    {t.name}
                  </h2>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted,#666)]">
                    {t.time}
                  </span>
                </div>
                <p className="mt-2 font-medium">{t.promise}</p>
                <p className="mt-2 max-w-[62ch] text-[var(--muted,#555)]">
                  {t.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-3xl border-t border-current/10 px-5 py-14"
      >
        <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight">
          Questions people ask before they start
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

        <Link
          href="/"
          className="mt-10 inline-block font-semibold underline underline-offset-4"
        >
          What Practical AI Hub is
        </Link>
      </section>
    </>
  );
}
