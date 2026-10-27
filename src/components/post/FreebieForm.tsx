"use client";

import { useState } from "react";
import type { PostFreebie } from "@/lib/postFreebies";

/**
 * The mid-post form: "Get the free [thing]". Name is optional, email is not.
 * /api/lead hands it to Make (saved in Airtable Leads, the free thing emailed),
 * and the free thing is also shown straight away here, so nobody waits.
 */
export default function FreebieForm({ freebie, source }: { freebie: PostFreebie; source: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, consent, freebie: freebie.key, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Try again.");
        setState("error");
        return;
      }
      setState("done");
    } catch {
      setError("Could not reach the server. Try again.");
      setState("error");
    }
  }

  const external = freebie.url.startsWith("http");

  return (
    <aside className="not-prose my-14 overflow-hidden rounded-3xl bg-foreground p-7 sm:p-10" aria-label={`Free ${freebie.kind}`}>
      <p className="eyebrow !text-accent">Free {freebie.kind}</p>
      {state === "done" ? (
        <>
          <p className="display mt-4 text-3xl !text-white">
            {name ? `Thanks, ${name.split(" ")[0]}.` : "Thanks."} Here it is.
          </p>
          <p className="mt-3 text-white/60">
            {consent ? "A copy is on its way to your inbox, and you're on the list for the occasional useful email." : "A copy is on its way to your inbox too. We won't send you anything else."}
          </p>
          <a
            href={freebie.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="mt-6 inline-flex rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-accent-light"
          >
            Open {freebie.title} →
          </a>
        </>
      ) : (
        <>
          <p className="display mt-4 text-3xl !text-white sm:text-4xl">{freebie.title}</p>
          <p className="mt-3 max-w-lg text-white/60">{freebie.line}</p>
          <form onSubmit={submit} className="mt-7 grid gap-3 sm:grid-cols-2">
            <label className="sr-only" htmlFor="ff-name">First name (optional)</label>
            <input
              id="ff-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
              placeholder="First name"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <label className="sr-only" htmlFor="ff-email">Email</label>
            <input
              id="ff-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Your email"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <label className="flex items-start gap-3 text-sm text-white/60 sm:col-span-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#C6F23C]" />
              <span>Also send me the occasional useful idea by email. (Not ticked? You just get this one.)</span>
            </label>
            <button
              type="submit"
              disabled={state === "sending"}
              className="whitespace-nowrap rounded-lg sm:col-span-2 bg-accent px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-accent-light disabled:opacity-60"
            >
              {state === "sending" ? "Sending..." : "Get it free"}
            </button>
          </form>
          {state === "error" && (
            <p className="mt-3 text-sm font-medium text-red-400" role="alert">{error}</p>
          )}
        </>
      )}
    </aside>
  );
}
