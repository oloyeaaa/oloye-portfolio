import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI crawlers are allowed on purpose.
 *
 * The business exists to be found by people asking "how do I earn extra income
 * with AI". More and more of those questions are answered inside ChatGPT,
 * Claude, Perplexity and Google's AI results rather than on a results page.
 * Blocking those crawlers would hide the site from exactly the place its
 * audience is now asking the question.
 *
 * The trade is real and worth naming: allowing them means the content can be
 * summarised without a click. We take that, because being the cited source
 * builds the thing we actually want, which is people knowing who to come back
 * to. See public/llms.txt for the citation guidance we give them.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/_next/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Named explicitly so a future wildcard change cannot quietly lock them out.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
