import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import PromptPackHub from "./PromptPackHub";

export const metadata: Metadata = {
  title: "Practical AI Hub — Free Digital Product Prompt Pack (18 Prompts)",
  description:
    "Build extra income using AI to create and sell digital products. Get the free Digital Product Prompt Pack: 18 copy-paste AI prompts to find, build, and sell your first digital product without code.",
  alternates: { canonical: `${SITE_URL}/practical-ai-hub` },
  openGraph: {
    title: "Practical AI Hub — Free Digital Product Prompt Pack (18 Prompts)",
    description:
      "18 free copy-paste AI prompts to find, build, and sell your first digital product without code.",
    url: `${SITE_URL}/practical-ai-hub`,
    type: "website",
  },
};

export default function Page() {
  return <PromptPackHub />;
}
