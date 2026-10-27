import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema, articleSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getAllSlugs, getPostBySlug } from "@/lib/airtable";
import { getPostFull, renderPostBody, getRelatedPosts, slugify, type PostFull } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import { getAuthor } from "@/lib/authors";
import { getPostFreebie } from "@/lib/postFreebies";
import Faq from "@/components/Faq";
import TableOfContents from "@/components/post/TableOfContents";
import FreebieForm from "@/components/post/FreebieForm";
import AuthorCard from "@/components/post/AuthorCard";
import PostTile from "@/components/home/PostTile";
import { LastCall } from "@/components/home/CallToAction";

// The single post template (2026-10). Top to bottom: breadcrumb, title, cover,
// "In short" summary, then the article with "On this page" on the left and the
// free-thing form in the middle, tags, author card, the post's own FAQ, related
// posts, and the last call.

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

// Local markdown posts carry everything. A post that only lives in Airtable
// still renders, just without the summary, FAQ and form choice.
async function loadPost(slug: string): Promise<PostFull | null> {
  const local = getPostFull(slug);
  if (local) return local;
  const remote = await getPostBySlug(slug);
  if (!remote) return null;
  return {
    slug: remote.slug,
    title: remote.title,
    date: remote.publishedDate || "",
    category: remote.category || "Tools & systems",
    excerpt: remote.metaDescription || remote.excerpt,
    tags: remote.keywords,
    coverImage: remote.coverImage,
    body: remote.body,
    updated: remote.updated,
    summary: [],
    faq: [],
    readMinutes: remote.readTimeMinutes || Math.max(1, Math.round(remote.body.split(/\s+/).length / 220)),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "Post not found" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  const author = getAuthor(post.author);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: author.name, url: author.url }],
    keywords: post.tags.length ? post.tags : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      ...(post.coverImage ? { images: [{ url: post.coverImage, width: 1280, height: 853, alt: post.title }] } : {}),
      ...(post.date ? { publishedTime: post.date } : {}),
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
    ...(post.hidden ? { robots: { index: false, follow: true } } : {}),
  };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const author = getAuthor(post.author);
  const freebie = getPostFreebie(post.freebie);
  const { first, second, headings } = await renderPostBody(post.body, post.coverImage);
  const related = getRelatedPosts(post.slug, post.category);
  const path = `/blog/${post.slug}`;

  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    ...(category ? [{ name: category.name, path: `/blog/category/${category.slug}` }] : []),
    { name: post.title, path },
  ];

  return (
    <>
      <JsonLd data={webPageSchema({ path, title: post.title, description: post.excerpt, breadcrumb })} />
      <JsonLd
        data={articleSchema({
          path,
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.date,
          dateModified: post.updated || post.date,
          keywords: post.tags,
          section: post.category,
          author: { name: author.name, url: author.url, image: `${SITE_URL}${author.image}` },
        })}
      />

      <div className="bg-surface">
        <article>
          {/* Title block */}
          <header className="px-4 pt-14 sm:px-6 sm:pt-20">
            <div className="mx-auto max-w-4xl">
              <nav aria-label="Breadcrumb" className="text-sm text-muted">
                <ol className="flex flex-wrap items-center gap-2">
                  <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                  {category && (
                    <>
                      <li aria-hidden="true">/</li>
                      <li><Link href={`/blog/category/${category.slug}`} className="hover:text-foreground">{category.name}</Link></li>
                    </>
                  )}
                </ol>
              </nav>

              {category && (
                <Link href={`/blog/category/${category.slug}`} className="eyebrow mt-10 inline-block hover:underline">
                  {category.name}
                </Link>
              )}
              <h1 className="display mt-4 text-4xl text-foreground sm:text-6xl">{post.title}</h1>
              {post.excerpt && <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{post.excerpt}</p>}

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
                <Link href="/about" rel="author" className="flex items-center gap-2.5 hover:text-foreground">
                  <Image src={author.image} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-semibold text-foreground underline-offset-4 hover:underline">{author.name}</span>
                </Link>
                {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
                {post.updated && post.updated !== post.date && (
                  <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
                )}
                <span>{post.readMinutes} min read</span>
              </div>
            </div>
          </header>

          {/* One cover, and only one */}
          {post.coverImage && (
            <div className="px-4 pt-10 sm:px-6">
              <div className="relative mx-auto aspect-[3/2] max-w-5xl overflow-hidden rounded-3xl border border-border bg-background">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* The article, with "On this page" on the left */}
          <div className="px-4 pt-14 sm:px-6">
            <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-14">
              <aside className="lg:pt-2">
                <TableOfContents headings={headings} />
              </aside>

              <div className="min-w-0 max-w-[680px]">
                {post.summary.length > 0 && (
                  <section data-summary aria-label="In short" className="mb-12 rounded-3xl border border-border bg-background p-7 sm:p-8">
                    <p className="eyebrow">In short</p>
                    <ul className="mt-4 space-y-3">
                      {post.summary.map((s) => (
                        <li key={s} className="flex gap-3 text-foreground">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-dark" aria-hidden="true" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <div className="post-body prose" dangerouslySetInnerHTML={{ __html: first }} />
                <FreebieForm freebie={freebie} source={post.slug} />
                {second && <div className="post-body prose" dangerouslySetInnerHTML={{ __html: second }} />}

                {post.tags.length > 0 && (
                  <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                    <span className="mr-2 text-sm font-semibold text-foreground">Tags</span>
                    {post.tags.map((t) => (
                      <Link
                        key={t}
                        href={`/blog/tag/${slugify(t)}`}
                        className="rounded-lg border border-border px-3 py-1.5 text-sm text-primary-dim transition hover:border-foreground hover:text-foreground"
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                )}

                <AuthorCard author={author} />
              </div>
            </div>
          </div>
        </article>

        {post.faq.length > 0 && <Faq items={post.faq} heading="Questions about this post" />}

        {related.length > 0 && (
          <section className="border-t border-border px-4 py-24 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <p className="eyebrow">Keep reading</p>
              <h2 className="display mt-4 text-3xl text-foreground sm:text-5xl">Related posts</h2>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {related.map((p) => (
                  <PostTile key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <LastCall />
      </div>
    </>
  );
}
