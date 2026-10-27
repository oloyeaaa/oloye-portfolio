/**
 * The free thing each post offers in its mid-post form. A post's `freebie`
 * frontmatter is the key. Links are the shared Drive files from
 * content/free-things/links.json (anyone with the link can view).
 */
export type PostFreebie = { key: string; title: string; line: string; url: string; kind: string };

export const POST_FREEBIES: Record<string, PostFreebie> = {
  checklist: {
    key: "checklist",
    title: "10 jobs to automate first",
    line: "The repeat jobs most businesses can hand over first, and what each one gives you back.",
    url: "/free/10-jobs-to-automate-first",
    kind: "checklist",
  },
  TABLE: {
    key: "TABLE",
    title: "The leads table, ready to copy",
    line: "One row for every person who finds you, so you can actually email them.",
    url: "https://drive.google.com/file/d/1gtgVZQQHkCxsBHCZtfD414B3Yv8MKFVq/view",
    kind: "guide",
  },
  TOOLS: {
    key: "TOOLS",
    title: "7 tools, one job each",
    line: "Stop paying for tools you never open. Each one does one job.",
    url: "https://drive.google.com/file/d/1-u7xWxBepBTVV8G8NHzdFY7ry6boPRC-/view",
    kind: "guide",
  },
  PIECES: {
    key: "PIECES",
    title: "The 3-piece starter checklist",
    line: "Automation feels too big? Start with three pieces and build from there.",
    url: "https://drive.google.com/file/d/1kJ2fw8XycuWPG-OY3M3QeycYdMsI3Pmk/view",
    kind: "checklist",
  },
  LOOP: {
    key: "LOOP",
    title: "The daily loop on one page",
    line: "Make one piece, then use it everywhere. The whole routine on a single page.",
    url: "https://drive.google.com/file/d/14aEAixsK-X7RMOEpMwbkL-R66klIxUsj/view",
    kind: "guide",
  },
};

export function getPostFreebie(key?: string): PostFreebie {
  return (key && POST_FREEBIES[key]) || POST_FREEBIES.checklist;
}
