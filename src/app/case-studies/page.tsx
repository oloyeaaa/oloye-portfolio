import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import Faq from "@/components/Faq";
import Reveal from "@/components/home/Reveal";
import OneLiner from "@/components/home/OneLiner";
import { LastCall } from "@/components/home/CallToAction";

// Case studies archive. Same shape as the blog page. Coming soon for now:
// when the first build is ready, its card goes here and gets its own page.

const TITLE = "Case studies";
const DESCRIPTION = "Real automation builds for small businesses, shown start to finish. Coming soon.";

export const metadata: Metadata = {
  title: { absolute: "Case studies: automation builds for small businesses | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/case-studies` },
  // Nothing to show Google yet. Switch this off when the first case study goes up.
  robots: { index: false, follow: true },
};

const BLOCKS = ["Leads", "Onboarding", "Delivery"];

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/case-studies",
          title: TITLE,
          description: DESCRIPTION,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/case-studies" },
          ],
        })}
      />

      <div className="bg-surface">
        <section className="px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/" className="hover:text-foreground">Home</Link> <span aria-hidden="true">/</span> Case studies
            </nav>
            <p className="eyebrow mt-10">Case studies</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-foreground sm:text-7xl">
              Real builds. <span className="lime-mark">Coming soon.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              One business, one job that ate their week, and the automation that took it off their plate. Shown start to finish.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOCKS.map((b, i) => (
              <Reveal key={b} delay={i * 120}>
                <div className="shimmer flex h-full flex-col overflow-hidden rounded-3xl border border-dashed border-border-strong bg-background">
                  <div className="aspect-[16/10] bg-surface-alt" aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow">{b}</p>
                    <div className="mt-4 space-y-2.5" aria-hidden="true">
                      <span className="block h-4 w-4/5 rounded-full bg-surface-alt" />
                      <span className="block h-4 w-3/5 rounded-full bg-surface-alt" />
                    </div>
                    <span className="mt-auto self-start rounded-lg bg-accent px-3 py-1 pt-1 text-xs font-bold text-foreground">
                      Coming soon
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <OneLiner className="pb-8" />

        <Faq items={FAQS.caseStudies} />

        <LastCall />
      </div>
    </>
  );
}
