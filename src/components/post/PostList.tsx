import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import PostTile from "@/components/home/PostTile";
import Reveal from "@/components/home/Reveal";

// Shared by the category and tag pages: a heading, the category chips, the posts.
export default function PostList({
  eyebrow,
  title,
  line,
  posts,
  activeCategory,
}: {
  eyebrow: string;
  title: string;
  line?: string;
  posts: PostMeta[];
  activeCategory?: string;
}) {
  return (
    <>
      <section className="px-4 pb-12 pt-20 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href="/" className="hover:text-foreground">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
          </nav>
          <p className="eyebrow mt-10">{eyebrow}</p>
          <h1 className="display mt-4 text-5xl text-foreground sm:text-7xl">{title}</h1>
          {line && <p className="mt-6 max-w-xl text-lg text-muted">{line}</p>}
          <CategoryChips active={activeCategory} />
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 100}>
                  <PostTile post={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-dashed border-border-strong p-10 text-center text-muted">
              Posts for this one are on the way. <Link href="/blog" className="font-semibold text-foreground underline">See all posts</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export function CategoryChips({ active }: { active?: string }) {
  return (
    <div className="mt-10 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
          !active ? "border-foreground bg-foreground text-accent" : "border-border text-foreground hover:border-foreground"
        }`}
      >
        All posts
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/blog/category/${c.slug}`}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
            active === c.slug ? "border-foreground bg-foreground text-accent" : "border-border text-foreground hover:border-foreground"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
