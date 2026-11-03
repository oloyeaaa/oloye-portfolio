import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import type { FaqItem } from "@/lib/faqs";

// The "Who we help" pages, /for/<slug> (3 Nov 2026). One markdown file per page
// in content/for/, named "NN-<slug>.md" (the number sets the order). The
// Copywriter's SEO fields go in the frontmatter, the page sections in the body
// (each "## " is a section), and the FAQ as a list in the frontmatter so it can
// use the shared Faq block and its FAQPage schema. To add a page, add a file.
//
// "[CALCULATOR: line]" is a line that links to the automation ROI calculator.
// It stays out of the page until the calculator is live (CALCULATOR_LIVE), so
// nothing links to a missing page.

const dir = path.join(process.cwd(), "content/for");

/** Set to true once /tools/automation-roi-calculator is built. */
export const CALCULATOR_LIVE = false;
export const CALCULATOR_URL = "/tools/automation-roi-calculator";

export interface ForPageMeta {
  slug: string;
  order: number;
  /** The tab title (the site adds " | Oloye"). */
  title: string;
  description: string;
  /** Short name for the footer and the "more pages" links, e.g. "Plumbers". */
  name: string;
  h1: string;
  /** Words in the H1 to mark in lime. */
  mark?: string;
  under: string;
  faqHeading: string;
  faqs: FaqItem[];
  lastHeading: string;
  lastLine: string;
}

export interface ForPage extends ForPageMeta {
  body: string;
}

function files(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

function parse(file: string): ForPage {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const m = file.replace(/\.md$/, "").match(/^(\d+)[-_ ]+(.*)$/);
  return {
    slug: data.slug || (m ? m[2] : file.replace(/\.md$/, "")),
    order: m ? Number(m[1]) : 99,
    title: data.title,
    description: data.description,
    name: data.name,
    h1: data.h1,
    mark: data.mark,
    under: data.under,
    faqHeading: data.faqHeading || "Questions people ask",
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    lastHeading: data.lastHeading || "What task would you hand over first?",
    lastLine: data.lastLine || "",
    body: content.trim(),
  };
}

export function getAllForPages(): ForPageMeta[] {
  return files()
    .map(parse)
    .sort((a, b) => a.order - b.order)
    .map(({ body: _body, ...meta }) => meta);
}

export function getForPage(slug: string): ForPage | null {
  return files().map(parse).find((p) => p.slug === slug) ?? null;
}

/** The page body as HTML, with the calculator line kept out until it's live. */
export async function renderForPage(body: string): Promise<string> {
  const withCalc = body.replace(/\[CALCULATOR:\s*([^\]]+)\]/gi, (_m, line: string) =>
    CALCULATOR_LIVE ? `[${line.trim()}](${CALCULATOR_URL})` : ""
  );
  return (await remark().use(gfm).use(html).process(withCalc)).toString();
}
