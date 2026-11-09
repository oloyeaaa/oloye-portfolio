"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";
import { OTHER, OTHER_MAX, QUESTIONS, SECTIONS, boxShows, type Answers, type Idea, type Lists, type SectionId } from "@/lib/tools/what-to-post";

// What to post and what to sell: the steps, then one question card at a time,
// then the email step, then four lists of five. Words: the Copywriter
// (content/find-your-channel/WORDS.md). Built big for a phone held up on a
// TikTok live, and it's his link in bio.

// Shown while Claude works (about 15 seconds), one after another, so the
// screen is never still. Words: the Copywriter (WORDS.md 3161d60).
const WAITING = [
  "Reading your answers...",
  "Finding who it could be for...",
  "Working out what you could post about...",
  "Putting your ideas together...",
];
// While the plan is made (about 10 seconds), these take turns on the button.
// Words: the Copywriter (WORDS.md a70b014).
const SENDING = ["Writing your plan...", "Making your PDF..."];
const STEPS = ["Answer a few quick questions.", "Leave your email.", "Get 5 ideas for each of four things.", "Not right? Tap for 5 more."];
const empty = () => Object.fromEntries(QUESTIONS.map((q) => [q.id, { picked: [], other: "" }])) as Answers;

type Done = { lists: Lists; careNote: string; token: string; name: string; email: string };

// The results email goes once they've seen what they want: when they leave
// the results (switch app, close the tab, or tap "Add a bit more"), or after
// 10 minutes, whichever comes first. It lists every idea they saw.
const EMAIL_AFTER_MS = 10 * 60 * 1000;

type Track = { id: string; sig: string };

/** Where they came from: the ?from= tag on the link (rita, tiktok, bio, live, blog). */
const fromTag = () => new URLSearchParams(window.location.search).get("from") || "";

/** Counting steps (no name, email or IP: see what-to-post-track.ts). Never blocks the page. */
function count(track: Track | null, event: string, extra: Record<string, unknown> = {}) {
  if (!track) return;
  fetch("/api/tools/what-to-post/track", {
    method: "POST",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, id: track.id, sig: track.sig, ...extra }),
  }).catch(() => {});
}

