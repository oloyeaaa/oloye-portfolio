import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { slugify } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col justify-between rounded-xl border border-border bg-surface overflow-hidden transition hover:border-accent/40 hover:shadow-lg">
      <div>
        {post.coverImage && (
          <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-background">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        )}

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-[10px] font-semibold text-accent border border-border">
              {post.category}
            </span>
            <time className="text-[11px] text-muted">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base font-bold text-foreground group-hover:text-accent transition leading-snug line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-border/40 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-muted bg-background px-2 py-0.5 rounded border border-border/60">
              #{tag}
            </span>
          ))}
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-semibold text-accent hover:underline"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
