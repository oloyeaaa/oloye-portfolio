import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, offerSchema, faqPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const GUMROAD_URL = "https://oloyeai.gumroad.com/l/marketing-team";

export const metadata: Metadata = {
  title: "The Marketing Team — a working marketing department inside Claude Code",
  description:
    "One install gives you five specialists sharing one brain: daily briefs, SEO posts behind a 12-check quality gate, content without filming, compliant outreach and a weekly learning loop. Nothing sends itself.",
  alternates: { canonical: `${SITE_URL}/systems/marketing-team` },
  openGraph: {
    title: "The Marketing Team — your marketing, handled inside Claude Code",
    description:
      "Five specialists, one shared brain, everything draft-and-approve. First 10 free with code FOUNDING10, then £199.",
    url: `${SITE_URL}/systems/marketing-team`,
    type: "website",
  },
};

const roles = [
  {
    title: "The Manager",
    body: "Reads your calendar and tasks, briefs your whole day every morning in under 200 words. Numbers first, no filler, never invents an event.",
  },
  {
    title: "The Writer",
    body: "Picks a keyword, researches what already ranks, drafts the SEO post with a cover. Every draft passes 12 hard checks before you see it.",
  },
  {
    title: "The Creator",
    body: "Turns one idea into a week of reels, carousels and captions in your voice. It never invents your opinions, it asks. Zero filming.",
  },
  {
    title: "The Hunter",
    body: "Finds prospects that fit your offer, researches one true detail each, drafts 4-line openers with UK, EU or US compliance rules built in.",
  },
  {
    title: "The Analyst",
    body: "Reads your real numbers weekly and writes the single biggest finding as one sharp lesson every other role obeys from then on.",
  },
];

const mechanics = [
  {
    title: "One shared brain",
    body: "Your brand voice, every draft, every result and every lesson in one memory all five roles read. Define your business once.",
  },
  {
    title: "Lessons that stick",
    body: "Correct the team once and it becomes a hard rule on every future draft. The team is measurably sharper every week.",
  },
  {
    title: "A quality gate that can stop the line",
    body: "Drafts are scored against 12 checks: no unsourced stats, no invented authority, your voice rules. If quality regresses, the pipeline refuses to run until a human clears it.",
  },
  {
    title: "Draft and approve, always",
    body: "Nothing posts, sends or publishes itself. Every role produces drafts and waits for your yes.",
  },
];

const stats = [
  { number: "5", label: "specialist roles" },
  { number: "11", label: "commands" },
  { number: "12", label: "skills inside" },
  { number: "1", label: "shared brain" },
];

const faqs = [
  {
    question: "What do I need to run the Marketing Team?",
    answer:
      "Claude Code installed and a Claude subscription (Pro or Max). That's it. A setup wizard walks you from zero to configured; there is no code to write. The shared brain uses plain local files out of the box, or your own Airtable base if you prefer.",
  },
  {
    question: "Does it post or send anything by itself?",
    answer:
      "No. Every role produces drafts and waits for your approval. The Hunter never sends an email, the Writer never publishes a post, the Creator never uploads a reel. You stay the finger on the button.",
  },
  {
    question: "How is this different from just prompting ChatGPT or Claude?",
    answer:
      "Memory and connection. A chat starts from zero every time; this team shares one brain that holds your voice, your drafts, your results and your lessons. Correct it once and every future draft obeys. A quality gate scores the Writer's work and can stop the whole pipeline if standards slip. That machinery is the product.",
  },
  {
    question: "Why are the first 10 copies free?",
    answer:
      "Honest answer: proof. This system runs my own brand every day, but you should not have to take my word for it. The first 10 people get it free with code FOUNDING10 in exchange for real feedback after their first week and permission to quote them. After 10 redemptions it is £199.",
  },
  {
    question: "What does the licence cover?",
    answer:
      "One purchase, one business. Install it on your own machines and use it for your own brand or company. No resale or redistribution. Agency use, running it for clients, is by agreement. All v1.x updates are included.",
  },
  {
    question: "Who built this?",
    answer:
      "Oloye Adeosun. I run a 9-5, a family and three businesses, and this exact team does my marketing: the blog on this site publishes every morning, and the content on my socials comes out of the same engine. I sell what I use.",
  },
];

