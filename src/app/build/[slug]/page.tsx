import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { BUILD_GUIDES, getBuildGuide } from "@/lib/buildGuides";
import { POST_FREEBIES } from "@/lib/postFreebies";
import { getAuthor } from "@/lib/authors";
import BuildForm from "@/components/build/BuildForm";

// One build guide page (3 Nov 2026), the link in his bio for the week of a
// TikTok live. Kept short on purpose: headline, one line, what's inside, the
// form, and a small link to the tool itself.

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BUILD_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getBuildGuide(slug);
  if (!g) return { title: "Not found" };
  return {
    title: { absolute: "Free build guide: the lead leak check | Oloye" },
    description: g.under,
    alternates: { canonical: `${SITE_URL}/build/${g.slug}` },
    // A page for the bio link only, not for Google.
    robots: { index: false, follow: true },
  };
}

export default async function BuildGuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getBuildGuide(slug);
  const freebie = g && POST_FREEBIES[g.freebie];
  if (!g || !freebie) notFound();

  const author = getAuthor();
  const [before, after] = g.mark && g.headline.includes(g.mark) ? g.headline.split(g.mark) : [g.headline, ""];

  return (
    <div className="bg-surface">
      <section className="px-4 pb-20 pt-9 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Free build guide</p>
          <h1 className="display mt-4 text-[2.15rem] leading-[1.05] text-foreground sm:text-6xl">
            {before.trimEnd()}{" "}
            {g.mark && g.headline.includes(g.mark) && <span className="lime-mark">{g.mark}</span>}
            {after}
          </h1>
          <p className="mt-5 text-muted sm:text-xl">{g.under}</p>

          <ul className="mt-7 space-y-3 text-[0.95rem] sm:text-base">
            {g.inside.map((item) => (
              <li key={item.title} className="flex gap-3 text-foreground">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-dark" aria-hidden="true" />
                <span>
                  <strong>{item.title}</strong> <span className="text-muted">{item.line}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-3 text-sm text-muted">
            <Image src={author.image} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
            <span>{g.guideLine}</span>
          </div>

          <div className="mt-6">
            <BuildForm freebie={freebie.key} source={g.source} button={g.button} thanks={g.thanks} guideUrl={freebie.url} />
          </div>

          {g.tryIt && (
            <p className="mt-6 text-center text-sm">
              <Link href={g.tryIt.href} className="font-semibold text-foreground underline underline-offset-4 hover:text-accent-dark">
                {g.tryIt.label} →
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
