"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";
import { OTHER_MAX, QUESTIONS, SECTIONS, type Answers, type Idea, type Lists, type SectionId } from "@/lib/tools/what-to-post";

// What to post and what to sell: the steps, then one question card at a time,
// then the email step, then four lists of five. Words: the Copywriter
// (content/find-your-channel/WORDS.md). Built big for a phone held up on a
// TikTok live, and it's his link in bio.

const MORE_PER_SECTION = 3;
const STEPS = ["Answer a few quick questions.", "Leave your email.", "Get 5 ideas for each of four things.", "Not right? Tap for 5 more."];
const empty = () => Object.fromEntries(QUESTIONS.map((q) => [q.id, { picked: [], other: "" }])) as Answers;

type Done = { lists: Lists; careNote: string; emailed: boolean };

export default function WhatToPost() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [startedAt, setStartedAt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unclear, setUnclear] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const box = useRef<HTMLDivElement>(null);

  // On a phone the next card can start above the screen: bring it back into view.
  useEffect(() => {
    const top = box.current?.getBoundingClientRect().top;
    if (started && top !== undefined && top < 0) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, started]);

  if (done) return <ResultsView answers={answers} first={done} />;

  if (!started) {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-lg font-extrabold text-foreground">{i + 1}</span>
              <span className="text-lg text-foreground">{s}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            setStartedAt(Date.now());
          }}
          className={`mt-7 text-base ${BUTTON_PRIMARY}`}
        >
          Start the questions
        </button>
        <p className="mt-3 text-center text-base text-muted">Free. One question at a time.</p>
      </div>
    );
  }

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const a = q ? answers[q.id] : null;

  function setAnswer(id: string, picked: string[], other: string) {
    setAnswers((prev) => ({ ...prev, [id]: { picked, other } }));
  }

  function pick(label: string) {
    if (!q || !a) return;
    if (q.max === 1) {
      setAnswer(q.id, [label], a.other);
      if (!a.other.trim()) setStep(step + 1);
      return;
    }
    const picked = a.picked.includes(label) ? a.picked.filter((x) => x !== label) : [...a.picked, label].slice(-q.max);
    setAnswer(q.id, picked, a.other);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/tools/what-to-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          startedAt,
          name: f.get("name"),
          email: f.get("email"),
          consent: f.get("consent") === "on",
          website: f.get("website"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again in a minute.");
      if (data.status === "unclear") {
        setUnclear(data.message);
      } else {
        setDone({ lists: data.lists, careNote: data.careNote || "", emailed: !!data.emailed });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again in a minute.");
    } finally {
      setBusy(false);
    }
  }

  if (unclear) {
    return (
      <div ref={box} className="scroll-mt-20 rounded-3xl border border-border bg-surface p-6 text-center sm:p-8" role="status">
        <p className="display text-3xl leading-tight text-foreground">{unclear}</p>
        <button
          type="button"
          onClick={() => {
            setUnclear("");
            setStep(0);
          }}
          className={`mt-6 text-base ${BUTTON_PRIMARY}`}
        >
          Back to the questions
        </button>
      </div>
    );
  }

  const answered = !!a && (a.picked.length > 0 || a.other.trim().length > 0);

  return (
    <div ref={box} className="scroll-mt-20 rounded-3xl border border-border bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between text-base text-muted">
        <span className="font-semibold">{step < total ? `Question ${step + 1} of ${total}` : "Last step"}</span>
        {step > 0 && !busy && (
          <button type="button" onClick={() => setStep(step - 1)} className="font-medium text-foreground underline underline-offset-4">
            Back
          </button>
        )}
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${(Math.min(step, total) / total) * 100}%` }} />
      </div>

      {q && a ? (
        <fieldset key={q.id} className="card-in mt-7">
          <legend className="display text-3xl leading-tight text-foreground sm:text-4xl">{q.text}</legend>
          {q.max > 1 && <p className="mt-2 text-base text-muted">Pick up to {q.max}.</p>}
          <div className="mt-6 grid gap-3">
            {q.options.map((label) => {
              const on = a.picked.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => pick(label)}
                  aria-pressed={on}
                  className={`rounded-xl border-2 px-5 py-4 text-left text-lg text-foreground transition ${
                    on ? "border-foreground bg-accent/40 font-semibold" : "border-border-strong bg-surface hover:border-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <label className="mt-4 block">
            <span className="text-base font-medium text-foreground">Something else?</span>
            <input
              value={a.other}
              onChange={(e) => setAnswer(q.id, a.picked, e.target.value)}
              maxLength={OTHER_MAX}
              placeholder="Type it in a few words"
              className={`${INPUT} text-lg`}
            />
          </label>
          {(q.max > 1 || a.other.trim()) && (
            <button type="button" disabled={!answered} onClick={() => setStep(step + 1)} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
              Next
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setAnswer(q.id, [], "");
              setStep(step + 1);
            }}
            className="mt-4 block w-full py-2 text-center text-base font-medium text-muted underline underline-offset-4"
          >
            Skip
          </button>
        </fieldset>
      ) : (
        <form onSubmit={submit} className="card-in mt-7">
          <p className="display text-3xl leading-tight text-foreground sm:text-4xl">Your ideas are ready.</p>
          <p className="mt-2 text-lg text-muted">Where should a copy go? They show on this page too.</p>
          <div className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-base font-medium text-foreground">First name</span>
              <input name="name" required maxLength={80} autoComplete="given-name" className={`${INPUT} text-lg`} />
            </label>
            <label className="block">
              <span className="text-base font-medium text-foreground">Email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className={`${INPUT} text-lg`} />
            </label>
          </div>
          <label className="hidden" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="mt-5 flex items-start gap-3 text-base text-muted">
            <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-[#446100]" />
            <span>Also send me the occasional useful email. (Not ticked? You just get this email with your ideas.)</span>
          </label>
          <button type="submit" disabled={busy} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
            {busy ? "Finding your ideas..." : "See the ideas"}
          </button>
          {error && <p role="alert" className="mt-3 text-base font-medium text-alert">{error}</p>}
          <p className="mt-4 text-center text-base text-muted">Free. Leave any time.</p>
        </form>
      )}
    </div>
  );
}

