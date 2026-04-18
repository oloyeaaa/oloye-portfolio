"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/posts";

interface Category {
  name: string;
  slug: string;
  count: number;
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/blog/category/")
    ? pathname.split("/").pop()
    : null;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/blog"
        className={`text-sm px-4 py-2 rounded-full border transition-colors ${
          !activeSlug
            ? "bg-primary text-white border-primary"
            : "border-border text-muted hover:border-primary hover:text-primary"
        }`}
      >
        All Posts
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog/category/${cat.slug}`}
          className={`text-sm px-4 py-2 rounded-full border transition-colors ${
            activeSlug === cat.slug
              ? "bg-primary text-white border-primary"
              : "border-border text-muted hover:border-primary hover:text-primary"
          }`}
        >
          {cat.name} ({cat.count})
        </Link>
      ))}
    </div>
  );
}
