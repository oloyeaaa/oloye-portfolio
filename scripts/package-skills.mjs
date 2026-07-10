#!/usr/bin/env node
/**
 * package-skills.mjs — build the /skills directory from the live Claude Code skills.
 *
 * For each skill in the registry it:
 *   1. copies the live skill from ~/.claude/skills/<source> into a staging dir,
 *      stripping everything on the exclusion list (secrets, cookies, output,
 *      caches, downloaded video, big model files),
 *   2. de-personalises the text (placeholders for Airtable IDs, <workspace-root>
 *      for absolute paths, generic tokens for any client example),
 *   3. runs a HARD leak-gate: if any secret / personal ID / path / client
 *      reference survives, it throws and nothing ships for that skill,
 *   4. writes MANIFEST.txt + SETUP.md, zips into public/downloads/<slug>.zip,
 *   5. writes content/skills/<slug>.md (frontmatter the site reads).
 *
 * Run locally (Windows) with:  npm run package-skills
 * Commit the generated public/downloads/*.zip and content/skills/*.md.
 *
 * This is the ONLY thing that should ever produce a directory download, so the
 * scrub + leak-gate run every single time. Never hand-zip a skill into public/.
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const HOME = os.homedir();
const SKILLS_SRC = path.join(HOME, ".claude", "skills");
const COMMANDS_SRC = path.join(HOME, ".claude", "commands");
const SCRIPTS_SRC = path.join(HOME, ".claude", "scripts");
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1"), "..");
const STAGING = path.join(REPO, ".skills-staging");
const DOWNLOADS = path.join(REPO, "public", "downloads");
const CONTENT = path.join(REPO, "content", "skills");

// ---------------------------------------------------------------------------
// The seed registry. Front Desk stays paid (excluded). Second Take is the
// future premium tier (excluded). Client-only skills (-local, max-outreach)
// stay out.
// ---------------------------------------------------------------------------
const SKILLS = [
  { slug: "reel-pipeline", source: "reel-pipeline", type: "skill", category: "Content",
    requirements: ["Claude Code", "Python", "ffmpeg", "2GB first-run download"],
    tags: ["reels", "short-form", "scripts", "repurposing"] },
  { slug: "youtube-pipeline", source: "youtube-pipeline", type: "skill", category: "Content",
    requirements: ["Claude Code", "Python", "ffmpeg", "reel-pipeline installed"],
    tags: ["youtube", "long-form", "narration", "scripts"] },
  { slug: "oloye-voice", source: "oloye-voice", type: "skill", category: "Writing",
    requirements: ["Claude Code"],
    tags: ["voice", "copywriting", "hooks", "human-check"] },
  { slug: "post-pack", source: "post-pack", type: "skill", category: "Writing",
    requirements: ["Claude Code"],
    tags: ["captions", "social", "weekly-content"] },
  { slug: "screen-to-reel", source: "screen-to-reel", type: "skill", category: "Video",
    requirements: ["Claude Code", "ffmpeg"],
    tags: ["vertical-video", "captions", "reels", "shorts"] },
  { slug: "render-room", source: "render-room", type: "skill", category: "Media",
    requirements: ["Claude Code", "Python", "fal.ai key"],
    tags: ["image-gen", "video-gen", "fal", "upscale"] },
  { slug: "motion-design", source: "motion-design", type: "skill", category: "Media",
    requirements: ["Claude Code", "Higgsfield account"],
    tags: ["motion", "logo-animation", "ads"] },
  { slug: "product-ad", source: "product-ad", type: "skill", category: "Video",
    requirements: ["Claude Code", "Python", "ffmpeg", "fal.ai key"],
    tags: ["product-ads", "ugc", "cinematic", "video"] },
  { slug: "lead-magnet", source: "lead-magnet", type: "skill", category: "Writing",
    requirements: ["Claude Code", "Node"],
    tags: ["lead-magnet", "pdf", "giveaway"] },
  { slug: "clone-studio", source: "clone-studio", type: "skill", category: "Video",
    requirements: ["Claude Code", "Higgsfield or HeyGen"],
    tags: ["talking-head", "avatar", "presenter"] },
];

// ---------------------------------------------------------------------------
// Exclusion list: never copied into a staged skill.
// ---------------------------------------------------------------------------
const EXCLUDE_NAMES = new Set([
  ".env", "cookies.txt", "__pycache__", "output", "gen_err.txt",
  ".venv", "node_modules", ".DS_Store",
]);
const EXCLUDE_EXT = new Set([
  ".mp4", ".webm", ".mov", ".log", ".pyc", ".pt", ".pth", ".safetensors", ".bin",
]);
function isExcluded(fullPath) {
  const base = path.basename(fullPath);
  if (base === ".env.example") return false;
  if (EXCLUDE_NAMES.has(base)) return true;
  if (/^cookies.*\.txt$/i.test(base)) return true;
  if (EXCLUDE_EXT.has(path.extname(base).toLowerCase())) return true;
  return false;
}

// ---------------------------------------------------------------------------
// De-personalisation rules load from the gitignored scrub-rules.local.mjs
// (they contain real ids / client names, so they are NOT committed). Without
// it, the generic leak-gate below still blocks any id-shaped leak.
// ---------------------------------------------------------------------------
let GLOBAL_REPLACEMENTS = [];
let SKILL_REPLACEMENTS = {};
let EXTRA_LEAK_PATTERNS = [];
try {
  const local = await import("./scrub-rules.local.mjs");
  GLOBAL_REPLACEMENTS = local.GLOBAL_REPLACEMENTS ?? [];
  SKILL_REPLACEMENTS = local.SKILL_REPLACEMENTS ?? {};
  EXTRA_LEAK_PATTERNS = local.EXTRA_LEAK_PATTERNS ?? [];
} catch {
  console.warn("! scrub-rules.local.mjs not found — running with generic scrub only.");
}

// ---------------------------------------------------------------------------
// Leak-gate: hard-fail patterns. If any survive, the skill does not ship.
// ---------------------------------------------------------------------------
const LEAK_PATTERNS = [
  { re: /app[A-Za-z0-9]{14}/, label: "Airtable base/app id" },
  { re: /tbl[A-Za-z0-9]{14}/, label: "Airtable table id" },
  { re: /fld[A-Za-z0-9]{14}/, label: "Airtable field id" },
  ...EXTRA_LEAK_PATTERNS,
];

const TEXT_EXT = new Set([
  ".md", ".py", ".txt", ".sh", ".cjs", ".js", ".mjs", ".json",
  ".html", ".css", ".yml", ".yaml", ".example",
]);
function isTextFile(p) {
  const ext = path.extname(p).toLowerCase();
  if (TEXT_EXT.has(ext)) return true;
  return path.basename(p).toUpperCase() === "SETUP" || ext === "";
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function copyClean(src, dest) {
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (s) => !isExcluded(s),
  });
}

function depersonalise(dir, slug) {
  const replacements = [...GLOBAL_REPLACEMENTS, ...(SKILL_REPLACEMENTS[slug] || [])];
  for (const file of walk(dir)) {
    if (!isTextFile(file)) continue;
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const [re, rep] of replacements) {
      if (re.test(text)) { text = text.replace(re, rep); changed = true; }
    }
    if (changed) fs.writeFileSync(file, text);
  }
}

function leakScan(dir) {
  const hits = [];
  for (const file of walk(dir)) {
    if (!isTextFile(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const { re, label } of LEAK_PATTERNS) {
        if (re.test(line)) {
          hits.push(`${path.relative(dir, file)}:${i + 1}  [${label}]  ${line.trim().slice(0, 120)}`);
        }
      }
    });
  }
  return hits;
}

function dirSizeBytes(dir) {
  return walk(dir).reduce((n, f) => n + fs.statSync(f).size, 0);
}
function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function readSkillDescription(dir) {
  const skillMd = path.join(dir, "SKILL.md");
  if (!fs.existsSync(skillMd)) return "";
  const text = fs.readFileSync(skillMd, "utf8");
  const m = text.match(/^description:\s*(.+)$/m);
  if (m) return m[1].replace(/^["']|["']$/g, "").trim();
  return "";
}

function writeManifest(dir) {
  const files = walk(dir)
    .map((f) => path.relative(dir, f).split(path.sep).join("/"))
    .filter((f) => f !== "MANIFEST.txt")
    .sort();
  fs.writeFileSync(path.join(dir, "MANIFEST.txt"), files.join("\n") + "\n");
  return files;
}

function writeSetup(dir, slug) {
  const setup = `# ${slug} — install

This is a Claude Code skill. Code and docs only: no API keys, no cookies, no
personal data. Check MANIFEST.txt against the unzipped folder to confirm.

## Install
1. Unzip this folder.
2. Copy the "${slug}" folder into your skills directory:
   ~/.claude/skills/${slug}/
3. If it has a requirements.txt, run: pip install -r requirements.txt
4. Restart Claude Code so it picks up the new skill.

## Notes
- Any value written as YOUR_..._ID or <workspace-root> is a placeholder for you
  to set to your own. The skill runs without the optional Airtable (Brain) parts.
- Free to use. From Oloye. — https://oloye.co.uk/skills
`;
  fs.writeFileSync(path.join(dir, "SETUP.md"), setup);
}

function zipDir(srcDir, zipPath) {
  fs.rmSync(zipPath, { force: true });
  if (process.platform === "win32") {
    execFileSync("powershell", [
      "-NoProfile", "-Command",
      `Compress-Archive -Path '${srcDir}\\*' -DestinationPath '${zipPath}' -Force`,
    ], { stdio: "pipe" });
  } else {
    execFileSync("bash", ["-c", `cd '${srcDir}' && zip -qr '${zipPath}' .`], { stdio: "pipe" });
  }
}

function frontmatter(obj) {
  // Quote anything YAML would mis-parse, including date-like strings (YYYY-MM-DD),
  // which YAML would otherwise turn into a Date object.
  const esc = (s) =>
    /[:#'"\n]/.test(s) || /^\d{4}-\d{2}-\d{2}$/.test(s) ? JSON.stringify(s) : s;
  const lines = ["---"];
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      lines.push(`${k}:`);
      for (const item of v) lines.push(`  - ${esc(String(item))}`);
    } else if (v === null) {
      lines.push(`${k}: null`);
    } else if (typeof v === "boolean" || typeof v === "number") {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${esc(String(v))}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

function today() {
  // Date.* is fine in a plain node script (this is not a workflow sandbox).
  return new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
function main() {
  fs.rmSync(STAGING, { recursive: true, force: true });
  fs.mkdirSync(STAGING, { recursive: true });
  fs.mkdirSync(DOWNLOADS, { recursive: true });
  fs.mkdirSync(CONTENT, { recursive: true });

  const results = [];
  let failed = 0;

  for (const skill of SKILLS) {
    const srcDir = path.join(SKILLS_SRC, skill.source);
    if (!fs.existsSync(srcDir)) {
      console.error(`SKIP ${skill.slug}: source not found at ${srcDir}`);
      failed++;
      continue;
    }

    // staging/<slug>/<slug>/  so the zip contains a top-level named folder
    const stageRoot = path.join(STAGING, skill.slug);
    const stageSkill = path.join(stageRoot, skill.slug);
    copyClean(srcDir, stageSkill);

    // reel-pipeline also ships the /reel command + its transcribe script
    if (skill.slug === "reel-pipeline") {
      const reelCmd = path.join(COMMANDS_SRC, "reel.md");
      const transcribe = path.join(SCRIPTS_SRC, "reel_transcribe.py");
      if (fs.existsSync(reelCmd)) {
        fs.mkdirSync(path.join(stageRoot, "commands", "scripts"), { recursive: true });
        fs.copyFileSync(reelCmd, path.join(stageRoot, "commands", "reel.md"));
        if (fs.existsSync(transcribe))
          fs.copyFileSync(transcribe, path.join(stageRoot, "commands", "scripts", "reel_transcribe.py"));
      }
    }

    depersonalise(stageRoot, skill.slug);

    const hits = leakScan(stageRoot);
    if (hits.length) {
      console.error(`\nLEAK-GATE FAILED for ${skill.slug} (${hits.length} hits), NOT shipping:`);
      hits.slice(0, 20).forEach((h) => console.error("   " + h));
      failed++;
      continue;
    }

    writeSetup(stageRoot, skill.slug);
    const fileList = writeManifest(stageRoot);
    const size = humanSize(dirSizeBytes(stageRoot));
    const tagline = readSkillDescription(stageSkill);

    const zipPath = path.join(DOWNLOADS, `${skill.slug}.zip`);
    zipDir(stageRoot, zipPath);
    const zipSize = humanSize(fs.statSync(zipPath).size);

    // Preserve any hand-authored body + editorial frontmatter. The script only
    // owns the derived fields (size, fileCount, version, download) and the
    // registry fields (category, type, requirements, tags). Copy stays put.
    const contentPath = path.join(CONTENT, `${skill.slug}.md`);
    const DRAFT = "> New skill page. Replace this line with the real description.";
    let bodyOut = `${DRAFT}\n\n**${tagline}**\n`;
    let taglineOut = tagline;
    let featuredOut = false;
    let orderOut = 0;
    if (fs.existsSync(contentPath)) {
      const existing = matter(fs.readFileSync(contentPath, "utf8"));
      const body = (existing.content || "").replace(/^\s+/, "");
      if (body && !/Replace this (line|body) with the real/.test(body)) bodyOut = body;
      if (existing.data.tagline) taglineOut = existing.data.tagline;
      if (typeof existing.data.featured === "boolean") featuredOut = existing.data.featured;
      if (typeof existing.data.order === "number") orderOut = existing.data.order;
    }
    const fm = frontmatter({
      title: skill.slug,
      slug: skill.slug,
      type: skill.type,
      category: skill.category,
      tagline: taglineOut,
      requirements: skill.requirements,
      tags: skill.tags,
      version: today(),
      updated: today(),
      size: zipSize,
      fileCount: fileList.length,
      download: `/downloads/${skill.slug}.zip`,
      price: null,
      featured: featuredOut,
      order: orderOut,
    });
    fs.writeFileSync(contentPath, `${fm}\n\n${bodyOut.trimEnd()}\n`);

    results.push({ slug: skill.slug, files: fileList.length, size: zipSize });
    console.log(`OK   ${skill.slug.padEnd(18)} ${String(fileList.length).padStart(3)} files  ${zipSize}`);
  }

  fs.rmSync(STAGING, { recursive: true, force: true });

  console.log(`\n${results.length} skill(s) packaged, ${failed} failed/skipped.`);
  if (failed) process.exit(1);
}

main();
