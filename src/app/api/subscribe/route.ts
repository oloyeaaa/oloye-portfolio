import { NextResponse } from "next/server";

// Prompt Pack subscribers group in MailerLite (practicalaih@gmail.com account)
const GROUP_ID = "194953404356756635";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const key = process.env.MAILERLITE_API_KEY;
  if (!key) {
    console.error("MAILERLITE_API_KEY is not set");
    return NextResponse.json({ error: "Signup is temporarily unavailable." }, { status: 500 });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, groups: [GROUP_ID] }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("MailerLite subscribe failed", res.status, detail);
      return NextResponse.json({ error: "Could not sign you up. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MailerLite subscribe error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
