"use client";

import { useEffect, useState } from "react";

// The jobs that eat a week. Each one types out, then gets ticked off.
const JOBS = [
  "Copying new leads into a spreadsheet",
  "Chasing an unpaid invoice",
  "Sending the same welcome email again",
  "Booking a call by email, back and forth",
  "Reminding a customer about tomorrow",
];

const TABS = ["Leads", "Invoices", "Emails", "Bookings", "Reminders"];

export default function TypingJobs() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const job = JOBS[index];

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
      <p className="font-mono text-xs text-muted">Still on your list this week</p>

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

      <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              i === index
                ? "border-foreground bg-foreground text-accent"
                : "border-border text-muted"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}
