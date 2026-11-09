import { readFileSync } from "node:fs";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import {
  PDFDocument,
  PDFString,
  popGraphicsState,
  pushGraphicsState,
  rgb,
  setCharacterSpacing,
  type PDFFont,
  type PDFPage,
  type RGB,
} from "pdf-lib";
import type { Idea, SectionId } from "@/lib/tools/what-to-post";
import type { Plan } from "@/lib/claude-what-to-post-plan";

/**
 * The version 2 PDF: their plan, made for their picks.
 *
 * Layout from the UI review (Projects/live-find-your-channel/ui-review-v2-pdf.md),
 * brand from product-team/BRAND.md, words from the Copywriter (WORDS.md 6)
 * and the review:
 * - A4, 44pt margins, phone-sized type (body 14, headings 20, title 30), line gap 1.45
 * - order: why it fits, first 3 posts, who you're talking to, free thing,
 *   thing to sell, first step; a blank part leaves no heading and no gap
 * - lime once, on the first step box; the care note on chip grey, never red
 * - Inter and JetBrains Mono embedded (src/assets/pdf-fonts, OFL), subset so
 *   every reader shows them; any letter the fonts can't draw is swapped, never fatal
 * - a second page when needed, never a heading alone at the foot of a page
 * Server only.
 */

const hex = (h: string) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const INK = hex("#0E0F12");
const SLATE = hex("#374151");
const MUTED = hex("#6B7280");
const LIME = hex("#C6F23C");
const OLIVE = hex("#446100");
const LINE = hex("#E2E4E8");
const CHIP = hex("#E9EBEF");
const CHIP_BORDER = hex("#CBD0D8");
const SKY = hex("#0284C7");

const W = 595.28; // A4
const H = 841.89;
const M = 44;
const COL = W - 2 * M;
const FOOT = 40; // space kept for the footer
const GAP = 1.45; // line height

const FOUNDING_URL = "https://oloye.co.uk/founding";
const FONT_DIR = path.join(process.cwd(), "src/assets/pdf-fonts");
const fontFile = (name: string) => readFileSync(path.join(FONT_DIR, `${name}.woff`));

/** The date as DD/MM/YYYY, UK time. */
export function ukDate(d = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}

/** First name as typed, first letter a capital, at most 24 characters. */
export function firstName(name: string): string {
  const n = name.trim().split(/\s+/)[0] || "";
  return n ? (n.charAt(0).toUpperCase() + n.slice(1)).slice(0, 24) : "";
}

/**
 * The one step: their sell pick's first step, or, without one, built from
 * their own first post (the UI review, must-fix 4). Shared with the email.
 */
export function firstStepText(plan: Plan): string {
  if (plan.sell.firstStep) return plan.sell.firstStep;
  const post = plan.firstPosts[0]?.title;
  return post ? `Post "${post}" this week. Then see which post people ask about, and make more like it.` : "";
}

