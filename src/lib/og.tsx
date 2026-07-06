import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgProps {
  kicker: string;
  title: string;
  sub?: string;
}

const BG = "#0E0F12";
const ACCENT = "#C6F23C";
const FG = "#EDEDED";
const DIM = "#8A8F98";
const BORDER = "#2A2D35";

export function renderOg({ kicker, title, sub }: OgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: BG,
          padding: "80px",
          fontFamily: "'Inter', system-ui, sans-serif",
          justifyContent: "space-between",
        }}
      >
        {/* Top: wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 48,
            fontWeight: 700,
            color: FG,
            letterSpacing: "-0.02em",
          }}
        >
          Oloye<span style={{ color: ACCENT }}>.</span>
        </div>

        {/* Middle: title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: FG,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {sub ? (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: DIM,
                lineHeight: 1.35,
                maxWidth: 900,
                marginTop: 8,
              }}
            >
              {sub}
            </div>
          ) : null}
        </div>

        {/* Bottom: divider + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 1,
              background: BORDER,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: DIM,
            }}
          >
            Agentic AI Systems that respond in under 60 seconds.
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
