import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { QUESTIONS, SECTIONS, type Answers, type SectionId } from "@/lib/tools/what-to-post";

/**
 * Counting what people do on "What to post" (Oloye's yes, 9 Nov 2026), so he
 * can learn what people want before he takes it to Rita's list.
 *
 * One row per visit in the Airtable table "What to post answers"
 * (tblTPXs6jziGOyCbL): the taps, the Q1 job box, the source tag and the steps
 * they took. Never a name, an email or an IP, and nothing that links a row to
 * Leads. The date is the day only. Server only.
 *
 * The page gets the row's id with a signature, so it can only ever update its
 * own row. Needs AIRTABLE_TRACKING_TOKEN (a token that can write to the base);
 * without it, counting is simply off and the page works as before.
 */

const BASE = "appm6XGHyuXjnhSAo";
const TABLE = "tblTPXs6jziGOyCbL";

export const SOURCES = ["direct", "rita", "tiktok", "bio", "live"] as const;

/** The ?from= tag, as one of our sources. No tag is "direct", anything else is "other". */
export function cleanSource(v: unknown): string {
  if (typeof v !== "string" || !v.trim()) return "direct";
  const s = v.trim().toLowerCase();
  return (SOURCES as readonly string[]).includes(s) ? s : "other";
}

const Q_FIELDS: Record<string, string> = {
  q1_day: "Q1 day",
  q2_years: "Q2 years",
  q3_come_to_you: "Q3 come to you",
  q4_hard_way: "Q4 hard way",
  q5_five_years_ago: "Q5 five years ago",
  q6_show_up: "Q6 show up",
  q7_time: "Q7 time",
  q8_sell: "Q8 sell",
};

function key(): string | null {
  const secret = process.env.MAKE_FORMS_SECRET;
  return secret ? `what-to-post-track:${secret}` : null;
}

function signId(id: string): string {
  const k = key();
  return k ? createHmac("sha256", k).update(id).digest("base64url") : "";
}

/** True when the page's row id and signature match, so it can only touch its own row. */
export function checkId(id: unknown, sig: unknown): id is string {
  if (typeof id !== "string" || !/^rec[A-Za-z0-9]{14}$/.test(id) || typeof sig !== "string") return false;
  const want = signId(id);
  return !!want && want.length === sig.length && timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

async function airtable(method: "POST" | "PATCH", path: string, fields: Record<string, unknown>): Promise<string | null> {
  const token = process.env.AIRTABLE_TRACKING_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields, typecast: true }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("What to post counting: Airtable", res.status);
      return null;
    }
    const data = (await res.json()) as { id?: string };
    return data.id || null;
  } catch {
    console.error("What to post counting: Airtable network error");
    return null;
  }
}

/** A new row when someone taps "Start the questions". */
export async function startRow(source: string): Promise<{ id: string; sig: string } | null> {
  const run = `WTP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex")}`;
  const id = await airtable("POST", "", {
    Run: run,
    Date: new Date().toISOString().slice(0, 10),
    Source: source,
    Started: true,
  });
  return id ? { id, sig: signId(id) } : null;
}

export async function updateRow(id: string, fields: Record<string, unknown>): Promise<void> {
  await airtable("PATCH", `/${id}`, fields);
}

/** The taps (and only the Q1 job box from the typed text) as row fields. */
export function answerFields(answers: Answers): Record<string, unknown> {
  const out: Record<string, unknown> = { "Finished questions": true };
  for (const q of QUESTIONS) {
    out[Q_FIELDS[q.id]] = answers[q.id]?.picked || [];
  }
  out["Q1 job"] = answers.q1_day?.other || "";
  return out;
}

export function sectionTitles(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  return SECTIONS.filter((s) => ids.includes(s.id as SectionId)).map((s) => s.title);
}
