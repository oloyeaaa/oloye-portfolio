"use client";

import { useState } from "react";

type Done = { number: number | null; already: boolean };

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
      <div role="status" className="rounded-lg border border-[#C6F23C]/40 bg-[#C6F23C]/10 px-5 py-6 text-center">
        <p className="text-2xl font-black tracking-tight text-white">
          {done.already
            ? "You're already in."
            : done.number
              ? <>You&apos;re number <span className="text-[#C6F23C]">{done.number}</span> of 100.</>
              : "You're in."}
        </p>
        <p className="mt-2 text-[#B8BBC2]">Check your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" noValidate={false}>
      <label className="block">
        <span className="sr-only">First name</span>
        <input
          name="name"
          required
          maxLength={80}
          autoComplete="given-name"
          placeholder="First name"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-[#8A8D93] focus:border-[#C6F23C] focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-[#8A8D93] focus:border-[#C6F23C] focus:outline-none"
        />
      </label>
      {/* Bots fill this in; people never see it. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-[#C6F23C] px-4 py-4 text-base font-black text-[#0E0F12] transition hover:bg-[#D9F86A] disabled:opacity-60"
      >
        {busy ? "Sending..." : "Send me the free kit"}
      </button>
      {error && <p role="alert" className="text-sm text-[#FCA5A5]">{error}</p>}
    </form>
  );
}
