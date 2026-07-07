import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_DESCRIPTION,
  AUTHOR,
  LINKEDIN_URL,
  CALENDLY_URL,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#person`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: "Oloye",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: { "@id": PERSON_ID },
    sameAs: [LINKEDIN_URL, "https://www.gtmsignalstudio.com"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: AUTHOR.email,
      url: `${SITE_URL}/test-drive`,
      availableLanguage: "en",
    },
    knowsAbout: [
      "Agentic AI Systems",
      "AI Agents",
      "AI-Powered Customer Support",
      "AI First Response",
      "AI Automation for Small Business",
      "AI Receptionist",
      "AI Answering Service",
      "Small Business Automation",
    ],
    areaServed: "Global",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR.name,
    url: AUTHOR.url,
    email: AUTHOR.email,
    sameAs: [LINKEDIN_URL, "https://www.gtmsignalstudio.com"],
    worksFor: { "@id": ORG_ID },
    jobTitle: "Agentic AI Systems Builder; Founder, Oloye.",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
  };
}

export function webPageSchema({
  path,
  title,
  description,
  breadcrumb,
  type = "WebPage",
}: {
  path: string;
  title: string;
  description: string;
  breadcrumb?: Array<{ name: string; path: string }>;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en-GB",
    ...(breadcrumb ? { breadcrumb: breadcrumbSchema(breadcrumb) } : {}),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  serviceType,
  areaServed = "Global",
  audience,
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
  audience?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: { "@id": ORG_ID },
    areaServed,
    ...(audience
      ? {
          audience: {
            "@type": "Audience",
            audienceType: audience.join(", "),
          },
        }
      : {}),
  };
}

export function offerSchema({
  name,
  description,
  price,
  priceCurrency = "GBP",
  url,
}: {
  name: string;
  description: string;
  price: string;
  priceCurrency?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    price,
    priceCurrency,
    availability: "https://schema.org/InStock",
    url,
    seller: { "@id": ORG_ID },
  };
}

export function faqPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleSchema({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  keywords,
}: {
  path: string;
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    mainEntityOfPage: { "@id": `${SITE_URL}${path}#webpage` },
    headline,
    description,
    ...(image ? { image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(keywords && keywords.length ? { keywords: keywords.join(", ") } : {}),
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
  };
}

export function reservationActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: CALENDLY_URL,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Free Front Desk test",
    },
  };
}
