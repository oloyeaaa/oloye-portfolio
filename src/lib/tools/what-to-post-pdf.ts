import { readFileSync } from "node:fs";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, pushGraphicsState, popGraphicsState, rgb, setCharacterSpacing, type PDFFont, type PDFPage } from "pdf-lib";
import { SECTIONS, type Idea, type SectionId } from "@/lib/tools/what-to-post";
import type { Plan } from "@/lib/claude-what-to-post-plan";

/**
 * The version 2 PDF: "Your plan: what to post and what to sell".
 * Words: the Copywriter (WORDS.md section 6). Look: the brand rules in the
 * Product Lead's hand-over (product-team/BRAND.md):
 * - Inter (headings bold, -0.02em; body 400/500), JetBrains Mono for small labels
 * - Obsidian headings, Slate body, Muted small print, light borders, rounded boxes
 * - Lime once, on the one thing to look at: the "Your first step" box, with olive text
 * - the care note on a Chip-grey box, never red
 * Fonts are the OFL files in src/assets/pdf-fonts. Server only.
 */

const hex = (h: string) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const INK = hex("#0E0F12");
const BODY = hex("#374151");
const MUTED = hex("#6B7280");
const LIME = hex("#C6F23C");
const OLIVE = hex("#446100");
const BORDER = hex("#E2E4E8");
const CHIP = hex("#E9EBEF");
const WHITE = hex("#FFFFFF");

const W = 595.28; // A4
const H = 841.89;
const M = 44;
const INNER = W - 2 * M;

const FONT_DIR = path.join(process.cwd(), "src/assets/pdf-fonts");
const font = (name: string) => readFileSync(path.join(FONT_DIR, `${name}.woff`));

/** The fonts carry Western letters: swap the usual curly marks, drop anything they can't draw. */
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

