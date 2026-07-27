import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, howToSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import StepNav from "./StepNav";

const TIKTOK_URL = "https://www.tiktok.com/@practicalaihub4";
const PATH = "/practical-income-method";

export const metadata: Metadata = {
  title: "The Practical Income Method — a field guide for 9–5ers",
  description:
    "Five steps to build a real digital income with AI, using free tools, starting today. Problem first, people second, place third. No guru talk, no upsell buried at the bottom.",
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: "The Practical Income Method — a field guide for 9–5ers",
    description:
      "Five steps to build a real digital income with AI, using free tools. Problem first, tool second. No hype, just steps.",
    url: `${SITE_URL}${PATH}`,
    type: "website",
  },
};

const triad = [
  {
    num: "01",
    title: "Problem",
    desc: "Something people already complain about publicly, more than once.",
  },
  {
    num: "02",
    title: "People",
    desc: 'A real, identifiable group who has it, not a vague "everyone."',
  },
  {
    num: "03",
    title: "Place",
    desc: "Reddit threads, Facebook groups, Etsy reviews, comment sections, Quora.",
  },
];

const tools = [
  {
    name: "Perplexity",
    body: "Live web search with sources. Pulls real complaints instead of guesses.",
  },
  {
    name: "ChatGPT",
    body: "Turns raw research into the actual repeated pattern.",
  },
  {
    name: "NotebookLM",
    body: "Google's research tool. Fast/Deep Research modes search the live web, free to use.",
  },
];

const checklist = [
  "Do 3+ people complain about it, separately?",
  "Can it be solved digitally, not as a repeat service?",
  "Could you build a first version in a weekend?",
  "Would someone actually pay for it?",
];

const skills = [
  { name: "AI video", tool: "Sora, or Kling" },
  { name: "UGC-style ads", tool: "HeyGen" },
  { name: "AI images", tool: "GPT Image, or Midjourney" },
  { name: "Posters & prints", tool: "Canva" },
  { name: "eBooks", tool: "ChatGPT/Claude to write, Canva to design" },
];

const platforms = [
  { name: "Gumroad", cost: "Free", fee: "10% + $0.50" },
  { name: "Payhip", cost: "Free", fee: "5% (or $29/mo for 2%, $99/mo for 0%)" },
  { name: "Beacons", cost: "Free", fee: "9% (or ~$25–30/mo for 0%)" },
  { name: "Stan Store", cost: "From $29/mo", fee: "0%" },
];

const eyebrow = "font-mono text-xs font-semibold uppercase tracking-[0.06em]";

