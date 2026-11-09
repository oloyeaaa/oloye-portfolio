import type { Metadata } from "next";
import FoundingForm from "@/components/founding/FoundingForm";

// The founding group page (Oloye, 8 Nov 2026: "We defo need to create its own
// page"). The close of the "What you know, shared" TikTok live points here. For
// content creators: the content machine offer. One ask, the list. No price, no
// dates, no income promises. Kept out of Google until he says, like /100.
// Words are a first draft for the Copywriter.

export const metadata: Metadata = {
  title: "The founding group",
  description: "A small founding group for creators. Turn what you already know into videos, with a content machine built on Claude doing the heavy parts.",
  alternates: { canonical: "/founding" },
  robots: { index: false, follow: true },
};

const STEPS = [
  { title: "Find it", line: "The thing people already come to you for, said in one line." },
  { title: "Check it", line: "Who needs it, and the questions they keep asking." },
  { title: "Make it", line: "The machine does the heavy parts of the videos. You check each one and add what only you know." },
  { title: "Share it", line: "Post, see which questions people care about most, and make more of those." },
];

const STRAIGHT = [
  { q: "What does it cost?", a: "There's no price yet. Join the list and you'll hear first." },
  { q: "When does it start?", a: "There's no date yet either. The list hears first." },
  { q: "Will I make money from it?", a: "Nobody can promise you money, views or followers, and we won't. What you know is the value. The machine helps you share it more often." },
];

export default function FoundingPage() {
  return (
    <div className="bg-background">
      <section className="px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-foreground px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
              The founding group
            </span>
            <h1 className="display mt-6 text-4xl text-foreground sm:text-6xl">
              Turn <span className="lime-mark">what you already know</span> into a channel.
            </h1>
            <p className="mt-4 text-muted sm:text-lg">
              A small group, building it together. What you already know is the content. A content machine built with Claude does the heavy parts of the videos.
            </p>
          </div>

          <div className="mt-8">
            <FoundingForm />
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <p className="eyebrow">What you build together</p>
            <ol className="mt-4 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-foreground">
                    {i + 1}
                  </span>
                  <span className="text-foreground">
                    <span className="font-semibold">{s.title}.</span> {s.line}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 sm:p-8">
            <p className="eyebrow">Straight answers</p>
            <dl className="mt-4 space-y-4">
              {STRAIGHT.map((s) => (
                <div key={s.q}>
                  <dt className="font-semibold text-foreground">{s.q}</dt>
                  <dd className="mt-1 text-muted">{s.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
