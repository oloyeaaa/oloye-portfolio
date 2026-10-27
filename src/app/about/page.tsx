import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, personSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import { getAuthor } from "@/lib/authors";
import Faq from "@/components/Faq";
import Reveal from "@/components/home/Reveal";
import CountUp from "@/components/home/CountUp";
import OneLiner from "@/components/home/OneLiner";
import { LastCall } from "@/components/home/CallToAction";

// About the founder. Every author card and avatar on the blog links here.
// Only facts Oloye has confirmed. The origin story stays off until he says.

const TITLE = "About the founder";
const DESCRIPTION =
  "Oloye Adeosun builds simple automations that save small businesses time and money, with a team of AI agents built on Claude. Based in Kent, UK.";

export const metadata: Metadata = {
  title: { absolute: "About Oloye Adeosun, founder | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { title: "About Oloye Adeosun", description: DESCRIPTION, url: `${SITE_URL}/about`, type: "profile" },
};

// The team: the five agents Oloye built by talking to Claude, no code.
const TEAM = [
  { name: "The writer", job: "Drafts posts, emails and scripts in plain words." },
  { name: "The editor", job: "Cuts recordings down and gets videos ready." },
  { name: "The counter", job: "Pulls the numbers in, so nobody types them by hand." },
  { name: "The memory", job: "Remembers every decision, so nothing gets asked twice." },
  { name: "The checker", job: "Checks the work against the rules before it goes out." },
];

const BELIEFS = [
  { title: "Simple beats clever", text: "If it can't be explained over a cup of tea, it's too complicated." },
  { title: "You own it", text: "Your tools, your list, your customers. Nothing locked away from you." },
  { title: "Honest numbers only", text: "No made-up results. If we haven't seen it, we won't say it." },
];

export default function AboutPage() {
  const author = getAuthor("oloye");

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
            { name: TITLE, path: "/about" },
          ],
        })}
      />
      <JsonLd data={personSchema()} />

      <div className="bg-surface">
        {/* Who */}
        <section className="px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">About the founder</p>
              <h1 className="display mt-6 text-5xl text-foreground sm:text-7xl">
                Meet <span className="lime-mark">Oloye.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
                Founder. Builds simple automations that save small businesses time and money, so owners can get back to the work they&apos;re good at.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {author.links.map((l) => (
                  <a
                    key={l.name}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground"
                  >
                    {l.name}
                  </a>
                ))}
              </div>
            </div>
            <Reveal>
              <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-accent">
                <Image src={author.image} alt="Oloye Adeosun" fill priority sizes="(max-width: 1024px) 80vw, 380px" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <p className="eyebrow">Why this exists</p>
            <h2 className="display mt-5 text-4xl text-foreground sm:text-5xl">Time is the thing nobody gets back.</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-primary-dim">
              <p>
                Every hour a business owner spends copying, chasing and reminding is an hour away from the work they&apos;re good at, and from the people they love.
              </p>
              <p>
                For Oloye, that&apos;s Saturday afternoons, watching his son play football. The whole business is built to give other owners the same thing: the small jobs handled, and their time back.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Proof */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow">What he&apos;s built</p>
              <h2 className="display mt-5 max-w-3xl text-4xl text-foreground sm:text-5xl">Building quietly, long before posting.</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              <Reveal>
                <div className="h-full rounded-3xl border border-border p-8">
                  <p className="display text-6xl text-foreground">3+</p>
                  <p className="mt-4 text-muted">years building marketing systems.</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="h-full rounded-3xl border border-border p-8">
                  <p className="display text-6xl text-foreground">
                    <span className="lime-mark"><CountUp to={304} /></span>
                  </p>
                  <p className="mt-4 text-muted">sign-ups to a client&apos;s email list in its first month. Built from scratch.</p>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="h-full rounded-3xl border border-border p-8">
                  <p className="display text-6xl text-foreground">0</p>
                  <p className="mt-4 text-muted">lines of code. His own team of agents was built just by talking to Claude.</p>
                </div>
              </Reveal>
            </div>
            <Reveal>
              <figure className="mx-auto mt-6 max-w-3xl rounded-3xl border border-border bg-background p-6 sm:p-8">
                <p className="eyebrow">What a client said</p>
                <a href="/images/proof/rita-linkedin-review.png" target="_blank" rel="noopener noreferrer" className="mt-5 block">
                  <Image
                    src="/images/proof/rita-linkedin-review.png"
                    alt="Rita Enosegbe's five-star LinkedIn review recommending Oloye for clarity and a partner who helps you move forward."
                    width={771}
                    height={282}
                    className="w-full rounded-xl border border-border"
                  />
                </a>
                <figcaption className="mt-4 text-sm text-muted">Rita Enosegbe, on LinkedIn.</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* The team */}
        <section className="bg-foreground px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow !text-accent">The team</p>
            <h2 className="display mt-5 max-w-3xl text-4xl !text-white sm:text-5xl">One person, and a team of AI agents.</h2>
            <p className="mt-6 max-w-xl text-white/60">
              Oloye plans and checks every build. The agents, built on Claude, do the repeat work. Every one of them was made by talking to Claude in plain English, no code.
            </p>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Reveal>
                <div className="h-full rounded-2xl border border-accent bg-accent p-6 text-foreground">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider">Founder</p>
                  <p className="mt-3 text-xl font-bold">Oloye</p>
                  <p className="mt-2 text-foreground/70">Plans every build, checks every word, and talks to every client.</p>
                </div>
              </Reveal>
              {TEAM.map((t, i) => (
                <Reveal key={t.name} delay={((i + 1) % 3) * 100}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">Agent</p>
                    <p className="mt-3 text-xl font-bold text-white">{t.name}</p>
                    <p className="mt-2 text-white/60">{t.job}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* What we believe */}
        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="eyebrow">What we believe</p>
              <h2 className="display mt-5 text-4xl text-foreground sm:text-5xl">Three rules we build by.</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {BELIEFS.map((b, i) => (
                <Reveal key={b.title} delay={i * 120}>
                  <div className="h-full rounded-3xl border border-border p-8">
                    <span className="display text-5xl text-accent-dark">{i + 1}</span>
                    <p className="mt-6 text-xl font-bold">{b.title}</p>
                    <p className="mt-2 text-muted">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-12 text-muted">
                Want to see how he thinks? <Link href="/blog" className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">Read the blog</Link>.
              </p>
            </Reveal>
          </div>
        </section>

        <OneLiner className="pb-8" />

        <Faq items={FAQS.about} />

        <LastCall />
      </div>
    </>
  );
}
