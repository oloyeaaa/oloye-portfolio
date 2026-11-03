/**
 * The Lead leak check (oloye.co.uk/tools/lead-leak-check), 2 Nov 2026.
 *
 * Six tap-to-answer questions. Our own code works out the score and picks the
 * three biggest leaks, so the same answers always give the same result. Claude
 * only words each leak and its first fix for that person (src/lib/claude.ts);
 * if it can't, the stock wording below is used instead.
 *
 * Points add up to 100 across four areas: catch 35, keep 25, follow up 30, reach 10.
 */

export type Area = "catch" | "keep" | "follow up" | "reach";

export type Option = { id: string; label: string; points: Partial<Record<Area, number>> };
export type Question = { id: string; text: string; multi?: boolean; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    id: "found",
    text: "Where do most people find you?",
    multi: true,
    options: [
      { id: "instagram", label: "Instagram", points: {} },
      { id: "tiktok", label: "TikTok", points: {} },
      { id: "facebook", label: "Facebook", points: {} },
      { id: "linkedin", label: "LinkedIn", points: {} },
      { id: "google", label: "Google or your website", points: {} },
      { id: "word", label: "Word of mouth", points: {} },
    ],
  },
  {
    id: "next",
    text: "When someone's interested, what do they usually do next?",
    options: [
      { id: "form", label: "Fill in a form on your website", points: { catch: 15 } },
      { id: "bio", label: "Click the link in your bio", points: { catch: 12 } },
      { id: "call", label: "Book a call", points: { catch: 12 } },
      { id: "dm", label: "Send you a DM", points: { catch: 7 } },
      { id: "comment", label: "Leave a comment", points: { catch: 5 } },
      { id: "unsure", label: "Not sure", points: { catch: 0 } },
    ],
  },
  {
    id: "where",
    text: "Where do their names and emails end up?",
    options: [
      { id: "list", label: "One list or CRM", points: { catch: 20, keep: 10 } },
      { id: "tool", label: "An email tool, like MailerLite", points: { catch: 16, keep: 10 } },
      { id: "spread", label: "Spread across DMs, inbox and notes", points: { catch: 8, keep: 3 } },
      { id: "nowhere", label: "Nowhere, I don't collect emails", points: { catch: 0, keep: 0 } },
    ],
  },
  {
    id: "speed",
    text: "How fast do you usually reply to a new enquiry?",
    options: [
      { id: "hour", label: "Within an hour", points: { "follow up": 15 } },
      { id: "day", label: "The same day", points: { "follow up": 12 } },
      { id: "days", label: "1 to 3 days", points: { "follow up": 6 } },
      { id: "longer", label: "Longer than that", points: { "follow up": 2 } },
      { id: "never", label: "Sometimes not at all", points: { "follow up": 0 } },
    ],
  },
  {
    id: "after",
    text: "After the first reply, what happens?",
    options: [
      { id: "plan", label: "I follow up on a set plan", points: { "follow up": 15 } },
      { id: "remember", label: "I follow up when I remember", points: { "follow up": 7 } },
      { id: "wait", label: "I wait for them to come back", points: { "follow up": 3 } },
      { id: "nothing", label: "Nothing, usually", points: { "follow up": 0 } },
    ],
  },
  {
    id: "notready",
    text: "Do people who aren't ready yet hear from you again?",
    options: [
      { id: "regular", label: "Yes, a regular email", points: { keep: 15 } },
      { id: "sometimes", label: "Now and then", points: { keep: 7 } },
      { id: "no", label: "No", points: { keep: 0 } },
    ],
  },
];

export const BUSINESS_TYPES = ["Coach", "Creator", "Service business", "Shop", "Other"] as const;

export type Answers = Record<string, string[]>;

/** Checks every answer is from the fixed lists. Returns clean answers, or null. */
export function cleanAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object") return null;
  const out: Answers = {};
  for (const q of QUESTIONS) {
    const v = (raw as Record<string, unknown>)[q.id];
    const picked = (Array.isArray(v) ? v : [v]).filter((x): x is string => typeof x === "string");
    const valid = [...new Set(picked)].filter((id) => q.options.some((o) => o.id === id));
    if (valid.length === 0 || (!q.multi && valid.length > 1)) return null;
    out[q.id] = valid;
  }
  return out;
}

const MAX: Record<Area, number> = { catch: 35, keep: 25, "follow up": 30, reach: 10 };

export type Score = { total: number; areas: Record<Area, number> };

export function score(a: Answers): Score {
  const areas: Record<Area, number> = { catch: 0, keep: 0, "follow up": 0, reach: 0 };
  for (const q of QUESTIONS) {
    for (const id of a[q.id] || []) {
      const opt = q.options.find((o) => o.id === id);
      for (const [area, pts] of Object.entries(opt?.points || {})) areas[area as Area] += pts as number;
    }
  }
  // More places people find you is good, as long as they all lead to one list.
  // Without a list, every extra door is one more place to lose them.
  const doors = (a.found || []).length;
  const hasList = a.where?.[0] === "list" || a.where?.[0] === "tool";
  areas.reach = hasList ? 10 : doors <= 1 ? 8 : doors <= 3 ? 6 : 4;
  const total = Math.round(Object.values(areas).reduce((s, n) => s + n, 0));
  return { total: Math.min(100, total), areas };
}

