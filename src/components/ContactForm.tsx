"use client";

import { useState } from "react";
import { INPUT } from "@/lib/ui";

// The message form on the Contact page. It lands in the Airtable Leads table.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "", consent: false, website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-accent bg-background p-8">
        <p className="display text-3xl text-foreground">
          {form.name ? `Thanks, ${form.name.split(" ")[0]}.` : "Thanks."} Got it.
        </p>
        <p className="mt-3 text-muted">A real person reads every message. We&apos;ll reply to {form.email} as soon as we can.</p>
      </div>
    );
  }

  const input = INPUT;

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-background p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">First name</span>
          <input type="text" value={form.name} onChange={set("name")} autoComplete="given-name" className={input} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input type="email" required value={form.email} onChange={set("email")} autoComplete="email" className={input} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-foreground">
          Your business <span className="font-normal text-muted">(optional)</span>
        </span>
        <input type="text" value={form.business} onChange={set("business")} autoComplete="organization" placeholder="e.g. a coaching business" className={input} />
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-foreground">What job is eating your week?</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          placeholder="A few lines is plenty."
          className={`${input} resize-y`}
        />
      </label>
      {/* Hidden from people, tempting for bots */}
      <label className="hidden" aria-hidden="true">
        Website
        <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 accent-[#446100]" />
        <span>It&apos;s fine to email me the occasional useful idea. (Not ticked? We&apos;ll only reply to this message.)</span>
      </label>

      {state === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 w-full rounded-lg bg-foreground px-6 py-4 text-sm font-bold text-accent transition hover:bg-foreground/90 disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
