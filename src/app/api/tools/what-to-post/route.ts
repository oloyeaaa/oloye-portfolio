import { NextResponse } from "next/server";
import { fromOurSite, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";
import { fullRun, UNCLEAR } from "@/lib/claude-what-to-post";
import { cleanAnswers } from "@/lib/tools/what-to-post";

/**
 * What to post and what to sell: the answers, then first name and email, then
 * one Claude call for four lists of 10 (the page shows 5, then 5 more). The
 * person goes to Make as form CHANNEL (the website forms scenario), which saves
 * them in Leads. Their answers are never saved: the Leads note only says the
 * ideas were shown. The ideas go to Make for the results email, once that
 * route is added on Oloye's yes.
 *
 * Limits, so nobody can run up the bill (Product Lead's hand-over, raised by
 * the Director 9 Nov so "Add a bit more" works): 2 runs an hour per IP, 3 a
 * day per email, a bot trap, and anything sent in under 6
 * seconds is ignored. These live in one server's memory, so they're a speed
 * bump: the Claude workspace's monthly spend cap is the real wall.
 *
 * Live nights: set WHAT_TO_POST_LIMIT_OFF_UNTIL in Vercel to a date and time
 * (e.g. 2026-11-12T22:30:00Z) and redeploy, so Oloye's demo phone isn't blocked.
 * It's a server setting, never in the page, and it switches itself off.
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
// A run counts from the moment it starts (so firing several at once doesn't
// get round it), and is handed back if Claude fails, so they can try again.
const used = new Map<string, number[]>();

function usedUp(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  return (used.get(key) || []).filter((t) => now - t < windowMs).length >= max;
}

function markUsed(now: number, ...keys: string[]) {
  for (const key of keys) used.set(key, [...(used.get(key) || []).filter((t) => Date.now() - t < DAY), now]);
  if (used.size > 10000) used.clear();
}

function handBack(now: number, ...keys: string[]) {
  for (const key of keys) used.set(key, (used.get(key) || []).filter((t) => t !== now));
}

function ipOf(req: Request): string {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

function limitsOff(): boolean {
  const until = Date.parse(process.env.WHAT_TO_POST_LIMIT_OFF_UNTIL || "");
  return Number.isFinite(until) && Date.now() < until;
}

const TOO_MANY = "You've had lots of ideas already. Come back in an hour.";

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const open = limitsOff();
  const ipKey = `ip:${ipOf(req)}`;
  if (!open && usedUp(ipKey, 2, HOUR)) {
    return NextResponse.json({ error: TOO_MANY }, { status: 429 });
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
  const emailKey = `email:${email}`;
  if (!open && usedUp(emailKey, 3, DAY)) return NextResponse.json({ error: TOO_MANY }, { status: 429 });

  const stamp = Date.now();
  markUsed(stamp, ipKey, emailKey);
  const result = await fullRun(answers);
  const ideas = result?.status === "ideas" ? result : null;
  // No ideas (Claude failed, or answers too thin): the go doesn't count.
  if (!ideas) handBack(stamp, ipKey, emailKey);

  const sent = await sendToMake({
    form: "CHANNEL",
    email,
    name,
    consent,
    said: !result
      ? "What to post: Claude didn't answer, no ideas shown."
      : ideas
      ? "What to post: ideas shown."
      : "What to post: answers too thin, asked them to add a bit more.",
    source: "oloye.co.uk/what-to-post",
    ...(ideas ? { results: ideas.lists, care: ideas.careNote } : {}),
  });

  if (!result) return NextResponse.json({ error: "Something went wrong. Try again in a minute." }, { status: 503 });
  if (!ideas) return NextResponse.json({ ok: true, status: "unclear", message: UNCLEAR });
  return NextResponse.json({ ok: true, status: "ideas", lists: ideas.lists, careNote: ideas.careNote, emailed: sent === "ok" });
}
