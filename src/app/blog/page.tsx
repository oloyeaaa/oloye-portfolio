import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const revalidate = 60;

const TITLE = "Pipeline Architecture, AI Systems & Teardowns \u2014 Oloye Adeosun";
const DESCRIPTION =
  "Weekly Wednesday deep dives: turn social views and engagement into an automated, owned pipeline using simple AI and lean tools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
          title: TITLE,
          description: DESCRIPTION,
          type: "CollectionPage",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Blog & Tutorials", path: "/blog" },
          ],
        })}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10 py-10 sm:py-16">
        {/* Header */}
        <div className="space-y-3 border-b border-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Weekly Wednesday Deep Dives</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Pipeline Tutorials & System Teardowns
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
            Practical walkthroughs for creators and non-tech founders: escape rented land, build automated lead engines, and simplify your tech stack.
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
