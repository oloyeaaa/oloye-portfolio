import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";
import { sendToMake, addToMailerLite } from "@/lib/leads";

/**
 * Contact form, handed to Make (27 Oct 2026). Make saves the person in the
 * Airtable Leads table (one row per email, existing people keep their stage)
 * and emails Oloye the message with Reply-To set to the sender.
 *
 * The website holds no Airtable or Gmail sign-in; it only knows the webhook
 * address and its secret, as server settings.
 */

const NEWSLETTER_GROUP = "196047739383973099"; // MailerLite "free-tools"

export async function POST(req: Request) {
  if (!fromOurSite(req)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }
  if (tooMany(req, "contact", 3)) {
    return NextResponse.json({ error: "Too many messages. Please wait a few minutes, or book a free call." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill in the hidden field; people never see it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = cleanEmail(body.email) || "";
  const name = cleanText(body.name, 80);
  const business = cleanText(body.business, 120);
  const message = cleanText(body.message, 3000);
  const consent = body.consent === true;

  if (!email) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (message.length < 5) {
    return NextResponse.json({ error: "Tell us a little about the job that's eating your week." }, { status: 400 });
  }

  const result = await sendToMake({
    form: "CONTACT",
    email,
    name,
    consent,
    said: business ? `${business}: ${message}` : message,
    source: "contact page",
  });

  if (result === "off") {
    return NextResponse.json(
      { error: "Messages aren't switched on yet. Please book a free call or message us on Instagram." },
      { status: 503 }
    );
  }
  if (result === "failed") {
    return NextResponse.json(
      { error: "Something went wrong sending that. Please try again, or book a free call." },
      { status: 502 }
    );
  }
  if (consent) await addToMailerLite(email, name, NEWSLETTER_GROUP);
  return NextResponse.json({ ok: true });
}
