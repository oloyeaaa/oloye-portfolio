import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake } from "@/lib/leads";

/**
 * The founding group sign-up (oloye.co.uk/founding, 8 Nov 2026).
 *
 * Same Make route as the other website forms. With form FOUNDING and no free
 * thing link, Make only saves the person in Leads (Lead Source FOUNDING) and
 * sends no email, so nothing in Make needs changing. "Yes to emails" is its own
 * tick, as on the free-thing forms; the 7am check adds only those people to
 * MailerLite.
 */

export async function POST(req: Request) {
  if (!fromOurSite(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (tooMany(req, "founding")) {
    return NextResponse.json({ error: "Too many tries. Please wait a few minutes." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill in the hidden field; people never see it.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const email = cleanEmail(body.email);
  if (!email) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  const name = cleanText(body.name, 80);
  if (!name) return NextResponse.json({ error: "Please add your first name." }, { status: 400 });
  const consent = body.consent === true;

  const sent = await sendToMake({
    form: "FOUNDING",
    email,
    name,
    consent,
    said: "Wants to hear when the founding group opens (oloye.co.uk/founding).",
    source: "oloye.co.uk/founding",
  });
  if (sent !== "ok") {
    return NextResponse.json({ error: "Sorry, that didn't go through. Please try again in a minute." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
