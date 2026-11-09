import { NextResponse } from "next/server";
import { fromOurSite, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";
import { SECTIONS, CARE_LINE, type SectionId } from "@/lib/tools/what-to-post";
import { buildEmail, readLists, verify } from "@/lib/tools/what-to-post-email";

/**
 * Sends the "What to post" results email: every idea they saw. The page calls
 * this once, when they leave the results or after 10 minutes. The ideas must
 * carry the signature the server gave them, so only Claude's own ideas for this
 * person can go out, to the email they gave. One email per set of ideas.
 *
 * It goes to the website forms Make scenario as form CHANNEL with the finished
 * subject and body. Make sends it (the "What to post results" route, switched
 * on with Oloye's yes) and adds a line to their Leads note. Nothing is kept.
 */

const sentTokens = new Set<string>();

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  // The ideas for up to 40 lines, so a bigger limit than a normal form.
  const body = await readSmallJson(req, 40_000);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = cleanEmail(body.email);
  const name = cleanText(body.name, 80);
  const lists = readLists(body.lists);
  const careNote = body.careNote === CARE_LINE ? CARE_LINE : "";
  const token = typeof body.token === "string" ? body.token : "";
  if (!email || !name || !lists || !verify(email, name, lists, careNote, token)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (sentTokens.has(token)) return NextResponse.json({ ok: true, already: true });
  sentTokens.add(token);
  if (sentTokens.size > 5000) sentTokens.clear();

  const rawSeen = (body.seen || {}) as Record<string, unknown>;
  const seen: Partial<Record<SectionId, boolean>> = {};
  for (const s of SECTIONS) seen[s.id] = rawSeen[s.id] === true;

  const { subject, html, count } = buildEmail(name, lists, careNote, seen);
  const sent = await sendToMake({
    form: "CHANNEL",
    email,
    name,
    consent: false, // never changes their email choice: Make only turns consent on, never off
    said: `What to post: results email with the ${count} ideas they saw.`,
    source: "oloye.co.uk/what-to-post",
    subject,
    html,
  });
  if (sent !== "ok") {
    sentTokens.delete(token);
    return NextResponse.json({ error: "Not sent." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
