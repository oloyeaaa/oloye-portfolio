"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { canShowOffer, rememberOfferClosed, rememberOfferDone } from "@/lib/offerMemory";
import { toolUrlFrom, type PostOffer } from "@/lib/postOffers";

const SHOW_AT = 0.6; // How far down the post, as a share of its height.

/**
 * A small card that slides in once someone is about 60% down a post. It's not a
 * dialog and never takes the page over: reading carries on behind it. It waits
 * while the post's own offer is on screen, and on phones while the cookie banner
 * is up, since they'd sit on top of each other.
 */
export default function OfferPopup({ offer, slug }: { offer: PostOffer; slug: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!canShowOffer()) return;
    const article = document.querySelector("article");
    if (!article) return;

    let offerOnScreen = false;
    const onPage = document.getElementById("post-offer");
    const seen = onPage
      ? new IntersectionObserver(([entry]) => {
          offerOnScreen = entry.isIntersecting;
        })
      : null;
    if (onPage) seen?.observe(onPage);

    let waiting = false;
    function check() {
      waiting = false;
      if (!article) return;
      const box = article.getBoundingClientRect();
      if ((window.innerHeight - box.top) / box.height < SHOW_AT) return;
      if (offerOnScreen) return;
      const phone = window.innerWidth < 640;
      if (phone && document.querySelector('[role="dialog"][aria-label="Cookies"]')) return;
      stop();
      if (canShowOffer()) setOpen(true);
    }
    function onScroll() {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(check);
    }
    function stop() {
      window.removeEventListener("scroll", onScroll);
      seen?.disconnect();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, []);

  function close() {
    rememberOfferClosed();
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // The form is already on the page, so go to it rather than show a second one.
  function goToForm() {
    close();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("post-offer")?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
    document.getElementById("ff-email")?.focus({ preventScroll: true });
  }

  const button = "inline-flex rounded-lg bg-accent px-5 py-3 text-sm font-bold text-foreground transition hover:bg-accent-light";

  return (
    <div aria-live="polite">
      {open && (
        <aside
          aria-label={offer.kind === "tool" ? "Free tool" : `Free ${offer.freebie.kind}`}
          className="offer-popup fixed inset-x-3 bottom-3 z-40 rounded-2xl bg-foreground p-5 pr-12 shadow-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[22rem]"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-1.5 top-1.5 flex h-11 w-11 items-center justify-center rounded-lg text-xl leading-none text-white/60 transition hover:text-white"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p className="eyebrow !text-accent">{offer.kind === "tool" ? "Free tool" : `Free ${offer.freebie.kind}`}</p>
          <p className="mt-2 text-lg font-bold leading-snug text-white">{offer.title}</p>
          <p className="mt-1.5 hidden text-sm text-white/60 sm:block">{offer.line}</p>
          <div className="mt-4">
            {offer.kind === "tool" ? (
              <Link href={toolUrlFrom(offer.url, slug)} onClick={rememberOfferDone} className={button}>
                {offer.button} →
              </Link>
            ) : (
              <button type="button" onClick={goToForm} className={button}>
                Get it free
              </button>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
