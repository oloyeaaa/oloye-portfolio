"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";
import { QUESTIONS, SECTIONS, type Answers, type Idea, type Results, type SectionId } from "@/lib/tools/find-channel";

// One question card at a time, then the email step, then the four lists.
// Built big for a phone held up on a TikTok live.

const MORE_PER_SECTION = 3;

export default function FindChannel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [startedAt] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [emailed, setEmailed] = useState(false);

  const box = useRef<HTMLDivElement>(null);

  // On a phone the next card can start above the screen: bring it back into view.
  useEffect(() => {
    const top = box.current?.getBoundingClientRect().top;
    if (step > 0 && top !== undefined && top < 0) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const a = q ? answers[q.id] || { picks: [], other: "" } : null;

  function setAnswer(id: string, picks: string[], other: string) {
    setAnswers((prev) => ({ ...prev, [id]: { picks, other } }));
  }

  function pick(optionId: string) {
    if (!q || !a) return;
    if (q.multi) {
      const picks = a.picks.includes(optionId) ? a.picks.filter((x) => x !== optionId) : [...a.picks, optionId];
      setAnswer(q.id, picks, a.other);
    } else {
      setAnswer(q.id, [optionId], "");
      setStep(step + 1);
    }
  }

  const canGoOn = !!a && (a.picks.length > 0 || a.other.trim().length > 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/tools/find-your-channel", {
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
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResults(data.results);
      setEmailed(!!data.emailed);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (results) return <ResultsView answers={answers} first={results} emailed={emailed} />;

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
          {q.hint && <p className="mt-2 text-base text-muted">{q.hint}</p>}
          <div className="mt-6 grid gap-3">
            {q.options.map((o) => {
              const on = a.picks.includes(o.id);
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => pick(o.id)}
                  aria-pressed={on}
                  className={`rounded-xl border-2 px-5 py-4 text-left text-lg text-foreground transition ${
                    on ? "border-foreground bg-accent/40 font-semibold" : "border-border-strong bg-surface hover:border-foreground"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {q.other && (
            <label className="mt-4 block">
              <span className="text-base font-medium text-foreground">Something else?</span>
              <input
                value={a.other}
                onChange={(e) => setAnswer(q.id, q.multi ? a.picks : [], e.target.value)}
                maxLength={120}
                placeholder="Type it in a few words"
                className={`${INPUT} text-lg`}
              />
            </label>
          )}
          {(q.multi || a.other.trim()) && (
            <button type="button" disabled={!canGoOn} onClick={() => setStep(step + 1)} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
              Next
            </button>
          )}
        </fieldset>
      ) : (
        <form onSubmit={submit} className="card-in mt-7">
          <p className="display text-3xl leading-tight text-foreground sm:text-4xl">Where should we send your ideas?</p>
          <p className="mt-2 text-base text-muted">They show on this screen too.</p>
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
            <span>Also send me the occasional useful email. (Not ticked? You just get your ideas.)</span>
          </label>
          <button type="submit" disabled={busy} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
            {busy ? "Finding your channel..." : "Show my ideas"}
          </button>
          {busy && <p className="mt-3 text-center text-base text-muted">This takes about 20 seconds.</p>}
          {error && <p role="alert" className="mt-3 text-base font-medium text-alert">{error}</p>}
        </form>
      )}
    </div>
  );
}

function ResultsView({ answers, first, emailed }: { answers: Answers; first: Results; emailed: boolean }) {
  const [lists, setLists] = useState<Results>(first);
  const [busy, setBusy] = useState<SectionId | null>(null);
  const [asked, setAsked] = useState<Record<string, number>>({});
  const [error, setError] = useState<Record<string, string>>({});

  async function more(section: SectionId) {
    setBusy(section);
    setError((e) => ({ ...e, [section]: "" }));
    try {
      const res = await fetch("/api/tools/find-your-channel/more", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, section, shown: lists[section].map((i) => i.title) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setLists((l) => ({ ...l, [section]: [...l[section], ...(data.ideas as Idea[])] }));
      setAsked((n) => ({ ...n, [section]: (n[section] || 0) + 1 }));
    } catch (err) {
      setError((e) => ({ ...e, [section]: err instanceof Error ? err.message : "Something went wrong." }));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6" role="status">
      <div className="rounded-3xl border border-accent bg-surface p-6 text-center sm:p-8">
        <p className="display text-3xl text-foreground sm:text-4xl">Your channel ideas</p>
        <p className="mt-3 text-lg text-muted">
          {emailed ? "A copy is on its way to your inbox." : "Here they are. Take a screenshot to keep them."}
        </p>
      </div>

      {SECTIONS.map((s) => {
        const used = asked[s.id] || 0;
        return (
          <section key={s.id} className="rounded-3xl border border-border bg-surface p-5 sm:p-8" aria-labelledby={`h-${s.id}`}>
            <p className="eyebrow">{s.eyebrow}</p>
            <h2 id={`h-${s.id}`} className="display mt-2 text-3xl text-foreground">{s.title}</h2>
            <ol className="mt-5 space-y-4">
              {lists[s.id].map((idea, i) => (
                <li key={`${i}-${idea.title}`} className="card-in flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-base font-extrabold text-foreground">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-xl font-semibold leading-snug text-foreground">{idea.title}</span>
                    <span className="mt-1 block text-lg text-muted">{idea.line}</span>
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
                {busy === s.id ? "Finding 5 more..." : "Show me 5 more"}
              </button>
            )}
            {error[s.id] && <p role="alert" className="mt-3 text-base font-medium text-alert">{error[s.id]}</p>}
          </section>
        );
      })}

      <div className="rounded-3xl bg-foreground p-6 text-center sm:p-10">
        <p className="eyebrow text-accent">Your next step</p>
        <p className="display mt-3 text-3xl text-background sm:text-4xl">Build it with the founding group.</p>
        <p className="mx-auto mt-3 max-w-md text-lg text-background/80">
          A small group turning what they already know into a channel, with the machine doing the heavy parts.
        </p>
        <Link href="/founding" className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
          Join the founding group
        </Link>
      </div>
    </div>
  );
}
