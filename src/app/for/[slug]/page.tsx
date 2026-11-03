import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPage from "@/components/seo/SeoPage";
import { SITE_URL } from "@/lib/site";
import { getAllForPages, getForPage, renderForPage } from "@/lib/forPages";

// One "Who we help" page (3 Nov 2026). Copy is the Copywriter's markdown in
// content/for/, laid out by the shared SeoPage.

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllForPages("for").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getForPage(slug, "for");
  if (!p) return { title: "Not found" };
  return {
    // The Copywriter's titles are written to fit 60 characters with " | Oloye".
    title: { absolute: `${p.title} | Oloye` },
    description: p.description,
    alternates: { canonical: `${SITE_URL}/for/${p.slug}` },
    openGraph: { title: p.title, description: p.description, url: `${SITE_URL}/for/${p.slug}`, type: "website" },
  };
}

export default async function ForPage({ params }: Props) {
  const { slug } = await params;
  const p = getForPage(slug, "for");
  if (!p) notFound();

  return (
    <SeoPage
      page={p}
      bodyHtml={await renderForPage(p.body)}
      others={getAllForPages("for").filter((x) => x.slug !== p.slug)}
      othersHeading="Who else we help"
      crumb={p.name}
    />
  );
}
