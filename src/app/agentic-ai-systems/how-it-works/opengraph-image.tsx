import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "How to Build an Agentic AI System, Explained Simply";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "The simple version",
    title: "Six things every agentic AI system needs.",
    sub: "A name tag, a notebook, one job, a report card, teammates, and rules it can't break.",
  });
}
