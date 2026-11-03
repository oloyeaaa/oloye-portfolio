import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { slugify } from "@/lib/posts";

// Case studies (3 Nov 2026). The Copywriter writes one markdown file per study
// in content/case-studies/, named "01-<slug>.md": the number sets the order,
// the rest is the web address. Folders starting "_" (the facts) are never read.
// A line "[SCREENSHOT: what it shows]" becomes a placeholder box until the real,
// blurred screenshot is ready. Both the boxes and "[FLAG: ...]" notes for Oloye
// (a red note) show on previews only, and are left out of the live page.

const dir = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyMeta {
  slug: string;
  order: number;
  title: string;
  excerpt: string;
  block?: string;
  tools: string[];
  built?: string;
  status?: string;
  freebie?: string;
  /** On hold (for example, waiting on someone's yes): not listed, no page. */
  hold: boolean;
}

export interface CaseStudy extends CaseStudyMeta {
  body: string;
}

function files(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

function parse(file: string): CaseStudy {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const base = file.replace(/\.md$/, "");
  const m = base.match(/^(\d+)[-_ ]+(.*)$/);
  let body = content.trim();

  // No title in the frontmatter? Use the first "# " heading and take it out of the body.
  let title: string = data.title || "";
  if (!title) {
    const h = body.match(/^#\s+(.+)$/m);
    if (h) {
      title = h[1].trim();
      body = body.replace(h[0], "").trim();
    }
  }

  const tools = Array.isArray(data.tools)
    ? data.tools.map(String)
    : typeof data.tools === "string"
      ? data.tools.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

  return {
    slug: data.slug || slugify(m ? m[2] : base),
    order: m ? Number(m[1]) : 99,
    title: title || base,
    excerpt: data.excerpt || data.description || "",
    block: data.block,
    tools,
    // YAML reads 2026-10-27 as a Date, so turn it back into the plain day.
    built: data.built instanceof Date ? data.built.toISOString().slice(0, 10) : data.built ? String(data.built).slice(0, 10) : undefined,
    status: data.status,
    freebie: data.freebie,
    hold: data.hold === true || data.status === "hold",
    body,
  };
}

export function getAllCaseStudies(): CaseStudyMeta[] {
  return files()
    .map(parse)
    .filter((s) => !s.hold)
    .sort((a, b) => a.order - b.order)
    .map(({ body: _body, ...meta }) => meta);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const s = files().map(parse).find((x) => x.slug === slug);
  return s && !s.hold ? s : null;
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Markdown to HTML, with each screenshot slot turned into a clear placeholder box. */
export async function renderCaseStudy(body: string): Promise<string> {
  const slots: string[] = [];
  const marked = body.replace(/\[SCREENSHOT:\s*([^\]]+)\]/gi, (_m, what: string) => {
    slots.push(what.trim());
    return `\n\nCSSLOT${slots.length - 1}\n\n`;
  });
  const flags: string[] = [];
  const flagged = marked.replace(/\*?\[FLAG:\s*([^\]]+)\]\*?/gi, (_m, note: string) => {
    flags.push(note.trim());
    return `CSFLAG${flags.length - 1}`;
  });
  const showFlags = process.env.VERCEL_ENV !== "production";
  let out = (await remark().use(gfm).use(html).process(flagged)).toString();
  out = out.replace(/\s*CSFLAG(\d+)/g, (_m, i) =>
    showFlags ? ` <span class="cs-flag">Note for Oloye, not on the live page: ${esc(flags[Number(i)])}</span>` : ""
  );
  return out.replace(/<p>CSSLOT(\d+)<\/p>|CSSLOT(\d+)/g, (_m, a, b) => {
    const what = slots[Number(a ?? b)];
    // The slot text carries blur notes for Oloye, so the live site never shows it.
    if (!showFlags) return "";
    return (
      `<figure class="cs-slot not-prose" role="img" aria-label="Screenshot to come: ${esc(what)}">` +
      `<span class="cs-slot-tag">Screenshot to come</span>` +
      `<span class="cs-slot-text">${esc(what)}</span>` +
      `</figure>`
    );
  });
}
