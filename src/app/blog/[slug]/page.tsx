import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import {
  webPageSchema,
  articleSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import {
  getAllSlugs,
  getPostBySlug,
  renderMarkdown,
  estimateReadTime,
} from "@/lib/airtable";

export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
      ...(post.publishedDate
        ? { publishedTime: post.publishedDate }
        : {}),
      ...(post.updated ? { modifiedTime: post.updated } : {}),
    },
    keywords: post.keywords.length ? post.keywords : undefined,
  };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const bodyHtml = await renderMarkdown(post.body);
  const readTime = post.readTimeMinutes ?? estimateReadTime(post.body);

  const webPage = webPageSchema({
    path: `/blog/${post.slug}`,
    title: post.seoTitle,
    description: post.metaDescription,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ],
  });

  const article = articleSchema({
    path: `/blog/${post.slug}`,
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: post.publishedDate,
    dateModified: post.updated,
    keywords: post.keywords,
  });

  return (
    <>
      <JsonLd data={webPage} />
      <JsonLd data={article} />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.category && (
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full font-display uppercase tracking-widest">
                {post.category}
              </span>
            )}
            {post.publishedDate && (
              <time className="text-sm text-muted">
                {formatDate(post.publishedDate)}
              </time>
            )}
            <span className="text-sm text-muted">{readTime} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground font-display leading-[1.1]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-primary-dim leading-relaxed mt-6">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImage && (
          <figure className="mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-lg"
            />
          </figure>
        )}

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {post.keywords.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3 font-display">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((k) => (
                <span
                  key={k}
                  className="text-xs text-primary-dim bg-surface border border-border px-3 py-1 rounded-full"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-border mt-12 pt-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest font-display mb-2">
              See it running
            </p>
            <p className="font-display font-semibold text-foreground mb-2">
              The Front Desk on your own business.
            </p>
            <p className="text-sm text-primary-dim mb-4">
              10 real messages. A side-by-side report on what the Front Desk would have replied and done. Yours to keep either way.
            </p>
            <Link
              href="/test-drive"
              className="inline-block bg-accent hover:bg-accent-light text-background px-5 py-2.5 rounded-md font-semibold transition-colors text-sm"
            >
              Book my test
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