export default function WhatToPost() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [startedAt, setStartedAt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [unclear, setUnclear] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [me, setMe] = useState({ name: "", email: "", consent: false });
  const [wait, setWait] = useState(0);
  const [track, setTrack] = useState<Track | null>(null);
  const box = useRef<HTMLDivElement>(null);

  // Count the answers once they reach the email step (taps and the Q1 job only).
  useEffect(() => {
    if (step === QUESTIONS.length) count(track, "answers", { answers });
  }, [step, track, answers]);

  // Change the waiting line every few seconds while Claude works.
  useEffect(() => {
    if (!busy) return;
    const t = setInterval(() => setWait((w) => Math.min(w + 1, WAITING.length - 1)), 3000);
    return () => clearInterval(t);
  }, [busy]);

  // Back to question 1 with every answer kept, so they only add what's missing.
  function addMore() {
    setDone(null);
    setUnclear("");
    setError("");
    setStep(0);
    window.scrollTo({ top: 0 });
  }

  // On a phone the next card can start above the screen: bring it back into view.
  useEffect(() => {
    const top = box.current?.getBoundingClientRect().top;
    if (started && top !== undefined && top < 0) box.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, started]);

  if (done) return <ResultsView first={done} onAddMore={addMore} track={track} answers={answers} />;

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
            fetch("/api/tools/what-to-post/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ event: "start", from: fromTag() }),
            })
              .then((r) => r.json())
              .then((d) => d.ok && setTrack({ id: d.id, sig: d.sig }))
              .catch(() => {});
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
    const picked =
      q.max === 1
        ? [label]
        : a.picked.includes(label)
        ? a.picked.filter((x) => x !== label)
        : [...a.picked, label].slice(-q.max);
    // Typed words only stay while their box is showing.
    const other = boxShows(q, picked) ? a.other : "";
    setAnswer(q.id, picked, other);
    // One-tap cards move on by themselves, unless a box needs filling in.
    if (q.max === 1 && !boxShows(q, picked)) setStep(step + 1);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    const who = { name: String(f.get("name") || ""), email: String(f.get("email") || ""), consent: f.get("consent") === "on" };
    setMe(who);
    setWait(0);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/tools/what-to-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          startedAt,
          ...who,
          from: fromTag(),
          track,
          website: f.get("website"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Try again in a minute.");
      if (data.status === "unclear") {
        setUnclear(data.message);
      } else {
        setDone({ lists: data.lists, careNote: data.careNote || "", token: data.token || "", name: who.name, email: who.email });
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
          onClick={addMore}
          className={`mt-6 text-base ${BUTTON_PRIMARY}`}
        >
          Add a bit more to your answers
        </button>
      </div>
    );
  }

  const answered = !!a && (a.picked.length > 0 || a.other.trim().length > 0);
  const showBox = !!q && !!a && boxShows(q, a.picked);

  return (
    <div ref={box} className="scroll-mt-20 rounded-3xl border border-border bg-surface p-5 sm:p-8">
      <div className="flex items-center justify-between text-base text-muted">
        <span className="font-semibold">{step < total ? `${step + 1} of ${total}` : "Last step"}</span>
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
          {q.max > 1 && <p className="mt-2 text-base text-muted">Pick up to {q.max}</p>}
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
          {showBox && (
            <label className="mt-4 block">
              {q.boxLabel && <span className="text-base font-medium text-foreground">{q.boxLabel}</span>}
              <input
                value={a.other}
                onChange={(e) => setAnswer(q.id, a.picked, e.target.value)}
                maxLength={OTHER_MAX}
                placeholder={q.placeholder || "In a few words"}
                aria-label={q.boxLabel || OTHER}
                autoFocus={q.box === "other"}
                className={`${INPUT} text-lg`}
              />
            </label>
          )}
          {(q.max > 1 || showBox) && (
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
            Skip this one
          </button>
        </fieldset>
      ) : (
        <form onSubmit={submit} className="card-in mt-7">
          <p className="display text-3xl leading-tight text-foreground sm:text-4xl">Your ideas are ready.</p>
          <p className="mt-2 text-lg text-muted">Where should a copy go? They show on this page too.</p>
          <div className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-base font-medium text-foreground">First name</span>
              <input name="name" required maxLength={80} autoComplete="given-name" defaultValue={me.name} className={`${INPUT} text-lg`} />
            </label>
            <label className="block">
              <span className="text-base font-medium text-foreground">Email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" defaultValue={me.email} className={`${INPUT} text-lg`} />
            </label>
          </div>
          <label className="hidden" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="mt-5 flex items-start gap-3 text-base text-muted">
            <input type="checkbox" name="consent" defaultChecked={me.consent} className="mt-1 h-5 w-5 shrink-0 accent-[#446100]" />
            <span>Also send me the occasional useful email. (Not ticked? You just get this email with your ideas.)</span>
          </label>
          <button type="submit" disabled={busy} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
            {busy ? "Finding your ideas..." : "See the ideas"}
          </button>
          {busy && (
            <p key={wait} role="status" className="card-in mt-4 text-center text-xl font-semibold text-foreground">
              {WAITING[wait]}
            </p>
          )}
          {error && <p role="alert" className="mt-3 text-base font-medium text-alert">{error}</p>}
          <p className="mt-4 text-center text-base text-muted">Free. Leave any time.</p>
          <p className="mt-2 text-center text-sm text-muted">
            Your email is for sending your ideas. Your answers are counted with nothing that says who you are.
          </p>
        </form>
      )}
    </div>
  );
}

