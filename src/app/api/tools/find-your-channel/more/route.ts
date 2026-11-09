import { NextResponse } from "next/server";
import { fromOurSite, tooMany, readSmallJson } from "@/lib/guard";
import { moreIdeas } from "@/lib/claude-channel";
import { SECTIONS, answersInWords, cleanAnswers, cleanShown, type SectionId } from "@/lib/tools/find-channel";

/**
 * "Show me 5 more" for one list. Nothing is saved and nothing goes to Make.
 * Capped at 12 a day per IP, so one person can't run up the bill.
 */

const DAY = 24 * 60 * 60 * 1000;

export const maxDuration = 60;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "find-channel-more", 12, DAY)) {
    return NextResponse.json({ error: "That's the most new ideas for today. Please come back tomorrow." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const answers = cleanAnswers(body.answers);
  if (!answers) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const section = SECTIONS.find((s) => s.id === body.section)?.id as SectionId | undefined;
  if (!section) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const shown = cleanShown(body.shown);

  const ideas = await moreIdeas(answersInWords(answers), section, shown);
  if (!ideas) {
    return NextResponse.json({ error: "Sorry, no new ideas came through. Please try again in a minute." }, { status: 503 });
  }
  return NextResponse.json({ ok: true, ideas });
}
