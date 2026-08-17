import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Oloye | Practical AI Hub: use AI to build extra income";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "The Front Desk",
    title: "You're losing to whoever replies first.",
    sub: "Under 60 seconds. Every message. Any hour. Books, quotes, refunds, dispatches.",
  });
}
