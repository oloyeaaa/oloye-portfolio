import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  const imageSrc = post.coverImage || "/images/hero-pipeline.jpg";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-foreground hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="relative aspect-16/9 w-full overflow-hidden bg-surface-alt">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2 text-xs text-muted">
          <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[11px] font-semibold text-accent">
            {post.readingTime}
          </span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-foreground transition group-hover:underline group-hover:decoration-accent group-hover:decoration-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm text-muted">
          {post.description}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground transition hover:text-muted"
          >
            Read Teardown &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
