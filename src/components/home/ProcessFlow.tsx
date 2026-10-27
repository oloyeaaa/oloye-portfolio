"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Types a line out, once, each time its screen appears.
function Typer({ text, delay = 0, speed = 28 }: { text: string; delay?: number; speed?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout>;
    let i = 0;
    const tick = () => {
      i = reduce ? text.length : i + 1;
      setN(i);
      if (i < text.length) t = setTimeout(tick, speed);
    };
    const start = setTimeout(tick, reduce ? 0 : delay);
    return () => {
      clearTimeout(start);
      clearTimeout(t);
    };
  }, [text, delay, speed]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="caret !bg-accent" aria-hidden="true" />}
    </>
  );
}

type Step = { title: string; tool: string; logo: string; screen: ReactNode };

// One example automation, start to finish. The screens are drawn, not real data.
const STEPS: Step[] = [
  {
    title: "New enquiry comes in",
    tool: "Google Forms",
    logo: "/images/tools/google-workspace-logo-white.svg",
    screen: (
      <>
        <p className="pf-in font-mono text-[11px] text-accent">NEW FORM REPLY</p>
        <div className="pf-in mt-4 rounded-lg bg-white/5 p-3" style={d(150)}>
          <p className="text-xs text-white/50">Name</p>
          <p className="text-base font-semibold text-white"><Typer text="Alex" delay={300} /></p>
        </div>
        <div className="pf-in mt-2 rounded-lg bg-white/5 p-3" style={d(300)}>
          <p className="text-xs text-white/50">Message</p>
          <p className="text-base text-white"><Typer text="Do you have space next week?" delay={600} /></p>
        </div>
        <span className="pf-pop mt-4 inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-foreground" style={d(1800)}>
          ✓ Received
        </span>
      </>
    ),
  },
  {
    title: "Saved to your list",
    tool: "Airtable",
    logo: "/images/tools/airtable-logo-white.svg",
    screen: (
      <>
        <p className="pf-in font-mono text-[11px] text-accent">YOUR CUSTOMER LIST</p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2 px-2 text-white/50">
            <span>Name</span><span>From</span><span>Status</span>
          </div>
          <div className="pf-drop grid grid-cols-3 gap-2 rounded-lg bg-accent/15 p-2 text-white ring-1 ring-accent/70" style={d(300)}>
            <span className="font-semibold">Alex</span><span>Website</span>
            <span className="pf-pop font-semibold text-accent" style={d(900)}>New lead</span>
          </div>
          {[
            ["Sam", "Instagram", "Booked"],
            ["Priya", "Referral", "Client"],
          ].map(([a, b, c], i) => (
            <div key={a} className="pf-in grid grid-cols-3 gap-2 p-2 text-white/40" style={d(100 + i * 100)}>
              <span>{a}</span><span>{b}</span><span>{c}</span>
            </div>
          ))}
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
        <p className="pf-in font-mono text-[11px] text-accent">EMAIL TO ALEX</p>
        <p className="mt-4 min-h-[3rem] text-base text-white">
          <Typer text="Hi Alex, thanks for getting in touch. Pick a time that suits you and we'll talk it through." delay={250} speed={22} />
        </p>
        <div className="relative mt-4 flex items-center gap-3">
          <span className="pf-pop inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-foreground" style={d(2500)}>
            ✓ Sent
          </span>
          <span className="pf-fly absolute left-16 text-lg text-accent" style={d(2600)} aria-hidden="true">➤</span>
        </div>
      </>
    ),
  },
  {
    title: "Call booked",
    tool: "Google Calendar",
    logo: "/images/tools/google-workspace-logo-white.svg",
    screen: (
      <>
        <p className="pf-in font-mono text-[11px] text-accent">CALENDAR</p>
        <div className="mt-4 grid grid-cols-5 gap-1.5 text-center text-[11px] text-white/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
            <span key={day}>{day}</span>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="pf-in relative h-16 rounded-md bg-white/5" style={d(i * 80)}>
              {i === 3 && (
                <span className="pf-drop absolute inset-1 flex items-center justify-center rounded bg-accent text-[11px] font-bold text-foreground" style={d(700)}>
                  10:00
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="pf-in mt-4 text-sm text-white" style={d(1100)}>Call with Alex, Thursday 10:00</p>
        <p className="pf-in text-xs text-white/50" style={d(1300)}>Reminder set for the day before</p>
      </>
    ),
  },
  {
    title: "Invoice sent",
    tool: "Make",
    logo: "/images/tools/make-logo-white.svg",
    screen: (
      <>
        <p className="pf-in font-mono text-[11px] text-accent">INVOICE</p>
        <div className="pf-in relative mt-4 rounded-xl bg-white p-4 text-foreground" style={d(150)}>
          <div className="flex justify-between text-xs text-muted"><span>To</span><span>Due</span></div>
          <div className="flex justify-between text-sm font-semibold"><span>Alex</span><span>7 days</span></div>
          <div className="mt-3 space-y-1.5">
            <span className="block h-2 w-full rounded-full bg-surface-alt" />
            <span className="block h-2 w-2/3 rounded-full bg-surface-alt" />
          </div>
          <span className="pf-stamp absolute right-4 top-6 rounded-md border-2 border-accent-dark px-2 py-0.5 text-sm font-black text-accent-dark" style={d(900)}>
            SENT
          </span>
        </div>
        <span className="pf-pop mt-4 inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-foreground" style={d(1700)}>
          Pay link included
        </span>
      </>
    ),
  },
  {
    title: "Review asked for",
    tool: "Make",
    logo: "/images/tools/make-logo-white.svg",
    screen: (
      <>
        <p className="pf-in font-mono text-[11px] text-accent">FOLLOW-UP EMAIL</p>
        <p className="mt-4 text-base text-white"><Typer text="How did we do, Alex?" delay={200} /></p>
        <p className="mt-3 flex gap-1.5 text-3xl text-accent" aria-label="Five stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="pf-pop" style={d(900 + i * 180)}>★</span>
          ))}
        </p>
        <span className="pf-pop mt-4 inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-foreground" style={d(2000)}>
          ✓ New review
        </span>
      </>
    ),
  },
];

