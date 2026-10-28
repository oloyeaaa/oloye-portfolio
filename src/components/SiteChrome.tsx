"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import OfferBanner from "./OfferBanner";

// Routes that render full-bleed, without the site header/footer (e.g. link-in-bio pages).
const BARE_PATHS: string[] = [];

export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() || "";
  const bare = BARE_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (bare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <OfferBanner />
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
