/**
 * Small guards every form endpoint uses (security pass, 2026-10-27).
 *
 * - Only accept form posts that come from our own site (stops other sites
 *   posting into our forms).
 * - Limit how often one address can send, so nobody can flood the list or the
 *   CRM. In-memory, so it's per server instance: a speed bump, not a wall.
 * - Strict email check, and clean text, so nothing odd reaches Airtable,
 *   MailerLite or Make.
 * - Never log personal details.
 */

import { SITE_URL } from "./site";

const ALLOWED_HOSTS = new Set([
  new URL(SITE_URL).host,
  new URL(SITE_URL).host.replace(/^www\./, ""),
  "localhost:3000",
  "127.0.0.1:3000",
  // Vercel preview links for this deployment (set by Vercel, never by a visitor).
  ...[process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].filter((h): h is string => !!h),
]);

/** True when the request was sent by a page on our own site. */
export function fromOurSite(req: Request): boolean {
  const origin = req.headers.get("origin") || req.headers.get("referer");
  if (!origin) return false;
  try {
    return ALLOWED_HOSTS.has(new URL(origin).host);
  } catch {
    return false;
  }
}

const hits = new Map<string, number[]>();

/** Allows `max` sends per `windowMs` from one IP for one form. */
export function tooMany(req: Request, form: string, max = 5, windowMs = 10 * 60 * 1000): boolean {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const key = `${form}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // keep memory small
  return recent.length > max;
}

// Letters, numbers and the usual . _ % + - before the @; a normal domain after.
const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9.-]{1,190}\.[A-Za-z]{2,24}$/;

export function cleanEmail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const e = v.trim().toLowerCase();
  return EMAIL_RE.test(e) ? e : null;
}

/** Plain text only: no control characters, trimmed, capped in length. */
export function cleanText(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

/** Reads a JSON body, refusing anything bigger than a normal form. */
export async function readSmallJson(req: Request, maxBytes = 10_000): Promise<Record<string, unknown> | null> {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > maxBytes) return null;
  try {
    const text = await req.text();
    if (text.length > maxBytes) return null;
    const data = JSON.parse(text);
    return data && typeof data === "object" && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}
