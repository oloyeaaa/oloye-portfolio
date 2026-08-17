export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oloye.co.uk";

// Rebranded 2026-08-17. One brand, every platform: Practical AI Hub.
// This used to be "Oloye." with the tagline "Agentic AI Systems that respond
// in under 60 seconds", selling The Front Desk to owner-operated businesses.
// That product is retired and that audience was ruled out. See
// Oloye-OS/1-Foundation/MISSION.md.
export const SITE_NAME = "Oloye | Practical AI Hub";
// The brand short name, for tight spaces like the header and the wordmark.
export const SITE_SHORT_NAME = "Practical AI Hub";
export const SITE_LEGAL_NAME = "Practical AI Hub";
// The person presents the brand. The brand is not the person's name.
export const SITE_TAGLINE = "Use AI to build extra income";

// Written to be lifted. Answer engines quote whole sentences, so the first one
// has to stand on its own and say who this is for without any surrounding page.
export const SITE_DESCRIPTION =
  "Practical AI Hub helps people with a full-time job use AI to build extra income. Free tools, plain steps, and honest numbers, for people who are not technical and do not have months to spare.";

export const AUTHOR = {
  name: "Oloye Adeosun",
  url: "https://www.linkedin.com/in/oloyeadeosun/",
  email: "practicalaih@gmail.com",
};

export const SOCIAL = {
  youtube: "https://www.youtube.com/@practicalaihub1",
  tiktok: "https://www.tiktok.com/@practicalaihub1",
  instagram: "https://www.instagram.com/practicalaihub1",
};

/**
 * The free tools pack in Notion, the thing the email capture hands over.
 *
 * This must be the PUBLIC share URL with "Duplicate as template" turned on,
 * not the app.notion.com link, which only Oloye can open. Set it in Vercel as
 * NEXT_PUBLIC_NOTION_PACK_URL so it can be changed without a deploy.
 *
 * Until it is set, the signup form still captures the email and simply does
 * not show a link, rather than sending people to a page they cannot open.
 */
export const NOTION_PACK_URL = process.env.NEXT_PUBLIC_NOTION_PACK_URL || "";

export const LINKEDIN_URL = "https://www.linkedin.com/in/oloyeadeosun/";
export const AVATAR_URL = `${SITE_URL}/images/oloye-avatar.png`;

export const OG_DEFAULT = {
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
};
