/**
 * Keywords, managed in one place.
 * Single source of truth for SEO, AEO, and GEO.
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
  "get rich",
  "quit your job",
  "escape the 9-5",
] as const;

export const PREFERRED_TERMS = [
  "product marketing",
  "marketing operations",
  "GTM strategy",
  "counter-positioning",
  "lifecycle automation",
  "the curb-cut effect",
  "lead scoring",
  "speed to lead",
] as const;

export type PageKeywords = {
  primary: string;
  supporting: string[];
  questions: string[];
};

export const KEYWORDS: Record<string, PageKeywords> = {
  home: {
    primary: "Product Marketing and Marketing Operations Leader",
    supporting: [
      "GTM strategy consultant",
      "counter-positioning framework",
      "marketing ops infrastructure",
      "accessible tech marketing",
      "the curb-cut effect in marketing",
      "B2B positioning teardowns",
    ],
    questions: [
      "What is the connection between product marketing and marketing operations?",
      "How does counter-positioning help challenger brands win?",
      "What is the Curb-Cut Effect in product marketing?",
      "How do you fix broken B2B lead scoring models?",
    ],
  },
  ventures: {
    primary: "GTM Signal Studio and Practical AI Hub",
    supporting: [
      "AI market signal intelligence",
      "competitor drift tracking",
      "digital product prompt systems",
      "no-code AI workflow automation",
    ],
    questions: [
      "What is GTM Signal Studio?",
      "What is Practical AI Hub?",
      "How does signal intelligence inform product marketing?",
    ],
  },
  about: {
    primary: "About Oloye Adeosun",
    supporting: [
      "Product Marketer UK",
      "Marketing Operations Leader",
      "Accessible Tech GTM",
      "PMO and Systems background",
    ],
    questions: [
      "Who is Oloye Adeosun?",
      "What is Oloye Adeosun's background?",
      "What companies does Oloye Adeosun advise or work with?",
    ],
  },
  blog: {
    primary: "Product Marketing and Operations Teardowns",
    supporting: [
      "GTM case studies",
      "positioning psychology",
      "revenue ops architectures",
      "accessible technology breakdowns",
    ],
    questions: [
      "What is the Oloye Adeosun marketing publication about?",
    ],
  },
};

export function metaKeywords(page: keyof typeof KEYWORDS): string[] {
  const k = KEYWORDS[page];
  if (!k) return [];
  return [k.primary, ...k.supporting];
}

export function findBannedTerms(text: string): string[] {
  const lower = text.toLowerCase();
  return BANNED_TERMS.filter((term) => lower.includes(term.toLowerCase()));
}
