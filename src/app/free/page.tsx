import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import { POST_FREEBIES } from "@/lib/postFreebies";
import Link from "next/link";
import Faq from "@/components/Faq";
import OneLiner from "@/components/home/OneLiner";
import FreeThingsPicker from "@/components/FreeThingsPicker";
import { LastCall } from "@/components/home/CallToAction";

// Free things (rebuilt 2026-10-27; audited 9 Nov 2026): the free tools first,
// then the checklist and guides the blog posts offer. The old prompt pages and
// /skills now redirect here (next.config.ts).

// Tools open straight away, no email needed to start. The Lead leak check is
// the bio link, so it goes first. "What to post and what to sell" joins this
// list when it goes live. Lines are taken from each page's own description.
const TOOLS = [
  {
    href: "/tools/lead-leak-check",
    title: "Lead leak check",
    line: "6 quick questions. A score out of 100, your 3 biggest lead leaks, and the first fix for each.",
  },
  {
    href: "/100",
    title: "The 0 to 100 kit",
    line: "The leads table, Claude skills, and something new every Sunday.",
  },
  {
    href: "/tools/automation-roi-calculator",
    title: "Automation ROI calculator",
    line: "Put in the hours you spend on repeat tasks and see what they cost you in a year.",
  },
];

const TITLE = "Free things";
const DESCRIPTION = "Free checklists and guides that help small businesses hand over the repeat jobs. Pick one and it opens straight away.";

export const metadata: Metadata = {
  title: { absolute: "Free checklists and guides for small businesses | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/free` },
};

export default function FreePage() {
  const items = Object.values(POST_FREEBIES);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/free",
          title: TITLE,
          description: DESCRIPTION,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/free" },
          ],
        })}
      />

      <div className="bg-surface">
        <section className="px-4 pb-14 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow">Free things</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-foreground sm:text-7xl">
              Take one. <span className="lime-mark">It&apos;s free.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              Small, useful things to help you hand over the jobs that eat your week. Pick one and it opens straight away.
            </p>
            <p className="mt-3 max-w-xl text-lg text-foreground sm:text-xl">
              For small business owners and content creators.
            </p>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6" aria-labelledby="free-tools">
          <div className="mx-auto max-w-5xl">
            <h2 id="free-tools" className="display text-3xl text-foreground">Free tools</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:border-foreground"
                >
                  <span className="eyebrow">Free tool</span>
                  <span className="mt-4 text-xl font-bold leading-snug text-foreground">{t.title}</span>
                  <span className="mt-3 text-muted">{t.line}</span>
                  <span className="mt-auto pt-6 text-sm font-semibold text-foreground">
                    <span className="lime-mark">Open it</span> →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6" aria-labelledby="free-guides">
          <div className="mx-auto max-w-5xl">
            <h2 id="free-guides" className="display mb-6 text-3xl text-foreground">Free checklists and guides</h2>
            <FreeThingsPicker items={items} />
          </div>
        </section>

        <OneLiner className="pb-8" />

        <Faq items={FAQS.free} />

        <LastCall />
      </div>
    </>
  );
}
