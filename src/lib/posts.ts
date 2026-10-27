import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  coverImageCredit?: string;
  coverImageCreditUrl?: string;
  /** Off-story posts: still live by link, but not listed and not indexed. */
  hidden?: boolean;
  /** One short, plain line for the post's card on the home and blog pages. */
  cardLine?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/**
 * Scheduling: a post whose date is after today (UK time) isn't out yet. It stays
 * off every list and its page says "not found" until the day comes.
 */
export function isPublished(date?: string): boolean {
  if (!date) return true;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" }); // YYYY-MM-DD
  return String(date).slice(0, 10) <= today;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags || [],
        coverImage: data.coverImage,
        coverImageCredit: data.coverImageCredit,
        coverImageCreditUrl: data.coverImageCreditUrl,
        hidden: data.hidden === true,
        cardLine: data.cardLine,
      } as PostMeta;
    });

  return posts.filter((p) => !p.hidden && isPublished(p.date)).sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    (post) => slugify(post.category) === category
  );
}

export function getCategories(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    tags: data.tags || [],
    coverImage: data.coverImage,
    coverImageCredit: data.coverImageCredit,
    coverImageCreditUrl: data.coverImageCreditUrl,
    contentHtml,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Single post (2026-10 template): everything the post page needs in one read.
// ---------------------------------------------------------------------------

export type FaqEntry = { question: string; answer: string };
export type Heading = { id: string; text: string };

export interface PostFull extends PostMeta {
  body: string;
  author?: string;
  updated?: string;
  summary: string[];
  faq: FaqEntry[];
  freebie?: string;
  readMinutes: number;
}

export function getPostFull(slug: string): PostFull | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt || data.description || "",
    tags: data.tags || [],
    coverImage: data.coverImage,
    coverImageCredit: data.coverImageCredit,
    coverImageCreditUrl: data.coverImageCreditUrl,
    hidden: data.hidden === true,
    cardLine: data.cardLine,
    body: content,
    author: data.author,
    updated: data.updated,
    summary: Array.isArray(data.summary) ? data.summary : [],
    faq: Array.isArray(data.faq) ? data.faq : [],
    freebie: data.freebie,
    readMinutes: Math.max(1, Math.round(words / 220)),
  };
}

/**
 * Markdown to HTML, then the small fixes the template relies on:
 * - drop any image that repeats the cover (no two pictures in a row at the top)
 * - give every h2 an id, so the table of contents can link to it
 * - split the body in two at a middle h2, so the form can sit in between
 */
export async function renderPostBody(
  body: string,
  cover?: string
): Promise<{ first: string; second: string; headings: Heading[] }> {
  const processed = await remark().use(gfm).use(html).process(body);
  let out = processed.toString();

  if (cover) {
    const esc = cover.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`<p>\\s*<img[^>]*src="${esc}"[^>]*>\\s*</p>`, "g"), "");
  }

  const headings: Heading[] = [];
  const used = new Set<string>();
  out = out.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&#x26;/g, "&").replace(/&amp;/g, "&").trim();
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  const starts = [...out.matchAll(/<h2 id=/g)].map((m) => m.index ?? 0);
  if (starts.length >= 3) {
    const cut = starts[Math.floor(starts.length / 2)];
    return { first: out.slice(0, cut), second: out.slice(cut), headings };
  }
  return { first: out, second: "", headings };
}

/** Three related posts: same category first, then the newest of the rest. */
export function getRelatedPosts(slug: string, category: string, count = 3): PostMeta[] {
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === category);
  const rest = others.filter((p) => p.category !== category);
  return [...same, ...rest].slice(0, count);
}

export function getAllTags(): { name: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
  return [...counts.entries()].map(([name, count]) => ({ name, slug: slugify(name), count }));
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.some((t) => slugify(t) === tagSlug));
}
