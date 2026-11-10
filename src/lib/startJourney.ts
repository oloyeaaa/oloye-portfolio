// The words for /start, the welcome journey (10 Nov 2026).
// Source: content/start/WORDS-journey.md (Copywriter). Change words there first.

import { BOOKING_URL } from "./site";

export type RouteId = "creators" | "business";

export const WELCOME = {
  step: "Step 1 of 3",
  title: "Glad you're here. Let's find your first step.",
  line: "Wherever you're starting from, there's a simple next step. It takes a minute.",
  question: "Which one sounds like you?",
};

/** Screen 1 buttons. Routes 1 and 2 share the "creators" screen. */
export const ROUTES: { label: string; goes: RouteId }[] = [
  { label: "I make content, but I don't know what to post.", goes: "creators" },
  { label: "I want to start a faceless channel, but I don't know where to start.", goes: "creators" },
  { label: "I run a business and want to save time with automation.", goes: "business" },
];

export const CREATORS = {
  step: "Step 2 of 3",
  title: "Here's what happens next",
  line: "Whether you post already or you're starting a new channel, it starts in the same place: what to post about, and who it's for.",
  steps: [
    { title: "Answer a few quick questions.", text: "About what you know, what people ask you and what you enjoy." },
    { title: "Get your ideas.", text: "What to post about, who it's for, a free thing to give away and something to sell one day." },
    { title: "Pick your favourites.", text: "Get your plan as a PDF, sent to your email." },
  ],
  button: "Let's start",
  // Keep ?from=bio: the What to post counting knows "bio".
  href: "/what-to-post?from=bio",
  small: "Free. About 2 minutes.",
};

export const BUSINESS = {
  step: "Step 2 of 3",
  title: "Here's what happens next",
  line: "Simple systems can take repeat tasks off your plate, in marketing, sales, onboarding and the everyday running of your business. Pick where you are.",
  choices: [
    {
      title: "Not sure where to start?",
      text: "Start with the free lead leak check. 6 quick questions about how you catch and follow up with the people who find you. You get a score out of 100, your 3 biggest leaks and the first fix for each.",
      button: "Check my business",
      href: "/tools/lead-leak-check?from=bio",
      small: "Free. About 2 minutes.",
      external: false,
    },
    {
      title: "Know what you want automated?",
      text: "Book a free 20-minute call. We'll look at how your business runs, where the time goes, and one thing that could run by itself.",
      button: "Book a free call",
      href: BOOKING_URL,
      small: "Free. 20 minutes. No pressure.",
      external: true,
    },
  ],
};

export const BACK = "Back";
export const FOOTER = "Made by Oloye. I've been building marketing systems for over 3 years.";
