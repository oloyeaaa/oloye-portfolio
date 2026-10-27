import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

// One blog card, used on the home page and the blog page.
export default function PostTile({ post, big = false }: { post: PostMeta; big?: boolean }) {
  const line = post.cardLine || post.excerpt;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex overflow-hidden rounded-3xl border border-border bg-surface transition hover:-translate-y-1 hover:border-foreground ${
        big ? "flex-col md:flex-row" : "h-full flex-col"
      }`}
    >
      <div className={`relative w-full overflow-hidden bg-background ${big ? "aspect-[16/10] md:aspect-auto md:w-3/5" : "aspect-[16/10]"}`}>
        <Image
          src={post.coverImage || "/images/blog/cover-handoff.jpg"}
          alt=""
          fill
          sizes={big ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={big}
        />
      </div>
      <div className={`flex flex-1 flex-col ${big ? "p-8 sm:p-10" : "p-6"}`}>
        <p className="eyebrow">{post.category}</p>
        <h3 className={`mt-3 font-bold leading-snug text-foreground ${big ? "text-2xl sm:text-3xl" : "text-xl"}`}>{post.title}</h3>
        {line && <p className="mt-3 text-muted">{line}</p>}
        <span className="mt-auto pt-6 text-sm font-semibold text-foreground">
          <span className="lime-mark">Read it</span> →
        </span>
      </div>
    </Link>
  );
}
