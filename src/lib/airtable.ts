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

async function airtableGet<T>(
  path: string,
  revalidate: number
): Promise<T | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${BLOG_TABLE}${path}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
        next: { revalidate },
      }
    );
    if (!res.ok) {
      console.warn(
        `[airtable] ${res.status} on ${path}: ${await res.text().catch(() => "")}`
      );
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[airtable] fetch error on ${path}:`, err);
    return null;
  }
}

function parseKeywords(kw: BlogFields["Keywords"]): string[] {
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
  if (!data) return [];
  return data.records
    .map(mapRecord)
    .filter((p): p is BlogPost => p !== null);
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
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
  return Boolean(API_KEY);
}
