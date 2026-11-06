import { POST_FREEBIES, type PostFreebie } from "./postFreebies";

/**
 * The one free offer on a blog post, set by its category (Oloye, 6 Nov 2026):
 * Leads gets the Lead leak check, Tools and AI gets TOOLS, everything else gets
 * the 10 tasks checklist. The post's form and pop-up both use this.
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

function form(key: string): PostOffer {
  const freebie = POST_FREEBIES[key] || POST_FREEBIES.checklist;
  return { kind: "form", title: freebie.title, line: freebie.line, freebie };
}

export function getPostOffer(category: string, freebie?: string): PostOffer {
  if (freebie && POST_FREEBIES[freebie]) return form(freebie);
  if (category === "Leads") return LEAK_CHECK;
  if (category === "Tools and AI") return form("TOOLS");
  return form("checklist");
}

/** The tool link, with the post it came from, so Leads shows which posts send people. */
export function toolUrlFrom(url: string, slug: string): string {
  return `${url}?from=${encodeURIComponent(slug)}`;
}
