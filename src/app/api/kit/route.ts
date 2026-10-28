import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake, addToMailerLite } from "@/lib/leads";
import { KIT, countList, onList } from "@/lib/challenge";

/**
 * The oloye.co.uk/100 sign-up. Same Make route as the other free-thing forms
 * (Keyword KIT, Platform Website); Make saves them in Leads and emails the kit.
 * Signing up here is joining the list, so it counts as a yes to emails.
 */

const NEWSLETTER_GROUP = "196047739383973099"; // MailerLite "free-tools"

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "kit")) {
    return NextResponse.json({ error: "Too many tries. Please wait a few minutes." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  if (!name) return NextResponse.json({ error: "Please add your first name." }, { status: 400 });

  // Count before Make adds them, so the number is right even if Make is a second slow.
  const [already, before] = await Promise.all([onList(email), countList(true)]);

  const sent = await sendToMake({
    form: "KIT",
    email,
    name,
    consent: true,
    said: "Joined the 0 to 100 list (oloye.co.uk/100).",
    title: KIT.title,
    url: KIT.url,
    line: KIT.line,
    source: "oloye.co.uk/100",
  });
  if (sent !== "ok") {
    return NextResponse.json({ error: "Sorry, that didn't go through. Please try again in a minute." }, { status: 502 });
  }
  await addToMailerLite(email, name, NEWSLETTER_GROUP);

  const number = before === null ? null : already ? before : before + 1;
  return NextResponse.json({ ok: true, already: already === true, number });
}
