import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";
import { findChannel } from "@/lib/claude-channel";
import { SECTIONS, answersInWords, cleanAnswers } from "@/lib/tools/find-channel";

/**
 * Find your channel: the answers, then first name and email, then Claude's four
 * lists of five. The person goes to Make as form CHANNEL (the website forms
 * scenario), which saves them in Leads. Make emails the results once that
 * route is added. The website keeps nothing.
 *
 * Limits, so nobody can run up the bill: 3 runs a day per IP, 2 per email, a
 * bot trap, and anything sent in under 6 seconds is ignored. The Claude
 * workspace's own spend limit is the real wall behind these.
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
  if (tooMany(req, "find-channel", 3, DAY)) {
    return NextResponse.json({ error: "That's the most goes for today. Please come back tomorrow." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < 6000) {
    return NextResponse.json({ error: "Please take a moment over the questions and try again." }, { status: 400 });
  }

  const answers = cleanAnswers(body.answers);
  if (!answers) return NextResponse.json({ error: "Please answer every question." }, { status: 400 });
  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  if (!name) return NextResponse.json({ error: "Please add your first name." }, { status: 400 });
  const consent = body.consent === true;
  if (emailTooOften(email)) {
    return NextResponse.json({ error: "That's the most goes for this email today. Please come back tomorrow." }, { status: 429 });
  }

  const words = answersInWords(answers);
  const results = await findChannel(words);

  const said = [
    results ? "Find your channel: results shown." : "Find your channel: Claude didn't answer, no results shown.",
    ...words.map((w) => `${w.question} ${w.answer}`),
    ...(results
      ? SECTIONS.map((s) => `${s.eyebrow}: ${results[s.id].map((i) => i.title).join("; ")}`)
      : []),
  ].join("\n");

  const sent = await sendToMake({
    form: "CHANNEL",
    email,
    name,
    consent,
    said,
    source: "oloye.co.uk/find-your-channel",
    ...(results ? { results } : {}),
  });

  if (!results) {
    return NextResponse.json(
      { error: "Sorry, the ideas didn't come through just now. Please try again in a minute.", saved: sent === "ok" },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, results, emailed: sent === "ok" });
}
