import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Oloye Adeosun — Product Marketing & Marketing Operations Leader";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "GTM & Marketing Operations",
    title: "Where product narrative meets scalable revenue infrastructure.",
    sub: "Senior GTM Strategist & Marketing Operations Leader. Founder of GTM Signal Studio & Practical AI Hub.",
  });
}
