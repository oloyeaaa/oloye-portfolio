/**
 * Hands a form to the Make scenario "oloye.co.uk website forms" (27 Oct 2026).
 *
 * Make saves the person in Airtable Leads, then emails the free thing or tells
 * Oloye about a contact message. The website keeps nothing: this runs on the
 * server only, and the webhook address and its secret live in server settings
 * (MAKE_FORMS_WEBHOOK_URL, MAKE_FORMS_SECRET), never in the page.
 */

export type LeadPayload = {
  form: string; // CONTACT, CHECKLIST, TABLE, TOOLS, PIECES, LOOP
  email: string;
  name: string;
  said: string;
  consent: boolean;
  title?: string;
  url?: string;
  line?: string;
  source?: string;
};

export async function sendToMake(lead: LeadPayload): Promise<"ok" | "off" | "failed"> {
  const url = process.env.MAKE_FORMS_WEBHOOK_URL;
  const secret = process.env.MAKE_FORMS_SECRET;
  if (!url || !secret) {
    console.error("Make forms webhook is not configured");
    return "off";
  }
  // Make sometimes closes a kept-alive connection; one retry on a network error covers it.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Connection: "close" },
        body: JSON.stringify({ ...lead, secret }),
        cache: "no-store",
      });
      if (!res.ok) {
        console.error("Make webhook failed", res.status);
        return "failed";
      }
      return "ok";
    } catch (err) {
      const cause = err instanceof Error && err.cause instanceof Error ? ` (${(err.cause as Error & { code?: string }).code || err.cause.message})` : "";
      console.error(`Make webhook error (try ${attempt})`, err instanceof Error ? err.message + cause : "unknown");
      if (attempt === 2) return "failed";
    }
  }
  return "failed";
}

/** Adds someone who said yes to emails to MailerLite. Status only in logs. */
export async function addToMailerLite(email: string, name: string, group: string): Promise<boolean> {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, groups: [group], ...(name ? { fields: { name } } : {}) }),
    });
    // 422 usually means already subscribed, which is fine.
    if (!res.ok && res.status !== 422) console.error("MailerLite subscribe failed", res.status);
    return res.ok || res.status === 422;
  } catch (err) {
    console.error("MailerLite subscribe error", err instanceof Error ? err.message : "unknown");
    return false;
  }
}
