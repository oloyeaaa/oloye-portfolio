import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/airtable";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";

// Re-check every hour, so scheduled posts appear on their day.
export const revalidate = 3600;

// Rewritten 2026-10-27 for the process automation site. Only pages we want
// found are listed. Left out on purpose (still live by link, marked noindex):
// hidden blog posts, tag pages, the old /free/<prompt> pages, /skills, the
// marketing career tier list, and /case-studies until the first build is up.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const posts = await getPublishedPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => !post.hidden)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated || post.publishedDate || now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const listed = getAllPosts();
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.filter((c) =>
    listed.some((p) => getCategory(p.category)?.slug === c.slug)
  ).map((c) => ({
    url: `${SITE_URL}/blog/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/blog", 0.8, "daily"),
    page("/about", 0.8, "monthly"),
    page("/contact", 0.6, "yearly"),
    page("/free", 0.8, "monthly"),
    page("/free/10-jobs-to-automate-first", 0.8, "monthly"),
    ...blogRoutes,
    ...categoryRoutes,
  ];
}
