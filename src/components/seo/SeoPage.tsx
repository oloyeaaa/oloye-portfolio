import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { Buttons, LastCall } from "@/components/home/CallToAction";
import { webPageSchema } from "@/lib/schema";
import type { ForPage, ForPageMeta } from "@/lib/forPages";

// The shared layout for the Google pages (/for and /automate, 3 Nov 2026):
// the search words in the H1, the Copywriter's sections, the FAQ with its
// schema, links to the other pages, then the free call.
export default function SeoPage({
  page: p,
  bodyHtml,
  others,
  othersHeading,
  crumb,
}: {
  page: ForPage;
  bodyHtml: string;
  others: ForPageMeta[];
  othersHeading: string;
  crumb: string;
}) {
  const path = `/${p.section}/${p.slug}`;
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
            { name: crumb, path },
          ],
        })}
      />

      <div className="bg-surface">
        <header className="px-4 pb-6 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="display mt-4 text-4xl text-foreground sm:text-6xl">
              {before.trimEnd()}{" "}
              {p.mark && p.h1.includes(p.mark) && <span className="lime-mark">{p.mark}</span>}
              {after}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{p.under}</p>
            <div className="mt-9">
              <Buttons ask={p.ask} />
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
              <p className="eyebrow">{othersHeading}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {others.map((o) => (
                  <li key={o.section + o.slug}>
                    <Link
                      href={`/${o.section}/${o.slug}`}
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

        <LastCall heading={p.lastHeading} line={p.lastLine} ask={p.ask} />
      </div>
    </>
  );
}
