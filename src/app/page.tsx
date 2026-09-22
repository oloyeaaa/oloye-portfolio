import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, AUTHOR, SOCIAL } from "@/lib/site";
import { webPageSchema, personSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

const TITLE = "Turn Social Views Into an Owned Pipeline • Oloye Adeosun";
const DESCRIPTION =
  "I help creators and non-tech founders turn social views and engagement into an automated, owned pipeline using simple AI—without expensive software or coding.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          title: TITLE,
          description: DESCRIPTION,
          type: "WebPage",
        })}
      />
      <JsonLd data={personSchema()} />

      <div className="space-y-16 py-10 sm:py-16">
        {/* ============================================================ */}
        {/* 1. HERO SECTION (Classic 50/50 Split with High-Res Image)    */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left: Text & Pitch */}
            <div className="space-y-5 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Zero Software Bloat • 100% Owned Audience</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-[1.15]">
                Turn Social Views Into an <span className="text-emerald-700">Owned Pipeline.</span>
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Stop building your business on rented land. I help content creators and non-tech founders turn social engagement into an automated, owned email database using simple AI—without expensive software or tech overwhelm.
              </p>

              {/* 3 Core Checkpoints */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  <span><strong>Replace £300/mo software</strong> with free Google Workspace & Airtable</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  <span><strong>1-field intake</strong> that stops losing 80% of your audience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓</span>
                  <span><strong>Automated instant delivery</strong> & 3-day welcome sequence</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link
                  href="/free/lean-owned-pipeline-blueprint"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-800 hover:shadow-lg"
                >
                  <span>Get the Free 3-Step Blueprint</span>
                  <span>→</span>
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400"
                >
                  <span>See How It Works</span>
                </Link>
              </div>
            </div>

            {/* Right: High-Res Real Image Mockup */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-xl">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src="/images/hero-pipeline.jpg"
                    alt="Automated Marketing Pipeline Setup"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="p-3 bg-white rounded-lg mt-2 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-slate-800">Live Owned Pipeline Engine</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">Google + Airtable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. THE RENTED LAND CONTRAST (Why You Need This)              */}
        {/* ============================================================ */}
        <section className="bg-slate-50 border-y border-slate-200 py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                The Fundamental Problem
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Are You Building on Rented Land?
              </h2>
              <p className="text-sm text-slate-600">
                Social media is great for attention, but terrible for business longevity. Here is the difference between surviving on algorithms and owning your pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Box 1: The Rented Trap */}
              <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                  <span>❌ The Social-Only Trap</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  10,000 Followers & Zero Asset
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Algorithms decide if your audience sees your content today.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>80% of viewers watch, leave, and never find you again.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>One account strike or shadowban can wipe out years of effort.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: The Owned Pipeline */}
              <div className="rounded-2xl border border-emerald-300 bg-white p-6 shadow-sm space-y-4 ring-1 ring-emerald-500/20">
                <div className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <span>✅ The Owned Pipeline</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Direct Line to Your Customers Forever
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Every video moves engaged viewers into your private database.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Send emails directly to their inbox whenever you launch a solution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Runs automatically in the background for £0 additional software.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. HOW IT WORKS: THE 3-NODE ENGINE                           */}
        {/* ============================================================ */}
        <section id="how-it-works" className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              The 3-Step Simple Architecture
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How the Owned Pipeline Works
            </h2>
            <p className="text-sm text-slate-600">
              You don’t need 20 tools or a developer. Just 3 simple nodes that connect seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-base">
                1
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                The Simple Front Door
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                A 1-field Google Form or DM keyword. Zero signup friction so your visitors don’t bounce before giving their email.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-base">
                2
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                The Zero-Cost Database
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Automatically logs every lead into Airtable or Google Sheets with clean timestamps. Total cost: £0.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-base">
                3
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                The 3-Day Welcome Bridge
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Delivers your blueprint instantly, followed by 2 honest follow-up emails that build genuine connection.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FEATURED LEAD MAGNET BOX (Visual 3D Mockup + Download)     */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-8 sm:p-10 shadow-md">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
              {/* Left Column: 3D Mockup */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative aspect-square w-64 max-w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white p-2">
                  <Image
                    src="/images/blueprint-mockup.jpg"
                    alt="The Lean Owned Pipeline Blueprint Mockup"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Right Column: Copy & Form */}
              <div className="space-y-4 md:col-span-7">
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  Free 1-Page Resource
                </span>

                <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl leading-snug">
                  The Lean Owned Pipeline Blueprint
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Get the exact 3-step setup guide, copy-paste welcome email templates, and the 1-prompt Gemini AI assistant to build your owned pipeline this afternoon.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <p>✓ 1-Field Google Form setup guide</p>
                  <p>✓ Word-for-word 3-day welcome email sequence</p>
                  <p>✓ Gemini AI assistant prompt for lead sorting</p>
                </div>

                <div className="pt-3">
                  <Link
                    href="/free/lean-owned-pipeline-blueprint"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-800"
                  >
                    <span>Download Free Blueprint (Google Doc)</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. LATEST BLOG TUTORIALS (Weekly Wednesday Walkthroughs)       */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Weekly Wednesday Deep Dives
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Pipeline Tutorials & Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              View all tutorials →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
