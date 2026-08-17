import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { webPageSchema, faqPageSchema } from "@/lib/schema";

// Written 2026-08-17 from Oloye's own account in
// 1-Foundation/voice-and-story/context/who-i-am.md.
//
// Rules this page is built on:
//   Nothing invented. Every fact here came from him.
//   Historical numbers stay in the past tense, because some are from June and
//   stating them as current would be a quiet fabrication.
//   The employer is never named, and the omission is never explained either,
//   because explaining it is what makes it conspicuous.
//   The failures are the credibility. Nobody making this up would admit them.

const TITLE = "About Oloye Adeosun";
const DESCRIPTION =
  "Oloye Adeosun runs Practical AI Hub. He has a full-time job in marketing, has been building with AI since 2022, and gives away the tools he uses. This is the honest version, including what did not work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Oloye Adeosun", "Practical AI Hub", "who runs Practical AI Hub"],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

const faqs = [
  {
    question: "Who is Oloye Adeosun?",
    answer:
      "Oloye Adeosun runs Practical AI Hub. He spent about ten years as a PMO analyst and project manager, taught himself marketing and automation from 2020, and started building with AI in 2022, within months of ChatGPT launching. He works in marketing and builds this in the evenings.",
  },
  {
    question: "Has he actually made money from this yet?",
    answer:
      "Not from this. Several earlier attempts ended before a paying customer, and he says so plainly rather than implying otherwise. He earns from a full-time job in marketing. Everything on this site is free, and there is nothing for sale.",
  },
  {
    question: "Why is everything free?",
    answer:
      "Because he has not earned the right to charge yet. He would rather give away the tools he actually uses, be useful first, and let people decide for themselves whether he is worth listening to.",
  },
  {
    question: "What makes him different from other AI creators?",
    answer:
      "Ten years of running projects and programme offices, which almost nobody in the AI space has. It means he thinks in systems and handovers rather than clever prompts. And he shows the parts that went wrong, which cannot be copied because they have to be real.",
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
      <JsonLd data={faqPageSchema(faqs)} />

      <article className="mx-auto max-w-3xl px-5 pt-16 pb-16 sm:pt-20">
        <div className="flex items-center gap-4">
          <Image
            src="/images/oloye-avatar.png"
            alt="Oloye Adeosun"
            width={72}
            height={72}
            className="rounded-full"
            priority
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              About
            </p>
            <p className="mt-1 font-display text-lg font-bold">Oloye Adeosun</p>
          </div>
        </div>

        <h1 className="mt-9 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          I have a full-time job too.
        </h1>

        <div className="mt-7 space-y-5 text-lg leading-relaxed">
          <p>
            I am not doing this from a beach. I work in marketing, I have a
            family, and I build this in the evenings when the house is quiet.
            Most of what is on this site was made after 9pm.
          </p>
          <p>
            I am telling you that first because it is the only reason anything
            here is worth reading. I am not further ahead of you than you think.
            I am just further along the same road.
          </p>
        </div>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight">
          How I got here
        </h2>
        <div className="mt-5 space-y-5 text-primary-dim leading-relaxed">
          <p>
            I spent about ten years as a PMO analyst and project manager. A
            decade of running projects and programme offices. That is not an AI
            background and it is not a marketing one, and for a long time I
            thought it was irrelevant. It is the most useful thing I have.
          </p>
          <p>
            In 2020 I started teaching myself marketing and automation on top of
            the day job. Email, copywriting, the plumbing that sits behind it.
            In 2022 I started building with AI, within a few months of ChatGPT
            existing. Not because I saw something coming. I was just curious and
            had evenings.
          </p>
          <p>
            In 2023 I was made redundant. I freelanced, mostly helping a friend
            with his property business for no real money, while job hunting.
            I now work in marketing, running automation, and I have been doing
            that side of it professionally for years.
          </p>
        </div>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight">
          What did not work
        </h2>
        <p className="mt-4 max-w-[62ch] text-primary-dim">
          This is the part most people leave out, so it is the part worth
          reading.
        </p>

        <ul className="mt-7 space-y-6">
          <li className="border-l-2 border-border pl-5">
            <p className="font-bold">A cold outreach agency.</p>
            <p className="mt-1 text-primary-dim">
              I bought the tools, ran the campaigns and got no clients. In my
              own words at the time: I was spending money on tools with nothing
              to show for it. I burnt out and I got broke.
            </p>
          </li>
          <li className="border-l-2 border-border pl-5">
            <p className="font-bold">A software product with a partner.</p>
            <p className="mt-1 text-primary-dim">
              Seven months on an AI tool for clinics. He wanted quick results,
              the results did not come, and it ended.
            </p>
          </li>
          <li className="border-l-2 border-border pl-5">
            <p className="font-bold">My first eighteen videos.</p>
            <p className="mt-1 text-primary-dim">
              Peaked at ten views. Then I stopped posting for a while, which is
              the actual mistake, not the ten views.
            </p>
          </li>
          <li className="border-l-2 border-border pl-5">
            <p className="font-bold">Five finished systems, none sold.</p>
            <p className="mt-1 text-primary-dim">
              Built properly, tested, versioned. Never put in front of a single
              buyer. I was better at building than at finishing.
            </p>
          </li>
        </ul>

        <p className="mt-8 max-w-[62ch] text-lg">
          The pattern took me years to see. Every one of those ended{" "}
          <strong>before a paying customer</strong>, and not one of them ended
          because I could not do the work. I kept building things nobody had
          asked for yet.
        </p>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight">
          What I do here
        </h2>
        <div className="mt-5 space-y-5 text-primary-dim leading-relaxed">
          <p>
            I build the thing, I show you exactly how, and I tell you what it
            actually cost, including the parts that broke. If a number is not
            real, it does not go on the page. If something did not work, I say
            so.
          </p>
          <p>
            Everything is free. Not as a tactic, and not as a taster for
            something expensive later. There is nothing for sale here at all. I
            would rather be useful first and let you decide whether I am worth
            listening to.
          </p>
          <p>
            I am a Christian, which mostly shows up in how I would rather do
            this: give first, tell the truth, and not chase people.
          </p>
        </div>

        <h2 className="mt-14 text-2xl font-extrabold tracking-tight">
          Why I think this matters
        </h2>
        <div className="mt-5 space-y-5 text-lg leading-relaxed">
          <p>
            I do not think most people are short of ideas. I was not. I had a
            list of them and I did nothing, because every one of them looked
            like months of evenings I did not have.
          </p>
          <p>
            That sum was correct when I first did it. It is not correct now, and
            I do not think many people have noticed. That is the whole reason
            this site exists.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
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

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="text-2xl font-extrabold tracking-tight">
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
      </article>
    </>
  );
}
