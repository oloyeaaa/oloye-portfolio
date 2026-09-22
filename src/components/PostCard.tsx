import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  const imageSrc = post.coverImage || "/images/hero-pipeline.jpg";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition hover:border-accent hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="relative aspect-16/9 w-full overflow-hidden bg-surface-alt">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 space-y-3">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <span className="font-semibold text-accent">{post.category}</span>
          <span>•</span>
          <time dateTime={post.date}>{post.date}</time>
        </div>

        <h3 className="text-base font-bold text-foreground group-hover:text-accent transition line-clamp-2 leading-snug">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="text-xs text-muted line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="pt-2 mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:text-accent-dark"
          >
            <span>Read Walkthrough</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
