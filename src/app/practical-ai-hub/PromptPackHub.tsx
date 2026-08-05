"use client";

import Image from "next/image";
import { useState } from "react";

const TIKTOK_URL = "https://www.tiktok.com/@practicalaihub4";
const INSTAGRAM_URL = "https://www.instagram.com/practicalaihub4";

export default function PromptPackHub() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  function close() {
    setOpen(false);
    // reset after the closing animation
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setError("");
    }, 200);
  }

  return (
    <section className="relative">
      {/* soft brand banner */}
      <div
        aria-hidden
        className="h-40 md:h-52 w-full"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 0%, rgba(198,242,60,0.18) 0%, rgba(52,224,210,0.10) 35%, rgba(14,15,18,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-xl px-6 -mt-20 pb-24 text-center">
        {/* avatar */}
        <div className="flex justify-center">
          <div className="rounded-full p-1 bg-accent">
            <Image
              src="/images/oloye-avatar.png"
              alt="Oloye, Practical AI Hub"
              width={144}
              height={144}
              priority
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover"
            />
          </div>
        </div>

        {/* name + tagline */}
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-foreground font-display">
          Oloye <span className="text-muted font-normal">|</span>{" "}
          <span className="text-accent">Practical AI Hub</span>
        </h1>
        <p className="mt-3 text-primary-dim text-lg leading-relaxed">
          Build extra income using AI to make and sell digital products. Real
          how-to, no hype.
        </p>

        {/* socials */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16.5 3c.29 2.06 1.62 3.79 3.7 4.06v2.7c-1.29.12-2.56-.28-3.68-1.03v6.43c0 3.28-2.43 5.84-5.63 5.84-3 0-5.39-2.32-5.39-5.32 0-3.13 2.6-5.5 6-5.11v2.83c-.41-.13-.86-.2-1.32-.2-1.4 0-2.52 1.06-2.52 2.5 0 1.47 1.12 2.55 2.53 2.55 1.5 0 2.6-1.13 2.6-2.9V3h3.71z" />
            </svg>
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center text-foreground hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        {/* primary CTA -> opens the popup */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-9 w-full rounded-2xl bg-accent px-6 py-5 text-base md:text-lg font-semibold text-background font-display hover:bg-accent-light transition-colors"
        >
          Get Your Digital Product Prompt Pack
        </button>
        <p className="mt-3 text-sm text-muted">
          10 free copy-paste AI prompts, straight to your inbox.
        </p>

        {/* Testimonials slot — hidden until real reviews are added.
        <section className="mt-16 text-left">...</section> */}
      </div>

      {/* POPUP */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Get the Prompt Pack"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={close}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-2xl">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-muted hover:text-foreground text-xl leading-none"
            >
              &times;
            </button>

            {status === "done" ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background text-2xl font-bold">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-foreground font-display">
                  You&apos;re in.
                </h2>
                <p className="mt-3 text-primary-dim">
                  Check your inbox for the Prompt Pack in the next minute. Peek
                  in Promotions or Spam just in case, and drag it to your main
                  inbox.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground hover:border-accent hover:text-accent font-display"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground font-display">
                  Get the free Prompt Pack
                </h2>
                <p className="mt-2 text-primary-dim text-sm leading-relaxed">
                  10 copy-paste AI prompts to find, build, and sell your first
                  digital product. Enter your email and it lands in your inbox.
                </p>
                <form onSubmit={submit} className="mt-5">
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
                  />
                  {status === "error" && (
                    <p className="mt-2 text-sm text-alert">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-3 w-full rounded-xl bg-accent px-6 py-3.5 font-semibold text-background font-display hover:bg-accent-light transition-colors disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Send me the pack"}
                  </button>
                </form>
                <p className="mt-3 text-xs text-muted">
                  By signing up you agree to receive emails from Practical AI
                  Hub. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
