// Insert two Pexels images inline into each post, one after the first chosen
// H2 and one after the second. Idempotent — a re-run skips images that are
// already present in the file.
//
// Usage: node --env-file=scripts/.env scripts/fetch-inline-images.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const IMG_DIR = path.join(ROOT, "public", "images", "blog");
const KEY = process.env.PEXELS_API_KEY;

// For each slug, list the H2 headings to illustrate and the Pexels query.
// `afterH2` must match the heading text exactly (without the "## " prefix).
const INLINE_IMAGES = {
  "ai-visibility-the-metric-b2b-marketers-are-ignoring": [
    { afterH2: "What Is AI Visibility?", query: "artificial intelligence search interface" },
    { afterH2: "Four Dimensions of AI Visibility", query: "data network connections diagram" },
  ],
  "building-a-martech-stack-that-doesnt-collapse": [
    { afterH2: "The Integration Tax", query: "tangled cables server" },
    { afterH2: "Three Principles for a Sustainable Stack", query: "whiteboard planning diagram" },
  ],
  "hubspot-vs-marketo-uk-2026-where-to-focus": [
    { afterH2: "Why HubSpot dominates UK demand", query: "laptop marketing software" },
    { afterH2: "What to actually do", query: "person learning laptop notebook" },
  ],
  "only-salesforce-cert-that-gets-you-hired-uk-2026": [
    { afterH2: "What this means in practice", query: "laptop studying focus" },
    { afterH2: "Why the cert alone isn't enough", query: "hands keyboard programming" },
  ],
  "salesforce-admin-90-days-honest-roadmap": [
    { afterH2: "Days 1–30: Foundations and Orientation", query: "calendar planning notebook desk" },
    { afterH2: "Days 61–90: Certify and Position", query: "graduation achievement certificate" },
  ],
  "stakeholder-management-unsexy-skill-on-every-martech-job-ad": [
    { afterH2: "Why it ranks so high", query: "office team collaboration discussion" },
    { afterH2: "How to show stakeholder skills with no direct MarTech experience", query: "person writing cv interview" },
  ],
  "the-reporting-problem-nobody-talks-about": [
    { afterH2: "Vanity Metrics vs. Decision Metrics", query: "analytics dashboard screen metrics" },
    { afterH2: "Building a Decision-First Dashboard", query: "laptop data graphs analysis" },
  ],
  "what-enterprise-leadership-actually-looks-like-in-marketing": [
    { afterH2: "The Shift Nobody Prepares You For", query: "manager presenting meeting" },
    { afterH2: "Three Things That Actually Matter", query: "team collaboration office" },
  ],
  "what-marketing-cloud-sfmc-actually-does": [
    { afterH2: "SFMC is a stack, not a tool", query: "stacked blocks layers architecture" },
    { afterH2: "The two hardest ideas", query: "complex data diagram notebook" },
  ],
  "why-your-lead-scoring-model-is-probably-wrong": [
    { afterH2: "The Activity Trap", query: "abstract pattern complexity" },
    { afterH2: "What to Score Instead", query: "charts marketing performance laptop" },
  ],
};

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

function findH2Line(body, headingText) {
  const escaped = headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`^##\\s+${escaped}\\s*$`, "m");
  const m = body.match(re);
  if (!m) return null;
  return { index: m.index, endOfLine: m.index + m[0].length };
}

async function main() {
  if (!KEY) throw new Error("PEXELS_API_KEY not set — run with --env-file=scripts/.env");
  fs.mkdirSync(IMG_DIR, { recursive: true });

  for (const [slug, inserts] of Object.entries(INLINE_IMAGES)) {
    const file = path.join(POSTS_DIR, `${slug}.md`);
    if (!fs.existsSync(file)) {
      console.log(`[skip] ${slug}: file not found`);
      continue;
    }

    let raw = fs.readFileSync(file, "utf8");
    let changed = false;

    // Walk inserts in reverse so earlier indices stay valid.
    for (let i = inserts.length - 1; i >= 0; i--) {
      const insert = inserts[i];
      const n = i + 1;
      const imgPath = `/images/blog/${slug}-${n}.jpg`;

      if (raw.includes(imgPath)) {
        console.log(`[skip] ${slug} image ${n}: already in post`);
        continue;
      }

      const target = findH2Line(raw, insert.afterH2);
      if (!target) {
        console.log(`[warn] ${slug}: heading not found "${insert.afterH2}"`);
        continue;
      }

      console.log(`[${slug}] image ${n} after "${insert.afterH2}": query "${insert.query}"`);
      const photo = await searchPexels(insert.query);
      if (!photo) {
        console.log(`  no photo for "${insert.query}"`);
        continue;
      }

      const destFile = path.join(IMG_DIR, `${slug}-${n}.jpg`);
      await download(photo.src.large2x, destFile);

      const alt = (photo.alt || insert.afterH2).replace(/[\[\]]/g, "").slice(0, 120);
      const block = `\n\n![${alt}](${imgPath})\n\n*Photo by ${photo.photographer} on Pexels*`;

      raw = raw.slice(0, target.endOfLine) + block + raw.slice(target.endOfLine);
      changed = true;

      await new Promise((r) => setTimeout(r, 400));
    }

    if (changed) {
      fs.writeFileSync(file, raw);
      console.log(`  saved ${slug}.md`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
