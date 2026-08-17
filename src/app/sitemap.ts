import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllSkillSlugs } from "@/lib/skills";
import { getPublishedPosts } from "@/lib/airtable";
import { FREEBIE_SLUGS } from "@/lib/freebies";

// Rewritten 2026-08-17. The old sitemap listed the agency-era routes:
// /for/<vertical> for plumbers, coaches, salons and the rest, plus /systems,
// /agentic-ai-systems and /test-drive. Those pages are archived, so listing
// them would have fed search engines a sitemap full of 404s.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const posts = await getPublishedPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated || post.publishedDate || now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Each free tool is its own page, and each is real indexable content.
  const freebieRoutes: MetadataRoute.Sitemap = FREEBIE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/free/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const skillRoutes: MetadataRoute.Sitemap = getAllSkillSlugs().map((slug) => ({
    url: `${SITE_URL}/skills/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      // The page the bio link points at. Highest priority after home.
      url: `${SITE_URL}/free`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/practical-income-method`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    ...freebieRoutes,
    ...skillRoutes,
    ...blogRoutes,
  ];
}
