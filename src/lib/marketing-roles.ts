/**
 * The Marketing Career Tier List — the data behind /marketing-career-tier-list.
 *
 * EVERY figure here has a named source. Nothing is estimated, nothing is
 * rounded up, nothing is repeated from a recruiter page with no method.
 * If a number is not in `1-Foundation/proof/stat-library.md` in the vault, it
 * does not belong in this file.
 *
 * Gathered 2026-08-24. Salary data ages fast and Marketing Week reports UK
 * marketing pay FELL in 2026, so re-check before the next update.
 *
 * Deliberately NOT used: recruiter salary-guide landing pages with no stated
 * method. One quotes marketing automation at £50k–£75k where Robert Half's
 * placement data puts the median at £35,500.
 */

export type Tier = "S" | "A" | "B" | "C" | "ENTRY";
export type Door = "getting-in" | "already-in";
export type AiRisk = "low" | "medium" | "high" | "unknown";
export type Demand = "growing" | "steady" | "squeezed";

export interface Role {
  slug: string;
  name: string;
  tier: Tier;
  /** UK median in £. null where no credible source publishes one. */
  median: number | null;
  /** What to show when there is no median. */
  medianLabel?: string;
  low?: number;
  high?: number;
  source: string;
  /** Said out loud when the sourcing is weaker than the rest. */
  sourceCaveat?: string;
  whatItIs: string;
  /** Can you get in from outside marketing, or do you arrive from elsewhere? */
  entry: "outside" | "arrive";
  entryNote: string;
  aiRisk: AiRisk;
  aiNote: string;
  demand: Demand;
  demandNote: string;
  verdict: string;
  doors: Door[];
}

export const TIER_META: Record<Tier, { label: string; blurb: string; color: string }> = {
  S: { label: "S", blurb: "The best bets right now", color: "#C6F23C" },
  A: { label: "A", blurb: "Good, with a real caveat", color: "#34E0D2" },
  B: { label: "B", blurb: "Solid and unglamorous", color: "#7FA6E8" },
  C: { label: "C", blurb: "Be honest about these", color: "#F0794E" },
  ENTRY: { label: "Door", blurb: "Where most people actually start", color: "#8A8F98" },
};

export const AI_RISK_META: Record<AiRisk, { label: string; color: string }> = {
  low: { label: "Low AI risk", color: "#C6F23C" },
  medium: { label: "Some AI risk", color: "#7FA6E8" },
  high: { label: "High AI risk", color: "#F0794E" },
  unknown: { label: "Nobody knows", color: "#E8B33A" },
};

export const DEMAND_META: Record<Demand, { label: string; color: string }> = {
  growing: { label: "Hiring is growing", color: "#C6F23C" },
  steady: { label: "Steady", color: "#7FA6E8" },
  squeezed: { label: "Being squeezed", color: "#F0794E" },
};

