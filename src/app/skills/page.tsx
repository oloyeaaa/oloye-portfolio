import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import SkillsDirectory from "@/components/SkillsDirectory";
import { webPageSchema, itemListSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Free Claude Code Skills & Agents — Oloye.",
  description:
    "Download free Claude Code skills and agents and run them on your own machine. Content, video, and writing tools, code and docs only, no keys, no sign-up.",
  alternates: { canonical: `${SITE_URL}/skills` },
  openGraph: {
    title: "Free Claude Code Skills & Agents — Oloye.",
    description:
      "Download free Claude Code skills and agents and run them on your own machine.",
    url: `${SITE_URL}/skills`,
    type: "website",
  },
};

export default function SkillsIndex() {
  const skills = getAllSkills();

  const webPage = webPageSchema({
    path: "/skills",
    title: "Free Claude Code Skills & Agents",
    description:
      "Download free Claude Code skills and agents and run them on your own machine.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Skills", path: "/skills" },
    ],
    type: "CollectionPage",
  });

  const itemList = itemListSchema({
    path: "/skills",
    items: skills.map((s) => ({ name: s.title, path: `/skills/${s.slug}` })),
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={itemList} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            Skills &amp; Agents
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display leading-tight">
            Free tools you run on your own machine.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-2xl">
            The skills and agents I build for my own work, packaged to download and drop into Claude Code. Code and docs only: no keys, no cookies, no sign-up. Every download carries a file list you can check.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <SkillsDirectory skills={skills} />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="bg-surface border border-border rounded-xl p-8 md:p-10">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
              Want the agent, not the toolkit?
            </p>
            <h2 className="font-display font-bold text-2xl text-foreground mb-2">
              See the Front Desk on your own business.
            </h2>
            <p className="text-primary-dim mb-5 max-w-2xl">
              These skills are the parts. The Front Desk is the done-for-you agent that answers your customers in under 60 seconds. Test it on 10 real messages, yours to keep either way.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-5 py-2.5 rounded-md font-semibold transition-colors text-sm"
            >
              Book my test
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
