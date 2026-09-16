import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Buyer Psychology Teardowns & Case Studies — Oloye Adeosun",
  description:
    "Real teardowns of buyer psychology, customer awareness, marketing automation, and AI workflows.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Buyer Psychology Teardowns & Case Studies — Oloye Adeosun",
    description:
      "Real teardowns of buyer psychology, customer awareness, marketing automation, and AI workflows.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/blog",
          title: "Buyer Psychology Teardowns & Case Studies — Oloye Adeosun",
          description:
            "Real teardowns of buyer psychology, customer awareness, marketing automation, and AI workflows.",
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/blog" },
          ],
        })}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-10 py-8 sm:py-12">
        {/* Header */}
        <div className="space-y-2 border-b border-border pb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] font-medium text-accent">
            <span>Deconstructed Systems</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Case Studies & Teardowns
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            Real teardowns of buyer psychology, marketing automation, and AI workflows.
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
