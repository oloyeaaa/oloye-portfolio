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
        "It means the repeat tasks in your business run on their own. A new lead gets saved and answered, a new client gets their welcome pack, an invoice goes out when the work is done. You stop doing them manually, one at a time.",
    },
    {
      question: "Who is this for?",
      answer:
        "Small businesses, coaches first, plus creators and local businesses. Anyone busy enough that the admin is getting in the way of the real work.",
    },
    {
      question: "Which tasks can you automate?",
      answer:
        "Anything that happens the same way every time, across four parts of your business: new leads, onboarding new clients, delivering the work, and keeping clients coming back.",
    },
    {
      question: "What's the difference between a task and a workflow?",
      answer:
        "A task is one small thing, like sending an email. A workflow is a few tasks joined up: a lead comes in, gets saved to your list, and gets a reply. We automate the whole workflow, not just one step.",
    },
    {
      question: "Do I need new software?",
      answer:
        "Usually not. We build with the tools you already use where we can, like Google Workspace, and join them up with simple tools such as Airtable and Make.",
    },
    {
      question: "I'm not good with tech. Is that a problem?",
      answer:
        "No. You tell us the task in plain words. We build it and test it, so you never have to learn how it works inside.",
    },
    {
      question: "Do you use AI?",
      answer:
        "Yes, where it helps. Claude writes first drafts and sorts messages. The rest is simple, dependable tools joined together. AI is a tool inside the system, not the point of it.",
    },
    {
      question: "What does it cost?",
      answer:
        "It depends on the workflow. On the free call we look at it together, and you know the price before anything starts.",
    },
    {
      question: "What happens on the free call?",
      answer:
        "We talk through the task that eats your week and what it's costing you, then tell you what we'd build first. No pressure to go ahead.",
    },
  ],
  blog: [
    {
      question: "Who are these posts for?",
      answer:
        "Small business owners, coaches and creators who want the repeat tasks in their business to run on their own, without learning to code.",
    },
    {
      question: "Can I set these up myself?",
      answer:
        "Yes. The posts show the steps in plain words. If you'd rather hand it over, book a free call and we'll build it for you.",
    },
    {
      question: "Do I need to pay for the tools?",
      answer:
        "Not to start. Most posts use tools with a free plan, like Google Sheets, Airtable and Make. You only pay if you outgrow the free plan.",
    },
    {
      question: "Where should I start?",
      answer:
        "With the free checklist, 10 tasks to automate first. Pick the one that eats most of your week, then read the post that matches it.",
    },
  ],
  caseStudies: [
    {
      question: "What do the case studies show?",
      answer:
        "One workflow each: the problem it caused, what was built, the tools it uses, and where it stands now, step by step.",
    },
    {
      question: "Are they real?",
      answer:
        "Yes. Each one is a system built and running in our own business first. We only say what it has really done so far, and any screenshot hides other people's details.",
    },
    {
      question: "Can I copy one?",
      answer:
        "Yes. Each study ends with the simple version you can set up yourself, and a free guide to start with.",
    },
  ],
  about: [
    {
      question: "Who is behind Oloye?",
      answer:
        "Oloye Adeosun, the founder. He plans and checks every build. A team of AI agents, built on Claude, does the repeat work alongside him.",
    },
    {
      question: "Is it just one person?",
      answer:
        "One person and a team of AI agents. That keeps things simple, and every build still gets a real person's eyes before it goes to you.",
    },
    {
      question: "Where are you based?",
      answer: "Kent, in the UK. Most of the work happens online, so where you are matters less than what's eating your week.",
    },
    {
      question: "How long have you been doing this?",
      answer: "Oloye has been building marketing systems for over 3 years.",
    },
  ],
  contact: [
    {
      question: "Is the call really free?",
      answer: "Yes. There's no cost and no pressure to go ahead. We look at the task that eats your week and tell you what we'd build first.",
    },
    {
      question: "What should I put in my message?",
      answer: "Just the task that takes up your time, in your own words. A few lines is plenty. No need to know which tools you'd need.",
    },
    {
      question: "Who reads my message?",
      answer: "Oloye, the founder. A real person reads every one.",
    },
    {
      question: "What happens to my details?",
      answer: "They're kept in our own list so we can reply to you. We only send you other emails if you tick the box to say that's fine.",
    },
  ],
  free: [
    {
      question: "Are these really free?",
      answer: "Yes. Pick one, leave your email, and it opens straight away. No card, no catch.",
    },
    {
      question: "Why do you ask for my email?",
      answer: "So we can send it to you. We only send you other emails if you tick the box to say that's fine, and you can stop them any time.",
    },
    {
      question: "Which one should I start with?",
      answer: "10 tasks to automate first. Tick the tasks that eat your week, then pick the guide that matches the biggest one.",
    },
  ],
  leakCheck: [
    {
      question: "What is a lead leak?",
      answer: "A spot where people who were interested in you slip away: no easy way to leave their email, names spread across DMs and notes, a slow first reply, or no follow-up. Each one quietly costs you customers.",
    },
    {
      question: "How is the score worked out?",
      answer: "Your six answers carry points across four areas: catching people, keeping them, following up, and the places they find you. The same answers always give the same score. Claude then explains your three biggest leaks in plain words.",
    },
    {
      question: "Is it free?",
      answer: "Yes. It's six quick questions. You see your result straight away, and the full version with a free guide for each fix comes by email.",
    },
    {
      question: "Will you add me to a mailing list?",
      answer: "Only if you tick the box. If you don't, you just get your result.",
    },
    {
      question: "What happens to my answers?",
      answer: "They're kept with your email in our own list, so we can send your result and see which leaks are most common. The website itself doesn't store anything.",
    },
  ],
  roiCalculator: [
    {
      question: "Is this calculator free?",
      answer: "Yes. Nothing to sign up for.",
    },
    {
      question: "How do I work out what an hour of my time is worth?",
      answer: "Use what you charge per hour. If you don't charge by the hour, take what you earned last month and divide it by the hours you worked.",
    },
    {
      question: "Are these real savings?",
      answer: "They're an estimate from your own numbers. The real saving depends on which tasks you automate and how. That's what the free call is for.",
    },
    {
      question: "What counts as a repeat task?",
      answer: "Anything you do the same way every time: saving a new enquiry, sending a welcome email, chasing an invoice, asking for a review, making a client folder.",
    },
  ],
};
