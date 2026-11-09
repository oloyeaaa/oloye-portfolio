import { POST_FREEBIES, type PostFreebie } from "./postFreebies";

/**
 * The one free offer on a blog post, set by its category (Oloye, 6 Nov 2026):
 * Leads gets the Lead leak check, Tools and AI gets TOOLS, Content gets What
 * to post (was LOOP, swapped 9 Nov, Oloye's yes via the Marketing Director),
 * everything else gets the 10 tasks checklist. The post's form and pop-up both
 * use this.
 *
 * A post's `freebie` frontmatter overrides it. Only set one on purpose.
 */
export type PostOffer =
  | { kind: "tool"; title: string; line: string; url: string; button: string }
  | { kind: "form"; title: string; line: string; freebie: PostFreebie };

const LEAK_CHECK: PostOffer = {
  kind: "tool",
  title: "The Lead leak check",
  line: "6 quick questions. A score out of 100, your 3 biggest leaks, and the first fix for each. About 2 minutes.",
  url: "/tools/lead-leak-check",
  button: "Check your leads",
};

// Words from the Copywriter's /start card (content/start/WORDS.md). The ?from=blog
// tag is fixed, so the answer counting shows "blog" (toolUrlFrom keeps it).
const WHAT_TO_POST: PostOffer = {
  kind: "tool",
  title: "Don't know what to post about?",
  line: "Answer a few quick questions. Get ideas for posts, a free thing to give away and something to sell.",
  url: "/what-to-post?from=blog",
  button: "Get your ideas",
};

function form(key: string): PostOffer {
  const freebie = POST_FREEBIES[key] || POST_FREEBIES.checklist;
  return { kind: "form", title: freebie.title, line: freebie.line, freebie };
}

export function getPostOffer(category: string, freebie?: string): PostOffer {
  if (freebie && POST_FREEBIES[freebie]) return form(freebie);
  if (category === "Leads") return LEAK_CHECK;
  if (category === "Tools and AI") return form("TOOLS");
  if (category === "Content") return WHAT_TO_POST;
  return form("checklist");
}

/** The tool link, with the post it came from, so Leads shows which posts send people.
 * A link that already has its own tag (What to post: ?from=blog) keeps it. */
export function toolUrlFrom(url: string, slug: string): string {
  if (url.includes("?")) return url;
  return `${url}?from=${encodeURIComponent(slug)}`;
}