function ResultsView({
  first,
  onAddMore,
  track,
  answers,
}: {
  first: Done;
  onAddMore: () => void;
  track: Track | null;
  answers: Answers;
}) {
  const lists = first.lists;
  // Version 2: one pick per section, by its place in the list.
  const [picks, setPicks] = useState<Partial<Record<SectionId, number>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState("");
  const [sendError, setSendError] = useState("");
  const [sendLine, setSendLine] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfName, setPdfName] = useState("your-plan-oloye.pdf");

  useEffect(() => {
    if (!sending) return;
    const t = setInterval(() => setSendLine((n) => (n + 1) % SENDING.length), 3000);
    return () => clearInterval(t);
  }, [sending]);
  const pickedCount = Object.values(picks).filter((v) => v !== undefined).length;

  function pickIdea(section: SectionId, index: number) {
    setPicks((p) => ({ ...p, [section]: index }));
  }

  async function sendPicks() {
    if (sending || !first.token) return;
    setSendLine(0);
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/tools/what-to-post/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: first.email,
          name: first.name,
          lists: first.lists,
          careNote: first.careNote,
          token: first.token,
          answers,
          picks,
          track,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We couldn't make your plan just now. Press it again.");
      if (data.status === "unclear") throw new Error(data.message);
      // The picks email replaces the plain ideas email.
      emailSent.current = true;
      if (typeof data.pdf === "string" && data.pdf) {
        const bytes = Uint8Array.from(atob(data.pdf), (c) => c.charCodeAt(0));
        setPdfUrl(URL.createObjectURL(new Blob([bytes], { type: "application/pdf" })));
        if (typeof data.pdfName === "string") setPdfName(data.pdfName);
      }
      setSent("Sent. Check your inbox for your picks and the PDF.");
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "We couldn't make your plan just now. Press it again.");
    } finally {
      setSending(false);
    }
  }
  const [more, setMore] = useState<Partial<Record<SectionId, boolean>>>({});
  const [copied, setCopied] = useState(false);
  const seenRef = useRef(more);
  const emailSent = useRef(false);

  useEffect(() => {
    seenRef.current = more;
  }, [more]);

  // Send the results email once. keepalive lets it finish even as the page closes.
  const sendEmail = useCallback(() => {
    if (emailSent.current || !first.token) return;
    emailSent.current = true;
    fetch("/api/tools/what-to-post/email", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: first.email,
        name: first.name,
        lists: first.lists,
        careNote: first.careNote,
        token: first.token,
        seen: seenRef.current,
      }),
    }).catch(() => {
      emailSent.current = false;
    });
  }, [first]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") sendEmail();
    };
    const timer = setTimeout(sendEmail, EMAIL_AFTER_MS);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", sendEmail);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", sendEmail);
    };
  }, [sendEmail]);

  function addMore() {
    sendEmail();
    onAddMore();
  }

  // Every idea they've seen, as plain text, for "Copy my ideas". Nothing is stored.
  function seenText(): string {
    return SECTIONS.map((s) => {
      const seen = more[s.id] ? lists[s.id] : lists[s.id].slice(0, 5);
      return [s.title, ...seen.map((i) => `- ${i.title}: ${i.why}`)].join("\n");
    }).join("\n\n");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(seenText());
      setCopied(true);
      count(track, "copied");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-6" role="status">
      <div className="rounded-3xl border border-accent bg-surface p-6 text-center sm:p-8">
        <p className="display text-4xl text-foreground">Your ideas</p>
        <p className="mt-3 text-lg text-muted">They&apos;re ideas to try, not answers. Not right? Tap &quot;5 more&quot; on any section.</p>
        <p className="mt-3 text-lg font-semibold text-foreground">
          Tap &quot;Pick this one&quot; on your favourite in each section. We&apos;ll email you a simple PDF made for your picks.
        </p>
      </div>

      {first.careNote && <p className="rounded-2xl bg-surface-alt px-5 py-4 text-lg text-foreground">{first.careNote}</p>}

      {SECTIONS.map((s) => {
        const all = lists[s.id];
        const opened = !!more[s.id];
        const extra = all.slice(5);
        return (
          <section key={s.id} className="rounded-3xl border border-border bg-surface p-5 sm:p-8" aria-labelledby={`h-${s.id}`}>
            <h2 id={`h-${s.id}`} className="display text-3xl text-foreground">{s.title}</h2>
            {opened ? (
              <>
                <IdeaList ideas={extra} start={6} picked={picks[s.id]} onPick={sent ? undefined : (i) => pickIdea(s.id, i)} />
                <details className="mt-5 rounded-xl border border-border px-4 py-3">
                  <summary className="cursor-pointer text-base font-semibold text-foreground">Earlier ideas (5)</summary>
                  <IdeaList ideas={all.slice(0, 5)} start={1} picked={picks[s.id]} onPick={sent ? undefined : (i) => pickIdea(s.id, i)} />
                </details>
              </>
            ) : (
              <IdeaList ideas={all.slice(0, 5)} start={1} picked={picks[s.id]} onPick={sent ? undefined : (i) => pickIdea(s.id, i)} />
            )}
            {!opened && extra.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  const next = { ...more, [s.id]: true };
                  setMore(next);
                  count(track, "more", { sections: Object.keys(next).filter((k) => next[k as SectionId]) });
                }}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg border-2 border-foreground px-6 py-4 text-base font-bold text-foreground transition hover:bg-accent"
              >
                5 more ideas
              </button>
            ) : (
              <div className="mt-6 rounded-xl bg-surface-alt p-4 text-center">
                <p className="text-lg text-foreground">
                  These are the best fits for your answers.
                </p>
                <button type="button" onClick={addMore} className="mt-3 text-base font-bold text-foreground underline underline-offset-4">
                  Add a bit more to your answers
                </button>
              </div>
            )}
          </section>
        );
      })}

      {sent ? (
        <div className="rounded-3xl border border-accent bg-surface p-6 text-center">
          <p className="text-xl font-semibold text-foreground">{sent}</p>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download={pdfName}
              onClick={() => count(track, "downloaded")}
              className={`mt-5 text-base ${BUTTON_PRIMARY}`}
            >
              Download your PDF
            </a>
          )}
        </div>
      ) : (
        pickedCount > 0 && (
          <div>
            <button type="button" onClick={sendPicks} disabled={sending} className={`text-base ${BUTTON_PRIMARY}`}>
              {sending ? SENDING[sendLine] : "Send your picks"}
            </button>
            {sendError && <p role="alert" className="mt-3 text-base font-medium text-alert">{sendError}</p>}
          </div>
        )
      )}

      <button type="button" onClick={copy} className={`text-base ${BUTTON_PRIMARY}`}>
        {copied ? "Copied" : "Copy my ideas"}
      </button>

      <p className="px-2 text-lg text-foreground">
        Posting gets people&apos;s attention. A free thing and something to sell give that attention somewhere to go. Pick the idea that feels most like you, post about it three times this week, and see which one people ask questions about.
      </p>

      <div className="rounded-3xl bg-foreground p-6 text-center sm:p-10">
        <p className="display text-3xl text-background sm:text-4xl">Want help making the posts?</p>
        <p className="mx-auto mt-3 max-w-md text-lg text-background/80">
          The founding group is a small group, building it together. What you already know is the content, and a content machine built with Claude does the heavy parts of the videos. No price or dates yet. The list hears first.
        </p>
        <Link href="/founding" onClick={() => count(track, "founding")} className={`mt-6 text-base ${BUTTON_PRIMARY}`}>
          Join the founding group
        </Link>
      </div>
    </div>
  );
}

function IdeaList({
  ideas,
  start,
  picked,
  onPick,
}: {
  ideas: Idea[];
  start: number;
  picked?: number;
  onPick?: (index: number) => void;
}) {
  return (
    <ol className="mt-5 space-y-5">
      {ideas.map((idea, i) => (
        <li key={`${start + i}-${idea.title}`} className="card-in flex gap-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-base font-extrabold text-foreground">
            {start + i}
          </span>
          <span className="min-w-0">
            <span className="block break-words text-xl font-semibold leading-snug text-foreground">{idea.title}</span>
            <span className="mt-1 block text-lg text-muted">{idea.why}</span>
            {(onPick || picked === start - 1 + i) && (
              <button
                type="button"
                onClick={() => onPick?.(start - 1 + i)}
                disabled={!onPick}
                aria-pressed={picked === start - 1 + i}
                className={`mt-2 rounded-lg border-2 px-4 py-2 text-base font-bold transition ${
                  picked === start - 1 + i ? "border-foreground bg-accent text-foreground" : "border-border-strong text-foreground hover:border-foreground"
                }`}
              >
                {picked === start - 1 + i ? "Picked" : "Pick this one"}
              </button>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
