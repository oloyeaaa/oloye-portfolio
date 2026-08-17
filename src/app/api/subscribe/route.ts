import { NextResponse } from "next/server";

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
};
const DEFAULT_GROUP = "free-tools";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let email = "";
  let name = "";
  let list = DEFAULT_GROUP;

  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : "";
    if (typeof body?.list === "string" && GROUPS[body.list]) list = body.list;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look right." },
      { status: 400 }
    );
  }

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
      const detail = await res.text();
      console.error("MailerLite subscribe failed", res.status, detail);
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
    console.error("MailerLite subscribe error", err);
    return NextResponse.json(
      { error: "Could not sign you up. Please try again." },
      { status: 502 }
    );
  }
}
