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

// The episode video goes here once it's recorded (16:9 landscape, like YouTube), e.g. "/videos/100.mp4".
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
    <div className="min-h-svh bg-[#F4F5F7] px-4 pb-10 pt-6 text-[#0E0F12]">
      <div className="mx-auto max-w-[560px]">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#0E0F12] px-4 py-1.5 text-[13px] font-black tracking-[0.12em] text-[#C6F23C]">
            0 TO 100 &middot; LIVE
          </span>
          {count !== null && (
            <div className="mx-auto mt-3 max-w-[260px]">
              <p className="flex items-center justify-center gap-2 text-sm font-bold text-[#0E0F12]">
                <span className="rounded-md bg-[#C6F23C] px-2 py-0.5 text-lg font-black leading-tight">{count}</span>
                of {GOAL} people so far
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E2E4E8]" aria-hidden="true">
                <div className="h-full rounded-full bg-[#C6F23C]" style={{ width: `${Math.min(count, GOAL)}%` }} />
              </div>
            </div>
          )}
          <h1 className="mt-4 text-[34px] font-black leading-[1.05] tracking-tight sm:text-[40px]">
            Stop losing the people who find you.
          </h1>
        </div>

        <div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl bg-[#C6F23C] shadow-sm ring-1 ring-[#E2E4E8]">
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
              <Image src={POSTER} alt="Oloye" fill sizes="(max-width: 600px) 100vw, 560px" className="object-cover object-[50%_12%]" priority />
              <div className="absolute inset-0 flex items-end justify-start p-4">
                <span
                  aria-label="Video coming soon"
                  className="grid h-16 w-16 place-items-center rounded-full bg-[#0E0F12] shadow-lg"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-[#C6F23C]" aria-hidden="true">
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
            <li key={line} className="flex gap-3 text-[15px] leading-snug text-[#374151]">
              <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#0E0F12] ring-2 ring-[#C6F23C]" />
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm text-[#6B7280]">Free. No spam. Leave any time.</p>

        <p className="mt-10 text-center text-xs text-[#6B7280]">
          <Link href="/" className="hover:text-[#0E0F12]">oloye.co.uk</Link>
        </p>
      </div>
    </div>
  );
}
