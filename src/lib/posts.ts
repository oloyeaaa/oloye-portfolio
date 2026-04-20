import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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
}

export interface Post extends PostMeta {
  contentHtml: string;
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
      } as PostMeta;
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
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
