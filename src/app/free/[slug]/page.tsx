import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import CopyPrompt from "@/components/CopyPrompt";
import { SITE_URL, NOTION_PACK_URL } from "@/lib/site";
import SignupForm from "@/components/SignupForm";
import { FREEBIES, FREEBIE_SLUGS, getFreebie } from "@/lib/freebies";
import { webPageSchema, howToSchema, faqPageSchema } from "@/lib/schema";

export function generateStaticParams() {
  return FREEBIE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = getFreebie(slug);
  if (!f) return {};

  const title = `${f.name}: ${f.promise}`;
  return {
    title,
    description: f.what,
    keywords: [f.name, "free AI prompt", "use AI to build extra income"],
    alternates: { canonical: `${SITE_URL}/free/${f.slug}` },
    openGraph: {
      title,
      description: f.what,
      url: `${SITE_URL}/free/${f.slug}`,
      type: "article",
    },
  };
}

export default async function FreebiePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFreebie(slug);
  if (!f) notFound();

  const next = f.next ? getFreebie(f.next) : undefined;

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: `/free/${f.slug}`,
          title: f.name,
          description: f.what,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Free tools", path: "/free" },
            { name: f.name, path: `/free/${f.slug}` },
          ],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: `How to use ${f.name}`,
          description: f.what,
          steps: f.how.map((text, i) => ({ name: `Step ${i + 1}`, text })),
        })}
      />
      <JsonLd
        data={faqPageSchema([
          {
            question: `What is ${f.name}?`,
            answer: f.what,
          },
          {
            question: "Is it free, and do I need to sign up?",
            answer:
              "It is completely free and there is nothing to sign up for. The prompt is on this page. Copy it and paste it into whatever AI you already use.",
          },
          {
            question: "Which AI does it work in?",
            answer:
              "Any of them. ChatGPT, Claude, Gemini or Copilot. It is plain instructions, so it is not tied to one product.",
          },
        ])}
      />

      <article className="mx-auto max-w-3xl px-5 pt-14 pb-16">
        <Link
          href="/free"
          className="text-sm font-medium text-muted hover:text-foreground"
        >
          All free tools
        </Link>

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          {f.name}
        </h1>
        <p className="mt-4 text-xl font-medium text-balance">{f.promise}</p>

        <p className="mt-6 max-w-[62ch] text-lg">{f.what}</p>

        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Takes {f.time.toLowerCase()} · Free · Nothing to install
        </p>

        <h2 className="mt-12 text-2xl font-extrabold tracking-tight">
          How to use it
        </h2>
        <ol className="mt-5 space-y-3">
          {f.how.map((step, i) => (
            <li key={step} className="grid grid-cols-[1.75rem_1fr] gap-3">
              <span className="font-bold tabular-nums text-accent">{i + 1}</span>
              <span className="max-w-[60ch]">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <CopyPrompt prompt={f.prompt} />
        </div>

        <div className="mt-14">
          <SignupForm notionUrl={NOTION_PACK_URL} />
        </div>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {next ? "What to do next" : "That is the last one"}
          </h2>
          {next ? (
            <p className="mt-3 max-w-[60ch] text-muted">
              When you have your answer, the next one is{" "}
              <Link
                href={`/free/${next.slug}`}
                className="font-semibold text-foreground underline underline-offset-4"
              >
                {next.name}
              </Link>
              . {next.promise}
            </p>
          ) : (
            <p className="mt-3 max-w-[60ch] text-muted">
              You have the whole set. Score the idea, start it, build it, get
              seen without the camera, and never run out of things to say.{" "}
              <Link
                href="/free"
                className="font-semibold text-foreground underline underline-offset-4"
              >
                Back to all five
              </Link>
              .
            </p>
          )}
        </section>

        <nav
          aria-label="Other free tools"
          className="mt-12 border-t border-border pt-8"
        >
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            The other tools
          </h2>
          <ul className="mt-4 space-y-2">
            {FREEBIES.filter((o) => o.slug !== f.slug).map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/free/${o.slug}`}
                  className="font-medium underline underline-offset-4 hover:text-accent"
                >
                  {o.name}
                </Link>
                <span className="text-muted"> — {o.promise}</span>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </>
  );
}
