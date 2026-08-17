import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, howToSchema } from "@/lib/schema";
import { SITE_URL, CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Build an Agentic AI System, Explained Simply",
  description:
    "Six things every agentic AI system needs: a name tag, a notebook, one job start to finish, a report card, teammates, and rules it can't break. Plain-English framework, grounded in a real production system.",
  alternates: { canonical: `${SITE_URL}/agentic-ai-systems/how-it-works` },
  openGraph: {
    title: "How to Build an Agentic AI System, Explained Simply",
    description:
      "Six things every agentic AI system needs, in plain English, grounded in a real production system.",
    url: `${SITE_URL}/agentic-ai-systems/how-it-works`,
    type: "article",
  },
};

const steps = [
  {
    name: "Give it a name tag",
    kid: "It gets a name, and it only touches what it's allowed to touch. Not everything in the building.",
    real: "Kwame, our blog writer, only writes for one brand — Oloye. — and only ever edits the Blog table. He can't touch anything else, even by accident.",
  },
  {
    name: "Give it a notebook",
    kid: "It writes down what happened, so it never starts from zero and forgets everything it already knew.",
    real: "One shared database holds every post, every keyword idea, and every lesson. Kwame reads it before he writes anything new.",
  },
  {
    name: "Give it one job, start to finish",
    kid: "It does the whole job the same way every time — pick an idea, do the work, hand it over for a look — not just one small piece of it.",
    real: "One command, /blog-draft, picks a keyword, researches it, writes the post, makes the cover image, and hands over a link to approve. Same steps, every time.",
  },
  {
    name: "Give it a report card",
    kid: "After the job, it asks itself what worked and what didn't, and writes the answer down so next time is better.",
    real: "If a draft gets killed or gets feedback, it becomes a Lesson. Every future draft is handed that lesson as a rule it has to follow.",
  },
  {
    name: "Give it teammates",
    kid: "One helper does the work. A second helper checks it and can wave it through, so a person doesn't have to check every single thing by hand.",
    real: "Kwame writes the post. Ben, the team lead, reads the score sheet and can clear a false alarm himself — we only step in when it's a real problem.",
  },
  {
    name: "Give it rules it can't break",
    kid: "It has a test it must pass every time. If it does worse than before, it stops itself instead of quietly making more mistakes.",
    real: "/eval-kwame scores every draft against 12 fixed rules. If a change makes things worse, the system locks new drafts until a person checks it and clears the flag.",
  },
];

const proof = [
  { number: "6", label: "Real posts written and published by this exact system." },
  { number: "59/60", label: "Score on the last automated quality check." },
  { number: "1", label: "Lesson learned from a mistake, now enforced on every future draft." },
];

export default function HowItWorks() {
  const webPage = webPageSchema({
    path: "/agentic-ai-systems/how-it-works",
    title: "How to Build an Agentic AI System, Explained Simply",
    description:
      "Six things every agentic AI system needs, in plain English, grounded in a real production system.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Agentic AI Systems", path: "/agentic-ai-systems" },
      { name: "How it works", path: "/agentic-ai-systems/how-it-works" },
    ],
  });

  const howTo = howToSchema({
    name: "How to Build an Agentic AI System",
    description:
      "Six things every agentic AI system needs to do real work and get better on its own.",
    steps: steps.map((s) => ({ name: s.name, text: s.real })),
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={howTo} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            The simple version
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-[1.1]">
            Six things every agentic AI system needs.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed mb-4 max-w-3xl">
            Strip away the jargon and every agentic AI system that actually works comes down to
            the same six things. Give a piece of software all six and it can do a real job on its
            own, and get better at it, without anyone watching every move.
          </p>
          <p className="text-primary-dim leading-relaxed max-w-3xl">
            This is the plain-English version. For the full technical guide, see{" "}
            <Link href="/agentic-ai-systems" className="text-accent hover:text-accent-light">
              What Is an Agentic AI System?
            </Link>
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6 font-display">
            Not a diagram. A running system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proof.map((p) => (
              <div
                key={p.label}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <p className="text-2xl font-bold text-accent mb-2 font-display leading-tight tabular-nums">
                  {p.number}
                </p>
                <p className="text-sm text-primary-dim leading-relaxed">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The six steps */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li
                key={step.name}
                className="bg-surface border border-border rounded-lg p-6"
              >
                <div className="flex gap-4">
                  <span className="text-accent font-display font-bold text-2xl shrink-0 w-10 tabular-nums">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-semibold text-foreground mb-2 font-display text-lg">
                      {step.name}
                    </h2>
                    <p className="text-sm text-primary-dim leading-relaxed mb-3">
                      {step.kid}
                    </p>
                    <details className="group">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-widest text-accent list-none flex items-center gap-2">
                        <span>Show me the real version</span>
                        <span className="text-accent group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="text-sm text-muted leading-relaxed mt-3 pt-3 border-t border-border">
                        {step.real}
                      </p>
                    </details>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-display leading-tight">
              A name tag. A notebook. One job. A report card. Teammates. Rules it can&apos;t break.
            </h2>
            <p className="text-primary-dim mb-8 max-w-2xl mx-auto leading-relaxed">
              Six things, and a system can do real work and get better at it on its own. Our
              flagship product, the Front Desk, is built this way. Test it on your own business,
              free.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book my test
            </a>
            <p className="text-xs text-muted mt-4">
              Or read the{" "}
              <Link href="/agentic-ai-systems" className="hover:text-accent">
                full technical guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
