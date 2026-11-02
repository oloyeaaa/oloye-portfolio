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

      <Faq items={FAQS.leakCheck} />
    </>
  );
}
