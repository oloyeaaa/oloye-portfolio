import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { POST_FREEBIES } from "@/lib/postFreebies";
import { sendToMake, addToMailerLite } from "@/lib/leads";

/**
 * Free-thing forms (blog posts and the Free things page).
 *
 * The title and link of the free thing come from our own list, never from the
 * form, so nobody can make the email point somewhere else. Make saves the lead
 * and emails the free thing. People who ticked "yes to emails" also join the
 * MailerLite list.
 */

const NEWSLETTER_GROUP = "196047739383973099"; // MailerLite "free-tools"

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "lead")) {
    return NextResponse.json({ error: "Too many tries. Please wait a few minutes." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill in the hidden field; people never see it.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  const consent = body.consent === true;
  const freebie = typeof body.freebie === "string" ? POST_FREEBIES[body.freebie] : undefined;
  if (!freebie) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const source = cleanText(body.source, 120);

  const absolute = freebie.url.startsWith("http") ? freebie.url : `https://www.oloye.co.uk${freebie.url}`;
  const sent = await sendToMake({
    form: freebie.key.toUpperCase(),
    email,
    name,
    consent,
    said: `Asked for "${freebie.title}"${source ? ` (from ${source})` : ""}.`,
    title: freebie.title,
    url: absolute,
    line: freebie.line,
    source,
  });
  if (consent) await addToMailerLite(email, name, NEWSLETTER_GROUP);

  // The page shows the free thing straight away either way; this only says
  // whether the email copy is on its way.
  return NextResponse.json({ ok: true, emailed: sent === "ok" });
}
