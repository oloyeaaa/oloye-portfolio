// The link cards on /start, Oloye's link-in-bio page (9 Nov 2026).
// Words: content/start/WORDS.md (Copywriter). To add a card later (/100 from
// 1 Dec, the founding group), add one entry here. `art` picks the small brand
// picture drawn in src/app/start/page.tsx; add a new one there if needed.

export type StartArt = "ideas" | "score";

export type StartLink = {
  href: string;
  label: string; // who it's for
  title: string;
  description: string;
  art: StartArt;
};

export const START_LINKS: StartLink[] = [
  {
    // Keep ?from=bio: the answer counting knows "bio" (Marketing Director, 9 Nov).
    href: "/what-to-post?from=bio",
    label: "For content creators",
    title: "Don't know what to post about?",
    description: "Answer a few quick questions. Get ideas for posts, a free thing to give away and something to sell.",
    art: "ideas",
  },
  {
    href: "/tools/lead-leak-check",
    label: "For business owners",
    title: "Losing leads and not sure where?",
    description: "6 quick questions. A score out of 100, your 3 biggest leaks and the first fix for each.",
    art: "score",
  },
];

export const START_FOOTNOTE = "Both free.";
