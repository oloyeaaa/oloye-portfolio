import Link from "next/link";
import { BOOKING_URL, CHECKLIST_URL } from "@/lib/site";

// The two buttons every page ends on: book a call, or start with the free checklist.
export function Buttons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
      <a
        href={BOOKING_URL}
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-7 py-4 text-sm font-bold text-foreground transition hover:bg-accent-light sm:w-auto"
      >
        Book a free call
      </a>
      <Link
        href={CHECKLIST_URL}
        className={`inline-flex w-full items-center justify-center rounded-lg border px-7 py-4 text-sm font-semibold transition sm:w-auto ${
          dark
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-border-strong text-foreground hover:bg-surface-alt"
        }`}
      >
        Get the free checklist
      </Link>
    </div>
  );
}

// A page can pass its own heading and line (the last word of the heading goes lime).
export function LastCall({ heading, line }: { heading?: string; line?: string } = {}) {
  const words = heading?.trim().split(" ");
  return (
    <section id="book-a-call" className="scroll-mt-20 px-4 pb-32 pt-8 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] bg-foreground px-6 py-20 text-center sm:py-28">
        <h2 className="display max-w-3xl text-4xl !text-white sm:text-6xl">
          {words ? (
            <>
              {words.slice(0, -1).join(" ")} <span className="text-accent">{words[words.length - 1]}</span>
            </>
          ) : (
            <>
              What task would you hand over <span className="text-accent">first?</span>
            </>
          )}
        </h2>
        <p className="mt-6 max-w-md text-white/60">
          {line ?? "A free call. We'll find the first task worth automating, and you'll know the price before anything starts."}
        </p>
        <div className="mt-10">
          <Buttons dark />
        </div>
      </div>
    </section>
  );
}
