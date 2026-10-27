/**
 * FAQ questions, one list per page. The <Faq> block looks the same on every
 * page; only these change. Add a new key when a page gets its own FAQ.
 *
 * Rules for answers: plain words, "we" voice, nothing promised that isn't true
 * today. No prices, timings or results we can't stand behind.
 */

export type FaqItem = { question: string; answer: string };

export const FAQS: Record<string, FaqItem[]> = {
  home: [
    {
      question: "What is process automation?",
      answer:
        "It means the repeat jobs in your business run on their own. A new lead gets saved and answered, a new client gets their welcome pack, an invoice goes out when the work is done. You stop doing the same job twice.",
    },
    {
      question: "Who is this for?",
      answer:
        "Small businesses: coaches, creators and local businesses who are busy enough that the admin is getting in the way of the real work.",
    },
    {
      question: "Which jobs can you automate?",
      answer:
        "Anything that happens the same way every time, across four parts of your business: new leads, onboarding new clients, delivering the work, and keeping clients coming back.",
    },
    {
      question: "Do I need new software?",
      answer:
        "Usually not. We build with the tools you already use where we can, like Google Workspace, and join them up with simple tools such as Airtable and Make.",
    },
    {
      question: "I'm not good with tech. Is that a problem?",
      answer:
        "No. You tell us the job in plain words. We build it and test it, so you don't have to learn how it works inside.",
    },
    {
      question: "Do you use AI?",
      answer:
        "Yes, where it helps. Claude writes first drafts and sorts messages. The rest is simple, dependable tools joined together. AI is a tool inside the system, not the point of it.",
    },
    {
      question: "What does it cost?",
      answer:
        "It depends on the job. On the free call we look at it together, and you know the price before anything starts.",
    },
    {
      question: "What happens on the free call?",
      answer:
        "We talk through the job that eats your week and what it's costing you, then tell you what we'd build first. No pressure to go ahead.",
    },
  ],
};
