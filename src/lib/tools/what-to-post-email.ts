import { createHmac, timingSafeEqual } from "node:crypto";
import { SECTIONS, type Idea, type Lists, type SectionId } from "@/lib/tools/what-to-post";
import type { Plan } from "@/lib/claude-what-to-post-plan";
import { firstStepText } from "@/lib/tools/what-to-post-pdf";

/**
 * The "What to post" results email (WORDS.md section 4, the Copywriter).
 *
 * It lists every idea the person saw, including any "5 more", so it goes when
 * they leave the results or after 10 minutes, whichever comes first. Nothing is
 * stored in between: the page keeps the ideas, and sends them back with a
 * signature the server made when Claude wrote them. Without a matching
 * signature nothing is sent, so nobody can use our email to send their own
 * words. Server only.
 */

function key(): string | null {
  const secret = process.env.MAKE_FORMS_SECRET;
  return secret ? `what-to-post-email:${secret}` : null;
}

function digest(email: string, name: string, lists: Lists, careNote: string): string | null {
  const k = key();
  if (!k) return null;
  const body = JSON.stringify({ email, name, careNote, lists: SECTIONS.map((s) => lists[s.id]) });
  return createHmac("sha256", k).update(body).digest("base64url");
}

/** The signature the page sends back with the ideas. */
export function sign(email: string, name: string, lists: Lists, careNote: string): string {
  return digest(email, name, lists, careNote) || "";
}

export function verify(email: string, name: string, lists: Lists, careNote: string, token: string): boolean {
  const want = digest(email, name, lists, careNote);
  if (!want || typeof token !== "string" || token.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(want), Buffer.from(token));
}

/** Reads the ideas the page sends back, in the exact shape the server gave it. */
export function readLists(raw: unknown): Lists | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out = {} as Lists;
  for (const s of SECTIONS) {
    const list = (raw as Record<string, unknown>)[s.id];
    if (!Array.isArray(list) || list.length > 10) return null;
    const ideas: Idea[] = [];
    for (const i of list) {
      if (!i || typeof i.title !== "string" || typeof i.why !== "string") return null;
      ideas.push({ title: i.title, why: i.why });
    }
    out[s.id] = ideas;
  }
  return out;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const P = 'style="margin:0 0 14px"';

/** Subject and HTML body, in the Copywriter's words, with every idea they saw. */
export function buildEmail(
  name: string,
  lists: Lists,
  careNote: string,
  seen: Partial<Record<SectionId, boolean>>,
): { subject: string; html: string; count: number } {
  let count = 0;
  const sections = SECTIONS.map((s) => {
    const ideas = seen[s.id] ? lists[s.id] : lists[s.id].slice(0, 5);
    count += ideas.length;
    const items = ideas
      .map((i) => `<li style="margin:0 0 8px"><strong>${esc(i.title)}</strong><br>${esc(i.why)}</li>`)
      .join("");
    return `<p style="margin:18px 0 8px;font-weight:bold">${esc(s.title)}:</p><ol style="margin:0 0 14px;padding-left:22px">${items}</ol>`;
  }).join("");

  const first = name.trim() || "there";
  const html = [
    '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;max-width:600px">',
    '<span style="display:none;max-height:0;overflow:hidden;opacity:0">The ideas from your answers, all in one place.</span>',
    `<p ${P}>Hi ${esc(first)},</p>`,
    `<p ${P}>Here are the ideas from your answers.</p>`,
    careNote ? `<p ${P}>${esc(careNote)}</p>` : "",
    sections,
    `<p ${P}>They're ideas to try, not answers. Posting gets people's attention. A free thing and something to sell give that attention somewhere to go. Pick the idea that feels most like you, post about it three times this week, and see which one people ask questions about.</p>`,
    `<p ${P}>If you want help making the posts, there's a founding group. It's a small group, building it together: what you already know, made into videos with a content machine built with Claude. No price or dates yet. The list hears first.</p>`,
    `<p ${P}>Join the founding group: <a href="https://www.oloye.co.uk/founding">oloye.co.uk/founding</a></p>`,
    `<p ${P}>Oloye</p>`,
    "</div>",
  ].join("");

  const subject = name.trim()
    ? `${name.trim()}, your ideas for what to post and what to sell`
    : "Your ideas for what to post and what to sell";
  return { subject, html, count };
}

/**
 * Version 2: the picks email (WORDS.md section 6, 7a460e3, laid out for
 * phones). The picks (without v1's format words), the first 3 posts and the
 * first step are in the body; the PDF is attached. A section with no pick is
 * left out.
 */
export function buildPicksEmail(name: string, plan: Plan): { subject: string; html: string } {
  const first = name.trim() || "there";
  const picks = SECTIONS.filter((s) => plan.pickTitles[s.id])
    .map((s) => `${esc(s.title)}: <strong>${esc(plan.pickTitles[s.id])}</strong>`)
    .join("<br>");
  const posts = plan.firstPosts.map((p, i) => `${i + 1}. ${esc(p.title)}`).join("<br>");
  const step = firstStepText(plan);
  const html = [
    '<div style="font-family:Inter,Arial,sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:600px">',
    '<span style="display:none;max-height:0;overflow:hidden;opacity:0">The ideas you picked, and a PDF to keep.</span>',
    `<p ${P}>Hi ${esc(first)},</p>`,
    `<p ${P}>Here are the ideas you picked.</p>`,
    picks ? `<p ${P}>${picks}</p>` : "",
    `<p ${P}><strong>Your first 3 posts:</strong><br>${posts}</p>`,
    step ? `<p ${P}><strong>Your first step:</strong> ${esc(step)}</p>` : "",
    `<p ${P}>The PDF has all of this, to keep or print.</p>`,
    `<p ${P}>Hit reply and say which idea you're going with.</p>`,
    `<p ${P}>If you want help making the posts, there's a founding group. It's a small group, building it together: what you already know, made into videos with a content machine built with Claude. No price or dates yet. The list hears first.</p>`,
    `<p ${P}>Join the founding group: <a href="https://www.oloye.co.uk/founding">oloye.co.uk/founding</a></p>`,
    `<p ${P}>Oloye</p>`,
    "</div>",
  ].join("");
  const subject = name.trim()
    ? `${name.trim()}, your picks: what to post and what to sell`
    : "Your picks: what to post and what to sell";
  return { subject, html };
}
