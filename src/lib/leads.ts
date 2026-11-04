/**
 * Hands a form to the Make scenario "oloye.co.uk website forms" (27 Oct 2026).
 *
 * Make saves the person in Airtable Leads, then emails the free thing or tells
 * Oloye about a contact message. The website keeps nothing: this runs on the
 * server only, and the webhook address and its secret live in server settings
 * (MAKE_FORMS_WEBHOOK_URL, MAKE_FORMS_SECRET), never in the page.
 */

export type LeadPayload = {
  form: string; // CONTACT, KIT, CHECKLIST, TABLE, TOOLS, PIECES, LOOP
  email: string;
  name: string;
  said: string;
  consent: boolean;
  title?: string;
  url?: string;
  line?: string;
  source?: string;
  intro?: string; // the 0 to 100 welcome email's first line
};

export async function sendToMake(lead: LeadPayload): Promise<"ok" | "off" | "failed"> {
  return postToMake(process.env.MAKE_FORMS_WEBHOOK_URL, process.env.MAKE_FORMS_SECRET, lead, "forms");
}

/**
 * Hands a free tool's result to the Make scenario "oloye.co.uk tools" (its own
 * webhook and secret: MAKE_TOOLS_WEBHOOK_URL, MAKE_TOOLS_SECRET). Make saves the
 * person in Leads and emails them their result.
 */
export async function sendToolToMake(payload: Record<string, unknown>): Promise<"ok" | "off" | "failed"> {
  return postToMake(process.env.MAKE_TOOLS_WEBHOOK_URL, process.env.MAKE_TOOLS_SECRET, payload, "tools");
}

async function postToMake(url: string | undefined, secret: string | undefined, lead: object, name: string): Promise<"ok" | "off" | "failed"> {
  if (!url || !secret) {
    console.error(`Make ${name} webhook is not configured`);
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
