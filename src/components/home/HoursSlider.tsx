"use client";

import { useState } from "react";

// Plain maths, shown as an example: hours a week x 52, and what those hours are worth.
export default function HoursSlider() {
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(30);
  const yearHours = hours * 52;
  const yearValue = yearHours * rate;

  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-surface p-6 sm:p-10">
      <p className="eyebrow">Small jobs add up</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="flex items-baseline justify-between text-sm text-muted">
            Hours a week on repeat jobs
            <strong className="text-2xl font-extrabold text-foreground">{hours}</strong>
          </span>
          <input
            type="range"
            min={1}
            max={20}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="lime-range mt-4"
          />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm text-muted">
            What an hour of your time is worth
            <strong className="text-2xl font-extrabold text-foreground">£{rate}</strong>
          </span>
          <input
            type="range"
            min={10}
            max={150}
            step={5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="lime-range mt-4"
          />
        </label>
      </div>

      <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
        <div>
          <p className="display text-5xl text-foreground sm:text-6xl">{yearHours}</p>
          <p className="mt-2 text-sm text-muted">hours a year</p>
        </div>
        <div>
          <p className="display text-5xl text-foreground sm:text-6xl">
            <span className="lime-mark">£{yearValue.toLocaleString("en-GB")}</span>
          </p>
          <p className="mt-2 text-sm text-muted">of your time, every year</p>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted">
        An example. Your own numbers decide the real answer.
      </p>
    </div>
  );
}
