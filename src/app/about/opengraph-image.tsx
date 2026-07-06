import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "About Oloye. — Agentic AI Systems for Owner-Operated Businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "About Oloye.",
    title: "Agentic AI systems for owner-operated businesses.",
    sub: "Four modules under one back office. The Front Desk is the entry.",
  });
}
