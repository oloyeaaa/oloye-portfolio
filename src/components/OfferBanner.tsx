import { BOOKING_URL } from "@/lib/site";

// The strip across the very top of every page. The message repeats and slides
// left forever; on phones, tablets and computers alike. Change the words here.
const OFFER = "Free optimised website when you work with us";
const ACTION = "Book a free call";

export default function OfferBanner() {
  const items = Array.from({ length: 6 });
  return (
    <a
      href={BOOKING_URL}
      className="group block overflow-hidden bg-foreground py-2.5 text-sm"
      aria-label={`${OFFER}. ${ACTION}.`}
    >
      <div className="marquee-track !gap-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="flex shrink-0 items-center gap-3 px-6 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-semibold text-white">{OFFER}</span>
                <span className="font-bold text-accent underline decoration-accent/50 underline-offset-4">{ACTION} →</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </a>
  );
}
