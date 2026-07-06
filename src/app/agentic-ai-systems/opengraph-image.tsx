import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "What Is an Agentic AI System? The Practical Guide for Small Business";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Agentic AI Systems",
    title: "The practical guide.",
    sub: "What they are, how they differ, and how to build one that ships work.",
  });
}
