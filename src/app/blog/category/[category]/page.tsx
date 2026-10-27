import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import PostList from "@/components/post/PostList";
import { LastCall } from "@/components/home/CallToAction";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return { title: "Not found" };
  const posts = getAllPosts().filter((p) => getCategory(p.category)?.slug === c.slug);
  return {
    title: { absolute: `${c.name}: automation ideas for small businesses | Oloye blog` },
    description: c.line,
    alternates: { canonical: `${SITE_URL}/blog/category/${c.slug}` },
    // An empty category has nothing for Google yet.
    ...(posts.length === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = getAllPosts().filter((p) => getCategory(p.category)?.slug === c.slug);

  return (
    <div className="bg-surface">
      <JsonLd
        data={webPageSchema({
          path: `/blog/category/${c.slug}`,
          title: c.name,
          description: c.line,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: c.name, path: `/blog/category/${c.slug}` },
          ],
        })}
      />
      <PostList eyebrow="Category" title={c.name} line={c.line} posts={posts} activeCategory={c.slug} />
      <LastCall />
    </div>
  );
}
