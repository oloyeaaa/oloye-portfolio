import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import Faq from "@/components/Faq";
import Reveal from "@/components/home/Reveal";
import { getAllCaseStudies } from "@/lib/caseStudies";
import { getPostFreebie } from "@/lib/postFreebies";
import ListStep from "@/components/case-studies/ListStep";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";

// Case studies list (3 Nov 2026). One card per study from content/case-studies/,
// in file-number order. The page ends on one next step: join the list.

const TITLE = "Case studies";
const DESCRIPTION =
  "Real systems that stop small businesses losing the people who find them, shown start to finish: the problem, what was built, and how it runs now.";

export const metadata: Metadata = {
  title: { absolute: "Case studies: real lead and automation systems | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();

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
              Losing the people who find you? <span className="lime-mark">See the fix.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              One job that loses leads or eats the week, the system built to fix it, and how it runs now. Shown start to finish.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {studies.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 120}>
                <CaseStudyCard study={s} />
              </Reveal>
            ))}
          </div>
        </section>

        <Faq items={FAQS.caseStudies} />

        <ListStep freebie={getPostFreebie("TABLE")} source="case-studies" />
      </div>
    </>
  );
}
