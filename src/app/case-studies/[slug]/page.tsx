import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllCaseStudies, getCaseStudy, renderCaseStudy } from "@/lib/caseStudies";
import { getPostFreebie } from "@/lib/postFreebies";
import ListStep from "@/components/case-studies/ListStep";
import SystemFlow from "@/components/case-studies/SystemFlow";
import { getFlow } from "@/lib/caseStudyFlows";

// One case study (3 Nov 2026). Top to bottom: breadcrumb, the problem as the
// headline, a strip of plain facts (block, tools, built, where it stands), the
// story from the Copywriter's markdown, the other studies, then one next step:
// the list.

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  if (!s) return { title: "Case study not found" };
  const pageTitle = s.title.length + 8 <= 60 ? `${s.title} | Oloye` : s.title;
  return {
    title: { absolute: pageTitle },
    description: s.excerpt,
    alternates: { canonical: `${SITE_URL}/case-studies/${s.slug}` },
    openGraph: { title: s.title, description: s.excerpt, url: `${SITE_URL}/case-studies/${s.slug}`, type: "article" },
  };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  if (!s) notFound();

  const bodyHtml = await renderCaseStudy(s.body);
  const others = getAllCaseStudies().filter((x) => x.slug !== s.slug);
  const path = `/case-studies/${s.slug}`;
  const flow = getFlow(s.slug);

  const facts: { label: string; value: React.ReactNode; wide?: boolean }[] = [
    ...(s.block ? [{ label: "Fixes", value: s.block }] : []),
    ...(s.built ? [{ label: "Built", value: formatDate(s.built) }] : []),
    ...(s.tools.length ? [{ label: "Tools", value: s.tools.join(", "), wide: true }] : []),
    ...(s.status ? [{ label: "Where it stands", value: s.status, wide: true }] : []),
  ];

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path,
          title: s.title,
          description: s.excerpt,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            { name: s.title, path },
          ],
        })}
      />

      <div className="bg-surface">
        <article>
          <header className="px-4 pt-14 sm:px-6 sm:pt-20">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Breadcrumb" className="text-sm text-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/case-studies" className="hover:text-foreground">Case studies</Link></li>
                </ol>
              </nav>
              <p className="eyebrow mt-10">Case study{s.block ? ` · ${s.block}` : ""}</p>
              <h1 className="display mt-4 text-4xl text-foreground sm:text-6xl">{s.title}</h1>
              {s.excerpt && <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{s.excerpt}</p>}
              {flow && (
                <div className="mt-10 aspect-16/9 w-full overflow-hidden rounded-3xl bg-foreground">
                  <SystemFlow steps={flow} />
                </div>
              )}
            </div>
          </header>

          {facts.length > 0 && (
            <div className="px-4 pt-10 sm:px-6">
              <dl className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-3xl border border-border bg-border grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className={`bg-background p-5 sm:p-6 ${f.wide ? "col-span-2 sm:col-span-1" : ""}`}>
                    <dt className="eyebrow">{f.label}</dt>
                    <dd className="mt-2 font-semibold text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="px-4 pt-12 sm:px-6">
            <div className="post-body prose mx-auto max-w-[680px]" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </div>
        </article>

        {others.length > 0 && (
          <section className="mt-20 border-t border-border px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <p className="eyebrow">More case studies</p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {others.slice(0, 3).map((o) => (
                  <Link
                    key={o.slug}
                    href={`/case-studies/${o.slug}`}
                    className="flex h-full flex-col rounded-3xl border border-border bg-background p-6 transition hover:-translate-y-1 hover:border-foreground"
                  >
                    {o.block && <p className="eyebrow">{o.block}</p>}
                    <h2 className="mt-3 text-lg font-bold leading-snug text-foreground">{o.title}</h2>
                    <span className="mt-auto pt-6 text-sm font-semibold text-foreground">
                      <span className="lime-mark">See how</span> →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ListStep freebie={getPostFreebie(s.freebie || "TABLE")} source={`case-study-${s.slug}`} />
      </div>
    </>
  );
}
