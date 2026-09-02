export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.oloye.co.uk";

export const SITE_NAME = "Oloye Adeosun";
export const SITE_SHORT_NAME = "Oloye";
export const SITE_LEGAL_NAME = "Oloye Adeosun";
export const SITE_TAGLINE = "The Psychology of Attention & AI-Powered Distribution";

export const SITE_DESCRIPTION =
  "Oloye Adeosun helps solopreneurs and builders escape the 'Build & Pray' trap by mastering buyer psychology, 0-dollar distribution, and AI-assisted workflows.";

export const AUTHOR = {
  name: "Oloye Adeosun",
  title: "Buyer Psychology & AI Distribution Strategist",
  url: "https://www.linkedin.com/in/oloyeadeosun/",
  email: "info@oloyeaa.com",
  secondaryEmail: "practicalaih@gmail.com",
};

export const SOCIAL = {
  youtube: "https://www.youtube.com/@oloyeadeosun",
  linkedin: "https://www.linkedin.com/in/oloyeadeosun/",
  tiktok: "https://www.tiktok.com/@practicalaihub1",
  instagram: "https://www.instagram.com/practicalaihub1",
};

export const VENTURES = {
  gss: {
    name: "GTM Signal Studio (GSS)",
    tagline: "AI-Powered GTM Signal Intelligence & Visibility Engine",
    description: "An operational intelligence system that monitors market signals, buyer intent shifts, and competitor movements to power proactive product marketing decisions.",
    status: "Active Product",
    badge: "B2B SaaS / GTM Intelligence",
  },
  practicalAI: {
    name: "Practical AI Hub",
    tagline: "Actionable AI Workflows & Digital Product Systems",
    description: "An educational workflow engine helping busy professionals and creators transform domain knowledge into scalable digital assets without code.",
    status: "Active Venture",
    badge: "AI Automation & Education",
    url: "/practical-ai-hub",
  }
};

export const NOTION_PACK_URL = process.env.NEXT_PUBLIC_NOTION_PACK_URL || "";
export const LINKEDIN_URL = "https://www.linkedin.com/in/oloyeadeosun/";
export const AVATAR_URL = `${SITE_URL}/images/oloye-avatar.png`;

export const OG_DEFAULT = {
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
};
