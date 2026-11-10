"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { BACK, BUSINESS, CREATORS, FOOTER, ROUTES, WELCOME, type RouteId } from "@/lib/startJourney";

// /start, the welcome journey. All on one page: picking a route swaps the
// screen and adds a #creators or #business step to the address, so the
// phone's back button takes them back to screen 1 without a page load.

type Screen = "welcome" | RouteId;

function fromHash(): Screen {
  const h = typeof window === "undefined" ? "" : window.location.hash.slice(1);
  return h === "creators" || h === "business" ? h : "welcome";
}

// True once this visit has stepped forward with go(), so Back can use the
// browser's history. A shared #business link has nothing of ours to go back to.
let steppedHere = false;

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

const PRIMARY =
  "flex w-full items-center justify-center rounded-xl bg-foreground px-5 py-4 text-[16px] font-semibold text-white transition hover:bg-black active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark";

function Step({ text }: { text: string }) {
  return <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-dark">{text}</p>;
}

function Footer() {
  return (
    <footer className="mt-10 flex items-center justify-center gap-3 border-t border-border pt-6">
      <Image src="/images/brand/avatar-lime-320.jpg" alt="Oloye" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full" />
      <p className="text-[13px] leading-snug text-muted">{FOOTER}</p>
    </footer>
  );
}

function BackLink({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" onClick={onBack} className="mt-6 text-sm font-medium text-muted underline underline-offset-4 hover:text-foreground">
      &lsaquo; {BACK}
    </button>
  );
}

export default function StartJourney() {
  // The screen comes from the address (#creators, #business), so a shared
  // link opens on the right screen and back/forward just work.
  const screen = useSyncExternalStore(subscribe, fromHash, () => "welcome" as Screen);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    top.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [screen]);

  const go = useCallback((to: RouteId, route: number) => {
    // Count the route in Google Analytics (only for visitors who said yes to
    // cookies, see CookieBanner). Free; shows as the "start_route" event.
    (window as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "start_route", { route });
    steppedHere = true;
    window.history.pushState(null, "", `#${to}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const back = useCallback(() => {
    if (steppedHere) window.history.back();
    else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 pb-10 pt-10">
      <div ref={top} tabIndex={-1} className="mx-auto max-w-md outline-none">
        {screen === "welcome" && (
          <section>
            <Step text={WELCOME.step} />
            <h1 className="mt-3 text-[30px] font-bold leading-tight tracking-tight text-foreground">{WELCOME.title}</h1>
            <p className="mt-3 text-[16px] leading-snug text-primary-dim">{WELCOME.line}</p>
            <h2 className="mt-8 text-[17px] font-bold text-foreground">{WELCOME.question}</h2>
            <ul className="mt-3 space-y-3">
              {ROUTES.map((r, i) => (
                <li key={r.label}>
                  <button
                    type="button"
                    onClick={() => go(r.goes, i + 1)}
                    data-route={i + 1}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-sm transition hover:border-border-strong hover:shadow-md active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground">{i + 1}</span>
                    <span className="flex-1 text-[16px] font-semibold leading-snug text-foreground">{r.label}</span>
                    <span aria-hidden className="text-xl text-muted transition group-hover:translate-x-0.5 group-hover:text-foreground">&rsaquo;</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {screen === "creators" && (
          <section>
            <Step text={CREATORS.step} />
            <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-foreground">{CREATORS.title}</h1>
            <p className="mt-3 text-[16px] leading-snug text-primary-dim">{CREATORS.line}</p>
            <ol className="mt-6 space-y-3">
              {CREATORS.steps.map((s, i) => (
                <li key={s.title} className="flex gap-3 rounded-2xl border border-border bg-surface p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground">{i + 1}</span>
                  <p className="text-[15px] leading-snug text-primary-dim">
                    <span className="font-semibold text-foreground">{s.title}</span> {s.text}
                  </p>
                </li>
              ))}
            </ol>
            <Link href={CREATORS.href} className={`${PRIMARY} mt-6`}>
              {CREATORS.button}
            </Link>
            <p className="mt-2 text-center text-sm text-muted">{CREATORS.small}</p>
            <BackLink onBack={back} />
          </section>
        )}

        {screen === "business" && (
          <section>
            <Step text={BUSINESS.step} />
            <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-foreground">{BUSINESS.title}</h1>
            <p className="mt-3 text-[16px] leading-snug text-primary-dim">{BUSINESS.line}</p>
            <div className="mt-6 space-y-4">
              {BUSINESS.choices.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                  <h2 className="text-[18px] font-bold leading-snug text-foreground">{c.title}</h2>
                  <p className="mt-2 text-[15px] leading-snug text-primary-dim">{c.text}</p>
                  {c.external ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={`${PRIMARY} mt-4`}>
                      {c.button}
                    </a>
                  ) : (
                    <Link href={c.href} className={`${PRIMARY} mt-4`}>
                      {c.button}
                    </Link>
                  )}
                  <p className="mt-2 text-center text-sm text-muted">{c.small}</p>
                </div>
              ))}
            </div>
            <BackLink onBack={back} />
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
}
