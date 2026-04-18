import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { slugify } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  "marketing-automation": "bg-blue-100 text-blue-700",
  "marketing-operations": "bg-emerald-100 text-emerald-700",
  "ai-enterprise": "bg-purple-100 text-purple-700",
  "leadership": "bg-amber-100 text-amber-700",
  "martech": "bg-rose-100 text-rose-700",
};

function getCategoryColor(category: string): string {
  return categoryColors[slugify(category)] || "bg-gray-100 text-gray-700";
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-3 mb-3">
        <Link
          href={`/blog/category/${slugify(post.category)}`}
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(post.category)}`}
        >
          {post.category}
        </Link>
        <time className="text-xs text-muted">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h3>
      </Link>

      <p className="text-sm text-muted leading-relaxed mb-4">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted bg-surface-alt px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
