import { slugify } from "./posts";

/**
 * Blog categories follow the four blocks of a business, plus one for the tools.
 * A post's `category` in its frontmatter must match a name here exactly.
 */
export type Category = { name: string; slug: string; line: string };

const LIST: Omit<Category, "slug">[] = [
  { name: "Leads", line: "Catching every person who finds you, and answering them before they go cold." },
  { name: "Onboarding", line: "Getting new clients signed, paid and set up the same way every time." },
  { name: "Delivery", line: "Doing the work itself with less copying, chasing and rebuilding." },
  { name: "Retention", line: "Keeping clients coming back: reviews, referrals and quiet clients followed up." },
  { name: "Tools & systems", line: "The simple tools we use and how they join up." },
];

export const CATEGORIES: Category[] = LIST.map((c) => ({ ...c, slug: slugify(c.name) }));

export function getCategory(nameOrSlug?: string): Category | undefined {
  if (!nameOrSlug) return undefined;
  const key = slugify(nameOrSlug);
  return CATEGORIES.find((c) => c.slug === key);
}
