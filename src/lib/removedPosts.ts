// Blog posts taken off the site (Oloye's yes, 3 Nov 2026: shared notes blog-cleanup-45.md).
// They still exist in Airtable (Status no longer Published from go-live day) and are
// never deleted. The site skips them even if Airtable still says Published, and each
// old address sends people to the closest live page with a permanent redirect
// (next.config.ts), so old links and Google traffic land somewhere useful.
// Plain data with no imports, so next.config.ts can read it too.

export const REMOVED_POSTS: { slug: string; to: string }[] = [
  { slug: "24-7-ai-receptionist", to: "/for/small-business" },
  { slug: "5-minute-rule-owner-operated-business", to: "/for/small-business" },
  { slug: "agentic-ai-architecture", to: "/for/small-business" },
  { slug: "agentic-ai-thresholds-human-in-the-loop", to: "/for/small-business" },
  { slug: "agentic-ai-use-cases-owner-operators", to: "/for/small-business" },
  { slug: "agentic-ai-vs-autonomous-ai", to: "/for/small-business" },
  { slug: "agentic-ai-vs-llm-agents", to: "/for/small-business" },
  { slug: "agentic-ai-vs-rpa", to: "/for/small-business" },
  { slug: "ai-answering-service-electricians", to: "/for/small-business" },
  { slug: "ai-booking-agent-coaches", to: "/for/small-business" },
  { slug: "ai-receptionist-aesthetics-clinics", to: "/for/small-business" },
  { slug: "ai-receptionist-dental-practices", to: "/for/small-business" },
  { slug: "ai-receptionist-for-coaches", to: "/for/small-business" },
  { slug: "ai-receptionist-for-hvac", to: "/for/small-business" },
  { slug: "ai-receptionist-for-law-firms", to: "/for/small-business" },
  { slug: "ai-receptionist-for-restaurants", to: "/for/small-business" },
  { slug: "ai-receptionist-for-salons", to: "/for/small-business" },
  { slug: "ai-receptionist-medical-practices", to: "/for/small-business" },
  { slug: "ai-receptionist-real-estate", to: "/for/small-business" },
  { slug: "are-digital-products-saturated-2026", to: "/blog" },
  { slug: "ai-receptionist-for-plumbers", to: "/for/plumbers" },
  { slug: "ai-side-hustle-full-time-job", to: "/blog" },
  { slug: "ai-tools-create-sell-digital-products", to: "/blog" },
  { slug: "best-platform-sell-digital-products", to: "/blog" },
  { slug: "build-email-list-sell-digital-products", to: "/blog" },
  { slug: "find-target-audience-digital-product", to: "/blog" },
  { slug: "first-digital-product-sale-no-audience", to: "/blog" },
  { slug: "first-paying-client-with-ai", to: "/blog" },
  { slug: "how-long-digital-product-takes", to: "/blog" },
  { slug: "how-much-to-charge-ai-services", to: "/blog" },
  { slug: "how-to-build-agentic-ai-system", to: "/for/small-business" },
  { slug: "how-to-price-your-first-digital-product", to: "/blog" },
  { slug: "how-to-sell-ai-digital-products", to: "/blog" },
  { slug: "how-to-write-sales-page-digital-product", to: "/blog" },
  { slug: "testimonials-with-no-customers", to: "/blog" },
  { slug: "validate-digital-product-idea", to: "/blog" },
  { slug: "week-of-content-in-45-minutes", to: "/blog" },
  { slug: "what-digital-product-should-i-create", to: "/blog" },
  { slug: "why-buyers-dont-finish-digital-products", to: "/blog" },
  { slug: "why-my-digital-product-isnt-selling", to: "/blog" },
  { slug: "write-digital-product-with-ai", to: "/blog" },
  { slug: "24-7-answering-service-hvac", to: "/for/small-business" },
  { slug: "ai-answering-service-small-business", to: "/for/small-business" },
];

export const REMOVED_POST_SLUGS = new Set(REMOVED_POSTS.map((p) => p.slug));