function ResultsView({ answers, first }: { answers: Answers; first: Done }) {
  const [lists, setLists] = useState<Lists>(first.lists);
  const [busy, setBusy] = useState<SectionId | null>(null);
  const [asked, setAsked] = useState<Record<string, number>>({});
  const [error, setError] = useState<Record<string, string>>({});

  async function more(section: SectionId) {
    setBusy(section);
    setError((e) => ({ ...e, [section]: "" }));
    try {
      const res = await fetch("/api/tools/what-to-post/more", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, section, shown: lists[section] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again in a minute.");
      if (data.status !== "ideas") throw new Error(data.message || "Something went wrong. Try again in a minute.");
      setLists((l) => ({ ...l, [section]: [...l[section], ...(data.ideas as Idea[])] }));
      setAsked((n) => ({ ...n, [section]: (n[section] || 0) + 1 }));
    } catch (err) {
      setError((e) => ({ ...e, [section]: err instanceof Error ? err.message : "Something went wrong. Try again in a minute." }));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6" role="status">
      <div className="rounded-3xl border border-accent bg-surface p-6 text-center sm:p-8">
        <p className="display text-4xl text-foreground">Your ideas</p>
        <p className="mt-3 text-lg text-muted">They&apos;re ideas to try, not answers. Not right? Tap &quot;5 more&quot; on any section.</p>
        {first.careNote && (
          <p className="mt-4 rounded-xl bg-surface-alt px-4 py-3 text-base font-semibold text-foreground">{first.careNote}</p>
        )}
      </div>

      {SECTIONS.map((s) => {
        const used = asked[s.id] || 0;
        return (
          <section key={s.id} className="rounded-3xl border border-border bg-surface p-5 sm:p-8" aria-labelledby={`h-${s.id}`}>
            <h2 id={`h-${s.id}`} className="display text-3xl text-foreground">{s.title}</h2>
            <ol className="mt-5 space-y-5">
              {lists[s.id].map((idea, i) => (
                <li key={`${i}-${idea.title}`} className="card-in flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-base font-extrabold text-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold leading-snug text-foreground">{idea.title}</span>
                    <span className="mt-1 block text-lg text-muted">{idea.why}</span>
                  </span>
                </li>
              ))}
            </ol>
            {used < MORE_PER_SECTION && (
              <button
                type="button"
                onClick={() => more(s.id)}
                disabled={busy !== null}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg border-2 border-foreground px-6 py-4 text-base font-bold text-foreground transition hover:bg-accent disabled:opacity-60"
              >
                {busy === s.id ? "Finding 5 more..." : "5 more ideas"}
              </button>
            )}
            {error[s.id] && <p role="alert" className="mt-3 text-base font-medium text-alert">{error[s.id]}</p>}
          </section>
        );
      })}

      <p className="px-2 text-lg text-foreground">
        Posting gets people&apos;s attention. A free thing and something to sell give that attention somewhere to go. Pick the idea that feels most like you, post about it three times this week, and see which one people ask questions about.
      </p>

      <div className="rounded-3xl bg-foreground p-6 text-center sm:p-10">
        <p className="display text-3xl text-background sm:text-4xl">Want help making the posts?</p>
        <p className="mx-auto mt-3 max-w-md text-lg text-background/80">
          The founding group is a small group, building it together. What you already know is the content, and a content machine built with Claude does the heavy parts of the videos. No price or dates yet. The list hears first.
        </p>
        <Link href="/founding" className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
          Join the founding group
        </Link>
      </div>
    </div>
  );
}
