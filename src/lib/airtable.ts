import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID || "appSD2mpRbokvWzU6";
const BLOG_TABLE =
  process.env.AIRTABLE_BLOG_TABLE_ID || "tbl6kEFqw0P1rT7Gv";

const REVALIDATE_LIST = 60;
const REVALIDATE_POST = 300;

interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

interface BlogFields {
  Title?: string;
  Slug?: string;
  Status?: string;
  Excerpt?: string;
  Body?: string;
  "Cover Image"?: string;
  "SEO Title"?: string;
  "Meta Description"?: string;
  Keywords?: string | string[];
  Category?: string;
  Owner?: string;
  "Published Date"?: string;
  Updated?: string;
  "Primary Keyword"?: string;
  Cluster?: string;
  "Read Time"?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  category?: string;
  primaryKeyword?: string;
  cluster?: string;
  publishedDate?: string;
  updated?: string;
  readTimeMinutes?: number;
}

function getLocalPosts(): BlogPost[] {
  try {
    const dir = path.join(process.cwd(), "content/posts");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    return files.map((file) => {
      const fullPath = path.join(dir, file);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content: body } = matter(fileContent);
      const slug = data.slug || file.replace(/\.md$/, "");
      return {
        id: slug,
        title: data.title || slug,
        slug,
        excerpt: data.description || data.excerpt || "",
        body: body || "",
        coverImage: data.coverImage,
        seoTitle: data.title,
        metaDescription: data.description || data.excerpt || "",
        keywords: data.tags || [],
        category: data.category || "Buyer Psychology",
        cluster: data.category || "Buyer Psychology",
        publishedDate: data.date,
        readTimeMinutes: data.readingTime
          ? parseInt(String(data.readingTime), 10)
          : undefined,
      };
    });
  } catch (err) {
    console.error("[posts] Error reading local markdown posts:", err);
    return [];
  }
}

async function airtableGet<T>(
  path: string,
  revalidate: number
): Promise<T | null> {
  if (!API_KEY || !API_KEY.startsWith("pat")) {
    return null;
  }
  const url = `https://api.airtable.com/v0/${BASE_ID}/${BLOG_TABLE}${path}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      next: { revalidate },
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function parseKeywords(kw?: string | string[]): string[] {
  if (!kw) return [];
  if (Array.isArray(kw)) return kw;
  return kw
    .split(/[,;]/)
    .map((k) => k.trim())
    .filter(Boolean);
}

function mapRecord(r: AirtableRecord<BlogFields>): BlogPost | null {
  const title = r.fields.Title;
  const slug = r.fields.Slug;
  if (!title || !slug) return null;
  const excerpt = r.fields.Excerpt || "";
  return {
    id: r.id,
    title,
    slug,
    excerpt,
    body: r.fields.Body || "",
    coverImage: r.fields["Cover Image"],
    seoTitle: r.fields["SEO Title"] || title,
    metaDescription: r.fields["Meta Description"] || excerpt,
    keywords: parseKeywords(r.fields.Keywords),
    category: r.fields.Category,
    primaryKeyword: r.fields["Primary Keyword"],
    cluster: r.fields.Cluster,
    publishedDate: r.fields["Published Date"],
    updated: r.fields.Updated,
    readTimeMinutes: r.fields["Read Time"],
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const localPosts = getLocalPosts();
  let airtablePosts: BlogPost[] = [];

  const filter = `AND({Status}='Published',{Slug}!='')`;
  const params = new URLSearchParams({
    filterByFormula: filter,
    "sort[0][field]": "Published Date",
    "sort[0][direction]": "desc",
    pageSize: "50",
  });

  const data = await airtableGet<{
    records: AirtableRecord<BlogFields>[];
  }>(`?${params.toString()}`, REVALIDATE_LIST);

  if (data && data.records) {
    airtablePosts = data.records
      .map(mapRecord)
      .filter((p): p is BlogPost => p !== null);
  }

  // Combine local posts and airtable posts (local posts take precedence by slug)
  const slugMap = new Map<string, BlogPost>();
  localPosts.forEach((p) => slugMap.set(p.slug, p));
  airtablePosts.forEach((p) => {
    if (!slugMap.has(p.slug)) {
      slugMap.set(p.slug, p);
    }
  });

  const allPosts = Array.from(slugMap.values());
  return allPosts.sort((a, b) => {
    const dateA = a.publishedDate || "";
    const dateB = b.publishedDate || "";
    return dateA > dateB ? -1 : 1;
  });
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const local = getLocalPosts().find((p) => p.slug === slug);
  if (local) return local;

  const safeSlug = slug.replace(/'/g, "\\'");
  const filter = `AND({Status}='Published',{Slug}='${safeSlug}')`;
  const params = new URLSearchParams({
    filterByFormula: filter,
    maxRecords: "1",
  });
  const data = await airtableGet<{
    records: AirtableRecord<BlogFields>[];
  }>(`?${params.toString()}`, REVALIDATE_POST);
  if (!data || data.records.length === 0) return null;
  return mapRecord(data.records[0]);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug);
}

export async function renderMarkdown(md: string): Promise<string> {
  const processed = await remark().use(html).process(md);
  return processed.toString();
}

export function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function isAirtableConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.startsWith("pat"));
}
