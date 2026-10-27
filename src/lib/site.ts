export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oloye.co.uk";

export const SITE_NAME = "Oloye Adeosun";
export const SITE_SHORT_NAME = "Oloye";
export const SITE_LEGAL_NAME = "Oloye Adeosun";
export const SITE_TAGLINE = "Simple automations that save your business time and money";

export const SITE_DESCRIPTION =
  "Simple automations that save small businesses time and money. We take the repeat jobs off your plate, from new leads to clients who come back.";

export const AUTHOR = {
  name: "Oloye Adeosun",
  title: "Founder, process automation for small businesses",
  url: `${SITE_URL}/about`,
};

export const SOCIAL = {
  youtube: "https://www.youtube.com/@oloyeadeosun",
  linkedin: "https://www.linkedin.com/in/oloyeadeosun/",
  tiktok: "https://www.tiktok.com/@oloyeadeosun",
  instagram: "https://www.instagram.com/oloyeadeosun",
};

// PLACEHOLDER: swap in the real booking link (Calendly, Google booking page) when Oloye sends it.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "#book-a-call";
export const CHECKLIST_URL = "/free/10-jobs-to-automate-first";

export const NOTION_PACK_URL = process.env.NEXT_PUBLIC_NOTION_PACK_URL || "";
export const LINKEDIN_URL = "https://www.linkedin.com/in/oloyeadeosun/";
export const AVATAR_URL = `${SITE_URL}/images/brand/oloye-lime.jpg`;

export const OG_DEFAULT = {
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} • ${SITE_TAGLINE}`,
};
