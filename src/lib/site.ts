export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oloye.co.uk";

export const SITE_NAME = "Oloye.";
export const SITE_LEGAL_NAME = "Oloye";
export const SITE_TAGLINE =
  "Agentic AI Systems that respond in under 60 seconds";
export const SITE_DESCRIPTION =
  "The Front Desk: a first-response agent that reads messages, replies in your voice in under 60 seconds, and does the next step. Books, quotes, refunds, dispatches.";

export const AUTHOR = {
  name: "Oloye Adeosun",
  url: "https://www.linkedin.com/in/oloyeadeosun/",
  email: "oloyedeadeosun2.0@gmail.com",
};

export const CALENDLY_URL = "https://calendly.com/oloye-getclarioiq/audit";
export const LINKEDIN_URL = "https://www.linkedin.com/in/oloyeadeosun/";
export const AVATAR_URL = `${SITE_URL}/images/oloye-avatar.png`;

export const VERTICALS = [
  "plumbers",
  "coaches",
  "salons",
  "ecom",
  "real-estate",
  "restaurants",
] as const;

export const OG_DEFAULT = {
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
};
