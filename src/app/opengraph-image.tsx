import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Oloye | AI Automation Systems. Get your time back and stop losing leads.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Oloye | AI Automation Systems",
    title: "Get your time back and stop losing leads.",
    sub: "AI systems built for your business.",
  });
}
