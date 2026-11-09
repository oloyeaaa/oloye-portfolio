import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import FindChannel from "@/components/tools/FindChannel";

// Find your channel (Oloye, 9 Nov 2026: "build it now... make it a public
// page"). For content creators, used on the Thursday TikTok lives, so the type
// is big and it all works one-handed on a phone. Questions come one card at a
// time; Claude's ideas come back in four lists of five; the next step is the
// founding group. PLACEHOLDER WORDS: the Copywriter writes the final page words.

const TITLE = "Find your channel";
const DESCRIPTION =
  "Free for content creators: answer a few quick questions and get ideas for who your channel is for, a free thing to give, something to sell and what it's about.";

export const metadata: Metadata = {
  title: { absolute: "Find Your Channel: Free Tool for Content Creators | Oloye" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/find-your-channel` },
};

export default function FindYourChannelPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/find-your-channel",
          title: TITLE,
          description: DESCRIPTION,
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: TITLE, path: "/find-your-channel" },
          ],
        })}
      />

      <div className="bg-background">
        <section className="px-4 pb-6 pt-8 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Free &middot; For content creators</p>
            <h1 className="display mt-4 text-4xl leading-tight text-foreground sm:text-6xl">
              Find your channel in <span className="lime-mark">what you already know.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted sm:text-xl">
              A few quick taps. Then ideas for who it&apos;s for, a free thing to give, something to sell and what it&apos;s about.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <FindChannel />
          </div>
        </section>
      </div>
    </>
  );
}
