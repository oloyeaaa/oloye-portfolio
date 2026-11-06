import Link from "next/link";
import { toolUrlFrom, type PostOffer } from "@/lib/postOffers";

/**
 * The mid-post card for an offer that's a tool. There's no form here, because
 * the tool asks for name, email and consent itself at the end.
 */
export default function ToolOffer({ offer, slug }: { offer: Extract<PostOffer, { kind: "tool" }>; slug: string }) {
  return (
    <aside className="not-prose my-14 overflow-hidden rounded-3xl bg-foreground p-7 sm:p-10" aria-label="Free tool">
      <p className="eyebrow !text-accent">Free tool</p>
      <p className="display mt-4 text-3xl !text-white sm:text-4xl">{offer.title}</p>
      <p className="mt-3 max-w-lg text-white/60">{offer.line}</p>
      <Link
        href={toolUrlFrom(offer.url, slug)}
        className="mt-7 inline-flex rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-accent-light"
      >
        {offer.button} →
      </Link>
    </aside>
  );
}
