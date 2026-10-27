import { NextResponse } from "next/server";
import { fromOurSite, tooMany, cleanEmail, cleanText, readSmallJson } from "@/lib/guard";

/**
 * Email capture, into MailerLite.
 *
 * Takes a name and an email. The name is optional on purpose: asking for it
 * lifts reply rates and lets emails open with a real first name, but making it
 * required would cost signups for no good reason. Two fields, one of them
 * skippable, is about as little friction as a form can have.
 *
 * Groups:
 *   free-tools  the current offer, the five free tools as a Notion pack
 *   prompt-pack the older Digital Product Prompt Pack page
 *
 * Anything unrecognised falls back to free-tools rather than erroring, because
 * losing a subscriber to a typo in a form field would be a silly way to lose a
 * subscriber.
 */
const GROUPS: Record<string, string> = {
  "free-tools": "196047739383973099",
  "prompt-pack": "194953404356756635",
  // One group per blog free thing, so MailerLite can email the right one.
  // Add each group's ID once it's made in MailerLite (see website/TODO-OLOYE.md).
  // Until then these fall back to free-tools, so nobody is lost.
  // "post-checklist": "",
  // "post-TABLE": "",
  // "post-TOOLS": "",
  // "post-PIECES": "",
  // "post-LOOP": "",
};
const DEFAULT_GROUP = "free-tools";


export async function POST(req: Request) {
  if (!fromOurSite(req)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }
  if (tooMany(req, "subscribe")) {
    return NextResponse.json({ error: "Too many tries. Please wait a few minutes." }, { status: 429 });
  }
  const body = await readSmallJson(req);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const consent = body.consent !== false;
  const email = cleanEmail(body.email) || "";
  const name = cleanText(body.name, 80);
  const list = typeof body.list === "string" && GROUPS[body.list] ? body.list : DEFAULT_GROUP;

  // UK rules: only add someone to the mailing list if they said yes. Forms that
  // offer a free thing send consent explicitly; a plain "keep me posted" form
  // is itself the yes, so it sends nothing and is treated as consent.
  if (!email) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }

  // No yes to emails: they still get the free thing on the page, nothing is stored.
  if (!consent) return NextResponse.json({ ok: true, stored: false });

  const key = process.env.MAILERLITE_API_KEY;
  if (!key) {
    console.error("MAILERLITE_API_KEY is not set");
    return NextResponse.json(
      { error: "Signup is temporarily unavailable. Try again shortly." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [GROUPS[list]],
        ...(name ? { fields: { name } } : {}),
      }),
    });

    if (!res.ok) {
      // Status only: the reply can contain the person's email, and logs aren't the place for it.
      console.error("MailerLite subscribe failed", res.status);
      // 422 from MailerLite usually means the address is already subscribed.
      // That is not a failure from the reader's point of view, so treat it as
      // success rather than telling somebody their own email is wrong.
      if (res.status === 422) return NextResponse.json({ ok: true, already: true });
      return NextResponse.json(
        { error: "Could not sign you up. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MailerLite subscribe error", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { error: "Could not sign you up. Please try again." },
      { status: 502 }
    );
  }
}
