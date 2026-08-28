import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL, AUTHOR, SOCIAL } from "@/lib/site";
import {
  getPublishedPosts,
  isAirtableConfigured,
} from "@/lib/airtable";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "GTM & Marketing Teardowns — Case Studies & Frameworks",
  description:
    "Deep-dive teardowns, positioning case studies, and marketing operations architectures by Oloye Adeosun.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "GTM & Marketing Teardowns — Case Studies & Frameworks",
    description:
      "Deep-dive teardowns, positioning case studies, and marketing operations architectures by Oloye Adeosun.",
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
    title: "GTM & Marketing Teardowns — Case Studies & Frameworks",
    description:
      "Deep-dive teardowns, positioning case studies, and marketing operations architectures by Oloye Adeosun.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Teardowns & Blog", path: "/blog" },
    ],
    type: "CollectionPage",
  });

  return (
    <>
      <JsonLd data={webPage} />
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-accent text-xs font-mono font-semibold uppercase tracking-[0.2em] mb-4">
            Analysis & Teardowns
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 font-display tracking-tight leading-tight">
            Product Marketing & Operations Teardowns.
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-2xl">
            Story-led case studies on how market leaders win, positioning psychology, and operational frameworks for modern revenue leaders.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length === 0 ? (
          <div className="bg-surface border border-border rounded-xl p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-3 font-display">
              Latest Video Teardowns & Breakdowns
            </h2>
            <p className="text-primary-dim text-sm leading-relaxed mb-6">
              Our written case studies are being synced with the YouTube channel teardowns. In the meantime, watch the latest video breakdowns on YouTube or explore our proprietary ventures.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-light text-background px-6 py-3 rounded-md font-semibold transition-colors text-sm shadow-sm"
              >
                Watch on YouTube (@oloyeadeosun) ↗
              </a>
              <Link
                href="/ventures"
                className="border border-border hover:border-accent text-foreground px-6 py-3 rounded-md font-semibold transition-colors text-sm"
              >
                Explore Ventures
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
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded font-mono uppercase tracking-wider">
                        {post.category}
                      </span>
                    )}
                    {post.publishedDate && (
                      <time className="text-xs text-muted font-mono">
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
