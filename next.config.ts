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
 * 2026-10-27: /practical-ai-hub is now redirected to /free (the brand moved to
 * process automation; the free things page has its own email capture).
 */

// "plumbers" left this list on 3 Nov 2026: /for/plumbers is a real page again
// (the Google pages in content/for/). Never list a slug that has a page there.
const VERTICALS = [
  "coaches",
  "salons",
  "ecom",
  "real-estate",
  "restaurants",
];

// Security headers on every page (2026-10-27 security pass). They tell the
// browser: don't let other sites put us in a frame, don't guess file types,
// always use HTTPS, share as little as possible when someone clicks away, and
// don't ask for the camera, microphone or location.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      { source: "/lab", destination: "/free", permanent: true },

      // --- Blog, 3 Nov 2026: four categories, and seven old posts taken off ---
      // (the posts are kept in content/_archive-posts/, see its README)
      { source: "/blog/category/tools-systems", destination: "/blog/category/tools-and-ai", permanent: true },
      { source: "/blog/category/onboarding", destination: "/blog/category/clients", permanent: true },
      { source: "/blog/category/retention", destination: "/blog/category/clients", permanent: true },
      { source: "/blog/category/delivery", destination: "/blog/category/admin-and-invoices", permanent: true },
      ...[
        "how-to-steal-high-converting-copy-from-1-star-competitor-reviews",
        "the-1-75-billion-dollar-mistake-customer-awareness",
        "the-5-levels-of-customer-awareness-eugene-schwartz",
        "the-cognitive-friction-trap-why-clever-copy-kills-conversions",
        "the-war-room-delusion-why-90-percent-of-businesses-talk-to-themselves",
        "how-to-build-an-audience-from-scratch-0-dollar-marketing",
        "why-paid-ads-wont-fix-a-broken-message",
      ].map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: true })),

      // --- Retired in the Oct 2026 redesign (process automation) ---
      { source: "/portfolio", destination: "/case-studies", permanent: true },
      { source: "/portfolio/:slug*", destination: "/case-studies", permanent: true },
      { source: "/ventures", destination: "/about", permanent: true },
      { source: "/practical-income-method", destination: "/", permanent: true },
      { source: "/practical-ai-hub", destination: "/free", permanent: true },
      // --- Pages about the person or the old agency -> home ---
      // NOTE: /about is NOT here. It was redirected when the agency page was
      // archived, and a real About page was written in its place 2026-08-17.
      { source: "/services", destination: "/", permanent: true },
      { source: "/services/:slug*", destination: "/", permanent: true },
      { source: "/oloye", destination: "/", permanent: true },
      // /contact is NOT here any more: a real Contact page came back 2026-10-27.
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

      // Catch-all for old report links. (The /for catch-all went on 3 Nov 2026,
      // when /for became the Google pages; an unknown /for slug now 404s.)
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
