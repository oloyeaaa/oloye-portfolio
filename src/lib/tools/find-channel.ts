/**
 * Find your channel (oloye.co.uk/find-your-channel), 9 Nov 2026.
 *
 * Content creators answer a few tap-to-answer questions, one card at a time.
 * Claude turns the answers into four lists of five ideas: who it's for, a free
 * thing to give, something to sell, and what the channel is about.
 *
 * PLACEHOLDER QUESTIONS. The real ones come from the Product Lead
 * (Projects/live-find-your-channel/). Swap them in here: the page, the API and
 * the email all read from this list.
 */

export type Option = { id: string; label: string };
export type Question = { id: string; text: string; hint?: string; multi?: boolean; other?: boolean; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    id: "known",
    text: "What do people already come to you for?",
    hint: "Pick as many as you like.",
    multi: true,
    other: true,
    options: [
      { id: "work", label: "Help with something from my job" },
      { id: "money", label: "Money, budgets or saving" },
      { id: "fitness", label: "Fitness, food or health" },
      { id: "family", label: "Family, kids or home life" },
      { id: "tech", label: "Tech, apps or AI" },
      { id: "faith", label: "Faith or life advice" },
    ],
  },
  {
    id: "who",
    text: "Who do you most like helping?",
    other: true,
    options: [
      { id: "starting", label: "People just starting out" },
      { id: "stuck", label: "People who feel stuck" },
      { id: "busy", label: "Busy parents" },
      { id: "business", label: "Small business owners" },
      { id: "career", label: "People changing careers" },
    ],
  },
  {
    id: "camera",
    text: "How do you feel about being on camera?",
    options: [
      { id: "fine", label: "Happy to show my face" },
      { id: "voice", label: "Voice is fine, face less so" },
      { id: "none", label: "I'd rather not be seen or heard" },
    ],
  },
  {
    id: "time",
    text: "How much time can you give it each week?",
    options: [
      { id: "1", label: "About an hour" },
      { id: "3", label: "2 to 3 hours" },
      { id: "5", label: "5 hours or more" },
    ],
  },
];

export const SECTIONS = [
  { id: "audience", title: "Who it's for", eyebrow: "Target audience" },
  { id: "magnet", title: "A free thing to give", eyebrow: "Lead magnet" },
  { id: "product", title: "Something to sell", eyebrow: "Digital product" },
  { id: "theme", title: "What your channel is about", eyebrow: "Channel theme" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
export type Idea = { title: string; line: string };
export type Results = Record<SectionId, Idea[]>;

/** One answer: the options they tapped, plus anything typed in "something else". */
export type Answer = { picks: string[]; other: string };
export type Answers = Record<string, Answer>;

const OTHER_MAX = 120;

/** Keeps only real question ids and option ids, and a short "something else". */
export function cleanAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  const out: Answers = {};
  for (const q of QUESTIONS) {
    const a = input[q.id] as { picks?: unknown; other?: unknown } | undefined;
    if (!a || typeof a !== "object") return null;
    const ids = new Set(q.options.map((o) => o.id));
    const picks = Array.isArray(a.picks) ? a.picks.filter((p): p is string => typeof p === "string" && ids.has(p)) : [];
    const other =
      q.other && typeof a.other === "string"
        ? a.other.replace(/[\u0000-\u001F\u007F<>{}`]/g, " ").replace(/\s+/g, " ").trim().slice(0, OTHER_MAX)
        : "";
    if (!picks.length && !other) return null;
    out[q.id] = { picks: q.multi ? picks : picks.slice(0, 1), other };
  }
  return out;
}

/** The answers as plain lines, for Claude, the Leads note and the email. */
export function answersInWords(answers: Answers): { question: string; answer: string }[] {
  return QUESTIONS.map((q) => {
    const a = answers[q.id];
    const labels = a.picks.map((id) => q.options.find((o) => o.id === id)?.label || id);
    if (a.other) labels.push(`Something else: ${a.other}`);
    return { question: q.text, answer: labels.join("; ") };
  });
}

/** Cleans a list of idea titles a visitor sends back (for "Show me 5 more"). */
export function cleanShown(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is string => typeof t === "string")
    .map((t) => t.replace(/[\u0000-\u001F\u007F<>{}`]/g, " ").trim().slice(0, 120))
    .filter(Boolean)
    .slice(0, 40);
}
