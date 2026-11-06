import { slugify } from "./posts";

/**
 * The five blog categories (set 3 Nov 2026, replacing Leads / Onboarding /
 * Delivery / Retention / Tools & systems; Content added 6 Nov). A post's `category` must match a
 * name here, or one of its `aliases` (older names still in some posts).
 * Copy is the Copywriter's (shared notes seo-pages/08-blog-categories.md).
 * `links` are the Google pages and case studies each category points to, so a
 * category with no posts yet is never an empty page.
 */
export type Category = {
  name: string;
  slug: string;
  /** One line for the chips and old uses. */
  line: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  links: { label: string; href: string }[];
  aliases?: string[];
};

const LIST: Omit<Category, "slug">[] = [
  {
    name: "Leads",
    line: "Catching and answering enquiries.",
    title: "Lead Automation for Small Businesses",
    description:
      "Simple lead automation for small businesses: catch every enquiry in one list and answer it fast, without copying names manually. Step-by-step guides.",
    h1: "Leads: catch every enquiry, answer it fast.",
    intro:
      "An enquiry goes cold fast. These guides show how to save every new lead in one list and send the first reply on its own, with tools like forms, Airtable and Gmail. Less copying, faster answers, more work won.",
    links: [
      { label: "Small business automation", href: "/for/small-business" },
      { label: "Automation for plumbers", href: "/for/plumbers" },
      { label: "Case study: website forms into one lead list", href: "/case-studies/website-forms-to-lead-list" },
    ],
  },
  {
    name: "Clients",
    line: "Onboarding, folders and reviews.",
    title: "Client Onboarding and Reviews, Automated",
    description:
      "Automate the client side of your small business: onboarding, a folder for every new client, and a review request after the work. Simple how-tos.",
    h1: "Clients: a good start, and a review at the end.",
    intro:
      "Every new client should get the same welcome, the same folder and the same ask for a review when the work is done. These guides show how to set up those workflows once, so they run for every client. You save time, and nobody gets forgotten.",
    links: [
      { label: "Automate client onboarding", href: "/automate/client-onboarding" },
      { label: "Automatic client folders", href: "/automate/client-folders" },
      { label: "How to ask for Google reviews", href: "/automate/google-review-requests" },
    ],
    aliases: ["Onboarding", "Retention"],
  },
  {
    name: "Admin and invoices",
    line: "Task emails, chasing payment, repeat work.",
    title: "Automate Admin and Invoice Reminders",
    description:
      "Cut the repeat admin in your small business: daily task emails, invoice reminders and payment chasing that run on their own. Get your evenings back.",
    h1: "Admin and invoices: the repeat work, off your plate.",
    intro:
      "The same emails, the same reminders, the same chasing for payment. These guides show how to automate the admin you do every week, so the tasks get done on time and invoices get paid sooner. Fewer evenings on paperwork.",
    links: [
      { label: "Case study: daily task emails", href: "/case-studies/daily-task-emails" },
      { label: "Automation ROI calculator", href: "/tools/automation-roi-calculator" },
    ],
    aliases: ["Delivery"],
  },
  {
    name: "Tools and AI",
    line: "How-tos with Make, Airtable and Claude.",
    title: "Make, Airtable and Claude How-To Guides",
    description:
      "Plain-English how-tos for Make, Airtable and Claude: join up the tools you know and build simple automations for your small business. No code needed.",
    h1: "Tools and AI: plain-English how-tos.",
    intro:
      "Make passes information from one app to the next, Airtable keeps your list, and Claude writes the first drafts. These guides show how to use them together, step by step. AI is a tool inside the workflow, not the point of it.",
    links: [{ label: "Case study: a team of AI agents", href: "/case-studies/ai-team" }],
    aliases: ["Tools & systems", "Automation & Systems"],
  },
  {
    name: "Content",
    line: "Turning posts into people on your own list.",
    title: "Turn Content Into Leads and an Email List",
    description:
      "Turn the content you post into leads you keep. Guides for small business owners: get people from your posts onto your own email list, in one system.",
    h1: "Content: turn your posts into people on your list.",
    intro:
      "Someone finds you through a post, likes it, then scrolls on, and you have no way to reach them again. These guides show how to move people from your content onto your own email list and into one system, with tools like forms, Airtable and MailerLite. You keep them, whatever the app does next.",
    links: [
      { label: "Lead Leak Check: free tool", href: "/tools/lead-leak-check" },
      { label: "Case study: website forms into one lead list", href: "/case-studies/website-forms-to-lead-list" },
      { label: "Small business automation", href: "/for/small-business" },
    ],
  },
];

export const CATEGORIES: Category[] = LIST.map((c) => ({ ...c, slug: slugify(c.name) }));

export function getCategory(nameOrSlug?: string): Category | undefined {
  if (!nameOrSlug) return undefined;
  const key = slugify(nameOrSlug);
  return CATEGORIES.find((c) => c.slug === key || c.aliases?.some((a) => slugify(a) === key));
}
