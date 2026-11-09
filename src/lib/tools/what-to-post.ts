/**
 * What to post and what to sell (oloye.co.uk/what-to-post), 9 Nov 2026.
 * Was "Find your channel" until Oloye renamed it the same day.
 *
 * Eight tap questions, one card at a time. Claude turns the answers into four
 * lists of five. The questions, prompts and JSON shape come from the Product
 * Lead (Projects/live-find-your-channel/); the page words from the Copywriter
 * (content/find-your-channel/WORDS.md). The Copywriter polishes the question
 * wording later: change it here and nowhere else.
 */

/**
 * box: "always" = the typed box shows on the card (Q1, the job);
 * "other" = it shows once they tap "Something else"; "none" = no box (Q2, Q7).
 */
export type Question = {
  id: string;
  text: string;
  hint?: string;
  max: number;
  options: string[];
  box: "always" | "other" | "none";
  boxLabel?: string;
  placeholder?: string;
};

/**
 * The care line the page shows, above the four lists, when Claude flags that
 * the answers point to a job with rules on advice (health, care, money, law).
 * Words: the Copywriter (WORDS.md ba1575e). Claude's own care_note text is only
 * the flag; it's never shown.
 */
export const CARE_LINE = "If your posts give advice, stick to what you're trained and allowed to say.";

/** The tap that opens the typed box. Sent along with the other taps. */
export const OTHER = "Something else";
export const Q1_OTHER = "Something else (use the box)";

// Wording: the Copywriter, WORDS.md section 5 (bf1d54c). Taps, limits and box
// rules: the Product Lead's questions.md after the 9 Nov UX review.
export const QUESTIONS: Question[] = [
  {
    id: "q1_day",
    text: "What do you spend most of your day doing?",
    max: 1,
    box: "always",
    boxLabel: "What's the job, in a few words?",
    placeholder: "ward nurse, school cook, van driver, mum of three",
    options: [
      "I look after people",
      "I fix or build things",
      "I do hands-on work (driving, cleaning, warehouse)",
      "I teach or explain things",
      "I serve or sell to customers",
      "I do admin, money or numbers",
      "I make things (food, designs, words, photos)",
      "I look after my home and family",
      "I'm studying or between jobs",
      Q1_OTHER,
    ],
  },
  {
    id: "q2_years",
    text: "How long have you been doing it?",
    max: 1,
    box: "none",
    options: ["Less than 2 years", "2 to 5 years", "5 to 10 years", "10 to 20 years", "More than 20 years"],
  },
  {
    id: "q3_come_to_you",
    text: "What do people come to you for?",
    max: 2,
    box: "other",
    placeholder: "What do they ask you most?",
    options: [
      "To fix a problem for them",
      "Advice before a big choice",
      "To show them how to do something",
      "What to buy or where to go",
      "To calm them down or talk things through",
      OTHER,
    ],
  },
  {
    id: "q4_hard_way",
    text: "What did you have to work out the hard way?",
    hint: "Only pick what you'd be happy to post about.",
    max: 2,
    box: "other",
    options: [
      "A skill at work nobody taught me",
      "Money, bills or budgeting",
      "My health or my body",
      "Starting again (new job, new town, new country)",
      "Being a parent or carer",
      "An app or piece of software",
      OTHER,
    ],
  },
  {
    id: "q5_five_years_ago",
    text: "Who were you five years ago?",
    hint: "Only pick what you'd be happy to post about.",
    max: 1,
    box: "other",
    options: [
      "Just starting out in my work",
      "Stuck in a job I didn't like",
      "New to the country or the area",
      "A new parent or carer",
      "Studying or training",
      "Much the same as now",
      OTHER,
    ],
  },
  {
    id: "q6_show_up",
    text: "How would you like to show up in your posts?",
    max: 1,
    box: "other",
    options: ["Face on camera", "My voice, no face", "Just my hands or the work", "Text and pictures only", "Not sure yet", OTHER],
  },
  {
    id: "q7_time",
    text: "How much time could you give this each week?",
    max: 1,
    box: "none",
    options: ["Under 1 hour", "1 to 3 hours", "3 to 5 hours", "More than 5 hours"],
  },
  {
    id: "q8_sell",
    text: "If you sold something one day, what would feel right?",
    max: 2,
    box: "other",
    options: [
      "A guide or checklist people download",
      "A short course or workshop",
      "My time (calls, help, or doing it for them)",
      "Templates or tools",
      "Something I make myself",
      "Not sure yet",
      OTHER,
    ],
  },
];

/** True when this card's typed box should show. */
export function boxShows(q: Question, picked: string[]): boolean {
  return q.box === "always" || (q.box === "other" && picked.includes(OTHER));
}

// The order the Copywriter set: what to post first, then who, free, sell.
export const SECTIONS = [
  { id: "what_to_post", title: "What to post about" },
  { id: "who_its_for", title: "Who it's for" },
  { id: "free_thing", title: "A free thing to give away" },
  { id: "something_to_sell", title: "Something to sell" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export type Idea = { title: string; why: string };
export type Lists = Record<SectionId, Idea[]>;

/** One answer, in the Product Lead's shape: the tapped labels, plus "something else". */
export type Answer = { picked: string[]; other: string };
export type Answers = Record<string, Answer>;

export const OTHER_MAX = 120;

const clean = (s: string, max: number) =>
  s.replace(/[\u0000-\u001F\u007F<>{}`]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/**
 * Keeps only real question ids and real option labels, and a short "something
 * else". A skipped question comes through empty, as the Product Lead's shape
 * allows. Null if every question is empty or the shape is wrong.
 */
export function cleanAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  const out: Answers = {};
  let any = false;
  for (const q of QUESTIONS) {
    const a = (input[q.id] || {}) as { picked?: unknown; other?: unknown };
    const picked = Array.isArray(a.picked)
      ? [...new Set(a.picked.filter((p): p is string => typeof p === "string" && q.options.includes(p)))].slice(0, q.max)
      : [];
    const other = q.box !== "none" && typeof a.other === "string" ? clean(a.other, OTHER_MAX) : "";
    if (picked.length || other) any = true;
    out[q.id] = { picked, other };
  }
  return any ? out : null;
}
