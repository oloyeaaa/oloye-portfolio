import Link from "next/link";
import type { CaseStudyMeta } from "@/lib/caseStudies";

// One case study card, used on the case studies page and the home page.
export default function CaseStudyCard({ study }: { study: CaseStudyMeta }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:border-foreground sm:p-8"
    >
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
    </Link>
  );
}
