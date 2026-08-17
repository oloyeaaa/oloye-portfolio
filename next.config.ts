import type { NextConfig } from "next";

/**
 * Redirects for the 2026-08-17 rebrand.
 *
 * The agency-era pages were archived when the site became Practical AI Hub.
 * Every one of those URLs is redirected rather than left to 404, because some
 * are printed in PDFs, sat in bios, or have been indexed. A 404 loses the
 * visitor and throws away whatever ranking the page had earned.
 *
 * All are `permanent: true` (a 308), which is the correct signal for a page
 * that has genuinely moved for good. It passes the link value on to the new
 * page instead of dropping it.
 *
 * Where they point:
 *   Pages that explained who Oloye is or how to reach him  ->  /
 *   Pages that sold a product                              ->  /free
 *
 * That second rule is deliberate. Somebody who followed a link about buying
 * something should land on the thing we now give away, not on a general page.
 *
 * NOT redirected: /practical-ai-hub. It is the live email capture page and it
 * still works. Redirecting it would silently kill the opt-in.
 */

const VERTICALS = [
  "plumbers",
  "coaches",
  "salons",
  "ecom",
  "real-estate",
  "restaurants",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- Pages about the person or the old agency -> home ---
      { source: "/about", destination: "/", permanent: true },
      { source: "/oloye", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/agentic-ai-systems", destination: "/", permanent: true },
      {
        source: "/agentic-ai-systems/how-it-works",
        destination: "/",
        permanent: true,
      },

      // --- Pages that sold something -> the free line ---
      { source: "/systems", destination: "/free", permanent: true },
      {
        source: "/systems/marketing-team",
        destination: "/free",
        permanent: true,
      },
      { source: "/test-drive", destination: "/free", permanent: true },

      // The Front Desk vertical landing pages. Listed explicitly as well as by
      // wildcard so the intent stays readable if the wildcard is ever changed.
      ...VERTICALS.map((slug) => ({
        source: `/for/${slug}`,
        destination: "/",
        permanent: true,
      })),

      // Catch-alls for the dynamic routes, including any vertical or report
      // slug that was linked somewhere we do not know about.
      { source: "/for/:slug*", destination: "/", permanent: true },
      { source: "/report/:slug*", destination: "/", permanent: true },

      // /get/<system> links are printed in PDFs and sat in bios. They used to
      // land on a sales page that no longer exists, so they now go to the free
      // line. This one previously pointed at /systems/marketing-team, which
      // would have become a 404 the moment that page was archived.
      { source: "/get/marketing-team", destination: "/free", permanent: true },
      { source: "/get/:slug*", destination: "/free", permanent: true },
    ];
  },
};

export default nextConfig;
