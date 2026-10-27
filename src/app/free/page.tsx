import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import { POST_FREEBIES } from "@/lib/postFreebies";
import Faq from "@/components/Faq";
import OneLiner from "@/components/home/OneLiner";
import FreeThingsPicker from "@/components/FreeThingsPicker";
import { LastCall } from "@/components/home/CallToAction";

// Free things (rebuilt 2026-10-27): the checklist plus the five guides the blog
// posts offer. The old prompt pages under /free/<slug> still work by link but
// are hidden from Google and no longer listed here.

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
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-5xl">
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