export default function PracticalIncomeMethod() {
  const webPage = webPageSchema({
    path: PATH,
    title: "The Practical Income Method — a field guide for 9–5ers",
    description:
      "Five steps to build a real digital income with AI, using free tools. Problem first, people second, place third.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "The Practical Income Method", path: PATH },
    ],
  });

  const howTo = howToSchema({
    name: "The Practical Income Method",
    description:
      "Build a real digital income with AI using free tools, in five steps. Problem first, tool second.",
    steps: [
      {
        name: "The 3 Ps — Problem, People, Place",
        text: "Before touching a single AI tool, know a real problem, the specific people who have it, and the place they already gather to talk about it.",
      },
      {
        name: "Pick the problem",
        text: "Run each real problem through four tests: 3+ separate complaints, digitally solvable, buildable in a weekend, and something someone would pay for.",
      },
      {
        name: "Build the digital product",
        text: "Match the build skill (AI video, UGC ads, images, prints, eBooks) to what fits the problem, not what is trendiest.",
      },
      {
        name: "Market it",
        text: "Make sure real people have seen it exists. The places you found the problem are usually the places to show up and mention the solution.",
      },
      {
        name: "Sell it",
        text: "List it on a platform that fits your budget: Gumroad, Payhip, Beacons or Stan Store.",
      },
    ],
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={howTo} />

      {/* Hero */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className={`${eyebrow} text-accent mb-5 flex items-center gap-2.5`}>
            <span className="inline-block h-px w-6 bg-accent" aria-hidden="true" />
            A field guide for 9–5ers
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
            The Practical
            <br />
            Income Method
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-primary-dim">
            Five steps to build a real digital income with AI, using free tools,
            starting today. No guru talk, no upsell buried at the bottom.
          </p>
          <span className="inline-flex -rotate-[1.5deg] items-center gap-2 rounded-md border-[1.5px] border-accent px-3.5 py-2 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            NO HYPE. JUST STEPS.
          </span>
          <p className="mt-7 text-sm italic text-muted">
            Written by someone who still clocks in at a 9–5, testing every step of
            this in real time.
          </p>
        </div>
      </header>

      {/* Intro */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-primary-dim">
            <p>
              Most people teaching AI income skip straight to the tool, because
              it&apos;s easier to film than the actual truth: a tool means nothing
              if you don&apos;t know what problem you&apos;re solving, for who, or
              where to find them.
            </p>
            <p>
              This guide flips that order.{" "}
              <strong className="font-semibold text-foreground">
                Problem first. People second. Place third.
              </strong>{" "}
              The AI tool only shows up once you already know what you&apos;re
              looking for — it just makes the looking fast.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[64px_1fr]">
          <StepNav />

          <main className="md:border-l md:border-border md:pl-8">
            {/* Step 01 */}
            <article
              id="step1"
              className="scroll-mt-24 border-b border-border py-14"
            >
              <p className={`${eyebrow} mb-3 text-accent`}>Step 01</p>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                The 3 Ps — Problem, People, Place
              </h2>
              <p className="max-w-xl leading-relaxed text-primary-dim">
                Before touching a single AI tool, know three things: a real
                problem, the specific people who have it, and the place they
                already gather to talk about it. Skip this and you&apos;ll spend
                weeks learning tools with nothing real to point them at.
              </p>

              <div className="mt-6 grid max-w-xl grid-cols-1 gap-3 md:grid-cols-3">
                {triad.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <span className="mb-1.5 block font-mono text-xs text-accent">
                      {item.num}
                    </span>
                    <h3 className="mb-1 font-display text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-sm text-primary-dim">{item.desc}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 max-w-xl leading-relaxed text-primary-dim">
                <strong className="font-semibold text-foreground">
                  Tools that speed this up
                </strong>{" "}
                — used after you know what you&apos;re looking for, never instead
                of looking:
              </p>
              <div className="mt-4 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {tools.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-lg border border-border bg-surface p-4"
                  >
                    <span className="mb-1.5 block font-mono text-sm font-semibold text-foreground">
                      {t.name}
                    </span>
                    <p className="text-sm leading-relaxed text-primary-dim">
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Step 02 */}
            <article
              id="step2"
              className="scroll-mt-24 border-b border-border py-14"
            >
              <p className={`${eyebrow} mb-3 text-accent`}>Step 02</p>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                Pick the problem
              </h2>
              <p className="max-w-xl leading-relaxed text-primary-dim">
                Not every real problem is worth building around. Run it through
                this before you spend a single hour on it.
              </p>

              <ul className="mt-6 max-w-lg">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-border py-3 text-[15px] text-foreground last:border-b"
                  >
                    <span
                      className="mt-1 h-4 w-4 flex-none rounded-[3px] border-[1.5px] border-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-xl text-primary-dim">
                Passes all four? It&apos;s a real candidate.
              </p>
            </article>

            {/* Step 03 */}
            <article
              id="step3"
              className="scroll-mt-24 border-b border-border py-14"
            >
              <p className={`${eyebrow} mb-3 text-accent`}>Step 03</p>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                Build the digital product
              </h2>
              <p className="max-w-xl leading-relaxed text-primary-dim">
                The build branches depending on the problem. Match the skill to
                what actually fits, not what&apos;s trendiest.
              </p>

              <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {skills.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <span className="mb-1.5 block font-display text-[15px] font-bold text-foreground">
                      {s.name}
                    </span>
                    <span className="font-mono text-xs text-accent">
                      {s.tool}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* Step 04 */}
            <article
              id="step4"
              className="scroll-mt-24 border-b border-border py-14"
            >
              <p className={`${eyebrow} mb-3 text-accent`}>Step 04</p>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                Market it
              </h2>
              <div className="max-w-xl space-y-3 leading-relaxed text-primary-dim">
                <p>
                  This is the step most people skip, and the reason most digital
                  products never make a single sale. A great product nobody sees
                  earns nothing.
                </p>
                <p>
                  Before you list it anywhere, make sure real people have actually
                  seen it exists — the same places you found the problem in Step 1
                  are usually the same places to show up and mention the solution.
                </p>
              </div>
            </article>

            {/* Step 05 */}
            <article id="step5" className="scroll-mt-24 py-14">
              <p className={`${eyebrow} mb-3 text-accent`}>Step 05</p>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
                Sell it
              </h2>

              <span className="mb-5 inline-flex -rotate-1 items-center gap-2 rounded-md border-[1.5px] border-accent px-3 py-1.5 text-[11px] font-semibold text-accent">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Verified pricing — checked July 2026
              </span>

              <div className="max-w-2xl overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {["Platform", "Starting cost", "Fee per sale"].map((h) => (
                        <th
                          key={h}
                          className="border-b border-border py-2 pr-4 text-left font-mono text-[11px] font-semibold text-muted"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {platforms.map((p) => (
                      <tr key={p.name}>
                        <td className="border-b border-border py-3 pr-4 text-foreground">
                          {p.name}
                        </td>
                        <td className="border-b border-border py-3 pr-4 text-primary-dim">
                          {p.cost}
                        </td>
                        <td className="border-b border-border py-3 pr-4 text-primary-dim">
                          {p.fee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 max-w-xl rounded-lg border border-accent/40 bg-surface p-5 text-sm text-primary-dim">
                <strong className="mb-2 block font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                  Quick decision guide
                </strong>
                No budget yet → Payhip. Already have bio-link traffic → Beacons.
                Ready to invest → Stan Store.
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-3 max-w-xl font-display text-2xl font-bold text-foreground md:text-3xl">
            That&apos;s the whole method.
          </h2>
          <p className="mb-7 max-w-md leading-relaxed text-primary-dim">
            Five steps, no missing chapter, no upsell buried at the bottom. Follow
            along as it gets tested in real time, in public, mistakes included.
          </p>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-background transition-colors hover:bg-accent-light"
          >
            Follow @practicalaihub4 on TikTok
          </a>
        </div>
      </section>

      {/* Brand signature */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-2 px-6 py-6 text-[13px] text-muted">
          <span className="font-display font-semibold text-primary-dim">
            Practical AI Hub
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em]">
            Practical AI. Real Results.
          </span>
        </div>
      </section>
    </>
  );
}
