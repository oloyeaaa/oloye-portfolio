import { NextResponse } from "next/server";
import { fromOurSite, tooMany, readSmallJson } from "@/lib/guard";
import { cleanAnswers } from "@/lib/tools/what-to-post";
import { answerFields, checkId, cleanSource, sectionTitles, startRow, updateRow } from "@/lib/tools/what-to-post-track";

/**
 * Counting steps on "What to post" (see what-to-post-track.ts). Nothing here
 * knows who anyone is: no name, email or IP is ever written. "start" makes the
 * row; every other step must carry that row's signed id.
 */

const HOUR = 60 * 60 * 1000;

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const body = await readSmallJson(req, 8_000);
  if (!body) return NextResponse.json({ ok: false }, { status: 400 });

  if (body.event === "start") {
    if (tooMany(req, "what-to-post-track", 20, HOUR)) return NextResponse.json({ ok: false }, { status: 429 });
    const row = await startRow(cleanSource(body.from));
    return NextResponse.json(row ? { ok: true, ...row } : { ok: false });
  }

  if (!checkId(body.id, body.sig)) return NextResponse.json({ ok: false }, { status: 400 });
  const id = body.id as string;

  switch (body.event) {
    case "answers": {
      const answers = cleanAnswers(body.answers);
      if (answers) await updateRow(id, answerFields(answers));
      break;
    }
    case "more":
      await updateRow(id, { "Opened 5 more": sectionTitles(body.sections) });
      break;
    case "copied":
      await updateRow(id, { "Copied ideas": true });
      break;
    case "downloaded":
      await updateRow(id, { "Downloaded PDF": true });
      break;
    case "founding":
      await updateRow(id, { "Clicked founding group": true });
      break;
    default:
      return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
