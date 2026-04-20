import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, getAllPosts, slugify } from "@/lib/posts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          &larr; Back to Blog
        </Link>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/blog/category/${slugify(post.category)}`}
            className="text-xs font-semibold text-accent bg-red-50 px-2.5 py-1 rounded-full"
          >
            {post.category}
          </Link>
          <time className="text-sm text-muted">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
          {post.title}
        </h1>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
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
          {post.coverImageCredit && (
            <figcaption className="text-xs text-muted mt-2">
              {post.coverImageCreditUrl ? (
                <a
                  href={post.coverImageCreditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {post.coverImageCredit}
                </a>
              ) : (
                post.coverImageCredit
              )}
            </figcaption>
          )}
        </figure>
      )}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <div className="border-t border-border mt-12 pt-8">
        <div className="bg-surface rounded-xl p-6">
          <p className="font-semibold text-primary mb-2">Written by Oloye Adeosun</p>
          <p className="text-sm text-muted">
            Enterprise Marketing Manager specialising in automation, MarTech, and AI-powered marketing infrastructure.
          </p>
          <a
            href="https://www.linkedin.com/in/oloyeadeosun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent-light mt-2 inline-block"
          >
            Connect on LinkedIn &rarr;
          </a>
        </div>
      </div>
    </article>
  );
}
