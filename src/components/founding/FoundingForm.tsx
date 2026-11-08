"use client";

import { useState } from "react";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";

// The founding group sign-up: first name, email, and a separate yes to emails.
export default function FoundingForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/founding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          email: f.get("email"),
          consent: f.get("consent") === "on",
          website: f.get("website"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-3xl border border-accent bg-surface p-6 text-center sm:p-8">
        <p className="display text-3xl text-foreground">You&apos;re on the list.</p>
        <p className="mt-3 text-muted">You&apos;ll hear first when the founding group opens.</p>
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
        </label>
      </div>
      {/* Bots fill this in; people never see it. */}
      <label className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 accent-[#446100]" />
        <span>Also send me the occasional useful email. (Not ticked? You only hear about the founding group.)</span>
      </label>
      <button type="submit" disabled={busy} className={`mt-5 ${BUTTON_PRIMARY}`}>
        {busy ? "Sending..." : "Count me in"}
      </button>
      {error && <p role="alert" className="mt-3 text-sm font-medium text-alert">{error}</p>}
      <p className="mt-4 text-center text-sm text-muted">Free to join the list. Leave any time.</p>
    </form>
  );
}
