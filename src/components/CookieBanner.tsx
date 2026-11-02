"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

// Google Analytics only loads after the visitor taps Accept (2 Nov 2026).
// Their choice is kept in this browser's storage, not in a cookie.
const KEY = "cookie-choice";
const GA_ID = "G-H0K3LYD0R5";

type Choice = "yes" | "no" | null;

function readChoice(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "yes" || v === "no" ? v : null;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChoice(readChoice());
    setReady(true);
  }, []);

  // While the banner shows, add room at the bottom so it never hides a form or button.
  const showing = ready && choice === null;
  useEffect(() => {
    if (!showing) return;
    document.body.style.paddingBottom = "150px";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [showing]);

  function decide(c: "yes" | "no") {
    try {
      localStorage.setItem(KEY, c);
    } catch {}
    setChoice(c);
  }

  return (
    <>
      {choice === "yes" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {showing && (
        <div
          role="dialog"
          aria-label="Cookies"
          className="fixed bottom-3 left-3 z-50 w-[calc(100%-1.5rem)] max-w-sm rounded-2xl border border-border bg-background p-4 text-sm text-foreground shadow-lg sm:bottom-5 sm:left-5"
        >
          <p className="text-muted">
            Can we use cookies to count visits? It helps us see which pages help.{" "}
            <Link href="/privacy" className="font-semibold text-foreground underline underline-offset-4">
              Privacy
            </Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => decide("no")}
              className="rounded-lg border border-border-strong bg-surface px-3 py-2 font-semibold text-foreground transition hover:border-foreground"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide("yes")}
              className="rounded-lg border border-foreground bg-foreground px-3 py-2 font-semibold text-background transition hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** On /privacy: clear the choice so the banner asks again. */
export function ChangeCookieChoice() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem(KEY);
        } catch {}
        window.location.reload();
      }}
      className="font-semibold text-foreground underline underline-offset-4"
    >
      Change your cookie choice
    </button>
  );
}
