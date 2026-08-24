import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import TierBoard from "@/components/TierBoard";
import { webPageSchema, itemListSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { ROLES, SOURCES, MACRO } from "@/lib/marketing-roles";

const TITLE = "Marketing career tier list: every UK marketing job, ranked";
const DESCRIPTION =
  "Every job in UK marketing ranked by what it actually pays, whether anyone is hiring, how hard it is to get into, and whether AI is coming for it. Real median salaries, every figure sourced.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/marketing-career-tier-list` },
  keywords: [
    "marketing career tier list",
    "UK marketing salaries",
    "digital marketing career path",
    "which marketing job should I do",
    "product marketing manager salary UK",
    "marketing jobs ranked",
    "how to get into digital marketing",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/marketing-career-tier-list`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function MarketingCareerTierList() {
  const webPage = webPageSchema({
    path: "/marketing-career-tier-list",
    title: TITLE,
    description: DESCRIPTION,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Marketing career tier list", path: "/marketing-career-tier-list" },
    ],
  });

  const itemList = itemListSchema({
    path: "/marketing-career-tier-list",
    items: ROLES.map((r) => ({
      name: r.name,
      path: `/marketing-career-tier-list#${r.slug}`,
    })),
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={itemList} />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Marketing careers
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight max-w-3xl">
            Every marketing job, ranked.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-2xl">
            There are about twelve different jobs inside marketing, and most people pick
            one by accident. I did. So here is the whole board: what each one actually
            pays in the UK, whether anyone is hiring, how hard it is to get into, and
            whether AI is coming for it.
          </p>
          <p className="text-base text-muted leading-relaxed max-w-2xl mt-4">
            Every figure has a named source, and you can see it on any row. Where the
            sources disagree, I say so.
          </p>
        </div>
      </section>

      {/* The honest macro */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-bold text-foreground mb-2">First, the honest bit</h2>
          <p className="text-primary-dim mb-8 max-w-2xl">
            Most pages like this open by telling you marketing is booming. It isn&apos;t.
            That is exactly why picking a lane matters more than it used to.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {MACRO.map((m) => (
              <div
                key={m.stat}
                className="rounded-xl border border-border bg-background p-6"
              >
                <p className="font-mono text-3xl font-semibold text-accent mb-3 tabular-nums">
                  {m.stat}
                </p>
                <p className="text-sm text-primary-dim leading-relaxed mb-3">{m.label}</p>
                <p className="text-xs text-muted">{m.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The board */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-2">The board</h2>
        <p className="text-primary-dim mb-8 max-w-2xl">
          Ranked on four things: what it pays, who is hiring, whether you can get in from
          outside, and whether AI is coming for it.
        </p>
        <TierBoard />
      </section>

      {/* The one idea */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              One thing worth more than the ranking
            </h2>
            <p className="text-xl text-accent font-semibold leading-snug mb-5">
              Some of these are brilliant skills and terrible job titles.
            </p>
            <p className="text-primary-dim leading-relaxed mb-4">
              In the same salary guide, on the same page: a Marketing Automation{" "}
              <strong className="text-foreground">Specialist</strong> has a UK median of{" "}
              <span className="font-mono text-foreground">£35,500</span>. A Marketing
              Automation <strong className="text-foreground">Manager</strong> has a median
              of <span className="font-mono text-foreground">£45,000</span>. The work
              overlaps heavily. That is{" "}
              <span className="font-mono text-accent">£9,500</span> for one word on your
              contract.
            </p>
            <p className="text-primary-dim leading-relaxed">
              Copywriting is the same story from the other direction. As a skill it is in
              every senior marketing job. As a job title, neither quartile-based UK guide
              publishes a median for it any more. Learn it. Don&apos;t job-title yourself
              into it. When you negotiate, argue about the title as hard as you argue
              about the salary.
            </p>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Where the numbers come from</h2>
          <p className="text-primary-dim mb-8 max-w-2xl">
            Ranked by how much each one can be trusted, because they are not equal.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted">
                    Source
                  </th>
                  <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-muted">
                    Method
                  </th>
                  <th className="py-3 text-xs font-semibold uppercase tracking-widest text-muted">
                    Trust
                  </th>
                </tr>
              </thead>
              <tbody>
                {SOURCES.map((s) => (
                  <tr key={s.name} className="border-b border-border align-top">
                    <td className="py-3 pr-4 text-sm font-medium text-foreground">
                      {s.name}
                    </td>
                    <td className="py-3 pr-4 text-sm text-primary-dim">{s.method}</td>
                    <td className="py-3 text-sm text-primary-dim whitespace-nowrap">
                      {s.trust}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-6 max-w-3xl leading-relaxed">
            Not used: recruiter salary-guide landing pages with no published method. One
            of them quotes marketing automation at £50,000 to £75,000, where Robert
            Half&apos;s placement data puts the median at £35,500. Salary data ages fast,
            and UK marketing pay fell in 2026, so treat everything here as a snapshot
            rather than a promise.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              So what do you do with this?
            </h2>
            <ul className="space-y-3 text-primary-dim leading-relaxed mb-8">
              <li>
                <strong className="text-foreground">Trying to get in:</strong> take an
                executive job anywhere, then specialise inside twelve months. The
                generalist is the role being squeezed hardest.
              </li>
              <li>
                <strong className="text-foreground">Already in:</strong> pick the lane
                closest to revenue that you can stand doing every day. Usually lifecycle,
                demand gen or product marketing.
              </li>
              <li>
                <strong className="text-foreground">Negotiating:</strong> the title is not
                decoration. It is £9,500.
              </li>
            </ul>
            <div className="rounded-xl border border-border bg-background p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                And if you&apos;re stood where I was
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                I spent ten years in project management before this. It took me two
                redundancies and two years out of work to go and do the thing I was
                already doing on the side, and already getting paid for. You don&apos;t
                need that. Go for it.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
