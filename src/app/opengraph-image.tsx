import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Oloye: simple automations that save small businesses time and money";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Process automation for small businesses",
    title: "Stop doing the same job twice.",
    sub: "Simple automations that save your business time and money.",
  });
}
