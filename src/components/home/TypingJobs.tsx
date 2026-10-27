"use client";

import { useEffect, useState } from "react";

// The four blocks of a business, in order, with two big jobs in each.
// Each job types out, then gets ticked off.
const BLOCKS = ["Leads", "Onboarding", "Delivery", "Retention"];

const JOBS = [
  { block: 0, text: "Replying to every new lead before it goes cold" },
  { block: 0, text: "Sorting serious buyers from time-wasters" },
  { block: 1, text: "Sending the contract, invoice and welcome pack" },
  { block: 1, text: "Setting up every new client the same way" },
  { block: 2, text: "Turning call notes into a clear action plan" },
  { block: 2, text: "Sending every client their progress update" },
  { block: 3, text: "Asking happy clients for reviews and referrals" },
  { block: 3, text: "Winning back clients who went quiet" },
];

export default function TypingJobs() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const job = JOBS[index].text;

    // Motion turned off: show each job whole, already ticked, and move on slowly.
    if (reduce) {
      const t = done
        ? setTimeout(() => {
            setDone(false);
            setIndex((i) => (i + 1) % JOBS.length);
          }, 3500)
        : setTimeout(() => {
            setTyped(job);
            setDone(true);
          }, 0);
      return () => clearTimeout(t);
    }

    if (typed.length < job.length) {
      const t = setTimeout(() => setTyped(job.slice(0, typed.length + 1)), 45);
      return () => clearTimeout(t);
    }
    if (!done) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone(false);
      setTyped("");
      setIndex((i) => (i + 1) % JOBS.length);
    }, 2200);
    return () => clearTimeout(t);
  }, [index, typed, done]);

  return (
    <div className="w-full max-w-xl rounded-2xl border border-border bg-surface p-5 text-left shadow-[0_20px_60px_-30px_rgba(14,15,18,0.35)] sm:p-6">
      <p className="font-mono text-xs text-muted">Your business, start to finish</p>

      <div className="mt-3 flex min-h-[5.5rem] flex-col items-start justify-center gap-2 rounded-xl sm:min-h-[3.5rem] sm:flex-row sm:items-center sm:justify-between sm:gap-4 border border-border bg-background px-4 py-3">
        <p
          className={`text-base font-medium transition-colors sm:text-lg ${
            done ? "text-muted line-through decoration-accent decoration-2" : "text-foreground"
          }`}
          aria-live="polite"
        >
          {typed}
          {!done && <span className="caret" aria-hidden="true" />}
        </p>
        <span
          className={`shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground transition-all duration-500 ${
            done ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          ✓ Now automatic
        </span>
      </div>

      <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label="The four blocks of a business">
        {BLOCKS.map((block, i) => {
          const current = JOBS[index].block;
          const now = i === current;
          const passed = i < current;
          return (
            <li
              key={block}
              className={`relative rounded-lg border px-1.5 py-2 text-center transition-colors duration-500 ${
                now
                  ? "border-foreground bg-foreground text-accent"
                  : passed
                    ? "border-accent bg-accent/25 text-foreground"
                    : "border-border text-muted"
              }`}
            >
              <span className="block font-mono text-[10px] opacity-70">{passed ? "✓" : `0${i + 1}`}</span>
              <span className="block text-[11px] font-semibold sm:text-xs">{block}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