const STEP_MS = 3800;
const ROW = 64; // height of one step row in px, so the lime line knows how far to grow

export default function ProcessFlow() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [round, setRound] = useState(0); // restarts the screen and the progress bar
  // After a tap, skip a tick so the visitor can read the step they chose.
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
      setRound((r) => r + 1);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [visible]);

  function jump(i: number) {
    setActive(i);
    setRound((r) => r + 1);
    skipTicks.current = 1;
  }

  const step = STEPS[active];

  return (
    <div ref={box} className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      {/* The steps. The lime line grows down to the step running now. */}
      <ol className="relative" style={{ height: ROW * STEPS.length }}>
        <span className="absolute left-[19px] w-0.5 bg-white/10" style={{ top: ROW / 2, height: ROW * (STEPS.length - 1) }} aria-hidden="true" />
        <span
          className="absolute left-[19px] w-0.5 bg-accent shadow-[0_0_12px_rgba(198,242,60,0.8)] transition-all duration-700 ease-out"
          style={{ top: ROW / 2, height: ROW * active }}
          aria-hidden="true"
        />
        {STEPS.map((s, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <li key={s.title} style={{ height: ROW }}>
              <button
                type="button"
                onClick={() => jump(i)}
                className="group relative flex h-full w-full items-center gap-4 text-left"
                aria-current={now ? "step" : undefined}
              >
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-all duration-500 ${
                    now
                      ? "pf-ring scale-110 border-accent bg-accent text-foreground"
                      : done
                        ? "border-accent/60 bg-foreground text-accent"
                        : "border-white/20 bg-foreground text-white/45"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-base transition-colors sm:text-lg ${
                      now ? "font-semibold text-white" : done ? "text-white/70" : "text-white/45 group-hover:text-white/75"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className={`block font-mono text-[11px] transition-colors ${now ? "text-accent" : "text-white/30"}`}>
                    {s.tool}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The screen acts out each step */}
      <div className="relative order-first overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 lg:order-none">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-3">
          <span className="flex items-center gap-2 font-mono text-[11px] text-white/60">
            <span className="pf-blink h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Running on its own
          </span>
          <span key={active} className="pf-in flex items-center gap-2 text-xs text-white/50">
            Done by
            <img src={step.logo} alt={step.tool} className="h-4 w-auto max-w-[110px] object-contain" />
            {/* Airtable's file is the mark only, so its name goes beside it */}
            {step.tool === "Airtable" && <span className="font-semibold text-white">Airtable</span>}
          </span>
        </div>

        <div key={`screen-${round}`} className="relative min-h-[230px] py-6">
          {step.screen}
        </div>

        <div className="relative border-t border-white/10 pt-3">
          <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div key={`bar-${round}`} className="pf-bar h-full bg-accent" style={{ "--t": `${STEP_MS}ms` } as CSSProperties} />
          </div>
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-white/50">Done for you</span>
            <span className="text-accent">
              {active + 1} of {STEPS.length} · you did 0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
