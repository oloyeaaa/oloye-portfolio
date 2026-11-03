import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/caseStudies";
import { getFlow } from "@/lib/caseStudyFlows";
import SystemFlow from "./SystemFlow";

// One case study card, used on the case studies page and the home page.
// The top is the study's system, animated, in the blog card's 16:9 shape.
export default function CaseStudyCard({ study }: { study: CaseStudyMeta }) {
  const flow = getFlow(study.slug);
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition hover:-translate-y-1 hover:border-foreground"
    >
      {flow && (
        <div className="aspect-16/9 w-full overflow-hidden bg-foreground">
          <SystemFlow steps={flow} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        {study.block && <p className="eyebrow">{study.block}</p>}
        <h3 className="mt-3 text-2xl font-bold leading-snug text-foreground">{study.title}</h3>
        {study.excerpt && <p className="mt-3 text-muted">{study.excerpt}</p>}
        {study.tools.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools">
            {study.tools.map((t) => (
              <li key={t} className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-primary-dim">
                {t}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto pt-7 text-sm font-semibold text-foreground">
          <span className="lime-mark">See how it works</span> →
        </span>
      </div>
    </Link>
  );
}
