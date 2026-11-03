"use client";

import { useState } from "react";

// The automation ROI calculator (3 Nov 2026). The same plain maths as the home
// page slider (hours a week x 52 x what an hour is worth), plus the reader's
// own guess at how much could run on its own. Nothing is sent anywhere.

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const num = (n: number) => Math.round(n).toLocaleString("en-GB");

function Slider({
  label,
  help,
  value,
  shown,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  shown: string;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4 text-sm font-semibold text-foreground">
        {label}
        <strong className="shrink-0 text-2xl font-extrabold text-foreground">{shown}</strong>
      </span>
      <span className="mt-1 block text-sm text-muted">{help}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lime-range mt-4"
      />
    </label>
  );
}

export default function RoiCalculator() {
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(30);
  const [share, setShare] = useState(50);

  const yearHours = hours * 52;
  const weeks = yearHours / 40;
  const yearValue = yearHours * rate;
  const back = yearValue * (share / 100);
  const backHours = yearHours * (share / 100);

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
      <div className="grid gap-9">
        <Slider
          label="Hours a week on repeat tasks"
          help="Saving enquiries, chasing invoices, sending the same emails, booking calls. Everything you do manually, over and over."
          value={hours}
          shown={String(hours)}
          min={1}
          max={30}
          onChange={setHours}
        />
        <Slider
          label="What an hour of your time is worth"
          help="What you charge, or what you'd earn doing paid work instead."
          value={rate}
          shown={`£${rate}`}
          min={10}
          max={150}
          step={5}
          onChange={setRate}
        />
        <Slider
          label="How much of it could run on its own?"
          help="Your guess. Tasks that follow the same steps every time are the easiest to automate."
          value={share}
          shown={`${share}%`}
          min={10}
          max={100}
          step={10}
          onChange={setShare}
        />
      </div>

      <div className="mt-10 grid gap-7 border-t border-border pt-8" aria-live="polite">
        <div>
          <p className="display text-4xl text-foreground sm:text-5xl">{num(yearHours)} hours a year</p>
          <p className="mt-2 text-sm text-muted">
            on repeat tasks. That&apos;s about {weeks.toLocaleString("en-GB", { maximumFractionDigits: 1 })} working weeks of 40 hours.
          </p>
        </div>
        <div>
          <p className="display text-4xl text-foreground sm:text-5xl">{gbp(yearValue)} a year</p>
          <p className="mt-2 text-sm text-muted">of your time.</p>
        </div>
        <div>
          <p className="display text-4xl text-foreground sm:text-5xl">
            <span className="lime-mark">{gbp(back)} a year</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            you could get back. That&apos;s {num(backHours)} hours to spend on paid work, or away from work altogether.
          </p>
        </div>
      </div>
      <p className="mt-7 text-xs text-muted">
        An estimate from your own numbers. What you really save depends on the tasks and the workflow.
      </p>
    </div>
  );
}
