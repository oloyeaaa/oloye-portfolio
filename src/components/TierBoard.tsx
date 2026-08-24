"use client";

import { useMemo, useState } from "react";
import {
  ROLES,
  TIER_META,
  TIER_ORDER,
  AI_RISK_META,
  DEMAND_META,
  type Door,
  type Role,
  type Tier,
} from "@/lib/marketing-roles";

type SortKey = "tier" | "pay-high" | "pay-low";
type DoorFilter = "all" | Door;
type EntryFilter = "all" | "outside";

const money = (n: number) => "£" + n.toLocaleString("en-GB");

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
        active
          ? "bg-accent text-background border-accent"
          : "bg-surface text-primary-dim border-border hover:border-border-strong hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function RoleRow({ role, maxPay }: { role: Role; maxPay: number }) {
  const [open, setOpen] = useState(false);
  const tier = TIER_META[role.tier];
  const ai = AI_RISK_META[role.aiRisk];
  const demand = DEMAND_META[role.demand];
  const barPct = role.median ? Math.round((role.median / maxPay) * 100) : 0;

  return (
    <li className="border border-border rounded-xl bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left px-4 py-4 sm:px-5 hover:bg-surface-alt transition-colors"
      >
        <div className="flex items-start gap-4">
          <span
            className="mt-0.5 shrink-0 grid place-items-center rounded-lg font-bold text-background w-9 h-9 text-sm"
            style={{ backgroundColor: tier.color }}
            aria-label={`Tier ${tier.label}`}
          >
            {tier.label}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold text-foreground text-base sm:text-lg">
                {role.name}
              </h3>
              <p
                className="font-mono font-semibold text-lg sm:text-xl tabular-nums"
                style={{ color: tier.color }}
              >
                {role.median ? money(role.median) : role.medianLabel}
              </p>
            </div>

            {role.median && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-border overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${barPct}%`, backgroundColor: tier.color }}
                />
              </div>
            )}

            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
              {role.low && role.high && (
                <span className="text-muted font-mono tabular-nums">
                  {money(role.low)} – {money(role.high)}
                </span>
              )}
              <span style={{ color: ai.color }}>{ai.label}</span>
              <span style={{ color: demand.color }}>{demand.label}</span>
              <span className="text-muted">
                {role.entry === "outside" ? "Enterable from outside" : "You arrive here"}
              </span>
              <span className="ml-auto text-muted" aria-hidden="true">
                {open ? "Close −" : "Detail +"}
              </span>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-border px-4 sm:px-5 py-5 bg-surface-alt">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
                What the job is
              </h4>
              <p className="text-sm text-primary-dim leading-relaxed">{role.whatItIs}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
                Can you get in?
              </h4>
              <p className="text-sm text-primary-dim leading-relaxed">{role.entryNote}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
                Is AI coming for it?
              </h4>
              <p className="text-sm text-primary-dim leading-relaxed">{role.aiNote}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
                Who is hiring
              </h4>
              <p className="text-sm text-primary-dim leading-relaxed">{role.demandNote}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent mb-1.5">
              The verdict
            </h4>
            <p className="text-sm text-foreground leading-relaxed">{role.verdict}</p>
          </div>

          <p className="mt-4 text-xs text-muted leading-relaxed">
            <span className="font-semibold">Source:</span> {role.source}
            {role.sourceCaveat ? ` — ${role.sourceCaveat}` : ""}
          </p>
        </div>
      )}
    </li>
  );
}

export default function TierBoard() {
  const [door, setDoor] = useState<DoorFilter>("all");
  const [sort, setSort] = useState<SortKey>("tier");
  const [entry, setEntry] = useState<EntryFilter>("all");

  const maxPay = useMemo(
    () => Math.max(...ROLES.map((r) => r.median ?? 0)),
    []
  );

  const roles = useMemo(() => {
    let list = ROLES.filter((r) => (door === "all" ? true : r.doors.includes(door)));
    if (entry === "outside") list = list.filter((r) => r.entry === "outside");

    const tierRank = (t: Tier) => TIER_ORDER.indexOf(t);
    return [...list].sort((a, b) => {
      if (sort === "pay-high") return (b.median ?? -1) - (a.median ?? -1);
      if (sort === "pay-low") return (a.median ?? Infinity) - (b.median ?? Infinity);
      const t = tierRank(a.tier) - tierRank(b.tier);
      return t !== 0 ? t : (b.median ?? -1) - (a.median ?? -1);
    });
  }, [door, sort, entry]);

  const grouped = useMemo(() => {
    if (sort !== "tier") return null;
    return TIER_ORDER.map((t) => ({
      tier: t,
      items: roles.filter((r) => r.tier === t),
    })).filter((g) => g.items.length > 0);
  }, [roles, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-xl border border-border bg-surface p-5 mb-8">
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
            Where are you?
          </legend>
          <div className="flex flex-wrap gap-2 mb-5">
            <Chip active={door === "all"} onClick={() => setDoor("all")}>
              Show everything
            </Chip>
            <Chip active={door === "getting-in"} onClick={() => setDoor("getting-in")}>
              I&apos;m trying to get into marketing
            </Chip>
            <Chip active={door === "already-in"} onClick={() => setDoor("already-in")}>
              I&apos;m already in, and narrowing down
            </Chip>
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
              Order by
            </legend>
            <div className="flex flex-wrap gap-2">
              <Chip active={sort === "tier"} onClick={() => setSort("tier")}>
                Tier
              </Chip>
              <Chip active={sort === "pay-high"} onClick={() => setSort("pay-high")}>
                Pay, high first
              </Chip>
              <Chip active={sort === "pay-low"} onClick={() => setSort("pay-low")}>
                Pay, low first
              </Chip>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
              Getting in
            </legend>
            <div className="flex flex-wrap gap-2">
              <Chip active={entry === "all"} onClick={() => setEntry("all")}>
                Any route
              </Chip>
              <Chip active={entry === "outside"} onClick={() => setEntry("outside")}>
                Only jobs I could enter from outside
              </Chip>
            </div>
          </fieldset>
        </div>
      </div>

      <p className="text-sm text-muted mb-5" aria-live="polite">
        Showing {roles.length} of {ROLES.length} roles. Tap any row for the detail and the source.
      </p>

      {grouped ? (
        <div className="space-y-8">
          {grouped.map((g) => (
            <section key={g.tier}>
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="grid place-items-center rounded-lg font-bold text-background w-8 h-8 text-sm shrink-0"
                  style={{ backgroundColor: TIER_META[g.tier].color }}
                >
                  {TIER_META[g.tier].label}
                </span>
                <h2 className="text-lg font-semibold text-foreground">
                  {TIER_META[g.tier].blurb}
                </h2>
              </div>
              <ul className="space-y-3">
                {g.items.map((r) => (
                  <RoleRow key={r.slug} role={r} maxPay={maxPay} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="space-y-3">
          {roles.map((r) => (
            <RoleRow key={r.slug} role={r} maxPay={maxPay} />
          ))}
        </ul>
      )}

      {roles.length === 0 && (
        <p className="text-primary-dim">
          Nothing matches that combination. Try widening the filters.
        </p>
      )}
    </div>
  );
}
