import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";
import { CARE_LINE, SECTIONS, cleanAnswers, type Idea, type SectionId } from "@/lib/tools/what-to-post";
import { buildPicksEmail, readLists, verify } from "@/lib/tools/what-to-post-email";
import { planRun, PLAN_UNCLEAR, type Picks } from "@/lib/claude-what-to-post-plan";
import { buildPlanPdf, pdfFileName } from "@/lib/tools/what-to-post-pdf";
import { checkId, updateRow } from "@/lib/tools/what-to-post-track";

/**
 * Version 2: "Send your picks". The page sends which idea they picked in each
 * section (by number, so a pick can only be one of their own signed ideas),
 * their answers, and the signature. Claude writes a short plan from the
 * answers and picks only (never the name or email), the server turns it into
 * the PDF, and Make emails it with the picks email. One plan per set of ideas.
 */

const HOUR = 60 * 60 * 1000;
const planned = new Set<string>();

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "what-to-post-plan", 3, HOUR)) {
    return NextResponse.json({ error: "You've made a few plans already. Come back in an hour." }, { status: 429 });
  }
  const body = await readSmallJson(req, 40_000);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = cleanEmail(body.email);
  const name = cleanText(body.name, 80);
  const lists = readLists(body.lists);
  const careNote = body.careNote === CARE_LINE ? CARE_LINE : "";
  const token = typeof body.token === "string" ? body.token : "";
  const answers = cleanAnswers(body.answers);
  if (!email || !name || !lists || !answers || !verify(email, name, lists, careNote, token)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (planned.has(token)) return NextResponse.json({ ok: true, already: true });

  // Picks arrive as positions in their own lists, never as text.
  const raw = (body.picks || {}) as Record<string, unknown>;
  const picks = {} as Picks;
  for (const s of SECTIONS) {
    const i = raw[s.id];
    const idea = typeof i === "number" && Number.isInteger(i) && i >= 0 && i < lists[s.id].length ? lists[s.id][i] : null;
    // Strip anything that looks like our tags, so nobody can close a tag early.
    picks[s.id] = idea ? { title: idea.title.replace(/[<>]/g, ""), why: idea.why.replace(/[<>]/g, "") } : null;
  }
  if (!SECTIONS.some((s) => picks[s.id])) return NextResponse.json({ ok: true, status: "unclear", message: PLAN_UNCLEAR });

  planned.add(token);
  if (planned.size > 5000) planned.clear();
  const result = await planRun(answers, picks);
  if (!result) {
    planned.delete(token);
    return NextResponse.json({ error: "We couldn't make your plan just now. Press it again." }, { status: 503 });
  }
  if (result.status === "unclear") {
    planned.delete(token);
    return NextResponse.json({ ok: true, status: "unclear", message: PLAN_UNCLEAR });
  }

  const pdf = await buildPlanPdf(name, picks, result.plan);
  const { subject, html } = buildPicksEmail(name, result.plan);
  const picked = SECTIONS.filter((s) => picks[s.id]).map((s) => `${s.title}: ${(picks[s.id] as Idea).title}`);

  // The counting row gets the picked ideas as text. Never the person.
  const track = body.track as { id?: unknown; sig?: unknown } | undefined;
  if (track && checkId(track.id, track.sig)) await updateRow(track.id as string, { "Picked ideas": picked.join("\n") });

  const sent = await sendToMake({
    form: "CHANNEL",
    email,
    name,
    consent: false, // never changes their email choice
    said: `What to post: picks email with the plan PDF (${picked.length} picks).`,
    source: "oloye.co.uk/what-to-post",
    subject,
    html,
    pdf: Buffer.from(pdf).toString("base64"),
    pdfName: pdfFileName(name),
  });
  if (sent !== "ok") {
    planned.delete(token);
    return NextResponse.json({ error: "We couldn't make your plan just now. Press it again." }, { status: 502 });
  }
  // The PDF comes back too, for the download button on the page.
  return NextResponse.json({
    ok: true,
    status: "sent",
    picks: Object.keys(picks).filter((k) => picks[k as SectionId]),
    pdf: Buffer.from(pdf).toString("base64"),
    pdfName: pdfFileName(name),
  });
}