function wrap(text: string, f: PDFFont, size: number, width: number): string[] {
  const words = safe(text).split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (f.widthOfTextAtSize(test, size) > width && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/** A rounded box (pdf-lib has no corner radius, so it's drawn as a path). */
function box(page: PDFPage, x: number, top: number, w: number, h: number, r: number, fill: ReturnType<typeof rgb>, border?: ReturnType<typeof rgb>) {
  const d = `M ${r} 0 H ${w - r} Q ${w} 0 ${w} ${r} V ${h - r} Q ${w} ${h} ${w - r} ${h} H ${r} Q 0 ${h} 0 ${h - r} V ${r} Q 0 0 ${r} 0 Z`;
  // drawSvgPath puts (0,0) at the top left and y grows downwards.
  page.drawSvgPath(d, { x, y: top, color: fill, borderColor: border, borderWidth: border ? 1 : 0 });
}

export async function buildPlanPdf(name: string, picks: Record<SectionId, Idea | null>, plan: Plan): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle("Your plan: what to post and what to sell");
  doc.setAuthor("Oloye");
  const regular = await doc.embedFont(font("inter-latin-400-normal"), { subset: true });
  const medium = await doc.embedFont(font("inter-latin-500-normal"), { subset: true });
  const bold = await doc.embedFont(font("inter-latin-700-normal"), { subset: true });
  const heavy = await doc.embedFont(font("inter-latin-800-normal"), { subset: true });
  const mono = await doc.embedFont(font("jetbrains-mono-latin-500-normal"), { subset: true });

  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  // While measuring a card, nothing is drawn and no page is added.
  let dry = false;
  // Words inside a card sit this far in from the card's edge.
  let inset = 0;
  const room = (h: number) => {
    if (!dry && y - h < M + 20) {
      page = doc.addPage([W, H]);
      y = H - M;
    }
  };

  /** Writes wrapped lines. Headings get the brand's -0.02em letter spacing. */
  const text = (t: string, f: PDFFont, size: number, color = BODY, opts: { indent?: number; lead?: number; tight?: boolean; width?: number } = {}) => {
    const indent = opts.indent || 0;
    const lead = opts.lead ?? size * 0.55;
    const lines = wrap(t, f, size, (opts.width || INNER) - indent - 2 * inset);
    for (const l of lines) {
      room(size + lead);
      if (!dry) {
        if (opts.tight) page.pushOperators(pushGraphicsState(), setCharacterSpacing(-0.02 * size));
        page.drawText(l, { x: M + inset + indent, y: y - size, size, font: f, color });
        if (opts.tight) page.pushOperators(popGraphicsState());
      }
      y -= size + lead;
    }
  };
  const label = (t: string, color = MUTED) => text(t.toUpperCase(), mono, 8.5, color, { lead: 6 });

  // Title
  label("oloye.co.uk  /  what to post and what to sell");
  y -= 8;
  text("Your plan: what to post and what to sell", heavy, 24, INK, { tight: true, lead: 5 });
  y -= 2;
  text(`Made for ${name.trim() || "you"}, from your answers.`, medium, 12, MUTED);
  if (plan.whyItFits) {
    y -= 2;
    text(plan.whyItFits, regular, 12, BODY, { lead: 6 });
  }

  // Care note: Obsidian text on a Chip-grey box, never red.
  if (plan.careNote) {
    y -= 6;
    const lines = wrap(plan.careNote, medium, 11.5, INNER - 32);
    const h = lines.length * 17 + 24;
    room(h);
    box(page, M, y, INNER, h, 12, CHIP);
    let ty = y - 12;
    for (const l of lines) {
      page.drawText(l, { x: M + 16, y: ty - 11.5, size: 11.5, font: medium, color: INK });
      ty -= 17;
    }
    y -= h;
  }

  // The four parts, each in a light card. A part with no pick is left out;
  // the 3 first posts still show, as Claude builds them from the other picks.
  let n = 0;
  for (const s of SECTIONS) {
    const pick = picks[s.id];
    if (!pick && !(s.id === "what_to_post" && plan.firstPosts.length)) continue;
    n++;
    const pad = 12;
    const draw = () => {
      label(`0${n}  ${s.title}`, MUTED);
      y -= 1;
      if (pick) text(pick.title, bold, 13.5, INK, { tight: true, lead: 6 });
      if (s.id === "what_to_post") {
        y -= 3;
        label("Your first 3 posts", MUTED);
        plan.firstPosts.forEach((p, i) => {
          text(`${i + 1}.  ${p.title}`, bold, 11, INK, { lead: 3 });
          text(p.whatToShow, regular, 10.5, BODY, { indent: 16, lead: 4 });
        });
      } else if (s.id === "who_its_for" && pick) {
        text(pick.why, regular, 11, BODY, { lead: 6 });
      } else if (s.id === "free_thing") {
        for (const l of plan.freeThing) text(`-  ${l}`, regular, 11, BODY, { lead: 4 });
      } else if (s.id === "something_to_sell") {
        if (plan.sell.whatItIs) text(plan.sell.whatItIs, regular, 11, BODY, { lead: 6 });
        if (plan.sell.firstStep) text(`Where to start: ${plan.sell.firstStep}`, medium, 11, INK, { lead: 6 });
      }
    };
    // Measure first, so the card fits whole on a page, then draw the card and its words.
    y -= 5;
    inset = pad;
    dry = true;
    const top = y;
    draw();
    const h = top - y + 2 * pad - 4;
    dry = false;
    y = top;
    room(h);
    box(page, M, y, INNER, h, 14, WHITE, BORDER);
    y -= pad;
    draw();
    y -= pad - 4;
    inset = 0;
  }

  // The one lime thing on the page: "Your first step", olive text.
  y -= 10;
  const stepLines = wrap(
    "Post about your idea three times this week. See which posts people ask questions about, and make more of those.",
    medium,
    12,
    INNER - 32,
  );
  const stepH = 20 + 18 + stepLines.length * 17 + 6;
  room(stepH);
  box(page, M, y, INNER, stepH, 14, LIME);
  let sy = y - 12;
  page.pushOperators(pushGraphicsState(), setCharacterSpacing(-0.02 * 16));
  page.drawText("Your first step", { x: M + 16, y: sy - 16, size: 16, font: heavy, color: OLIVE });
  page.pushOperators(popGraphicsState());
  sy -= 26;
  for (const l of stepLines) {
    page.drawText(l, { x: M + 16, y: sy - 12, size: 12, font: medium, color: OLIVE });
    sy -= 17;
  }
  y -= stepH;

  y -= 10;
  text("Want help making the posts? Join the founding group, a small group building it together: oloye.co.uk/founding", medium, 11.5, INK, { lead: 7 });

  // Footer on every page
  for (const p of doc.getPages()) {
    p.drawLine({ start: { x: M, y: M - 4 }, end: { x: W - M, y: M - 4 }, thickness: 1, color: BORDER });
    p.drawText("OLOYE.CO.UK", { x: M, y: M - 20, size: 8.5, font: mono, color: MUTED });
  }
  return doc.save();
}