export default function MarketingTeam() {
  const webPage = webPageSchema({
    path: "/systems/marketing-team",
    title: "The Marketing Team — a working marketing department inside Claude Code",
    description:
      "Five specialists sharing one brain: daily briefs, gated SEO posts, content without filming, compliant outreach, a weekly learning loop. Draft-and-approve everywhere.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Systems", path: "/systems" },
      { name: "The Marketing Team", path: "/systems/marketing-team" },
    ],
  });

  const offer = offerSchema({
    name: "The Marketing Team (Claude Code plugin)",
    description:
      "A working marketing department inside Claude Code: 5 roles, 11 commands, 12 skills, one shared brain, a 12-check quality gate. Draft-and-approve everywhere.",
    price: "199",
    priceCurrency: "GBP",
    url: `${SITE_URL}/systems/marketing-team`,
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={offer} />
      <JsonLd data={faqPageSchema(faqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            System 01 · Claude Code plugin
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-tight">
            A working marketing department inside Claude Code.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed mb-10 max-w-2xl">
            One install gives you five specialists sharing one brain: a Manager that briefs your
            day every morning, a Writer that drafts SEO posts behind a 12-check quality gate, a
            Creator that turns one idea into a week of content without filming, a Hunter that
            drafts compliant outreach, and an Analyst that teaches the whole team what worked.
            Everything drafts. Nothing sends itself.
          </p>
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Get the Marketing Team — £199
          </a>
          <p className="text-sm text-muted mt-4">
            First 10 people: free with code{" "}
            <span className="text-accent font-semibold">FOUNDING10</span>, in exchange for honest
            feedback. Then £199.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
          <Image
            src="/images/systems/marketing-team-hero.png"
            alt="Oloye holding the Marketing Team mascot, a coral crab, in a dark studio with lime rim light"
            width={1080}
            height={1350}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="w-full h-auto max-h-[560px] object-cover object-[center_20%] rounded-xl border border-border"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface border border-border rounded-lg p-6 text-center"
              >
                <p className="text-3xl font-bold text-accent mb-1 font-display">{s.number}</p>
                <p className="text-sm text-primary-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The roles */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Meet the team
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            Marketing a business is at least five jobs. Here is who does each one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div key={r.title} className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2 font-display">{r.title}</h3>
                <p className="text-sm text-primary-dim leading-relaxed">{r.body}</p>
              </div>
            ))}
            <div className="bg-surface border border-accent/40 rounded-lg p-6 flex items-center gap-5">
              <Image
                src="/images/systems/marketing-team-crab.png"
                alt="The Marketing Team crab mascot at a laptop"
                width={96}
                height={96}
                className="rounded-lg shrink-0"
              />
              <p className="text-sm text-primary-dim leading-relaxed">
                And one mascot. He does not do any work, but he is very committed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The mechanics */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            What makes it a team, not five chatbots
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            The roles are the easy part. This machinery is the difference, and it is the part you
            cannot copy-paste from a prompt library.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mechanics.map((m) => (
              <div key={m.title} className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2 font-display">{m.title}</h3>
                <p className="text-sm text-primary-dim leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Receipts */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            I sell what I use
          </h2>
          <p className="text-primary-dim leading-relaxed max-w-2xl mb-6">
            This exact team runs my brand while I work a 9-5 and raise a family. The{" "}
            <Link href="/blog" className="text-accent hover:text-accent-light">
              blog on this site
            </Link>{" "}
            publishes every morning before 8am, written by the Writer behind the same quality
            gate you get. The carousels and reels on my socials come out of the Creator. My
            mornings start with the Manager&apos;s brief.
          </p>
          <p className="text-sm text-muted max-w-2xl">
            Straight truth: this launched in July 2026 and there are no customer testimonials
            yet. That is exactly why the first 10 copies are free in exchange for honest
            feedback. What you can verify today is the output: the daily blog, the content, this
            page.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold text-foreground mb-3 font-display">
            Common questions
          </h2>
          <p className="text-muted mb-10 max-w-2xl">
            Requirements, safety, the licence, and why it is free for 10 people.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface border border-border rounded-lg p-6"
              >
                <summary className="cursor-pointer text-foreground font-semibold font-display list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm text-primary-dim leading-relaxed mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
              Hire the whole team today.
            </h2>
            <p className="text-primary-dim mb-6 max-w-xl mx-auto">
              One command to install, a setup wizard to configure, and your first drafts the same
              day. First 10: free with FOUNDING10.
            </p>
            <a
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Get the Marketing Team — £199
            </a>
            <p className="text-xs text-muted mt-4">
              Instant delivery via Gumroad. Or{" "}
              <Link href="/contact" className="hover:text-accent">
                ask me anything first
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
