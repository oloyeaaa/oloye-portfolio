import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, serviceSchema } from "@/lib/schema";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";
import Reveal from "@/components/home/Reveal";
import TypingJobs from "@/components/home/TypingJobs";
import HoursSlider from "@/components/home/HoursSlider";
import ProcessFlow from "@/components/home/ProcessFlow";
import LogoMarquee from "@/components/home/LogoMarquee";
import CountUp from "@/components/home/CountUp";
import BlogCards from "@/components/home/BlogCards";
import { Buttons, LastCall } from "@/components/home/CallToAction";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqs";

// The home page follows the StoryBrand website wireframe (header, stakes, value,
// guide, plan, explanatory paragraph, last call). See REDESIGN-PLAN.md.

const TITLE = "Process automation for small businesses | Oloye";
const DESCRIPTION = SITE_DESCRIPTION;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, type: "website" },
};

// What doing it by hand costs the business, one line per block and two on the whole.
const FRUSTRATIONS = [
  "Leads going cold before anyone replies",
  "New clients waiting days to get started",
  "Hours every week rebuilding the same reports",
  "Invoices paid late because nobody chased",
  "Past clients who never hear from you again",
  "Growth capped by the hours in your day",
];

const VALUE = [
  {
    title: "Save time",
    text: "The repeat jobs run on their own.",
    icon: (
      <svg viewBox="0 0 48 48" className="draw h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="24" cy="24" r="18" />
        <polyline points="24,13 24,24 32,28" />
      </svg>
    ),
  },
  {
    title: "Save money",
    text: "No extra hire. No pile of software.",
    icon: (
      <svg viewBox="0 0 48 48" className="draw h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M29 16c-1.5-1.5-3.5-2-5.5-1.6-2.8.6-4 3-4 5.6V33h11M16.5 25h10" />
      </svg>
    ),
  },
  {
    title: "Never miss a thing",
    text: "Every lead, invoice and reminder handled.",
    icon: (
      <svg viewBox="0 0 48 48" className="draw h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <rect x="8" y="8" width="32" height="32" rx="8" />
        <polyline points="16,24 22,30 33,18" />
      </svg>
    ),
  },
];

