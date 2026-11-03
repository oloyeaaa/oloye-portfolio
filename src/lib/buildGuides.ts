// The /build/<slug> pages (3 Nov 2026): one simple page a week for the TikTok
// live's free build guide, linked from his bio. Headline, one line, what's in
// the guide, the form, then a small link to try the tool itself. Copy is the
// Copywriter's. To add next week's page, add one entry here and its free thing
// in postFreebies.ts (the Make "free thing" route sends it, no new scenario).

export type BuildGuide = {
  slug: string;
  /** Key in POST_FREEBIES; it is also the Lead Source Make writes in Leads. */
  freebie: string;
  headline: string;
  /** Words in the headline to mark in lime. */
  mark?: string;
  under: string;
  inside: { title: string; line: string }[];
  guideLine: string;
  button: string;
  thanks: string;
  tryIt?: { label: string; href: string };
  /** Shown in Leads as where they came from. */
  source: string;
};

export const BUILD_GUIDES: BuildGuide[] = [
  {
    slug: "lead-leak-check",
    freebie: "BUILD-LEAK",
    headline: "Losing leads and can't see where? Build the lead leak check with Claude.",
    mark: "with Claude.",
    under: "A free step-by-step guide to the lead system from the live. It shows where people slip away, and what to fix first.",
    // The simple version comes first in the guide, so it comes first here too.
    inside: [
      { title: "A simple version with no website.", line: "The same check in a form and a sheet." },
      { title: "The 6 questions and the scoring.", line: "What each question asks, and how the answers add up to one score and the 3 biggest leaks." },
      { title: "The prompts to give Claude.", line: "The plain-English asks that turn the score into a short, clear result." },
    ],
    guideLine: "I've been building marketing systems for over 3 years.",
    button: "Send me the build guide",
    thanks: "Done. The build guide is on its way to your inbox. If it's not there in a few minutes, check your spam folder.",
    tryIt: { label: "Or try the check itself", href: "/tools/lead-leak-check" },
    source: "TikTok live (build/lead-leak-check)",
  },
];

export function getBuildGuide(slug: string): BuildGuide | undefined {
  return BUILD_GUIDES.find((g) => g.slug === slug);
}
