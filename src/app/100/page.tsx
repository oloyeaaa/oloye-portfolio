import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import KitForm from "@/components/challenge/KitForm";
import { GOAL, countList } from "@/lib/challenge";

// The link-in-bio page for the "0 to 100" challenge. Campaign page: not in the nav,
// kept out of Google (people arrive from the bio link, and the number changes daily).
export const revalidate = 600;

export const metadata: Metadata = {
  title: "0 to 100: the free kit",
  description: "Stop losing the people who find you. Get the free 0 to 100 Kit: the leads table, Claude skills, and something new every Sunday.",
  alternates: { canonical: "/100" },
  robots: { index: false, follow: true },
};

// The episode video goes here once it's recorded (9:16, captions burned in), e.g. "/videos/100.mp4".
const VIDEO_SRC: string | null = null;
const POSTER = "/images/brand/oloye-lime.jpg";

const IN_THE_KIT = [
  "The leads table, ready to copy, so nobody who finds you gets lost",
  "Claude skills that write things for your business, not templates",
  "Something new every Sunday, in the same folder, yours to keep",
];

export default async function ChallengePage() {
  const count = await countList();

  return (
    <div className="min-h-svh bg-[#0E0F12] px-4 pb-10 pt-6 text-white">
      <div className="mx-auto max-w-[420px]">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#C6F23C] px-4 py-1.5 text-[13px] font-black tracking-[0.12em] text-[#0E0F12]">
            0 TO 100 &middot; LIVE
          </span>
          {count !== null && (
            <p className="mt-2 text-sm font-semibold text-[#B8BBC2]">
              <span className="text-[#C6F23C]">{count}</span> of {GOAL} people so far
            </p>
          )}
          <h1 style={{ color: "#FFFFFF" }} className="mt-4 text-[34px] font-black leading-[1.05] tracking-tight sm:text-[40px]">
            Stop losing the people who find you.
          </h1>
        </div>

        <div className="relative mx-auto mt-5 aspect-[9/16] h-[min(44svh,520px)] overflow-hidden rounded-xl bg-[#1A1C20] ring-1 ring-white/10">
          {VIDEO_SRC ? (
            <video
              src={VIDEO_SRC}
              poster={POSTER}
              controls
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <Image src={POSTER} alt="Oloye" fill sizes="260px" className="object-cover" priority />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/45 via-transparent to-transparent pb-[14%]">
                <span
                  aria-label="Video coming soon"
                  className="grid h-16 w-16 place-items-center rounded-full bg-[#C6F23C] shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-[#0E0F12]" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-5">
          <KitForm />
        </div>

        <ul className="mt-6 space-y-3">
          {IN_THE_KIT.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-snug text-[#D7D9DE]">
              <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#C6F23C]" />
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-[#8A8D93]">Free. No spam. Leave any time.</p>

        <p className="mt-10 text-center text-xs text-[#5E6168]">
          <Link href="/" className="hover:text-[#C6F23C]">oloye.co.uk</Link>
        </p>
      </div>
    </div>
  );
}
