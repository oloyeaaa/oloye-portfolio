import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgProps {
  kicker: string;
  title: string;
  sub?: string;
}

// The light site look (globals.css), with Oloye's lime headshot on the right
// (Oloye, 10 Nov: "our light color and have a picture of me").
const BG = "#F4F5F7";
const FG = "#0E0F12";
const ACCENT = "#C6F23C";
const ACCENT_DARK = "#446100";
const DIM = "#374151";
const MUTED = "#6B7280";
const BORDER = "#E2E4E8";

const PHOTO_W = 440;

let photo: Promise<string> | null = null;
function photoData(): Promise<string> {
  photo ??= readFile(join(process.cwd(), "public/images/brand/oloye-lime.jpg")).then(
    (b) => `data:image/jpeg;base64,${b.toString("base64")}`
  );
  return photo;
}

export async function renderOg({ kicker, title, sub }: OgProps) {
  const src = await photoData();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: BG,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* Left: words */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: OG_SIZE.width - PHOTO_W,
            height: "100%",
            padding: "64px 56px 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700, color: FG, letterSpacing: "-0.02em" }}>
            Oloye Adeosun
            <span style={{ display: "flex", width: 12, height: 12, borderRadius: 6, background: ACCENT, marginLeft: 6, marginTop: 14 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                color: ACCENT_DARK,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {kicker}
            </div>
            <div style={{ display: "flex", fontSize: 58, fontWeight: 700, color: FG, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
              {title}
            </div>
            {sub ? (
              <div style={{ display: "flex", fontSize: 26, color: DIM, lineHeight: 1.35, marginTop: 4 }}>{sub}</div>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ width: "100%", height: 1, background: BORDER }} />
            <div style={{ display: "flex", fontSize: 20, color: MUTED }}>Content creators • Business owners · oloye.co.uk</div>
          </div>
        </div>

        {/* Right: the photo, full height */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={PHOTO_W} height={OG_SIZE.height} style={{ width: PHOTO_W, height: OG_SIZE.height, objectFit: "cover" }} />
      </div>
    ),
    { ...OG_SIZE }
  );
}
