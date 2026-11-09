import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SECTIONS, type Idea, type SectionId } from "@/lib/tools/what-to-post";
import type { Plan } from "@/lib/claude-what-to-post-plan";

/**
 * The version 2 PDF: "Your plan: what to post and what to sell". Words: the
 * Copywriter (WORDS.md section 6). Look: BRAND-DESIGN-SYSTEM.md colours, big
 * headings, short lines, lots of space. Helvetica for now (built into every
 * PDF reader); Inter can go in later as a font file. Server only.
 */

const INK = rgb(0x0e / 255, 0x0f / 255, 0x12 / 255); // Obsidian
const BODY = rgb(0x37 / 255, 0x41 / 255, 0x51 / 255); // Slate
const MUTED = rgb(0x6b / 255, 0x72 / 255, 0x80 / 255);
const LIME = rgb(0xc6 / 255, 0xf2 / 255, 0x3c / 255);
const OLIVE = rgb(0x44 / 255, 0x61 / 255, 0x00);
const LINE = rgb(0xe2 / 255, 0xe4 / 255, 0xe8 / 255);

const W = 595.28; // A4
const H = 841.89;
const M = 56;

/** Helvetica only knows Western letters: swap the usual curly marks, drop the rest. */
function safe(s: string): string {
  return s
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[—–‐‑]/g, ", ")
    .replace(/…/g, "...")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const words = safe(text).split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) > width && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildPlanPdf(name: string, picks: Record<SectionId, Idea | null>, plan: Plan): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle("Your plan: what to post and what to sell");
  doc.setAuthor("Oloye");
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;

  const newPage = () => {
    page = doc.addPage([W, H]);
    y = H - M;
  };
  const room = (h: number) => {
    if (y - h < M + 30) newPage();
  };
  const text = (t: string, font: PDFFont, size: number, color = BODY, indent = 0, gap = 4) => {
    const lines = wrap(t, font, size, W - 2 * M - indent);
    for (const l of lines) {
      room(size + gap);
      page.drawText(l, { x: M + indent, y: y - size, size, font, color });
      y -= size + gap;
    }
  };
  const space = (h: number) => {
    y -= h;
  };
  const heading = (t: string) => {
    room(60);
    space(14);
    page.drawRectangle({ x: M, y: y - 22, width: 6, height: 22, color: LIME });
    page.drawText(safe(t), { x: M + 16, y: y - 18, size: 17, font: bold, color: INK });
    y -= 30;
  };

  // Lime band and title
  page.drawRectangle({ x: 0, y: H - 10, width: W, height: 10, color: LIME });
  space(6);
  text("Your plan: what to post and what to sell", bold, 26, INK, 0, 6);
  space(4);
  text(`Made for ${name.trim() || "you"}, from your answers.`, regular, 12, MUTED);
  if (plan.whyItFits) {
    space(6);
    text(plan.whyItFits, regular, 12.5, BODY);
  }
  if (plan.careNote) {
    space(10);
    const lines = wrap(plan.careNote, regular, 11.5, W - 2 * M - 24);
    const h = lines.length * 15.5 + 16;
    room(h);
    page.drawRectangle({ x: M, y: y - h, width: W - 2 * M, height: h, color: rgb(0.957, 0.961, 0.969), borderColor: LINE, borderWidth: 1 });
    y -= 8;
    for (const l of lines) {
      page.drawText(l, { x: M + 12, y: y - 11.5, size: 11.5, font: regular, color: INK });
      y -= 15.5;
    }
    y -= 8;
  }

  for (const s of SECTIONS) {
    const pick = picks[s.id];
    // A section with no pick is left out. The 3 first posts are the one
    // exception: Claude builds them from the other picks, so they still show.
    if (!pick && !(s.id === "what_to_post" && plan.firstPosts.length)) continue;
    heading(s.title);
    if (pick) text(pick.title, bold, 13, INK, 0, 5);
    if (s.id === "what_to_post") {
      space(4);
      text("Your first 3 posts", bold, 11.5, OLIVE);
      plan.firstPosts.forEach((p, i) => {
        space(3);
        text(`${i + 1}. ${p.title}`, bold, 11.5, INK, 6);
        text(p.whatToShow, regular, 11, BODY, 20);
      });
    } else if (s.id === "who_its_for" && pick) {
      text(pick.why, regular, 11.5, BODY);
    } else if (s.id === "free_thing") {
      for (const l of plan.freeThing) text(`-  ${l}`, regular, 11.5, BODY, 6);
    } else if (s.id === "something_to_sell") {
      if (plan.sell.whatItIs) text(plan.sell.whatItIs, regular, 11.5, BODY);
      if (plan.sell.firstStep) {
        space(2);
        text(`Where to start: ${plan.sell.firstStep}`, regular, 11.5, BODY);
      }
    }
  }

  heading("Your first step");
  text("Post about your idea three times this week. See which posts people ask questions about, and make more of those.", regular, 12, BODY);
  space(14);
  text("Want help making the posts? Join the founding group, a small group building it together: oloye.co.uk/founding", regular, 11.5, INK);

  // Footer on every page
  for (const p of doc.getPages()) {
    p.drawLine({ start: { x: M, y: M - 6 }, end: { x: W - M, y: M - 6 }, thickness: 1, color: LINE });
    p.drawText("oloye.co.uk", { x: M, y: M - 24, size: 10, font: bold, color: MUTED });
  }
  return doc.save();
}
