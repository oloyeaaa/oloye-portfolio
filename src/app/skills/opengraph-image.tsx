import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Free Claude Code Skills & Agents — Oloye.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Skills & Agents",
    title: "Free tools you run on your own machine.",
    sub: "Download and drop into Claude Code. No keys, no sign-up.",
  });
}
