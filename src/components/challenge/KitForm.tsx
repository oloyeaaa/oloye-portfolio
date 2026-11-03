"use client";

import { useState } from "react";
import { INPUT, BUTTON_PRIMARY } from "@/lib/ui";

type Done = { number: number | null; already: boolean };

// The /100 sign-up: first name and email, then the person's place on the list.
export default function KitForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<Done | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.get("name"), email: f.get("email"), website: f.get("website") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setDone({ number: typeof data.number === "number" ? data.number : null, already: !!data.already });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-3xl border border-accent bg-surface p-6 text-center sm:p-8">
        <p className="display text-3xl text-foreground">
          {done.already
            ? "You're already in."
            : done.number
              ? <>You&apos;re number <span className="lime-mark">{done.number}</span> of 100.</>
              : "You're in."}
        </p>
        <p className="mt-3 text-muted">Check your inbox.</p>
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
      <button type="submit" disabled={busy} className={`mt-5 ${BUTTON_PRIMARY}`}>
        {busy ? "Sending..." : "Send me the free kit"}
      </button>
      {error && <p role="alert" className="mt-3 text-sm font-medium text-alert">{error}</p>}
      <p className="mt-4 text-center text-sm text-muted">Free. No spam. Leave any time.</p>
    </form>
  );
}
