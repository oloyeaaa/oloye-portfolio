import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, softwareApplicationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllSkillSlugs, getSkillBySlug } from "@/lib/skills";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSkillSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) return { title: "Skill not found" };
  const title = `${skill.title} — free Claude Code ${skill.type} — Oloye.`;
  return {
    title,
    description: skill.tagline.slice(0, 155),
    alternates: { canonical: `${SITE_URL}/skills/${skill.slug}` },
    openGraph: {
      title,
      description: skill.tagline.slice(0, 155),
      url: `${SITE_URL}/skills/${skill.slug}`,
      type: "website",
    },
  };
}

export default async function SkillPage({ params }: Props) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const isFree = !skill.price;

  const webPage = webPageSchema({
    path: `/skills/${skill.slug}`,
    title: skill.title,
    description: skill.tagline.slice(0, 155),
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Skills", path: "/skills" },
      { name: skill.title, path: `/skills/${skill.slug}` },
    ],
  });

  const software = softwareApplicationSchema({
    path: `/skills/${skill.slug}`,
    name: skill.title,
    description: skill.tagline.slice(0, 300),
    category: skill.category,
    downloadUrl: skill.download,
    version: skill.version,
    price: skill.price,
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={software} />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <Link
            href="/skills"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            &larr; All skills
          </Link>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full font-display uppercase tracking-widest">
              {skill.category}
            </span>
            <span className="text-xs text-muted uppercase tracking-widest font-display">
              {skill.type}
            </span>
            <span className="text-xs font-semibold text-accent">
              {isFree ? "Free" : `£${skill.price}`}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground font-display leading-[1.1]">
            {skill.title}
          </h1>
          {skill.tagline && (
            <p className="text-lg text-primary-dim leading-relaxed mt-6">
              {skill.tagline}
            </p>
          )}
        </header>

        {/* Download + facts */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-10">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="text-sm text-primary-dim">
              <span className="text-foreground font-semibold">{skill.size}</span>
              {" "}&middot; {skill.fileCount} files &middot; v{skill.version}
            </div>
            {isFree ? (
              <a
                href={skill.download}
                download
                className="inline-block bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors text-sm"
              >
                Download the .zip
              </a>
            ) : (
              <span className="inline-block border border-border-strong text-foreground px-6 py-3 rounded-md font-semibold text-sm">
                Premium &middot; £{skill.price}
              </span>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-1.5">
            {skill.requirements.map((r) => (
              <span
                key={r}
                className="text-[11px] text-primary-dim bg-surface-alt border border-border px-2 py-0.5 rounded"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* 3-step install */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 font-display">
            Install
          </p>
          <ol className="space-y-2 text-sm text-primary-dim list-decimal list-inside">
            <li>Download and unzip.</li>
            <li>
              Copy the{" "}
              <code className="text-foreground bg-surface px-1.5 py-0.5 rounded border border-border">
                {skill.slug}
              </code>{" "}
              folder into{" "}
              <code className="text-foreground bg-surface px-1.5 py-0.5 rounded border border-border">
                ~/.claude/skills/
              </code>
              .
            </li>
            <li>Restart Claude Code.</li>
          </ol>
        </div>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: skill.contentHtml }}
        />

        {skill.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 font-display">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs text-primary-dim bg-surface border border-border px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border mt-12 pt-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
              See it running
            </p>
            <p className="font-display font-semibold text-foreground mb-2">
              The Front Desk on your own business.
            </p>
            <p className="text-sm text-primary-dim mb-4">
              These skills are the parts. The Front Desk is the done-for-you agent. 10 real messages, a side-by-side report, yours to keep either way.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-5 py-2.5 rounded-md font-semibold transition-colors text-sm"
            >
              Book my test
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
