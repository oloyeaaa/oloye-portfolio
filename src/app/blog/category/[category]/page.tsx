import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, getCategory } from "@/lib/categories";
import PostList from "@/components/post/PostList";
import { LastCall } from "@/components/home/CallToAction";

// One blog category (4 since 3 Nov 2026): the Copywriter's heading and intro,
// its posts, then the Google pages and case studies that match, so a category
// with no posts yet still has somewhere useful to send people.

// Re-check every hour, so scheduled posts appear on their day.
export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return { title: "Not found" };
  const posts = getAllPosts().filter((p) => getCategory(p.category)?.slug === c.slug);
  return {
    title: { absolute: `${c.title} | Oloye` },
    description: c.description,
    alternates: { canonical: `${SITE_URL}/blog/category/${c.slug}` },
    // A category with no posts yet is links only, so Google waits for the first post.
    ...(posts.length === 0 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c || c.slug !== category) notFound();
  const posts = getAllPosts().filter((p) => getCategory(p.category)?.slug === c.slug);

  return (
    <div className="bg-surface">
      <JsonLd
        data={webPageSchema({
          path: `/blog/category/${c.slug}`,
          title: c.title,
          description: c.description,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: c.name, path: `/blog/category/${c.slug}` },
          ],
        })}
      />
      <PostList
        eyebrow={`Blog · ${c.name}`}
        title={c.h1}
        line={c.intro}
        posts={posts}
        activeCategory={c.slug}
        emptyLine="The first guides for this one are on the way, every Wednesday. Until then, these show how it works."
      />

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">See it step by step</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {c.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-alt"
                >
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LastCall />
    </div>
  );
}
