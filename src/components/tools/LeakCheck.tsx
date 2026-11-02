"use client";

import { useState } from "react";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";
import { BUSINESS_TYPES, QUESTIONS, type Answers } from "@/lib/tools/leak-check";

type Result = { total: number; line: string; leaks: { area: string; leak: string; fix: string }[]; emailed: boolean };

// One question per screen, then the details, then the result.
export default function LeakCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [startedAt] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];

  function pick(id: string) {
    if (q.multi) {
      setAnswers((prev) => {
        const now = prev[q.id] || [];
        return { ...prev, [q.id]: now.includes(id) ? now.filter((x) => x !== id) : [...now, id] };
      });
    } else {
      setAnswers((prev) => ({ ...prev, [q.id]: [id] }));
      setStep(step + 1);
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/tools/leak-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          startedAt,
          name: f.get("name"),
          email: f.get("email"),
          business: f.get("business") || null,
          consent: f.get("consent") === "on",
          website: f.get("website"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-6" role="status">
        <div className="rounded-3xl border border-border bg-surface p-6 text-center sm:p-8">
          <p className="eyebrow">Your lead leak score</p>
          <p className="mt-4 flex items-end justify-center gap-2">
            <span className="rounded-xl bg-accent px-4 py-1 text-6xl font-extrabold leading-none text-foreground">{result.total}</span>
            <span className="pb-1 text-2xl font-extrabold text-foreground">/ 100</span>
          </p>
          <p className="mx-auto mt-5 max-w-md text-muted">{result.line}</p>
        </div>

        <ol className="space-y-4">
          {result.leaks.map((l, i) => (
            <li key={i} className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <p className="eyebrow">Leak {i + 1} &middot; {l.area}</p>
              <p className="mt-3 text-lg font-semibold text-foreground">{l.leak}</p>
              <p className="mt-3 text-foreground">
                <span className="lime-mark font-semibold">First fix:</span> {l.fix}
              </p>
            </li>
          ))}
        </ol>

        <p className="text-center text-muted">
          {result.emailed
            ? "The full result, with a free guide for each fix, is on its way to your inbox."
            : "We couldn't send the email just now, but your result is all here."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{step < total ? `Question ${step + 1} of ${total}` : "Last step"}</span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="font-medium text-foreground underline underline-offset-4">
            Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(Math.min(step, total) / total) * 100}%` }} />
      </div>

      {step < total ? (
        <fieldset className="mt-6">
          <legend className="display text-2xl text-foreground sm:text-3xl">{q.text}</legend>
          {q.multi && <p className="mt-2 text-sm text-muted">Pick as many as you like.</p>}
          <div className="mt-5 grid gap-3">
            {q.options.map((o) => {
              const on = (answers[q.id] || []).includes(o.id);
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => pick(o.id)}
                  aria-pressed={on}
                  className={`rounded-lg border px-4 py-3.5 text-left text-foreground transition ${
                    on ? "border-foreground bg-accent/30 font-semibold" : "border-border-strong bg-surface hover:border-foreground"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          {q.multi && (
            <button
              type="button"
              disabled={!(answers[q.id] || []).length}
              onClick={() => setStep(step + 1)}
              className={`mt-5 ${BUTTON_PRIMARY}`}
            >
              Next
            </button>
          )}
        </fieldset>
      ) : (
        <form onSubmit={submit} className="mt-6">
          <p className="display text-2xl text-foreground sm:text-3xl">Where should we send your result?</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">First name</span>
              <input name="name" required maxLength={80} autoComplete="given-name" className={INPUT} />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">Email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className={INPUT} />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-foreground">
              Your business <span className="font-normal text-muted">(optional)</span>
            </span>
            <select name="business" defaultValue="" className={INPUT}>
              <option value="">Choose one</option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="hidden" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="mt-5 flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#446100]" />
            <span>Send me the occasional useful email too. (Not ticked? You just get your result.)</span>
          </label>
          <button type="submit" disabled={busy} className={`mt-6 ${BUTTON_PRIMARY}`}>
            {busy ? "Checking your answers..." : "Show my score"}
          </button>
          {error && <p role="alert" className="mt-3 text-sm font-medium text-alert">{error}</p>}
        </form>
      )}
    </div>
  );
}
