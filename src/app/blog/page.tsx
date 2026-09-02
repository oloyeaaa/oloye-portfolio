import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL, SOCIAL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/airtable";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Buyer Psychology Teardowns & 0-Dollar GTM Playbooks",
  description:
    "Story-led breakdowns, customer awareness frameworks, and AI workflows to help solopreneurs build organic attention and convert cold traffic.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Buyer Psychology Teardowns & 0-Dollar GTM Playbooks",
    description:
      "Story-led breakdowns, customer awareness frameworks, and AI workflows to help solopreneurs build organic attention and convert cold traffic.",
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

  const webPage = webPageSchema({
    path: "/blog",
    title: "Buyer Psychology Teardowns & 0-Dollar GTM Playbooks",
    description:
      "Story-led breakdowns, customer awareness frameworks, and AI workflows to help solopreneurs build organic attention and convert cold traffic.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Teardowns & Blog", path: "/blog" },
    ],
    type: "CollectionPage",
  });

  // Organize by clusters
  const clusters = [
    {
      name: "Buyer Psychology & Awareness",
      tag: "Buyer Psychology",
      desc: "Eugene Schwartz frameworks, customer language mining, and escaping the War Room Delusion.",
    },
    {
      name: "0-Dollar Distribution & GTM",
      tag: "0-Dollar Distribution",
      desc: "How solo founders build organic attention, signal posts, and friction magnets without ad spend.",
    },
    {
      name: "AI Workflows & Automation",
      tag: "AI Workflows",
      desc: "Claude & Gemini prompt architectures, automated research engines, and one-person media leverage.",
    },
  ];

  return (
    <>
      <JsonLd data={webPage} />
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-mono font-semibold tracking-wider text-accent uppercase mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            Analysis · Teardowns · Playbooks
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 font-display tracking-tight leading-tight">
            Buyer Psychology Teardowns & <span className="text-accent">0-Dollar GTM Playbooks.</span>
          </h1>
          <p className="text-lg text-primary-dim leading-relaxed max-w-3xl">
            Story-led breakdowns, Eugene Schwartz awareness frameworks, and automated AI workflows to help solopreneurs escape the 'Build & Pray' trap and turn cold traffic into paying buyers.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-light text-background px-5 py-2.5 rounded-md font-semibold text-sm transition inline-flex items-center gap-2 shadow-sm"
            >
              <span>▶</span> Watch Video Breakdowns (@oloyeadeosun)
            </a>
            <Link
              href="/free"
              className="border border-border hover:border-accent text-foreground px-5 py-2.5 rounded-md font-semibold text-sm transition bg-surface"
            >
              Free Templates & Google Sheets →
            </Link>
          </div>
        </div>
      </section>

      {/* Cluster Navigation & All Posts */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-surface border border-border hover:border-accent rounded-xl overflow-hidden transition-all flex flex-col p-6 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                  {post.category || "Teardown"}
                </span>
                {post.publishedDate && (
                  <time className="text-xs text-muted font-mono">
                    {formatDate(post.publishedDate)}
                  </time>
                )}
              </div>
              <h2 className="text-xl font-bold text-foreground font-display group-hover:text-accent transition-colors mb-3 leading-snug">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-primary-dim leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-xs text-muted font-mono">
                <span>{post.readTimeMinutes || 5} min read</span>
                <span className="text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                  Read Breakdown →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
