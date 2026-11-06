import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToolToMake } from "@/lib/leads";
import { wordLeaks } from "@/lib/claude";
import {
  BUSINESS_TYPES,
  GUIDES,
  answersInWords,
  cleanAnswers,
  pickLeaks,
  score,
  scoreLine,
} from "@/lib/tools/leak-check";

/**
 * The Lead leak check. Scores the answers with our own code, has Claude word the
 * three leaks (stock wording if it can't), shows the short result, and hands the
 * full result to Make, which saves the person in Leads and emails it to them.
 * The website keeps nothing.
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

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "leak-check", 3, DAY)) {
    return NextResponse.json({ error: "That's the most checks for today. Please come back tomorrow." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill the hidden field, and bots answer six questions in no time.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  if (!startedAt || Date.now() - startedAt < 4000) {
    return NextResponse.json({ error: "Please take a moment over the questions and try again." }, { status: 400 });
  }

  const answers = cleanAnswers(body.answers);
  if (!answers) return NextResponse.json({ error: "Please answer all six questions." }, { status: 400 });
  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  if (!name) return NextResponse.json({ error: "Please add your first name." }, { status: 400 });
  const business = (BUSINESS_TYPES as readonly string[]).includes(String(body.business)) ? String(body.business) : null;
  const consent = body.consent === true;
  if (emailTooOften(email)) {
    return NextResponse.json({ error: "That's the most checks for this email today. Please come back tomorrow." }, { status: 429 });
  }

  const s = score(answers);
  // A perfect score has nothing to fix, so there are no leaks to list or word.
  const perfect = s.total >= 100;
  const picked = perfect ? [] : pickLeaks(answers);
  const words = answersInWords(answers);
  const worded = perfect ? null : await wordLeaks({ business, answers: words, total: s.total, leaks: picked });

  const leaks = picked.map((l, i) => ({
    area: l.area,
    leak: worded?.[i]?.leak || l.leak,
    fix: worded?.[i]?.fix || l.fix,
    guideTitle: GUIDES[l.guide].title,
    guideUrl: GUIDES[l.guide].url,
  }));
  const line = scoreLine(s.total);

  const said = [
    `Lead leak check: ${s.total}/100 (catch ${s.areas.catch}/35, keep ${s.areas.keep}/25, follow up ${s.areas["follow up"]}/30, reach ${s.areas.reach}/10).`,
    business ? `Business: ${business}.` : "",
    ...words.map((w) => `${w.question} ${w.answer}`),
    ...leaks.map((l, i) => `Leak ${i + 1} (${l.area}): ${l.leak} Fix: ${l.fix}`),
  ]
    .filter(Boolean)
    .join("\n");

  const sent = await sendToolToMake({
    // Make emails the 3 leaks only when form is "LEAK", so a perfect score saves
    // the person in Leads and sends no empty email.
    form: perfect ? "LEAK-100" : "LEAK",
    tool: "Lead leak check",
    email,
    name,
    consent,
    business: business || "",
    score: s.total,
    line,
    leaks,
    said,
    source: "oloye.co.uk/tools/lead-leak-check",
  });

  return NextResponse.json({
    ok: true,
    total: s.total,
    line,
    leaks: leaks.map(({ area, leak, fix }) => ({ area, leak, fix })),
    emailed: sent === "ok",
    perfect,
  });
}
