/**
 * Keywords, managed in one place.
 *
 * Why this file exists: keywords were scattered across page files and drifted.
 * One page targets a phrase, another targets a different one, and nothing
 * records which was deliberate. This is the single source. Change it here.
 *
 * How to use it:
 *   - `primary` is the ONE phrase a page is trying to win. It belongs in the
 *     <title>, the <h1>, and the first 100 words. One per page, never two.
 *   - `supporting` are the phrases that should appear naturally in H2s and body
 *     copy. Never force them. A sentence that reads badly loses more than the
 *     keyword gains.
 *   - `questions` are for AEO and GEO. Answer engines quote the sentence that
 *     directly answers a question, so each of these should exist on the page as
 *     a heading with a plain, self-contained answer under it.
 *
 * The meta `keywords` tag itself carries almost no weight with Google now. Its
 * real job here is to keep the copy on target and reviewable in one place.
 */

/**
 * BANNED. These are not taste, they are measured.
 *
 * "passive income" and "make money online" pull traffic that is 22% Pakistan,
 * 12% India and 7.8% US. Wrong audience, and an audience that does not buy.
 * Ranking for these would actively damage the business, so they must never
 * appear in a title, heading, meta description or URL.
 *
 * Full list and reasoning: Oloye-OS/1-Foundation/MISSION.md, "The words".
 */
export const BANNED_TERMS = [
  "passive income",
  "make money online",
  "10x",
  "unlock",
  "secret",
  "hack",
  "game-changer",
  "effortless",
  "while you sleep",
  "six figures",
  "gurus won't tell you",
  "get rich",
  "quit your job",
  "escape the 9-5",
] as const;

/** The words we use instead. These are how the audience actually talks. */
export const PREFERRED_TERMS = [
  "extra income",
  "side income",
  "what it actually cost",
  "what happened",
  "from zero",
  "without an audience",
  "first sale",
  "the boring bit",
  "I tried",
] as const;

export type PageKeywords = {
  primary: string;
  supporting: string[];
  questions: string[];
};

export const KEYWORDS: Record<string, PageKeywords> = {
  home: {
    primary: "use AI to make extra income",
    supporting: [
      "AI side income",
      "extra income with AI",
      "AI for people who are not technical",
      "free AI tools for beginners",
      "start a side income with AI",
    ],
    questions: [
      "What is Practical AI Hub?",
      "Do I need to be technical to use AI to make money?",
      "How long does it take to build something you can sell with AI?",
      "What can I actually sell?",
      "Is it too late to start making money with AI?",
      "How do I know if my idea is any good before I waste weeks on it?",
    ],
  },
  free: {
    primary: "free AI tools to build extra income",
    supporting: [
      "free AI prompts",
      "validate a product idea",
      "AI content ideas",
      "post without showing your face",
      "build a digital product with AI",
    ],
    questions: [
      "What do I get, and is it really free?",
      "Do I need to install anything?",
      "Which AI do these work in?",
      "Where should I start?",
    ],
  },
  blog: {
    primary: "using AI to build extra income",
    supporting: ["AI side income guides", "practical AI tutorials"],
    questions: ["What is this blog about?"],
  },
  skills: {
    primary: "free Claude skills",
    supporting: ["AI automation skills", "Claude Code skills"],
    questions: ["What is a skill and how do I use one?"],
  },
};

/** Flatten a page's keywords into the Next.js metadata `keywords` field. */
export function metaKeywords(page: keyof typeof KEYWORDS): string[] {
  const k = KEYWORDS[page];
  return [k.primary, ...k.supporting];
}

/**
 * Guard. Run this over any copy before it ships.
 * Returns the banned terms found, so a build or a review can fail loudly
 * rather than quietly ranking for the wrong audience.
 */
export function findBannedTerms(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_TERMS.filter((term) => lower.includes(term.toLowerCase()));
}
