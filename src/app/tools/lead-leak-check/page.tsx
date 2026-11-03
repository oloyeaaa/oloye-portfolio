import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import Faq from "@/components/Faq";
import LeakCheck from "@/components/tools/LeakCheck";

// The Lead leak check, the first free tool (2 Nov 2026). The answers are scored
// on the server (src/app/api/tools/leak-check) and the full result goes by email.

const TITLE = "Lead leak check";
const DESCRIPTION =
  "Free 2-minute check for coaches and small businesses: a score out of 100, your 3 biggest lead leaks, and the first fix for each.";

export const metadata: Metadata = {
  title: { absolute: "Lead Leak Check: Free Tool for Coaches and Small Businesses | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tools/lead-leak-check` },
};

// The next tools. Each one gets its own page under /tools when it's built.
const COMING = [
  { name: "Welcome email writer", line: "Answer a few questions and get a welcome email in your own words." },
  { name: "Follow-up writer", line: "Short, kind follow-ups for the people who went quiet." },
  { name: "DM reply helper", line: "A reply to a new DM that moves them towards your list." },
];

export default function LeakCheckPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/tools/lead-leak-check",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/tools/lead-leak-check" },
          ],
        })}
      />

      <div className="bg-background">
        <section className="px-4 pb-10 pt-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Free tool &middot; Lead leak check</p>
            <h1 className="display mt-6 text-4xl text-foreground sm:text-6xl">
              Losing the people who find you? <span className="lime-mark">Find out where they slip away.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              6 quick questions. A score out of 100, your 3 biggest leaks, and the first fix for each. Free, about 2 minutes.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <LeakCheck />
          </div>
        </section>
      </div>

      <section className="px-4 pb-16 sm:px-6" aria-labelledby="more-tools">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">More free tools</p>
          <h2 id="more-tools" className="display mt-4 text-3xl text-foreground">Coming soon, one at a time</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {COMING.map((t) => (
              <li key={t.name} className="rounded-3xl border border-border bg-surface p-5">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="mt-2 text-sm text-muted">{t.line}</p>
                <p className="mt-3 inline-block rounded-md bg-surface-alt px-2 py-0.5 text-xs font-semibold text-muted">Coming soon</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq items={FAQS.leakCheck} />
    </>
  );
}