const PLAN = [
  { n: "1", title: "Tell us the job that eats your week." },
  { n: "2", title: "We build it with the tools you already use." },
  { n: "3", title: "You get the hours back." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", title: TITLE, description: DESCRIPTION, type: "WebPage" })} />
      <JsonLd
        data={serviceSchema({
          name: "Process automation for small businesses",
          description: DESCRIPTION,
          serviceType: "Business process automation",
          areaServed: "GB",
          audience: ["Coaches", "Content creators", "Small business owners", "Local businesses"],
        })}
      />

      <div className="bg-surface">
        {/* 1. Header: what we offer, how life gets better, what to do next */}
        <section className="px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <p className="eyebrow">Process automation for small businesses</p>
            <h1 className="display mt-6 text-[2.9rem] text-foreground sm:text-7xl lg:text-[5.5rem]">
              Stop doing the same job <span className="lime-mark">twice.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              Simple automations that save your business time and money.
            </p>
            <div className="mt-10">
              <Buttons />
            </div>
            <div className="mt-16 flex w-full justify-center">
              <TypingJobs />
            </div>
          </div>
        </section>

        {/* 2. Stakes: life if nothing changes */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="display max-w-3xl text-4xl text-foreground sm:text-6xl">
                Still doing it all by hand?
              </h2>
              <ul className="mt-12 grid gap-x-12 gap-y-5 sm:grid-cols-2">
                {FRUSTRATIONS.map((f, i) => (
                  <li key={f} className="flex items-center gap-4 text-lg text-primary-dim sm:text-xl">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-foreground" />
                    <span className="strike" style={{ "--d": `${400 + i * 250}ms` } as CSSProperties}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-16 rounded-3xl bg-accent px-6 py-10 text-center sm:py-14">
                <p className="display text-3xl text-foreground sm:text-5xl">There&apos;s a simpler way.</p>
              </div>
            </Reveal>

            <Reveal>
              <HoursSlider />
            </Reveal>
          </div>
        </section>

        {/* 3. Value: three benefits */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="display max-w-3xl text-4xl text-foreground sm:text-6xl">
                Hand over the small jobs.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {VALUE.map((v, i) => (
                <Reveal key={v.title} delay={i * 150}>
                  <div className="h-full rounded-3xl border border-border p-8">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-foreground">
                      {v.icon}
                    </span>
                    <h3 className="mt-8 text-2xl font-bold">{v.title}</h3>
                    <p className="mt-2 text-muted">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3b. See one at work: the process animation */}
        <section id="how-it-works" className="scroll-mt-20 bg-foreground px-4 py-24 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow !text-accent">An example</p>
            <h2 className="display mt-5 max-w-3xl text-4xl !text-white sm:text-6xl">
              One job, start to finish, without you.
            </h2>
            <ProcessFlow />
          </div>
        </section>

        {/* 4. Guide: empathy, then proof */}
        <section id="proof" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="display max-w-4xl text-4xl text-foreground sm:text-6xl">
                Admin after a long day is the worst part. It doesn&apos;t have to be yours.
              </h2>
            </Reveal>

            <div className="mt-16">
              <Reveal>
                <figure className="mx-auto flex max-w-3xl flex-col rounded-3xl border border-border bg-background p-6 sm:p-8">
                  <p className="eyebrow">What a client said</p>
                  <a href="/images/proof/rita-linkedin-review.png" target="_blank" rel="noopener noreferrer" className="mt-5 block">
                  <Image
                    src="/images/proof/rita-linkedin-review.png"
                    alt="Rita Enosegbe's five-star LinkedIn review: through Oloye's guidance she gained clear direction and positioning, and recommends him to anyone looking for clarity and a partner who helps them move forward."
                    width={771}
                    height={282}
                    className="w-full rounded-xl border border-border"
                  />
                  </a>
                  <figcaption className="mt-4 text-sm text-muted">Rita Enosegbe, on LinkedIn. Tap to read it full size.</figcaption>
                </figure>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-6 grid items-center gap-8 rounded-3xl border border-border p-6 sm:grid-cols-[1fr_auto] sm:p-10">
                <div>
                  <p className="display text-7xl sm:text-8xl">
                    <span className="lime-mark">
                      <CountUp to={304} />
                    </span>
                  </p>
                  <p className="mt-4 max-w-sm text-lg text-muted">
                    sign-ups to Rita&apos;s email list in its first month. Built from scratch.
                  </p>
                </div>
                <Image
                  src="/images/proof/rita-x-post.jpg"
                  alt="Rita Enosegbe's post on X: one month after starting her email list she crossed 300, total 304, and thanks @oloyeaa for building everything from scratch."
                  width={720}
                  height={1146}
                  className="w-full max-w-[280px] justify-self-center rounded-2xl border border-border"
                />
              </div>
            </Reveal>

            {/* The tools, moving */}
            <div className="mt-28">
              <Reveal>
                <p className="eyebrow">The tools we use</p>
                <h3 className="display mt-4 text-3xl sm:text-5xl">Tools you already know, joined up.</h3>
              </Reveal>
              <div className="mt-12 -mx-4 sm:-mx-6">
                <LogoMarquee />
              </div>
            </div>

            {/* Case studies */}
            <div className="mt-28">
              <Reveal>
                <p className="eyebrow">Case studies</p>
                <h3 className="display mt-4 text-3xl sm:text-5xl">Real builds. Coming soon.</h3>
              </Reveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <Reveal key={i} delay={i * 150}>
                    <div className="shimmer flex h-64 flex-col justify-between rounded-3xl border border-dashed border-border-strong bg-background p-6">
                      <span className="self-start rounded-full bg-accent px-3 py-1 text-xs font-bold">Coming soon</span>
                      <div className="space-y-2.5" aria-hidden="true">
                        <span className="block h-3 w-3/4 rounded-full bg-surface-alt" />
                        <span className="block h-3 w-1/2 rounded-full bg-surface-alt" />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Plan: working with us is easy */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-36">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <h2 className="display text-4xl text-foreground sm:text-6xl">Three steps. That&apos;s it.</h2>
            </Reveal>
            <ol className="mt-14 grid gap-6 sm:grid-cols-3">
              {PLAN.map((p, i) => (
                <Reveal key={p.n} delay={i * 200}>
                  <li className="h-full rounded-3xl border border-border p-8">
                    <span className="display text-6xl text-accent-dark">{p.n}</span>
                    <p className="mt-6 text-xl font-semibold">{p.title}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <div className="mt-12 flex justify-center">
                <Buttons />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. The longer paragraph (the BrandScript, in plain words) */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-32">
          <Reveal className="mx-auto max-w-2xl">
            <p className="eyebrow">In plain words</p>
            <p className="mt-6 text-lg leading-relaxed text-primary-dim sm:text-xl">
              You want a business that runs well without doing every small job yourself. To get there, the
              repeat work needs doing for you. The problem is the same jobs, every day: copying, chasing,
              sending, reminding. It leaves you tired and behind before the real work starts. You didn&apos;t
              start a business to do admin. We know how that feels, and we&apos;ve spent over 3 years building
              marketing systems that take those jobs away. Here&apos;s how it works: tell us the job that eats
              your week, we build it with the tools you already use, and you get the hours back. So book a free
              call. Or start with the free checklist. Stop losing evenings to admin, and get back to the work,
              and the people, you love.
            </p>
          </Reveal>
        </section>

        {/* 7. From the blog: three posts that tell the same story */}
        <section className="border-t border-border px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow">From the blog</p>
                  <h2 className="display mt-4 text-4xl text-foreground sm:text-5xl">Ideas you can use this week.</h2>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-foreground hover:underline decoration-accent decoration-2 underline-offset-4">
                  All posts →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <BlogCards />
            </Reveal>
          </div>
        </section>

        {/* FAQ: the same block on every page, questions from src/lib/faqs.ts */}
        <Faq items={FAQS.home} />

        {/* 8. Last call */}
        <LastCall />
      </div>
    </>
  );
}