export const ROLES: Role[] = [
  {
    slug: "product-marketing",
    name: "Product marketing",
    tier: "S",
    median: 63157,
    low: 47973,
    high: 85445,
    source: "Glassdoor UK",
    sourceCaveat:
      "This is the weakest-sourced number on the board. Glassdoor says £63,157, IT Jobs Watch says £65,000, Indeed says £56,284 and PayScale says £46,213. That is a £19,000 spread, so treat it as a range, not a fact.",
    whatItIs:
      "Working out who a product is for, why they should care, and what to say first. Then arming everyone else with it.",
    entry: "arrive",
    entryNote:
      "You almost never start here. People arrive after two to four years in content, campaigns or sales.",
    aiRisk: "low",
    aiNote:
      "The job is judgment built on talking to customers and knowing the business. That is the hardest thing on this board to hand to a tool.",
    demand: "steady",
    demandNote: "Not a boom, but these roles hold their value when budgets tighten.",
    verdict: "The best place to aim. Not the best place to start.",
    doors: ["already-in"],
  },
  {
    slug: "demand-gen-ppc-manager",
    name: "Demand generation / PPC manager",
    tier: "S",
    median: 56950,
    low: 48188,
    high: 70092,
    source: "Ashdown Group, July 2025",
    whatItIs:
      "Owning the paid channels and the pipeline they produce. The lane closest to actual revenue.",
    entry: "arrive",
    entryNote: "Usually two to three years up from a PPC or campaign executive role.",
    aiRisk: "medium",
    aiNote:
      "Platforms automate more of the button-pressing every year. What survives is strategy and creative testing, not campaign setup.",
    demand: "growing",
    demandNote:
      "Michael Page names demand generation as one of the two most sought-after skill sets in 2026.",
    verdict: "If you want to be the last person made redundant, get close to the money.",
    doors: ["already-in"],
  },
  {
    slug: "crm-lifecycle-manager",
    name: "CRM / lifecycle manager",
    tier: "S",
    median: 52569,
    low: 43807,
    high: 65711,
    source: "Ashdown Group, July 2025",
    whatItIs:
      "Owning the emails, the journeys, the data and the automation. The plumbing of a marketing team.",
    entry: "arrive",
    entryNote:
      "Reachable from an email or CRM executive role, or sideways from operations and data.",
    aiRisk: "low",
    aiNote:
      "Hard to automate away, because it already is the automation. Someone has to own the system and the data.",
    demand: "growing",
    demandNote:
      "Recruiters told Marketing Week that performance, CRM and data were seeing a lot of movement while other functions were quiet.",
    verdict:
      "The most underrated lane in marketing. Boring reputation, which is exactly why the competition is thin.",
    doors: ["already-in"],
  },
  {
    slug: "seo-manager",
    name: "SEO manager",
    tier: "A",
    median: 61330,
    low: 52569,
    high: 70092,
    source: "Ashdown Group, July 2025",
    whatItIs:
      "Getting a business found in search, and increasingly in whatever replaces search.",
    entry: "arrive",
    entryNote:
      "From an SEO executive role, median £42,055. One of the clearest ladders on the board.",
    aiRisk: "unknown",
    aiNote:
      "The biggest question mark here. AI is changing how people find things and nobody credible can tell you what this job looks like in three years. Anyone who says otherwise is guessing.",
    demand: "steady",
    demandNote: "Still hiring, but the ground is moving under it.",
    verdict:
      "Best craft pay on the board, biggest unknown attached to it. Go in with your eyes open and keep a foot in something else.",
    doors: ["already-in"],
  },
  {
    slug: "insights-analyst",
    name: "Marketing analyst / insight",
    tier: "A",
    median: 41750,
    low: 32250,
    high: 59000,
    source: "Robert Half 2026 UK Salary Guide",
    whatItIs:
      "Turning marketing data into decisions. Working out what actually happened and what to do next.",
    entry: "outside",
    entryNote:
      "One of the few genuinely enterable from outside if you can already handle data. Finance, ops and reporting backgrounds transfer.",
    aiRisk: "low",
    aiNote:
      "AI makes an analyst faster. It does not replace the person deciding what is worth measuring.",
    demand: "growing",
    demandNote: "Named alongside performance and CRM as an area with real movement.",
    verdict:
      "Not the top pay, but the widest ceiling on the board: £32,250 up to £59,000 around a £41,750 median.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "ppc-executive",
    name: "PPC executive",
    tier: "A",
    median: 39427,
    low: 30665,
    high: 43807,
    source: "Ashdown Group, July 2025",
    whatItIs: "Running the paid campaigns day to day. Hands on the keyboard.",
    entry: "outside",
    entryNote:
      "Genuinely enterable with a certification and a portfolio of your own small campaigns.",
    aiRisk: "medium",
    aiNote: "The setup work is being automated. The testing and the judgment are not.",
    demand: "growing",
    demandNote: "Paid roles keep hiring because the results are countable.",
    verdict:
      "The best climb on the whole board: £17,523 between executive and manager. Measurable work means your value is never in doubt at review time.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "brand-manager",
    name: "Brand manager",
    tier: "B",
    median: 50817,
    low: 44684,
    high: 65711,
    source: "Ashdown Group, July 2025",
    whatItIs: "Owning what a brand means, how it looks and how it shows up.",
    entry: "arrive",
    entryNote: "Hard to enter. Usually an internal move, and often FMCG.",
    aiRisk: "low",
    aiNote: "Judgment and taste, which is not the part AI is taking.",
    demand: "steady",
    demandNote:
      "Recruiters report brand roles starting to come back after a thin couple of years, but there are still far more people who want them than there are jobs.",
    verdict:
      "Good job, bad odds. B tier on availability, not on quality. FMCG pay also fell from £81,499 to £77,926.",
    doors: ["already-in"],
  },
  {
    slug: "campaign-manager",
    name: "Campaign manager",
    tier: "B",
    median: 46436,
    low: 39427,
    high: 56950,
    source: "Ashdown Group, July 2025",
    whatItIs:
      "Making the campaign actually happen. Deadlines, dependencies, chasing people, getting it out the door.",
    entry: "outside",
    entryNote:
      "The easiest honest door in from outside marketing. If you come from project management, operations or admin, this is the same muscle pointed at a different thing.",
    aiRisk: "medium",
    aiNote: "Tools take the admin. They do not chase a designer who has gone quiet.",
    demand: "steady",
    demandNote: "Nobody dreams of this job and every team needs one.",
    verdict:
      "The most realistic sideways step for anyone with a non-marketing background. I came from ten years of project management, and this is the door I would use.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "content-manager",
    name: "Content marketing manager",
    tier: "B",
    median: 42055,
    low: 35046,
    high: 52569,
    source: "Ashdown Group, July 2025",
    whatItIs: "Planning, commissioning and running the content a business puts out.",
    entry: "outside",
    entryNote: "Enterable if you can show your own published work.",
    aiRisk: "high",
    aiNote:
      "Michael Page names content creation as the function AI is disrupting hardest. The job does not disappear, it changes into commissioning, editing and judging rather than producing.",
    demand: "steady",
    demandNote:
      "Brands are building in-house content and production capability again, often alongside more paid spend.",
    verdict:
      "Fine if you move up to strategy quickly. Dangerous if you are still a producer in five years.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "social-media-manager",
    name: "Social media manager",
    tier: "C",
    median: 37000,
    low: 30000,
    high: 56500,
    source: "Robert Half 2026 UK Salary Guide",
    whatItIs: "Owning the channels, the content and increasingly the creators too.",
    entry: "outside",
    entryNote:
      "The most enterable job on the board, which is precisely why it is the most competitive.",
    aiRisk: "medium",
    aiNote: "The production gets easier. The judgment about what to post does not.",
    demand: "growing",
    demandNote:
      "Recruiters told Marketing Week these roles are scaling very quickly and called it a sweetspot for mid-level marketers. Fashion, beauty and wellness are hottest.",
    verdict:
      "The strange one: demand is rising and pay is not. The lowest-paid manager title on the entire board, and Marketing Week names social media managers among the roles whose remit grew without the money following. Great first job. Bad fifth year.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "copywriter",
    name: "Copywriter (the job title)",
    tier: "C",
    median: null,
    medianLabel: "No reliable median",
    source: "Neither Robert Half nor Ashdown Group publishes a UK median for this title",
    sourceCaveat:
      "That absence is the finding, not a gap in the research. The pages that do quote a figure have no published method.",
    whatItIs: "Writing the words. Ads, emails, pages, scripts.",
    entry: "outside",
    entryNote: "Easy to enter, hard to stay.",
    aiRisk: "high",
    aiNote:
      "AI took the bottom out of producing words to a brief. What it has not taken is knowing what to say and why, and that job has a different name and pays more.",
    demand: "squeezed",
    demandNote: "The entry-level end of this has thinned out badly.",
    verdict:
      "An S tier skill inside a C tier job title. Learn it properly, because it is in every senior marketing job. Just do not job-title yourself into it.",
    doors: ["getting-in", "already-in"],
  },
  {
    slug: "digital-marketing-executive",
    name: "Digital marketing executive",
    tier: "ENTRY",
    median: 30000,
    low: 26250,
    high: 35000,
    source: "Robert Half 2026 UK Salary Guide",
    whatItIs: "A bit of everything. The job most people actually start in.",
    entry: "outside",
    entryNote:
      "This is the door. Assistant roles sit just below at a £26,000 median.",
    aiRisk: "medium",
    aiNote: "The generalist tasks are the easiest ones to automate.",
    demand: "squeezed",
    demandNote:
      "Junior hiring is down. Michael Page reports fewer opportunities at both junior and senior level, with employers concentrating on manager level.",
    verdict:
      "Get in anywhere, then specialise inside twelve months. The generalist executive is the role being squeezed hardest, so do not stay one.",
    doors: ["getting-in"],
  },
];

