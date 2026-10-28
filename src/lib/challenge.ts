/**
 * The "0 to 100" challenge (1 Nov to 31 Dec 2026): 100 real people on the list, in public.
 *
 * The count is read from Airtable Leads on the server, never typed by hand, with
 * the same rule as tools/counter_card.py: a lead counts when it has an email, it
 * isn't Oloye's own address, and the first name doesn't start with "Test".
 *
 * Needs AIRTABLE_LEADS_TOKEN: a read-only token for the Content Engine base only
 * (data.records:read). With no token the page still works, it just hides the number.
 */

export const GOAL = 100;

export const KIT = {
  title: "The 0 to 100 Kit",
  url: "https://drive.google.com/drive/folders/1iFbRiUTqNqXdIlOkP-tA54eB3b3ggszv",
  // Placeholder until the welcome email words are signed off.
  line: "Start with folder 2, 'Followers you can't email'. New things land every Sunday.",
};

const BASE = "appm6XGHyuXjnhSAo";
const LEADS = "tbloe7mcslN4BJwPa";
const NOT_LEADS = ["info@oloyeaa.com"];

const COUNTS =
  `AND({Email}!='',` +
  NOT_LEADS.map((e) => `LOWER({Email})!='${e}'`).join(",") +
  `,NOT(REGEX_MATCH(LOWER({First Name}&''),'^test')))`;

async function airtable(formula: string, fresh: boolean): Promise<number | null> {
  const token = process.env.AIRTABLE_LEADS_TOKEN;
  if (!token) return null;
  let n = 0;
  let offset = "";
  try {
    do {
      const qs = new URLSearchParams({ filterByFormula: formula, pageSize: "100", "fields[]": "Email" });
      if (offset) qs.set("offset", offset);
      const res = await fetch(`https://api.airtable.com/v0/${BASE}/${LEADS}?${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
        ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 600 } }),
      });
      if (!res.ok) {
        console.error("Leads count failed", res.status);
        return null;
      }
      const data = (await res.json()) as { records: unknown[]; offset?: string };
      n += data.records.length;
      offset = data.offset || "";
    } while (offset);
    return n;
  } catch (err) {
    console.error("Leads count error", err instanceof Error ? err.message : "unknown");
    return null;
  }
}

/** How many real people are on the list. Cached for 10 minutes unless `fresh`. */
export function countList(fresh = false): Promise<number | null> {
  return airtable(COUNTS, fresh);
}

/** True when this email is already in Leads (email is already cleaned: no quotes). */
export async function onList(email: string): Promise<boolean | null> {
  const n = await airtable(`LOWER({Email})='${email.toLowerCase()}'`, true);
  return n === null ? null : n > 0;
}
