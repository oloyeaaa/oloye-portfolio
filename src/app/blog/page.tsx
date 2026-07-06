import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import {
  getPublishedPosts,
  isAirtableConfigured,
} from "@/lib/airtable";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The Oloye. Blog — Agentic AI Systems for Small Business",
  description:
    "Practical guides on agentic AI systems, first-response agents, and the workflows that ship real work for owner-operated businesses.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "The Oloye. Blog — Agentic AI Systems for Small Business",
    description:
      "Practical guides on agentic AI systems and first-response agents.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Blog() {
  const posts = await getPublishedPosts();
  const configured = isAirtableConfigured();

  const webPage = webPageSchema({
    path: "/blog",
    title: "The Oloye. Blog — Agentic AI Systems for Small Business",
    description:
      "Practical guides on agentic AI systems, first-response agents, and the workflows that ship real work for owner-operated businesses.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ],
    type: "CollectionPage",
  });

  return (
    <>
      <JsonLd data={webPage} />
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6 font-display">
            The Oloye. Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display leading-tight">
            Agentic AI systems, for owner-operated businesses.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-2xl">
            Practical guides on first-response agents, the workflows that ship real work, and what actually converts. Written on top of production builds, not marketing round-ups.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3 font-display">
              {configured ? "No posts yet." : "Blog CMS not connected yet."}
            </h2>
            <p className="text-primary-dim max-w-xl mx-auto">
              {configured
                ? "The blog agent hasn't shipped any posts to production yet. Check back once the daily pipeline is running, or read the pillar guide in the meantime."
                : "The Airtable environment variables aren't set on this deployment. Once wired, this page pulls published posts from the Blog table and rebuilds every 60 seconds."}
            </p>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <Link
                href="/agentic-ai-systems"
                className="bg-accent hover:bg-accent-light text-background px-5 py-2.5 rounded-md font-semibold transition-colors text-sm"
              >
                Read the pillar guide
              </Link>
              <Link
                href="/test-drive"
                className="border border-border-strong hover:border-accent text-foreground px-5 py-2.5 rounded-md font-medium transition-colors text-sm"
              >
                Book the Front Desk test
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-surface border border-border hover:border-accent rounded-lg overflow-hidden transition-colors flex flex-col"
              >
                {post.coverImage && (
                  <div className="aspect-[16/9] overflow-hidden bg-surface-alt">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {post.category && (
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded font-display uppercase tracking-widest">
                        {post.category}
                      </span>
                    )}
                    {post.publishedDate && (
                      <time className="text-xs text-muted">
                        {formatDate(post.publishedDate)}
                      </time>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-display group-hover:text-accent transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-primary-dim leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