/** Ordered for display: S, A, B, C, then the entry role. */
export const TIER_ORDER: Tier[] = ["S", "A", "B", "C", "ENTRY"];

export const SOURCES = [
  {
    name: "Robert Half 2026 UK Salary Guide",
    method: "Real placements plus 350,000 third-party job postings",
    trust: "Highest",
  },
  {
    name: "Ashdown Group Marketing Salary Guide, July 2025",
    method: "National lower quartile, median and upper quartile, definitions published",
    trust: "High",
  },
  {
    name: "Marketing Week Career & Salary Survey 2026",
    method: "2,350 respondents, self-reported",
    trust: "High, for the macro picture",
  },
  {
    name: "Marketing Week, 23 January 2026",
    method: "Recruiter interviews: 3Search, Major Players, UpTalent, Sphere Digital",
    trust: "Demand only",
  },
  {
    name: "Michael Page UK Marketing Trends 2026",
    method: "Recruiter commentary. No salary figures taken from it",
    trust: "Demand only",
  },
  {
    name: "Glassdoor / IT Jobs Watch",
    method: "Self-reported and job-ad scrape. Used for product marketing only",
    trust: "Weakest",
  },
];

export const MACRO = [
  {
    stat: "↓ £11k",
    label: "Average UK marketing pay fell in 2026, by almost £11,000 in some cases",
    source: "Marketing Week Career & Salary Survey 2026",
  },
  {
    stat: "+87%",
    label:
      "More marketers looking for work: 30,000 signed up to one recruiter in January 2026, against 16,000 a year earlier",
    source: "UpTalent, via Marketing Week",
  },
  {
    stat: "51.2%",
    label: "Say their role grew without a matching pay rise",
    source: "Marketing Week Career & Salary Survey 2026",
  },
];
