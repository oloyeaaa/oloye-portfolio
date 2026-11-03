import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import Faq from "@/components/Faq";
import { Buttons } from "@/components/home/CallToAction";
import RoiCalculator from "@/components/tools/RoiCalculator";
import { webPageSchema } from "@/lib/schema";
import { CHECKLIST_URL, SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";

// The automation ROI calculator (3 Nov 2026), copy by the Copywriter. Every
// Google page links here. No email box yet: it goes in once Make has a route
// for it.

const PATH = "/tools/automation-roi-calculator";
const TITLE = "Automation ROI Calculator: What Admin Costs You";
const DESCRIPTION =
  "A free automation ROI calculator for small businesses. Put in the hours you spend on repeat tasks and see what they cost you in a year.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Oloye` },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}${PATH}`, type: "website" },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: PATH,
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Automation ROI calculator", path: PATH },
          ],
        })}
      />

      <div className="bg-background">
        <section className="px-4 pb-10 pt-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Free automation ROI calculator</p>
            <h1 className="display mt-6 text-4xl text-foreground sm:text-6xl">
              How much is admin <span className="lime-mark">costing you?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              Three quick numbers, and you&apos;ll see what the repeat tasks in your business cost you in a year. Use your own
              numbers. They&apos;re the only ones that count.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <RoiCalculator />
          </div>
        </section>

        <section className="border-t border-border px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="display text-3xl text-foreground sm:text-4xl">How the automation ROI formula works</h2>
            <p className="mt-5 text-lg text-primary-dim">
              Hours a week × 52 weeks = hours a year. Hours a year × what an hour is worth = what the admin costs you. Multiply
              that by how much could run on its own, and you get what automation could give back. Then take away what the
              automation costs, and that&apos;s your return.
            </p>

            <h2 className="display mt-14 text-3xl text-foreground sm:text-4xl">Where to start</h2>
            <p className="mt-5 text-lg text-primary-dim">
              Pick the one task that takes the most hours. The free checklist,{" "}
              <Link href={CHECKLIST_URL} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
                10 tasks to automate first
              </Link>
              , helps you find it. Or book a free call and we&apos;ll look at it together. You&apos;ll know the price before
              anything starts, so you can check it against your number.
            </p>
            <div className="mt-8">
              <Buttons />
            </div>
          </div>
        </section>
      </div>

      <Faq items={FAQS.roiCalculator} heading="Questions about the calculator" />
    </>
  );
}
