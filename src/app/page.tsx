import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const TITLE = "Turn Social Views Into an Owned Pipeline \u2014 Oloye Adeosun";
const DESCRIPTION =
  "I help creators and non-tech founders turn social views and comments into an automated, owned pipeline using simple AI\u2014without expensive software or code.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [{ url: "/images/hero-pipeline.jpg", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd data={webPageSchema({ url: SITE_URL, title: TITLE, description: DESCRIPTION })} />
      <JsonLd data={personSchema()} />

      <main className="min-h-screen">
        {/* =========================================================================
            1. HERO SECTION: 50/50 SPLIT (Text Left, Photorealistic Image Right)
        ========================================================================= */}
        <section className="relative border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Core Value Proposition & Email Capture */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-3.5 py-1 text-xs font-medium text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span>The Honest Practitioner Approach</span>
                </div>

                <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                  Turn Social Views into an{" "}
                  <span className="underline decoration-accent decoration-4 underline-offset-4">
                    Automated, Owned Pipeline
                  </span>
                </h1>

                <p className="mt-5 text-base sm:text-lg text-primary-dim leading-relaxed">
                  Stop renting your audience from algorithm updates. I help creators and non-tech founders turn DMs, views, and comments into an automated lead database using simple AI—without expensive software or code.
                </p>

                {/* Email Capture Intake Form */}
                <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-sm">
                  <p className="text-sm font-bold text-foreground">
                    Get the 1-Page Blueprint: "The Lean Owned Pipeline"
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    No 5-day email spam sequences. Just the direct 3-node diagram, tool setup, and prompt templates.
                  </p>

                  <form
                    action="/api/subscribe"
                    method="POST"
                    className="mt-4 flex flex-col gap-3 sm:flex-row"
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your best email address..."
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-lg bg-foreground px-6 py-3 text-sm font-bold text-accent transition hover:bg-foreground/90 hover:shadow-md cursor-pointer"
                    >
                      Send Blueprint &rarr;
                    </button>
                  </form>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 flex items-center gap-6 text-xs text-muted">
                  <span className="flex items-center gap-1.5 font-medium">
                    <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    0% Tech Overwhelm
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Under $50/mo Stack
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Live Screen-Share Builds
                  </span>
                </div>
              </div>

              {/* Right Column: High-Res Real Product / Pipeline Image Mockup */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-lg">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-surface-alt">
                    <Image
                      src="/images/hero-pipeline.jpg"
                      alt="Lean Automated Owned Pipeline Setup Mockup"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-xs font-semibold text-foreground">
                      The 3-Node Architecture: ManyChat + Airtable + Gemini
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. THE PROBLEM: Rented Audience vs Owned Pipeline
        ========================================================================= */}
        <section className="py-16 sm:py-20 border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Why 10,000 Social Views Often Equal Zero Dollars
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted">
                Most creators and builders spend 40 hours a week creating content, only to lose every single interested lead into an algorithm black hole.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Problem Card */}
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-8">
                <div className="inline-flex rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                  THE RENTED AUDIENCE TRAP
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  Relying 100% on Algorithms & DMs
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>When an algorithm changes, your reach and revenue drop by 80% overnight.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>You waste 3 hours manually replying to "link in bio" comments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">&times;</span>
                    <span>Zero customer database or email addresses you actually own.</span>
                  </li>
                </ul>
              </div>

              {/* Solution Card */}
              <div className="rounded-xl border-2 border-foreground bg-surface p-8 shadow-sm">
                <div className="inline-flex rounded-md bg-foreground px-2.5 py-1 text-xs font-bold text-accent">
                  THE OWNED PIPELINE
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  The Simple Automated Intake Engine
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-primary-dim">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-dark font-bold">&#10003;</span>
                    <span>Every comment automatically sends a private trigger link via ManyChat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-dark font-bold">&#10003;</span>
                    <span>Leads and pain points are logged directly into a clean Airtable database.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-dark font-bold">&#10003;</span>
                    <span>Instant, personalized follow-ups sent automatically via simple AI triggers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW IT WORKS: THE 3-NODE SIMPLE ARCHITECTURE
        ========================================================================= */}
        <section id="how-it-works" className="py-16 sm:py-24 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
                The Practical Setup
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                The 3-Node Architecture (No Overkill Stack)
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted">
                You don't need $300/month HubSpot, Salesforce, or complex custom code. We use 3 lean tools that connect in 10 minutes.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-black text-accent">
                  1
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Frictionless Capture
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Use ManyChat keyword automations on TikTok & Instagram so interested viewers get your blueprint immediately in their DMs without navigating 5 menu screens.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-black text-accent">
                  2
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Airtable Intake Database
                </h3>
                <p className="mt-2 text-sm text-muted">
                  All leads, lead magnets, and engagement metadata flow straight into your private Airtable base. You own the records forever—no platform lock-in.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col rounded-xl border border-border bg-surface p-7 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-black text-accent">
                  3
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Automated Nurture & Delivery
                </h3>
                <p className="mt-2 text-sm text-muted">
                  A lightweight automation sends the requested asset via Gmail or your email provider instantly, alongside practical weekly teardowns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. THE FLAGSHIP LEAD MAGNET (The Lean Blueprint)
        ========================================================================= */}
        <section className="py-16 sm:py-24 border-b border-border bg-foreground text-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Offer Details & Download Form */}
              <div className="lg:col-span-7">
                <span className="inline-block rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-foreground uppercase tracking-wider">
                  Free 1-Page PDF Blueprint
                </span>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl leading-tight text-white">
                  The Lean Owned Pipeline Blueprint
                </h2>
                <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                  Download the exact 3-Node visual architecture diagram, recommended software audit, and step-by-step setup guide to build your owned pipeline this weekend.
                </p>

                <div className="mt-6 space-y-2.5 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">&#10003;</span>
                    <span>Visual 3-node flowchart: Social &rarr; Airtable &rarr; Gmail</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">&#10003;</span>
                    <span>Exact ManyChat keyword trigger templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">&#10003;</span>
                    <span>Ready-to-use Airtable base schema definition</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/free/lean-owned-pipeline-blueprint"
                    className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-sm font-bold text-foreground transition hover:bg-accent-light shadow-md"
                  >
                    Download Free Blueprint (PDF) &rarr;
                  </Link>
                </div>
              </div>

              {/* Right Column: Blueprint 3D Mockup */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-black/40">
                    <Image
                      src="/images/blueprint-mockup.jpg"
                      alt="Lean Owned Pipeline Blueprint 3D Guide Mockup"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WEDNESDAY BLOG & TEARDOWNS
        ========================================================================= */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Every Wednesday
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                  Weekly Pipeline Teardowns & AI Builds
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-foreground hover:underline decoration-accent decoration-2"
              >
                View all articles &rarr;
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
