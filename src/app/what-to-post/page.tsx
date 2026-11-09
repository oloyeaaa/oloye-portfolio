import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import WhatToPost from "@/components/tools/WhatToPost";

// What to post and what to sell (Oloye, 9 Nov 2026: "build it now... make it a
// public page"). For content creators. His TikTok link in bio and the Thursday
// live tool, so the type is big and it works one-handed on a phone ("No
// clever, not clever, clear, simple"). Words: the Copywriter,
// content/find-your-channel/WORDS.md. Headline and line under it are Oloye's
// own pick, word for word.

const TITLE = "What to post and what to sell";
const DESCRIPTION =
  "Don't know what to post about, or what to sell? Answer a few quick questions and get free content ideas, who they're for and a product idea.";

export const metadata: Metadata = {
  title: "What to Post About, and What to Sell",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/what-to-post` },
};

export default function WhatToPostPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/what-to-post",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/what-to-post" },
          ],
        })}
      />

      <div className="bg-background">
        <section className="px-4 pb-6 pt-8 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="display text-4xl leading-tight text-foreground sm:text-6xl">
              Don&apos;t know what to post about, or how it could ever make money?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted sm:text-xl">
              Answer a few quick questions about what you already know. Get ideas for what to post about, who it&apos;s for, a free thing to give away and something to sell.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <WhatToPost />
          </div>
        </section>
      </div>
    </>
  );
}
