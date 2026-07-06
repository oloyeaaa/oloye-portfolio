import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact Oloye. — Book a Front Desk Test";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Contact",
    title: "Get in touch.",
    sub: "Book a Front Desk test. Report ships that week.",
  });
}
