// Fetch a Pexels cover image for every post that doesn't already have one.
// Usage:
//   node --env-file=scripts/.env scripts/fetch-covers.mjs
//
// Skips posts with an existing `coverImage:` in frontmatter. To re-fetch a
// post, delete the `coverImage:` line (and optionally the image file) and
// re-run. Override the search query per slug in SLUG_QUERIES below.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const IMG_DIR = path.join(ROOT, "public", "images", "blog");
const KEY = process.env.PEXELS_API_KEY;

const SLUG_QUERIES = {
  "only-salesforce-cert-that-gets-you-hired-uk-2026": "professional certification laptop",
  "stakeholder-management-unsexy-skill-on-every-martech-job-ad": "business meeting team discussion",
  "hubspot-vs-marketo-uk-2026-where-to-focus": "marketing analytics dashboard",
  "salesforce-admin-90-days-honest-roadmap": "career planning workspace",
  "what-marketing-cloud-sfmc-actually-does": "marketing data analytics",
  "ai-visibility-the-metric-b2b-marketers-are-ignoring": "artificial intelligence data search",
  "building-a-martech-stack-that-doesnt-collapse": "technology stack software",
  "the-reporting-problem-nobody-talks-about": "business report analytics",
  "what-enterprise-leadership-actually-looks-like-in-marketing": "business leadership meeting",
  "why-your-lead-scoring-model-is-probably-wrong": "data analysis graphs",
};

function deriveQuery(slug, data) {
  if (SLUG_QUERIES[slug]) return SLUG_QUERIES[slug];
  if (Array.isArray(data.tags) && data.tags.length) return data.tags.slice(0, 2).join(" ");
  return data.title ?? slug.replaceAll("-", " ");
}

async function searchPexels(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const r = await fetch(url, { headers: { Authorization: KEY } });
  if (!r.ok) throw new Error(`Pexels ${r.status}: ${await r.text()}`);
  const data = await r.json();
  return data.photos?.[0];
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Download ${r.status} for ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

async function main() {
  if (!KEY) throw new Error("PEXELS_API_KEY not set — run with --env-file=scripts/.env");
  fs.mkdirSync(IMG_DIR, { recursive: true });

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const full = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const parsed = matter(raw);

    if (parsed.data.coverImage) {
      console.log(`[skip] ${slug} already has coverImage`);
      continue;
    }

    const query = deriveQuery(slug, parsed.data);
    console.log(`[${slug}] query: "${query}"`);

    const photo = await searchPexels(query);
    if (!photo) {
      console.log(`  no photo returned for "${query}"`);
      continue;
    }

    const imgPath = path.join(IMG_DIR, `${slug}.jpg`);
    await download(photo.src.large2x, imgPath);

    parsed.data.coverImage = `/images/blog/${slug}.jpg`;
    parsed.data.coverImageCredit = `Photo by ${photo.photographer} on Pexels`;
    parsed.data.coverImageCreditUrl = photo.url;

    fs.writeFileSync(full, matter.stringify(parsed.content, parsed.data));
    console.log(`  saved ${path.relative(ROOT, imgPath)} (by ${photo.photographer})`);

    await new Promise((r) => setTimeout(r, 400));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
