import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";
import { fullRun, UNCLEAR } from "@/lib/claude-what-to-post";
import { SECTIONS, answersInWords, cleanAnswers } from "@/lib/tools/what-to-post";

/**
 * What to post and what to sell: the answers, then first name and email, then
 * Claude's four lists of five. The person goes to Make as form CHANNEL (the
 * website forms scenario), which saves them in Leads. Make emails the ideas
 * once that route is added (the Copywriter's email, his yes). The website
 * keeps nothing.
 *
 * Limits, so nobody can run up the bill: 3 runs a day per IP, 2 per email, a
 * bot trap, and anything sent in under 6 seconds is ignored. These live in one
 * server's memory, so they're a speed bump: the Claude workspace's monthly
 * spend limit is the real wall.
 */

const DAY = 24 * 60 * 60 * 1000;
const perEmail = new Map<string, number[]>();

function emailTooOften(email: string, max = 2): boolean {
  const now = Date.now();
  const recent = (perEmail.get(email) || []).filter((t) => now - t < DAY);
  recent.push(now);
  perEmail.set(email, recent);
  if (perEmail.size > 5000) perEmail.clear();
  return recent.length > max;
}

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "what-to-post", 3, DAY)) {
    return NextResponse.json({ error: "That's the most goes for today. Please come back tomorrow." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true, status: "unclear", message: UNCLEAR });
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < 6000) {
    return NextResponse.json({ error: "Please take a moment over the questions and try again." }, { status: 400 });
  }

  const answers = cleanAnswers(body.answers);
  if (!answers) return NextResponse.json({ error: "Please answer at least one question." }, { status: 400 });
  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  if (!name) return NextResponse.json({ error: "Please add your first name." }, { status: 400 });
  const consent = body.consent === true;
  if (emailTooOften(email)) {
    return NextResponse.json({ error: "That's the most goes for this email today. Please come back tomorrow." }, { status: 429 });
  }

  const result = await fullRun(answers);
  const ideas = result?.status === "ideas" ? result : null;

  const said = [
    !result
      ? "What to post: Claude didn't answer, no ideas shown."
      : ideas
      ? "What to post: ideas shown."
      : "What to post: answers too thin, asked them to say more.",
    ...answersInWords(answers),
    ...(ideas ? SECTIONS.map((s) => `${s.title}: ${ideas.lists[s.id].map((i) => i.title).join("; ")}`) : []),
  ].join("\n");

  const sent = await sendToMake({
    form: "CHANNEL",
    email,
    name,
    consent,
    said,
    source: "oloye.co.uk/what-to-post",
    ...(ideas ? { results: ideas.lists, care: ideas.careNote } : {}),
  });

  if (!result) {
    return NextResponse.json({ error: "Something went wrong. Try again in a minute." }, { status: 503 });
  }
  if (!ideas) return NextResponse.json({ ok: true, status: "unclear", message: UNCLEAR });
  return NextResponse.json({ ok: true, status: "ideas", lists: ideas.lists, careNote: ideas.careNote, emailed: sent === "ok" });
}
