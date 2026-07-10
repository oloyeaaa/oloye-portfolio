import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Systems — working agentic AI systems you can install",
  description:
    "Every system here runs my own business before it is offered to anyone else. Installable, draft-and-approve, with a shared brain and quality gates.",
  alternates: { canonical: `${SITE_URL}/systems` },
  openGraph: {
    title: "Systems by Oloye. — working agentic AI systems",
    description:
      "Installable systems that run my own business first. The catalogue grows as each new build proves itself.",
    url: `${SITE_URL}/systems`,
    type: "website",
  },
};

const systems = [
  {
    number: "01",
    name: "The Marketing Team",
    promise:
      "A working marketing department inside Claude Code: five specialists, one shared brain, everything draft-and-approve.",
    href: "/systems/marketing-team",
    status: "Available — first 10 free",
    image: "/images/systems/marketing-team-crab.png",
    imageAlt: "The Marketing Team crab mascot at a laptop",
  },
];

export default function Systems() {
  const webPage = webPageSchema({
    path: "/systems",
    title: "Systems — working agentic AI systems you can install",
    description:
      "Installable agentic AI systems that run my own business before being offered to anyone else.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Systems", path: "/systems" },
    ],
  });

  return (
    <>
      <JsonLd data={webPage} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            Systems
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-tight">
            Systems I run, packaged so you can run them too.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-2xl">
            Every system here has one rule: it runs my own business first. Nothing gets listed as
            a product until it has done real work on this brand. Each one installs on your
            machine, drafts everything for your approval, and gets sharper as you correct it.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-6">
            {systems.map((s) => (
              <Link
                key={s.number}
                href={s.href}
                className="group flex flex-col md:flex-row gap-6 bg-surface border border-border hover:border-accent/50 rounded-xl p-8 transition-colors"
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  width={112}
                  height={112}
                  className="rounded-lg shrink-0 self-start"
                />
                <div>
                  <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-2 font-display">
                    System {s.number} · {s.status}
                  </p>
                  <h2 className="text-2xl font-bold text-foreground mb-2 font-display group-hover:text-accent transition-colors">
                    {s.name}
                  </h2>
                  <p className="text-primary-dim leading-relaxed max-w-xl">{s.promise}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-sm text-muted mt-10">
            More systems are in the build. Each one earns its place here by running this business
            first.
          </p>
        </div>
      </section>

      {/* Cross-link */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="bg-surface border border-border rounded-xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-2 font-display">
              Want it done for you instead?
            </h2>
            <p className="text-primary-dim mb-4 max-w-2xl">
              If you would rather never touch the tools, the Front Desk is my done-for-you
              system: every enquiry answered in your voice, nothing sent without your say-so.
            </p>
            <Link
              href="/test-drive"
              className="inline-block text-accent hover:text-accent-light font-semibold"
            >
              Test it free on your own messages →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
