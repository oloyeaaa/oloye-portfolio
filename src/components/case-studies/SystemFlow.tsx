import type { FlowStep } from "@/lib/caseStudyFlows";
import { flowAlt } from "@/lib/caseStudyFlows";

// The animated card picture for a case study (3 Nov 2026): the study's system
// as boxes and arrows with the real tool logos, in the look of the system flow
// B-roll. A lime dot runs along each arrow in turn and each box lights up as
// it arrives. One loop is a second per step plus a second's rest (4 to 5 s).
// Pure SVG and CSS, so it stays sharp and light on phones. With reduced motion
// it shows the finished flow, still.

const W = 640;
const H = 360;
const TILE = 78;
const LEFT = 92;
const RIGHT = 548;
const CY = 158;
const STEP_S = 1;

const SKY = "#38BDF8";
const LIME = "#C6F23C";

function Icon({ name }: { name: NonNullable<FlowStep["icon"]> }) {
  const p = { fill: "none", stroke: "#0E0F12", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "form":
      return (
        <g {...p}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h4" />
        </g>
      );
    case "mail":
      return (
        <g {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </g>
      );
    case "doc":
      return (
        <g {...p}>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </g>
      );
    case "person":
      return (
        <g {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5" />
        </g>
      );
    case "check":
      return (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.5 2.8 2.8L16.5 9.5" />
        </g>
      );
  }
}

export default function SystemFlow({ steps, className = "" }: { steps: FlowStep[]; className?: string }) {
  const n = steps.length;
  const loop = (n + 1) * STEP_S;
  const gap = n > 1 ? (RIGHT - LEFT) / (n - 1) : 0;
  const cx = (i: number) => LEFT + i * gap;
  // Keyframe stops as a share of the loop: the dot travels for 0.8 s, a box
  // lights up for 0.7 s.
  const pct = (s: number) => `${((s / loop) * 100).toFixed(2)}%`;
  const k = `n${n}`;
  const css = `
@keyframes sf-dot-${k}{0%{opacity:0;transform:translateX(0)}${pct(0.08)}{opacity:1}${pct(0.75)}{opacity:1}${pct(0.8)}{opacity:0;transform:translateX(var(--len))}100%{opacity:0;transform:translateX(var(--len))}}
@keyframes sf-ring-${k}{0%{opacity:0;transform:scale(.9)}${pct(0.15)}{opacity:1;transform:scale(1)}${pct(0.7)}{opacity:0;transform:scale(1.08)}100%{opacity:0}}
.sf-${k} .sf-dot{animation:sf-dot-${k} ${loop}s linear infinite}
.sf-${k} .sf-ring{transform-box:fill-box;transform-origin:center;animation:sf-ring-${k} ${loop}s ease-out infinite}
@media (prefers-reduced-motion: reduce){.sf-${k} .sf-dot{display:none}.sf-${k} .sf-ring{animation:none;opacity:0}}
`;
  const alt = `The system, step by step: ${flowAlt(steps)}.`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt} className={`sf-${k} block h-full w-full ${className}`}>
      <title>{alt}</title>
      <style>{css}</style>
      <rect width={W} height={H} fill="#0E0F12" />
      <circle cx={W / 2} cy={CY} r="220" fill={LIME} opacity="0.05" />

      {steps.slice(0, -1).map((_, i) => {
        const x1 = cx(i) + TILE / 2 + 7;
        const x2 = cx(i + 1) - TILE / 2 - 7;
        return (
          <g key={`a${i}`}>
            <line x1={x1} y1={CY} x2={x2 - 6} y2={CY} stroke={SKY} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
            <path d={`M${x2 - 9} ${CY - 7} L${x2} ${CY} L${x2 - 9} ${CY + 7}`} fill="none" stroke={SKY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
            <circle
              className="sf-dot"
              cx={x1}
              cy={CY}
              r="7"
              fill={LIME}
              opacity="0"
              style={{ ["--len" as string]: `${x2 - x1 - 8}px`, animationDelay: `${i * STEP_S}s` }}
            />
          </g>
        );
      })}

      {steps.map((s, i) => {
        const x = cx(i) - TILE / 2;
        const y = CY - TILE / 2;
        return (
          <g key={s.label + i}>
            <rect
              className="sf-ring"
              x={x - 7}
              y={y - 7}
              width={TILE + 14}
              height={TILE + 14}
              rx="24"
              fill="none"
              stroke={LIME}
              strokeWidth="4"
              opacity="0"
              style={{ animationDelay: `${i * STEP_S}s` }}
            />
            <rect x={x} y={y} width={TILE} height={TILE} rx="20" fill="#FFFFFF" />
            {s.logo ? (
              <image href={`/images/tools/${s.logo}-icon.svg`} x={x + 18} y={y + 18} width={TILE - 36} height={TILE - 36} />
            ) : s.icon ? (
              <g transform={`translate(${x + 17} ${y + 17}) scale(${(TILE - 34) / 24})`}>
                <Icon name={s.icon} />
              </g>
            ) : null}
            <text x={cx(i)} y={CY + TILE / 2 + 38} textAnchor="middle" fill="#FFFFFF" fontSize="21" fontWeight="700" fontFamily="inherit">
              {s.label}
            </text>
            {s.sub && (
              <text x={cx(i)} y={CY + TILE / 2 + 64} textAnchor="middle" fill={SKY} fontSize="17" fontFamily="inherit">
                {s.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
