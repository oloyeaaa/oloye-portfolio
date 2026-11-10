import type { Metadata } from "next";
import StartJourney from "@/components/StartJourney";
import { SITE_URL } from "@/lib/site";

// "Start here": Oloye's link-in-bio page, opened from TikTok. Since 10 Nov 2026
// a short welcome journey (pick a route, see what happens next, then the tool).
// No site header or footer (BARE_PATHS in SiteChrome). Words: content/start/WORDS-journey.md.

export const metadata: Metadata = {
  title: { absolute: "Start Here | Oloye" },
  description:
    "Start here. Find what to post about, start a new channel from scratch, or free up time in your business with simple AI systems.",
  alternates: { canonical: `${SITE_URL}/start` },
};

export default function StartPage() {
  return <StartJourney />;
}
