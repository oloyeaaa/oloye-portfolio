import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import PromptPackHub from "./PromptPackHub";

export const metadata: Metadata = {
  title: "Practical AI Hub — Free Digital Product Prompt Pack",
  description:
    "Build extra income using AI to make and sell digital products. Get the free Digital Product Prompt Pack: 10 copy-paste AI prompts to find, build, and sell your first digital product.",
  alternates: { canonical: `${SITE_URL}/practical-ai-hub` },
  openGraph: {
    title: "Practical AI Hub — Free Digital Product Prompt Pack",
    description:
      "10 free copy-paste AI prompts to find, build, and sell your first digital product.",
    url: `${SITE_URL}/practical-ai-hub`,
    type: "website",
  },
};

export default function Page() {
  return <PromptPackHub />;
}
