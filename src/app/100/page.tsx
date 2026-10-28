import type { Metadata } from "next";
import Image from "next/image";
import KitForm from "@/components/challenge/KitForm";
import { GOAL, countList } from "@/lib/challenge";

// The link-in-bio page for the "0 to 100" challenge. Part of the site (same header,
// footer and styles), but not in the nav and kept out of Google: people arrive from
// the bio link, and the number changes daily.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "0 to 100: the free kit",
  description: "Stop losing the people who find you. Get the free 0 to 100 Kit: the leads table, Claude skills, and something new every Sunday.",
  alternates: { canonical: "/100" },
  robots: { index: false, follow: true },
};

// The episode video goes here once it's recorded (16:9 landscape, like YouTube), e.g. "/videos/100.mp4".
const VIDEO_SRC: string | null = null;
const POSTER = "/images/brand/oloye-lime.jpg";

const IN_THE_KIT = [
  "The leads table, ready to copy, so nobody who finds you gets lost",
  "Claude skills that write things for your business, not templates",
  "Something new every Sunday, in the same folder, yours to keep",
];

export default async function ChallengePage() {
  const count = await countList();

  return (
    <div className="bg-background">
      <section className="px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-foreground px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              0 to 100 &middot; Live
            </span>
            {count !== null && (
              <div className="mx-auto mt-4 max-w-[260px]">
                <p className="flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
                  <span className="rounded-md bg-accent px-2 py-0.5 text-lg font-extrabold leading-tight">{count}</span>
                  of {GOAL} people so far
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(count, GOAL)}%` }} />
                </div>
              </div>
            )}
            <h1 className="display mt-6 text-4xl text-foreground sm:text-6xl">
              Stop losing the people <span className="lime-mark">who find you.</span>
            </h1>
          </div>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl border border-border bg-accent">
            {VIDEO_SRC ? (
              <video src={VIDEO_SRC} poster={POSTER} controls playsInline preload="none" className="h-full w-full object-cover" />
            ) : (
              <>
                <Image
                  src={POSTER}
                  alt="Oloye"
                  fill
                  sizes="(max-width: 700px) 100vw, 672px"
                  className="object-cover object-[50%_12%]"
                  priority
                />
                <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-6">
                  <span aria-label="Video coming soon" className="grid h-16 w-16 place-items-center rounded-full bg-foreground shadow-lg">
                    <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-accent" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <KitForm />
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <p className="eyebrow">What&apos;s in the kit</p>
            <ul className="mt-4 space-y-3">
              {IN_THE_KIT.map((line) => (
                <li key={line} className="flex gap-3 text-foreground">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent ring-2 ring-accent-dark/30" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
