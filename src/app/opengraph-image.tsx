import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Oloye: simple AI automation systems that save small businesses time and money";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOg({
    kicker: "Workflow automation for small businesses",
    title: "Get your time back. Automate the tasks you repeat every day.",
    sub: "Simple AI automation systems that save your business time and money.",
  });
}
