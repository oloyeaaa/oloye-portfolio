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

export type Question = { id: string; text: string; max: number; options: string[] };

export const QUESTIONS: Question[] = [
  {
    id: "q1_day",
    text: "What do you spend most of your day doing?",
    max: 2,
    options: [
      "I look after people",
      "I fix or build things",
      "I teach or explain things",
      "I serve or sell to customers",
      "I sort out admin, money or numbers",
      "I make things (food, designs, words, photos)",
    ],
  },
  {
    id: "q2_years",
    text: "How long have you been doing it?",
    max: 1,
    options: ["Less than 2 years", "2 to 5 years", "5 to 10 years", "10 to 20 years", "More than 20 years"],
  },
  {
    id: "q3_come_to_you",
    text: "What do people come to you for?",
    max: 2,
    options: [
      "To fix a problem for them",
      "Advice before a big decision",
      "To show them how to do something",
      "A recommendation (what to buy, where to go)",
      "To calm them down or talk it through",
    ],
  },
  {
    id: "q4_hard_way",
    text: "What did you have to work out the hard way?",
    max: 2,
    options: [
      "A skill at work nobody taught me",
      "Money, bills or budgeting",
      "My health or body",
      "Starting again (new job, new town, new country)",
      "Being a parent or carer",
      "A tool, app or piece of software",
    ],
  },
  {
    id: "q5_five_years_ago",
    text: "Who were you five years ago?",
    max: 1,
    options: [
      "Just starting out in my job",
      "Stuck in a job I didn't like",
      "New to the country or the area",
      "A new parent or carer",
      "Studying or training",
      "About where I am now",
    ],
  },
  {
    id: "q6_show_up",
    text: "How would you like to show up in your posts?",
    max: 1,
    options: ["Face on camera", "My voice, no face", "Just my hands or the work", "Text and pictures only", "Not sure yet"],
  },
  {
    id: "q7_time",
    text: "How much time could you give it each week?",
    max: 1,
    options: ["Under 1 hour", "1 to 3 hours", "3 to 5 hours", "More than 5 hours"],
  },
  {
    id: "q8_sell",
    text: "If you sold something one day, what would feel right?",
    max: 2,
    options: [
      "A guide or checklist people download",
      "A short course or workshop",
      "My time (calls, help, done for them)",
      "Templates or tools",
      "Something I make by hand",
      "Not sure yet",
    ],
  },
];

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
    const other = typeof a.other === "string" ? clean(a.other, OTHER_MAX) : "";
    if (picked.length || other) any = true;
    out[q.id] = { picked, other };
  }
  return any ? out : null;
}

/** The answers as plain lines, for the Leads note. */
export function answersInWords(answers: Answers): string[] {
  return QUESTIONS.map((q) => {
    const a = answers[q.id];
    const parts = [...a.picked, ...(a.other ? [`Something else: ${a.other}`] : [])];
    return `${q.text} ${parts.length ? parts.join("; ") : "(skipped)"}`;
  });
}

/** Ideas a visitor sends back for "5 more": cleaned, capped. */
export function cleanShown(raw: unknown): Idea[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((i) => ({
      title: typeof i?.title === "string" ? clean(i.title, 120) : "",
      why: typeof i?.why === "string" ? clean(i.why, 200) : "",
    }))
    .filter((i) => i.title)
    .slice(0, 25);
}