/** File name for the attachment and the download: "{first-name}-plan-oloye.pdf". */
export function pdfFileName(name: string): string {
  const slug = firstName(name)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "your"}-plan-oloye.pdf`;
}

export async function buildPlanPdf(name: string, picks: Record<SectionId, Idea | null>, plan: Plan): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const first = firstName(name);
  const title = first ? `${first}'s plan` : "Your plan";
  doc.setTitle(title);
  doc.setAuthor("Oloye");
  doc.setLanguage("en-GB");

  const regular = await doc.embedFont(fontFile("inter-latin-400-normal"), { subset: true });
  const medium = await doc.embedFont(fontFile("inter-latin-500-normal"), { subset: true });
  const bold = await doc.embedFont(fontFile("inter-latin-700-normal"), { subset: true });
  const heavy = await doc.embedFont(fontFile("inter-latin-800-normal"), { subset: true });
  const mono = await doc.embedFont(fontFile("jetbrains-mono-latin-500-normal"), { subset: true });

  // Letters the fonts can draw. Anything else becomes its plain letter (Ł to L), or goes.
  const known = new Set(regular.getCharacterSet());
  const extra: Record<string, string> = { Ł: "L", ł: "l", Ø: "O", ø: "o", Đ: "D", đ: "d", ß: "ss" };
  const safe = (s: string): string =>
    Array.from(s.replace(/\s*[—–]\s*/g, ", ").replace(/\s+/g, " ").trim())
      .map((ch) => {
        if (known.has(ch.codePointAt(0)!)) return ch;
        const plain = ch.normalize("NFD").replace(/[̀-ͯ]/g, "");
        if (plain && Array.from(plain).every((c) => known.has(c.codePointAt(0)!))) return plain;
        return extra[ch] ?? "";
      })
      .join("");

  const wrap = (text: string, f: PDFFont, size: number, width: number): string[] => {
    const out: string[] = [];
    let line = "";
    for (const word of safe(text).split(" ")) {
      // A word longer than the line is broken by letters, so nothing runs off the page.
      let w = word;
      while (f.widthOfTextAtSize(w, size) > width) {
        let cut = w.length - 1;
        while (cut > 1 && f.widthOfTextAtSize(w.slice(0, cut), size) > width) cut--;
        if (line) {
          out.push(line);
          line = "";
        }
        out.push(w.slice(0, cut));
        w = w.slice(cut);
      }
      const test = line ? `${line} ${w}` : w;
      if (line && f.widthOfTextAtSize(test, size) > width) {
        out.push(line);
        line = w;
      } else line = test;
    }
    if (line) out.push(line);
    return out;
  };

  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  const newPage = () => {
    page = doc.addPage([W, H]);
    y = H - M;
  };
  const left = () => y - (M + FOOT);
  const lineH = (size: number) => size * GAP;

  type Style = { font: PDFFont; size: number; color: RGB; x?: number; width?: number; tight?: boolean };
  const lines = (text: string, s: Style) => wrap(text, s.font, s.size, s.width ?? COL - (s.x ?? 0));
  const heightOf = (text: string, s: Style) => lines(text, s).length * lineH(s.size);

  /** Writes a paragraph, moving to a new page between lines when needed. */
  const para = (text: string, s: Style) => {
    for (const l of lines(text, s)) {
      if (left() < lineH(s.size)) newPage();
      if (s.tight) page.pushOperators(pushGraphicsState(), setCharacterSpacing(-0.02 * s.size));
      page.drawText(l, { x: M + (s.x ?? 0), y: y - s.size, size: s.size, font: s.font, color: s.color });
      if (s.tight) page.pushOperators(popGraphicsState());
      y -= lineH(s.size);
    }
  };

  /** A rounded box: (x, top) is the top-left corner. */
  const box = (x: number, top: number, w: number, h: number, fill: RGB, border: RGB) => {
    const r = 12;
    const d = `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`;
    page.drawSvgPath(d, { x, y: top, color: fill, borderColor: border, borderWidth: 1 });
  };

  const BODY: Style = { font: regular, size: 14, color: SLATE };
  const HEAD: Style = { font: bold, size: 20, color: INK, tight: true };
  const ITEM: Style = { font: bold, size: 15, color: INK };
  const SMALL: Style = { font: regular, size: 13, color: SLATE };

  /**
   * A section: a light rule, the heading, then its content. The heading never
   * sits alone at the foot of a page: it moves over with its first 2 lines.
   */
  const section = (heading: string, firstLines: number, body: () => void) => {
    const need = 22 + lineH(HEAD.size) + 4 + firstLines;
    if (left() < need) newPage();
    else {
      y -= 8;
      page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1, color: LINE });
      y -= 14;
    }
    para(heading, HEAD);
    y -= 2;
    body();
  };

  // ---- Title and subtitle
  para(title, { font: heavy, size: 30, color: INK, tight: true });
  const parts = plan.sell.whatItIs ? "What to post and what to sell" : "What to post";
  para(`${parts}, made from your answers on ${ukDate()}.`, { font: regular, size: 13, color: MUTED });
  y -= 8;

  // ---- Care note: Obsidian on chip grey, never red.
  if (plan.careNote) {
    const s: Style = { font: medium, size: 14, color: INK, x: 14, width: COL - 28 };
    const pad = 14;
    const h = heightOf(plan.careNote, s) - (lineH(14) - 14) + 2 * pad;
    if (left() < h) newPage();
    box(M, y, COL, h, CHIP, CHIP_BORDER);
    y -= pad;
    para(plan.careNote, s);
    y -= pad - (lineH(14) - 14);
    y -= 4;
  }

  // ---- 1. Why this fits you
  if (plan.whyItFits) {
    section("Why this fits you", heightOf(plan.whyItFits, BODY), () => para(plan.whyItFits, BODY));
  }

  // ---- 2. Your first 3 posts (shown even when "what to post" was blank)
  const about = plan.pickTitles.what_to_post ? `About: ${plan.pickTitles.what_to_post}` : "";
  section("Your first 3 posts", (about ? heightOf(about, BODY) : 0) + lineH(15) + lineH(13), () => {
    if (about) {
      para(about, BODY);
      y -= 4;
    }
    plan.firstPosts.forEach((p, i) => {
      if (left() < lineH(15) + lineH(13)) newPage();
      // The number hangs on the left, so a wrapped title lines up under itself.
      page.drawText(`${i + 1}.`, { x: M, y: y - 15, size: 15, font: bold, color: INK });
      para(p.title, { ...ITEM, x: 22 });
      para(p.whatToShow, { ...SMALL, x: 22 });
      y -= 6;
    });
  });

  // ---- 3. Who you're talking to (one line: the pick's title only)
  if (plan.pickTitles.who_its_for) {
    section("Who you're talking to", heightOf(plan.pickTitles.who_its_for, BODY), () => para(plan.pickTitles.who_its_for, BODY));
  }

  // ---- 4. Your free thing
  if (picks.free_thing && (plan.pickTitles.free_thing || plan.freeThing.length)) {
    section("Your free thing", lineH(15) + lineH(14), () => {
      if (plan.pickTitles.free_thing) para(plan.pickTitles.free_thing, ITEM);
      y -= 2;
      for (const l of plan.freeThing) {
        if (left() < lineH(14)) newPage();
        // A real bullet, with a hanging indent so wrapped lines line up with the text.
        page.drawCircle({ x: M + 5, y: y - 14 * 0.62, size: 2.2, color: INK });
        para(l, { ...BODY, x: 16 });
      }
    });
  }

  // ---- 5. Your thing to sell
  if (picks.something_to_sell && plan.sell.whatItIs) {
    const pick = plan.pickTitles.something_to_sell;
    section("Your thing to sell", (pick ? lineH(15) : 0) + heightOf(plan.sell.whatItIs, BODY), () => {
      if (pick) para(pick, ITEM);
      para(plan.sell.whatItIs, BODY);
    });
  }

  // ---- 6. Your first step: the one lime thing on the page
  const step = firstStepText(plan);
  if (step) {
    const s: Style = { font: bold, size: 15, color: INK, x: 16, width: COL - 32 };
    const pad = 16;
    const h = pad + lineH(11) + 2 + heightOf(step, s) - (lineH(15) - 15) + pad;
    y -= 20;
    if (left() < h) newPage();
    box(M, y, COL, h, LIME, OLIVE);
    y -= pad;
    page.drawText("YOUR FIRST STEP", { x: M + 16, y: y - 11, size: 11, font: mono, color: OLIVE });
    y -= lineH(11) + 2;
    para(step, s);
    y -= pad - (lineH(15) - 15);
  }

  // ---- The founding group line, with a link you can tap
  {
    y -= 20;
    const lead = "Want help making the posts? Join the founding group, a small group building it together: ";
    const link = "oloye.co.uk/founding";
    const ls = lines(lead + link, { font: medium, size: 14, color: INK });
    if (left() < ls.length * lineH(14)) newPage();
    for (const l of ls) {
      const at = l.indexOf(link);
      const baseY = y - 14;
      if (at === -1) {
        page.drawText(l, { x: M, y: baseY, size: 14, font: medium, color: INK });
      } else {
        const before = l.slice(0, at);
        const bx = M + medium.widthOfTextAtSize(before, 14);
        const lw = medium.widthOfTextAtSize(link, 14);
        if (before) page.drawText(before, { x: M, y: baseY, size: 14, font: medium, color: INK });
        page.drawText(link, { x: bx, y: baseY, size: 14, font: medium, color: SKY });
        page.drawLine({ start: { x: bx, y: baseY - 2.5 }, end: { x: bx + lw, y: baseY - 2.5 }, thickness: 0.8, color: SKY });
        const annot = doc.context.register(
          doc.context.obj({
            Type: "Annot",
            Subtype: "Link",
            Rect: [bx, baseY - 5, bx + lw, baseY + 15],
            Border: [0, 0, 0],
            A: { Type: "Action", S: "URI", URI: PDFString.of(FOUNDING_URL) },
          }),
        );
        page.node.addAnnot(annot);
      }
      y -= lineH(14);
    }
  }

  // ---- Footer on every page: "oloye.co.uk · DD/MM/YYYY · Page 1 of 2"
  const pages = doc.getPages();
  pages.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: M + 14 }, end: { x: W - M, y: M + 14 }, thickness: 1, color: LINE });
    p.drawText(`oloye.co.uk  ·  ${ukDate()}  ·  Page ${i + 1} of ${pages.length}`, { x: M, y: M - 2, size: 11, font: regular, color: MUTED });
  });
  return doc.save();
}
