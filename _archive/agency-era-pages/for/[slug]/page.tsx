import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import {
  webPageSchema,
  serviceSchema,
  faqPageSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import {
  VERTICAL_SLUGS,
  VERTICAL_IMAGES,
  getVertical,
  getRelatedVerticals,
} from "@/lib/verticals";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VERTICAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) return { title: "Not found" };
  return {
    title: v.metaTitle,
    description: v.metaDescription,
    alternates: { canonical: `${SITE_URL}/for/${v.slug}` },
    openGraph: {
      title: v.metaTitle,
      description: v.metaDescription,
      url: `${SITE_URL}/for/${v.slug}`,
      type: "website",
    },
  };
}

export default async function VerticalPage({ params }: Props) {
  const { slug } = await params;
  const v = getVertical(slug);
  if (!v) notFound();

  const related = getRelatedVerticals(slug);

  const webPage = webPageSchema({
    path: `/for/${v.slug}`,
    title: v.metaTitle,
    description: v.metaDescription,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "By industry", path: "/" },
      { name: v.shortName, path: `/for/${v.slug}` },
    ],
  });

  const service = serviceSchema({
    name: `The Front Desk for ${v.fullName}`,
    description: v.metaDescription,
    serviceType: "AI First-Response Agent",
    areaServed: "Global",
    audience: [v.fullName],
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={service} />
      <JsonLd data={faqPageSchema(v.faqs)} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="text-xs text-muted mb-6 font-display uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <Link href="/agentic-ai-systems" className="hover:text-accent">
              Agentic AI Systems
            </Link>
            <span>/</span>
            <span className="text-accent">{v.shortName}</span>
          </div>
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            {v.kicker}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-display leading-[1.1]">
            {v.h1}
          </h1>
          <div className="text-lg text-primary-dim leading-relaxed space-y-4 max-w-3xl mb-10">
            {v.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <Link
            href="/test-drive"
            className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Test the Front Desk on your business
          </Link>
        </div>
      </section>

      {/* Body */}
      {/* Hero image */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 md:py-14">
          <Image
            src={VERTICAL_IMAGES[v.slug].src}
            alt={VERTICAL_IMAGES[v.slug].alt}
            width={1600}
            height={900}
            priority
            sizes="(max-width: 768px) 100vw, 896px"
            className="w-full h-auto rounded-xl border border-border"
          />
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        {/* What it does */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            What the Front Desk does for {v.fullName}
          </h2>
          <ul className="space-y-3">
            {v.actionList.map((item) => (
              <li
                key={item}
                className="bg-surface border border-border rounded-lg p-5 flex gap-3 text-sm text-primary-dim leading-relaxed"
              >
                <span className="text-accent shrink-0 mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Example workflows */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Three real workflows
          </h2>
          <p className="text-muted mb-8 leading-relaxed">
            What the Front Desk actually replies with and does on your behalf. Every draft is trained on your last 100 messages. Every action respects the thresholds you set.
          </p>
          <div className="space-y-8">
            {v.workflows.map((w, i) => (
              <div
                key={w.inbound}
                className="border border-border rounded-lg overflow-hidden"
              >
                <div className="bg-surface-alt px-6 py-4 border-b border-border">
                  <p className="text-xs font-semibold text-muted uppercase tracking-widest font-display">
                    Workflow {i + 1}
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-muted uppercase tracking-widest font-display mb-2">
                      Inbound
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {w.inbound}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
                      Front Desk reply
                    </p>
                    <p className="text-sm text-primary-dim leading-relaxed">
                      {w.reply}
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-muted uppercase tracking-widest font-display mb-2">
                      Action taken
                    </p>
                    <p className="text-sm text-primary-dim leading-relaxed">
                      {w.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            The rough numbers
          </h2>
          <div className="bg-surface border border-border rounded-lg p-8 space-y-5">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest font-display mb-2">
                Baseline
              </p>
              <p className="text-primary-dim leading-relaxed">{v.roi.setup}</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs font-semibold text-alert uppercase tracking-widest font-display mb-2">
                The loss today
              </p>
              <p className="text-foreground leading-relaxed">{v.roi.loss}</p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
                What the Front Desk recovers
              </p>
              <p className="text-foreground leading-relaxed">
                {v.roi.recovery}
              </p>
            </div>
          </div>
        </section>

        {/* Further reading */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Further reading
          </h2>
          <p className="text-muted mb-6 leading-relaxed">
            Independent sources on the state of {v.fullName}, why response speed matters, and what the incumbents are doing.
          </p>
          <ul className="space-y-4">
            {v.authorities.map((a) => (
              <li
                key={a.url}
                className="bg-surface border border-border rounded-lg p-5"
              >
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:text-accent-light font-display"
                >
                  {a.name} ↗
                </a>
                <p className="text-sm text-primary-dim mt-2 leading-relaxed">
                  {a.note}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
            Common questions
          </h2>
          <div className="space-y-4">
            {v.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group bg-surface border border-border rounded-lg p-6"
              >
                <summary className="cursor-pointer text-foreground font-semibold font-display list-none flex justify-between items-center gap-4">
                  <span>{faq.question}</span>
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-sm text-primary-dim leading-relaxed mt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related niches */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
              Related industries
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              Same read-decide-act loop. Different action list.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/for/${r.slug}`}
                  className="group bg-surface border border-border hover:border-accent rounded-lg p-6 transition-colors"
                >
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
                    {r.kicker}
                  </p>
                  <p className="text-foreground font-display font-semibold group-hover:text-accent transition-colors">
                    The Front Desk for {r.fullName} →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to pillar */}
        <section className="mb-16">
          <div className="border-l-2 border-accent pl-6">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-3">
              New to agentic AI?
            </p>
            <p className="text-primary-dim leading-relaxed mb-3">
              Start with the full pillar guide on how these systems work under the hood: architecture, thresholds, evals and how to build one.
            </p>
            <Link
              href="/agentic-ai-systems"
              className="text-accent hover:text-accent-light font-display font-semibold"
            >
              Read the pillar: What is an agentic AI system →
            </Link>
          </div>
        </section>
      </article>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="border border-accent/40 rounded-xl p-10 bg-surface">
            <p className="text-xs font-semibold text-accent font-display uppercase tracking-widest mb-4">
              Free test
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display leading-tight">
              Test the Front Desk on your own business.
            </h2>
            <p className="text-primary-dim mb-8 max-w-2xl leading-relaxed">
              Send 10 real messages from your last week. We show you your actual response times, what the Front Desk would have replied, and what action it would have taken. Yours to keep either way.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Book my test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