/** The free guides a fix points to. Links come from our own list, never from Claude. */
export const GUIDES = {
  TABLE: { title: "The leads table, ready to copy", url: "https://drive.google.com/file/d/1gtgVZQQHkCxsBHCZtfD414B3Yv8MKFVq/view" },
  PIECES: { title: "The 3-piece starter checklist", url: "https://drive.google.com/file/d/1kJ2fw8XycuWPG-OY3M3QeycYdMsI3Pmk/view" },
  QUIET: { title: "Leads gone quiet? 5 follow-ups that bring them back", url: "https://drive.google.com/file/d/1ERphZBKlzlWgLbG5UmB09atVNzmLKLah/view" },
} as const;

export type LeakId = "no_door" | "no_list" | "slow_reply" | "no_followup" | "no_nurture" | "many_doors";

export type Leak = {
  id: LeakId;
  area: Exclude<Area, "reach">;
  guide: keyof typeof GUIDES;
  /** The stock wording, used when Claude isn't available. */
  leak: string;
  fix: string;
};

const LEAKS: Record<LeakId, Leak> = {
  no_door: {
    id: "no_door", area: "catch", guide: "PIECES",
    leak: "Interested people have no easy way to give you their name and email, so most of them just scroll on.",
    fix: "Give them one door: a single link in your bio or on your site where they leave a first name and email for something useful.",
  },
  no_list: {
    id: "no_list", area: "catch", guide: "TABLE",
    leak: "Names end up in DMs, your inbox and your notes, so nobody can see who's waiting for you.",
    fix: "Make one list. One table, one row per person, with a stage, so you can see who needs a reply today.",
  },
  slow_reply: {
    id: "slow_reply", area: "follow up", guide: "PIECES",
    leak: "New enquiries wait too long for a first reply, and by then many have moved on.",
    fix: "Send the first reply on its own, straight away, then answer properly the same day.",
  },
  no_followup: {
    id: "no_followup", area: "follow up", guide: "QUIET",
    leak: "After the first message, follow-up depends on memory, so the quiet ones slip away.",
    fix: "Write 3 short follow-ups once, with the day to send each, and check one list each morning for who's due.",
  },
  no_nurture: {
    id: "no_nurture", area: "keep", guide: "QUIET",
    leak: "People who aren't ready yet never hear from you again, so when they are ready, they've forgotten you.",
    fix: "Send one short, useful email a week to everyone on your list. One true story and one tip is enough.",
  },
  many_doors: {
    id: "many_doors", area: "catch", guide: "TABLE",
    leak: "People find you in several places, and each one keeps its own scraps, so nothing joins up.",
    fix: "Point every place at the same list, so whatever door they use, they land in one row you own.",
  },
};

/** Picks the three biggest leaks from the answers, biggest gap first. */
export function pickLeaks(a: Answers): Leak[] {
  const gap = (qid: string) => {
    const q = QUESTIONS.find((x) => x.id === qid)!;
    const best = Math.max(...q.options.map((o) => Object.values(o.points).reduce((s, n) => s + (n || 0), 0)));
    const got = Object.values(q.options.find((o) => o.id === a[qid]?.[0])?.points || {}).reduce((s, n) => s + (n || 0), 0);
    return best - got;
  };
  const doors = (a.found || []).length;
  const hasList = a.where?.[0] === "list" || a.where?.[0] === "tool";
  const ranked: [LeakId, number][] = [
    ["no_list", gap("where")],
    ["no_door", gap("next")],
    ["slow_reply", gap("speed")],
    ["no_followup", gap("after")],
    ["no_nurture", gap("notready")],
    ["many_doors", hasList ? 0 : Math.max(0, doors - 1) * 2],
  ];
  // Stable order on ties: the list ranking above (catch before follow-up before keep).
  return ranked
    .map(([id, g], i) => ({ id, g, i }))
    .sort((x, y) => y.g - x.g || x.i - y.i)
    .slice(0, 3)
    .map(({ id }) => LEAKS[id]);
}

/** One plain line on what the score means. No shaming at a low score. */
export function scoreLine(total: number): string {
  if (total >= 80) return "You're catching most of the people who find you. A few small fixes will close the last gaps.";
  if (total >= 55) return "Some people are getting through, but a fair few are slipping away between steps.";
  if (total >= 30) return "Most of the people who find you are slipping away. The good news: the first fixes are small.";
  return "Right now nearly everyone who finds you is lost after they look. That's normal at the start, and it's the easiest place to fix.";
}

/** The answers in words, for the Leads row and for Claude. */
export function answersInWords(a: Answers): { question: string; answer: string }[] {
  return QUESTIONS.map((q) => ({
    question: q.text,
    answer: (a[q.id] || []).map((id) => q.options.find((o) => o.id === id)?.label || id).join(", "),
  }));
}
