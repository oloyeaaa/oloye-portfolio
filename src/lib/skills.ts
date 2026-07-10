import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const skillsDirectory = path.join(process.cwd(), "content/skills");

export interface SkillMeta {
  slug: string;
  title: string;
  type: "skill" | "agent";
  category: string;
  tagline: string;
  requirements: string[];
  tags: string[];
  version: string;
  updated: string;
  size: string;
  fileCount: number;
  download: string;
  price: number | null;
  featured: boolean;
  order: number;
}

export interface Skill extends SkillMeta {
  contentHtml: string;
}

function toDateStr(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v == null ? "" : String(v);
}

function readMeta(file: string): SkillMeta {
  const slug = file.replace(/\.md$/, "");
  const fullPath = path.join(skillsDirectory, file);
  const { data } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    type: data.type ?? "skill",
    category: data.category ?? "General",
    tagline: data.tagline ?? "",
    requirements: data.requirements ?? [],
    tags: data.tags ?? [],
    version: toDateStr(data.version),
    updated: toDateStr(data.updated),
    size: data.size ?? "",
    fileCount: data.fileCount ?? 0,
    download: data.download ?? "",
    price: data.price ?? null,
    featured: Boolean(data.featured),
    order: data.order ?? 0,
  };
}

export function getAllSkills(): SkillMeta[] {
  if (!fs.existsSync(skillsDirectory)) return [];
  return fs
    .readdirSync(skillsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
}

export function getAllSkillSlugs(): string[] {
  if (!fs.existsSync(skillsDirectory)) return [];
  return fs
    .readdirSync(skillsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getSkillCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const s of getAllSkills()) map.set(s.category, (map.get(s.category) ?? 0) + 1);
  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const fullPath = path.join(skillsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const meta = readMeta(`${slug}.md`);
  const processed = await remark().use(html).process(content);
  return { ...meta, contentHtml: processed.toString() };
}
