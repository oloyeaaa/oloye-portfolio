import { NextResponse } from "next/server";
import { fromOurSite, tooMany, readSmallJson } from "@/lib/guard";
import { moreIdeas, UNCLEAR } from "@/lib/claude-what-to-post";
import { SECTIONS, cleanAnswers, cleanShown, type SectionId } from "@/lib/tools/what-to-post";

/**
 * "5 more ideas" for one list. Nothing is saved and nothing goes to Make.
 * Capped at 12 a day per IP (the page allows 3 per list), so one person can't
 * run up the bill.
 */

const DAY = 24 * 60 * 60 * 1000;

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "what-to-post-more", 12, DAY)) {
    return NextResponse.json({ error: "That's the most new ideas for today. Please come back tomorrow." }, { status: 429 });
  }
  const body = await readSmallJson(req, 20_000);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const answers = cleanAnswers(body.answers);
  if (!answers) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const section = SECTIONS.find((s) => s.id === body.section)?.id as SectionId | undefined;
  if (!section) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const result = await moreIdeas(answers, section, cleanShown(body.shown));
  if (!result) return NextResponse.json({ error: "Something went wrong. Try again in a minute." }, { status: 503 });
  if (result.status === "unclear") return NextResponse.json({ ok: true, status: "unclear", message: UNCLEAR });
  return NextResponse.json({ ok: true, status: "ideas", ideas: result.ideas });
}
