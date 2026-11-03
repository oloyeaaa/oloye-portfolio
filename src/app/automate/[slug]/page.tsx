import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoPage from "@/components/seo/SeoPage";
import { SITE_URL } from "@/lib/site";
import { getAllForPages, getForPage, renderForPage } from "@/lib/forPages";

// One how-to page, /automate/<slug> (3 Nov 2026). Copy is the Copywriter's
// markdown in content/automate/, laid out by the shared SeoPage.

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllForPages("automate").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getForPage(slug, "automate");
  if (!p) return { title: "Not found" };
  return {
    // The Copywriter's titles are written to fit 60 characters with " | Oloye".
    title: { absolute: `${p.title} | Oloye` },
    description: p.description,
    alternates: { canonical: `${SITE_URL}/automate/${p.slug}` },
    openGraph: { title: p.title, description: p.description, url: `${SITE_URL}/automate/${p.slug}`, type: "article" },
  };
}

export default async function AutomatePage({ params }: Props) {
  const { slug } = await params;
  const p = getForPage(slug, "automate");
  if (!p) notFound();

  return (
    <SeoPage
      page={p}
      bodyHtml={await renderForPage(p.body)}
      others={getAllForPages("automate").filter((x) => x.slug !== p.slug)}
      othersHeading="More to automate"
      crumb={p.name}
    />
  );
}
