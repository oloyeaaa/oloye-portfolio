"use client";

import { useState } from "react";

/**
 * Name and email, into MailerLite.
 *
 * On success it hands over the Notion link immediately rather than saying
 * "check your inbox". Making somebody wait for an email to get the thing they
 * just asked for is friction we do not need, and the email still arrives.
 */
export default function SignupForm({
  notionUrl,
  list = "free-tools",
}: {
  notionUrl: string;
  list?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, list }),
      });
      const data = await res.json();
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

  if (state === "done") {
    return (
      <div className="rounded-lg border border-accent bg-surface p-6">
        <h3 className="font-display text-lg font-bold">
          {name ? `Thanks, ${name.split(" ")[0]}.` : "Thanks."} Here it is.
        </h3>
        {notionUrl ? (
          <>
            <p className="mt-2 text-primary-dim">
              Open the pack below and press Duplicate at the top right to keep
              your own copy. It is also on its way to your inbox.
            </p>
            <a
              href={notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-md bg-accent px-5 py-3 font-semibold text-background transition hover:bg-accent-light"
            >
              Open the pack in Notion
            </a>
          </>
        ) : (
          <p className="mt-2 text-primary-dim">
            The pack is on its way to your inbox. Every tool is also on this
            site already, free, with nothing to sign up for.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-border bg-surface p-6"
    >
      <h3 className="font-display text-lg font-bold">
        Want all five in one place?
      </h3>
      <p className="mt-2 max-w-[52ch] text-primary-dim">
        Get the whole pack as one Notion page you can duplicate and keep. Free,
        and the tools stay free on this site either way.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">
            First name{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
            className="mt-1.5 w-full rounded-md border border-border-strong bg-background px-3 py-2.5 text-foreground outline-none focus:border-accent"
            placeholder="Oloye"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-border-strong bg-background px-3 py-2.5 text-foreground outline-none focus:border-accent"
            placeholder="you@example.com"
          />
        </label>
      </div>

      {state === "error" && (
        <p className="mt-3 text-sm font-medium text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 rounded-md bg-accent px-5 py-3 font-semibold text-background transition hover:bg-accent-light disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : "Send me the pack"}
      </button>

      <p className="mt-3 text-sm text-muted">
        One email with the pack, then the occasional useful one. Unsubscribe any
        time.
      </p>
    </form>
  );
}
