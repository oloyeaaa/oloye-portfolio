import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";

/**
 * Contact form, into the Airtable Leads table (Content Engine base).
 *
 * One person is one row, matched on Email. A new person gets a fresh row at
 * Stage "New". Someone already in the table keeps their stage; their message
 * is added to "What They Said" and Last Contact moves to today.
 *
 * Needs AIRTABLE_LEADS_TOKEN (a personal access token that can write to that
 * base). Without it the form says so politely instead of losing the message.
 */

const BASE = process.env.AIRTABLE_LEADS_BASE_ID || "appm6XGHyuXjnhSAo";
const TABLE = process.env.AIRTABLE_LEADS_TABLE_ID || "tbloe7mcslN4BJwPa";

type Fields = Record<string, unknown>;

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

  const token = process.env.AIRTABLE_LEADS_TOKEN;
  if (!token) {
    console.error("AIRTABLE_LEADS_TOKEN is not set");
    return NextResponse.json(
      { error: "Messages aren't switched on yet. Please book a free call or message us on Instagram." },
      { status: 503 }
    );
  }

  const api = `https://api.airtable.com/v0/${BASE}/${TABLE}`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const today = new Date().toISOString().slice(0, 10);
  const said = `${today} (website contact form)${business ? `, ${business}` : ""}: ${message}`;

  try {
    const formula = encodeURIComponent(`LOWER({Email})='${email.replace(/'/g, "\\'")}'`);
    const found = await fetch(`${api}?maxRecords=1&filterByFormula=${formula}`, { headers, cache: "no-store" });
    if (!found.ok) throw new Error(`lookup ${found.status}`);
    const existing = (await found.json()).records?.[0] as { id: string; fields: Fields } | undefined;

    let res: Response;
    if (existing) {
      const before = typeof existing.fields["What They Said"] === "string" ? (existing.fields["What They Said"] as string) : "";
      const fields: Fields = {
        "What They Said": before ? `${before}\n\n${said}` : said,
        "Last Contact": today,
        ...(name && !existing.fields["First Name"] ? { "First Name": name } : {}),
        ...(consent ? { "Consent to Email": true } : {}),
      };
      res = await fetch(`${api}/${existing.id}`, { method: "PATCH", headers, body: JSON.stringify({ fields, typecast: true }) });
    } else {
      const fields: Fields = {
        Email: email,
        "First Name": name,
        Platform: "Website",
        Stage: "New",
        "What They Said": said,
        "Date In": today,
        "Last Contact": today,
        "Next Step": "Reply to their contact form message",
        "Consent to Email": consent,
      };
      res = await fetch(api, { method: "POST", headers, body: JSON.stringify({ fields, typecast: true }) });
    }
    if (!res.ok) throw new Error(`save ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Something went wrong sending that. Please try again, or book a free call." },
      { status: 502 }
    );
  }
}
