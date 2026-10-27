import { SOCIAL, LINKEDIN_URL, SITE_URL } from "./site";

/**
 * Everyone who writes for the blog. A post's `author` frontmatter is the key.
 * Bios are plain and true: nothing here that isn't.
 */
export type Author = {
  key: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  url: string;
  links: { name: string; href: string }[];
};

export const AUTHORS: Record<string, Author> = {
  oloye: {
    key: "oloye",
    name: "Oloye Adeosun",
    role: "Founder",
    bio: "Oloye builds simple automations that save small businesses time and money, and has been building marketing systems for over 3 years. He lives in Kent with his family, and the whole point is the same for him as for you: more time for the work and the people that matter.",
    image: "/images/brand/oloye-lime.jpg",
    url: SITE_URL,
    links: [
      { name: "Instagram", href: SOCIAL.instagram },
      { name: "TikTok", href: SOCIAL.tiktok },
      { name: "LinkedIn", href: LINKEDIN_URL },
    ],
  },
};

export function getAuthor(key?: string): Author {
  return AUTHORS[key || "oloye"] || AUTHORS.oloye;
}
