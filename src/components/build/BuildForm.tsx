"use client";

import { useState } from "react";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";

/**
 * The /build page form: first name and email, the usual tick box. It posts to
 * /api/lead like every other free thing, so Make saves them in Leads and emails
 * the guide. If the email can't go, the guide link shows here instead.
 */
export default function BuildForm({
  freebie,
  source,
  button,
  thanks,
  guideUrl,
}: {
  freebie: string;
  source: string;
  button: string;
  thanks: string;
  guideUrl: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(true);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          consent: f.get("consent") === "on",
          website: f.get("website"),
          freebie,
          source,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Try again.");
      setEmailed(data.emailed !== false);
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8" role="status">
        {emailed ? (
          <p className="text-lg font-semibold text-foreground">{thanks}</p>
        ) : (
          <>
            <p className="text-lg font-semibold text-foreground">We couldn&apos;t send the email just now, so here it is.</p>
            <a href={guideUrl} target="_blank" rel="noopener noreferrer" className={`mt-5 ${BUTTON_PRIMARY} sm:w-auto`}>
              Open the build guide
            </a>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">First name</span>
          <input name="name" required maxLength={80} autoComplete="given-name" className={INPUT} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className={INPUT} />
          <span className="mt-1.5 block text-sm text-muted">Free. No spam. Leave any time.</span>
        </label>
      </div>
      <label className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#446100]" />
        <span>Send me the occasional useful email too. (Not ticked? You just get the guide.)</span>
      </label>
      <button type="submit" disabled={state === "sending"} className={`mt-6 ${BUTTON_PRIMARY}`}>
        {state === "sending" ? "Sending..." : button}
      </button>
      {state === "error" && (
        <p className="mt-3 text-sm font-medium text-alert" role="alert">{error}</p>
      )}
    </form>
  );
}
