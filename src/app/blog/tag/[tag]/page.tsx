import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostList from "@/components/post/PostList";
import { LastCall } from "@/components/home/CallToAction";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

// Tag pages help readers move around, but they're thin, so Google is asked
// not to list them (it still follows the links to the posts).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const t = getAllTags().find((x) => x.slug === tag);
  if (!t) return { title: "Not found" };
  return {
    title: `Posts tagged "${t.name}"`,
    alternates: { canonical: `${SITE_URL}/blog/tag/${t.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const t = getAllTags().find((x) => x.slug === tag);
  if (!t) notFound();
  return (
    <div className="bg-surface">
      <PostList eyebrow="Tag" title={t.name} posts={getPostsByTag(t.slug)} />
      <LastCall />
    </div>
  );
}
