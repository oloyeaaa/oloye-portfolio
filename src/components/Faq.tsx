import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/faqs";

/**
 * The FAQ block every page uses. Same look everywhere, different questions
 * per page (they live in src/lib/faqs.ts).
 *
 * Built on <details>, so it opens and closes with no JavaScript, and every
 * answer is in the HTML for search engines and AI answer engines to read.
 * It also writes the FAQPage structured data, so a page only needs this one
 * line to get both.
 */
export default function Faq({
  items,
  heading = "Questions people ask",
  eyebrow = "FAQ",
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border px-4 py-24 sm:px-6 sm:py-32">
      <JsonLd data={faqPageSchema(items)} />
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-4 text-4xl text-foreground sm:text-5xl">{heading}</h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-xl leading-none transition group-open:rotate-45 group-open:border-accent group-open:bg-accent"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 pr-12 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
