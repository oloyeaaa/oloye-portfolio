import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Free Front Desk Test — AI First-Response Report";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Free test",
    title: "10 messages. One side-by-side report.",
    sub: "See your response times vs the Front Desk. Yours to keep either way.",
  });
}
