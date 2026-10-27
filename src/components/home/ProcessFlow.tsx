"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from "react";

type Step = {
  title: string;
  tool: string;
  logo: string;
  screen: ReactNode;
};

const Line = ({ w = "w-full" }: { w?: string }) => (
  <span className={`block h-2 rounded-full bg-white/10 ${w}`} />
);

// One example automation, start to finish. The screens are drawn, not real data.
const STEPS: Step[] = [
  {
    title: "New enquiry comes in",
    tool: "Google Forms",
    logo: "/images/tools/google-workspace-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">NEW FORM REPLY</p>
        <p className="mt-3 text-sm text-white/60">Name</p>
        <p className="text-base font-semibold text-white">Alex</p>
        <p className="mt-3 text-sm text-white/60">Message</p>
        <p className="text-base text-white">Do you have space next week?</p>
      </>
    ),
  },
  {
    title: "Saved to your list",
    tool: "Airtable",
    logo: "/images/tools/airtable-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">YOUR CUSTOMER LIST</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2 text-white/50">
            <span>Name</span><span>From</span><span>Status</span>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-accent/15 p-2 text-white ring-1 ring-accent/60">
            <span className="font-semibold">Alex</span><span>Website</span><span className="text-accent">New</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2 text-white/40">
            <span>Sam</span><span>Instagram</span><span>Booked</span>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "Reply written and sent",
    tool: "Claude",
    logo: "/images/tools/claude-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">EMAIL SENT</p>
        <p className="mt-3 text-base text-white">Hi Alex, thanks for getting in touch.</p>
        <p className="mt-2 text-sm text-white/70">Pick a time that suits you here, and we&apos;ll talk it through.</p>
        <div className="mt-4 space-y-2"><Line w="w-4/5" /><Line w="w-3/5" /></div>
      </>
    ),
  },
  {
    title: "Call booked",
    tool: "Google Calendar",
    logo: "/images/tools/google-workspace-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">CALENDAR</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5 text-center text-[11px] text-white/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
            <span key={d}>{d}</span>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-12 rounded-md ${i === 3 ? "bg-accent text-foreground font-bold flex items-center justify-center text-[11px]" : "bg-white/5"}`}
            >
              {i === 3 ? "10:00" : ""}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-white">Call with Alex, Thursday 10:00</p>
      </>
    ),
  },
  {
    title: "Invoice sent",
    tool: "Make",
    logo: "/images/tools/make-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">INVOICE</p>
        <p className="mt-3 text-base font-semibold text-white">Sent to Alex</p>
        <div className="mt-3 space-y-2"><Line /><Line w="w-2/3" /></div>
        <span className="mt-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-foreground">Pay link included</span>
      </>
    ),
  },
  {
    title: "Review asked for",
    tool: "Make",
    logo: "/images/tools/make-logo-white.svg",
    screen: (
      <>
        <p className="font-mono text-[11px] text-accent">FOLLOW-UP EMAIL</p>
        <p className="mt-3 text-base text-white">How did we do, Alex?</p>
        <p className="mt-3 text-2xl tracking-widest text-accent">★★★★★</p>
        <p className="mt-2 text-sm text-white/60">One tap to leave a review.</p>
      </>
    ),
  },
];

const STEP_MS = 2800;

export default function ProcessFlow() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  // After a tap, skip a few ticks so the visitor can read the step they chose.
  const skipTicks = useRef(0);
  const box = useRef<HTMLDivElement>(null);

  // Only run while the section is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (skipTicks.current > 0) {
        skipTicks.current -= 1;
        return;
      }
      setActive((a) => (a + 1) % STEPS.length);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [visible]);

  function jump(i: number) {
    setActive(i);
    skipTicks.current = 2;
  }

  const step = STEPS[active];
  const progress = (active / (STEPS.length - 1)) * 100;

  return (
    <div ref={box} className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      {/* The steps, with a lime dot running down the line */}
      <ol className="relative">
        <span className="absolute left-[15px] top-4 bottom-4 w-px bg-white/15" aria-hidden="true" />
        <span
          className="absolute left-[15px] top-4 w-px bg-accent transition-all duration-700"
          style={{ height: `calc((100% - 2rem) * ${progress / 100})` }}
          aria-hidden="true"
        />
        {STEPS.map((s, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => jump(i)}
                className="group relative flex w-full items-center gap-4 rounded-xl py-2.5 pr-3 text-left"
                aria-current={now ? "step" : undefined}
              >
                <span
                  className={`relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500 ${
                    now
                      ? "scale-110 border-accent bg-accent text-foreground shadow-[0_0_0_6px_rgba(198,242,60,0.18)]"
                      : done
                        ? "border-accent bg-foreground text-accent"
                        : "border-white/25 bg-foreground text-white/50"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={`text-base transition-colors sm:text-lg ${
                    now ? "font-semibold text-white" : done ? "text-white/70" : "text-white/45 group-hover:text-white/70"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The screen that shows the real thing at each step */}
      <div className="order-first rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 lg:order-none">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <span className="flex items-center gap-2 text-xs text-white/50">
            Done by
            <img src={step.logo} alt={step.tool} className="h-4 w-auto max-w-[110px] object-contain" />
          </span>
        </div>

        <div key={active} className="min-h-[190px] animate-[fade-in_0.5s_ease] py-6">
          {step.screen}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
          <span className="text-white/50">Done for you</span>
          <span className="text-accent">
            {active + 1} of {STEPS.length} · you did 0
          </span>
        </div>
      </div>
    </div>
  );
}
