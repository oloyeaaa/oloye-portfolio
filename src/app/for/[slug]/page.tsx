import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { Buttons, LastCall } from "@/components/home/CallToAction";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllForPages, getForPage, renderForPage } from "@/lib/forPages";

// One "Who we help" page (3 Nov 2026), built for Google: the search words in
// the title and H1, one workflow step by step, the FAQ with its schema, then
// the free call. Copy is the Copywriter's markdown in content/for/.

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllForPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getForPage(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `${SITE_URL}/for/${p.slug}` },
    openGraph: { title: p.title, description: p.description, url: `${SITE_URL}/for/${p.slug}`, type: "website" },
  };
}

export default async function ForPage({ params }: Props) {
  const { slug } = await params;
  const p = getForPage(slug);
  if (!p) notFound();

  const bodyHtml = await renderForPage(p.body);
  const others = getAllForPages().filter((x) => x.slug !== p.slug);
  const path = `/for/${p.slug}`;
  const [before, after] = p.mark && p.h1.includes(p.mark) ? p.h1.split(p.mark) : [p.h1, ""];

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path,
          title: p.title,
          description: p.description,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: p.name, path },
          ],
        })}
      />

      <div className="bg-surface">
        <header className="px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow">Who we help · {p.name}</p>
            <h1 className="display mt-4 text-4xl text-foreground sm:text-6xl">
              {before.trimEnd()}{" "}
              {p.mark && p.h1.includes(p.mark) && <span className="lime-mark">{p.mark}</span>}
              {after}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{p.under}</p>
            <div className="mt-9">
              <Buttons />
            </div>
          </div>
        </header>

        <div className="px-4 pt-12 sm:px-6">
          <div className="post-body prose mx-auto max-w-[680px]" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        </div>

        <div className="pt-16">
          <Faq items={p.faqs} heading={p.faqHeading} />
        </div>

        {others.length > 0 && (
          <section className="border-t border-border px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <p className="eyebrow">Who else we help</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/for/${o.slug}`}
                      className="inline-flex rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
                    >
                      {o.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <LastCall heading={p.lastHeading} line={p.lastLine} />
      </div>
    </>
  );
}
