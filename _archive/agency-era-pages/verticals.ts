export interface Workflow {
  inbound: string;
  reply: string;
  action: string;
}

export interface Authority {
  name: string;
  url: string;
  note: string;
}

export interface VerticalFAQ {
  question: string;
  answer: string;
}

export interface Vertical {
  slug: string;
  shortName: string;
  fullName: string;
  kicker: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogSub: string;
  intro: string[];
  actionList: string[];
  workflows: Workflow[];
  roi: {
    setup: string;
    loss: string;
    recovery: string;
  };
  authorities: Authority[];
  faqs: VerticalFAQ[];
  relatedSlugs: string[];
}

export const VERTICALS: Vertical[] = [
  {
    slug: "plumbers",
    shortName: "Plumbers",
    fullName: "plumbers, HVAC contractors and roofers",
    kicker: "For plumbers, HVAC and roofers",
    h1: "You're not losing to a better plumber. You're losing to the one who picked up.",
    metaTitle:
      "AI Receptionist for Plumbers, HVAC and Roofers | 24/7 Booking Agent",
    metaDescription:
      "The Front Desk answers your calls and forms in under 60 seconds, qualifies the job, books the slot, and dispatches the tech. Built for plumbers, HVAC contractors and roofers.",
    ogTitle: "AI Receptionist for Plumbers, HVAC and Roofers",
    ogSub:
      "Answers in 60 seconds. Books the slot. Dispatches the tech. 24/7.",
    intro: [
      "A pipe bursts at 7pm on a Sunday. The homeowner grabs their phone, googles \"emergency plumber near me\", and starts calling. The first three ring out. The fourth picks up in under a minute, quotes a callout fee, books a slot for the morning. That's the job you didn't win, and you never even saw the call.",
      "Home services is a first-response business. Every ring you miss is a job that went to whoever answered. The Front Desk answers your calls and forms in under 60 seconds, qualifies the job (emergency versus routine, postcode, issue type), sends an estimate range, books the slot in your calendar, and dispatches the tech. Under your rules. With your voice. Round the clock.",
    ],
    actionList: [
      "Answers inbound calls and forms in under 60 seconds, any hour.",
      "Qualifies the job: emergency versus routine, postcode, issue type, access notes.",
      "Sends an estimate range by postcode and job type from your template.",
      "Books the slot directly in your calendar or your job software.",
      "Dispatches the tech and sends the \"on the way\" text to the customer.",
      "Confirms 24 hours ahead. Sends the invoice after the job.",
    ],
    workflows: [
      {
        inbound: "\"Boiler's leaking bad, water everywhere. Need someone tonight.\"",
        reply:
          "\"Understood, this sounds urgent. Turn off the mains water stop tap if you can safely reach it. I'm sending an engineer to your address in the next 90 minutes. Callout fee is £120, first hour included, £45 per additional hour parts extra. Text YES to confirm.\"",
        action:
          "Flags emergency, checks tech availability, sends dispatch alert to the on-call engineer, texts owner a summary.",
      },
      {
        inbound:
          "\"Looking for a quote to replace the roof on a 3-bed semi in SW12.\"",
        reply:
          "\"Thanks for reaching out. Full roof replacement on a 3-bed semi in your postcode typically runs £6,000 to £11,000 depending on materials and access. I can book a free 20-minute survey next week. Would Tuesday morning or Thursday afternoon suit?\"",
        action:
          "Sends the postcode-specific estimate range from the template, offers two viewing slots, adds the lead to the CRM.",
      },
      {
        inbound: "\"Need to move my Tuesday boiler service to Thursday please.\"",
        reply:
          "\"No problem. Thursday 9-11am or 1-3pm both have availability. Which works? Original booking will be released once you confirm.\"",
        action:
          "Checks the calendar, drafts the reschedule with two live slots, updates the appointment on confirmation.",
      },
    ],
    roi: {
      setup:
        "Typical UK plumber: 20 miscalls a week, ~15% would have converted, average job £250.",
      loss: "That is roughly £750 a week or £3,000 a month in jobs that walked to the next company on Google.",
      recovery:
        "The Front Desk captures ~80% of those missed calls. Even at half that, you recover £1,200+ a month. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "ServiceTitan",
        url: "https://www.servicetitan.com",
        note:
          "The market-leader trade software for home services. Well-documented benchmarks on how much money leaks through miscalls.",
      },
      {
        name: "Angi (formerly Angie's List)",
        url: "https://www.angi.com",
        note:
          "US marketplace publishing regular data on homeowner search-and-hire behaviour.",
      },
      {
        name: "UK Federation of Master Builders",
        url: "https://www.fmb.org.uk",
        note:
          "UK trade body publishing surveys on tradesperson demand and consumer expectations.",
      },
    ],
    faqs: [
      {
        question: "Does it connect to ServiceTitan or Housecall Pro?",
        answer:
          "Yes via their APIs. If you use a different system or plain Google Calendar and email, that works too. We wire it up during the pilot.",
      },
      {
        question: "What happens on a job over my quote threshold?",
        answer:
          "The agent drafts the quote and holds it for your approval. Nothing above the threshold you set goes out without your yes.",
      },
      {
        question: "Can it handle an emergency at 2am?",
        answer:
          "Yes. The agent flags emergency keywords and either dispatches immediately if you have on-call cover, or wakes you with a summary and one-tap approve.",
      },
    ],
    relatedSlugs: ["real-estate", "restaurants"],
  },
  {
    slug: "coaches",
    shortName: "Coaches",
    fullName: "coaches and consultants",
    kicker: "For coaches and consultants",
    h1: "The lead who DM'd you four hours ago is on a call with someone else.",
    metaTitle:
      "AI Assistant for Coaches and Consultants | Lead Response, Proposals, Chasing",
    metaDescription:
      "The Front Desk qualifies your inbound leads in under 60 seconds, sends the intake and Calendly, ships proposals from your template, invoices via Stripe, and chases unpaid invoices. Trained on your voice.",
    ogTitle: "AI Assistant for Coaches and Consultants",
    ogSub: "Qualifies the lead. Sends the intake. Ships the proposal.",
    intro: [
      "Someone sees your LinkedIn post, hits the DM. \"Hey, I saw what you wrote about founder burnout. Do you work with early-stage founders?\" You see it four hours later, between calls. By then they've messaged three other coaches and one already sent them a Calendly link.",
      "Consulting and coaching is a response-speed game. The first person to reply with intent and structure earns the conversation. The Front Desk reads every DM, form and email within 60 seconds, qualifies the enquirer (budget, timeline, actual problem), sends your intake plus Calendly, and moves them into your pipeline. You show up to the discovery call already sold.",
    ],
    actionList: [
      "Reads DMs, emails and form submissions in under 60 seconds, any hour.",
      "Qualifies the enquiry: budget signal, timeline, actual problem, prior work.",
      "Sends your intake form + Calendly + a short next-step message.",
      "Ships the right proposal from your template library when the fit is clear.",
      "Invoices via Stripe once terms are agreed. Sends the payment link.",
      "Chases unpaid invoices at 3, 7 and 14 days with the tone you set.",
    ],
    workflows: [
      {
        inbound:
          "\"Loved your carousel on scaling to £1M. I run a £300k agency and want to hit 7 figures next year. Can you help?\"",
        reply:
          "\"Thanks, that means a lot. A jump from 300k to 1M usually has one of three bottlenecks (people, offer, or systems). Before we dig in I'd love to hear what you've already tried. Here's a short intake, five questions, three minutes: [link]. Once it's back I'll send you my Calendly for a 20-minute call.\"",
        action:
          "Sends the intake link, adds the lead to Airtable with source and initial notes, drafts follow-up if no response in 48 hours.",
      },
      {
        inbound: "\"What do you charge for a 3-month engagement?\"",
        reply:
          "\"Depends on scope but here's the ballpark: a full 3-month engagement usually sits between £8k and £18k, invoiced monthly. Happy to send the standard proposal once I know a bit more about the goal and the current state. Are you open to a 20-minute call this week? Here's my Calendly: [link].\"",
        action:
          "Provides the pricing range from your policy, invites to the call, tags the lead as \"pricing-quoted\".",
      },
      {
        inbound: "\"Invoice from last month is still outstanding, sorry been busy.\"",
        reply:
          "\"Totally understand. Here's a fresh payment link to make it easy: [link]. Let me know if there's anything blocking payment and we'll sort it. Otherwise no need to reply, just click through when you can.\"",
        action:
          "Sends a polite chase with a working Stripe link, marks the invoice status, sets a next reminder for 5 days.",
      },
    ],
    roi: {
      setup:
        "Typical solo consultant or coach: 15 inbound enquiries a week, average engagement value £2,000.",
      loss:
        "At an 8% conversion (typical when replies land the next day) that is £2,400 a week. Bump replies to under 5 minutes and industry data suggests conversion can 3x to 10-15%.",
      recovery:
        "Going from £2,400 to £4,500 a week is a plausible lift. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "Calendly resources",
        url: "https://calendly.com/resources",
        note:
          "Well-cited research on lead response times and their effect on conversion.",
      },
      {
        name: "International Coaching Federation",
        url: "https://coachingfederation.org",
        note:
          "The largest coaching body globally. Publishes annual global coaching studies with real market data.",
      },
      {
        name: "HubSpot Sales Blog",
        url: "https://blog.hubspot.com/sales",
        note:
          "Extensively researched articles on lead response and follow-up cadence.",
      },
    ],
    faqs: [
      {
        question: "Will it sound like me or like a bot?",
        answer:
          "Trained on your last 50 replies before it drafts anything. Tone match is scored in the eval set before we go live. You approve the first 10 drafts before autonomy is unlocked on templates.",
      },
      {
        question: "Can it send my proposal template?",
        answer:
          "Yes. Reads the enquiry, picks the right proposal from your library, personalises the intro with the lead's actual context. Nothing sends without your review on the first month.",
      },
      {
        question: "How does it know when to escalate?",
        answer:
          "You set the thresholds. High-value leads (say over £10k engagement signal), emotional messages, or press enquiries hold for your approval every time.",
      },
    ],
    relatedSlugs: ["ecom", "real-estate"],
  },
  {
    slug: "salons",
    shortName: "Salons",
    fullName: "salons, med-spas and clinics",
    kicker: "For salons, med-spas and clinics",
    h1: "The client who DM'd you for a booking got one at the salon that replied first.",
    metaTitle:
      "AI Receptionist for Salons and Med-Spas | Booking, Deposits, Rescheduling",
    metaDescription:
      "The Front Desk books your appointments in under 60 seconds, takes the deposit through Stripe, sends prep instructions, and handles the reschedule. Built for salons, med-spas and clinics.",
    ogTitle: "AI Receptionist for Salons and Med-Spas",
    ogSub: "Books the appointment. Takes the deposit. Handles the reschedule.",
    intro: [
      "A client sees your Instagram, DMs asking for a Saturday slot. You're mid-treatment, phone on silent. Two hours later you check: they've booked at the salon three blocks over that answered in 90 seconds. That's a haircut, a colour or a treatment gone. Multiply by every DM and missed call this month.",
      "Personal-service businesses live and die on response speed and calendar accuracy. The Front Desk reads the DM, checks your calendar, offers a live slot, takes the deposit, and sends the prep instructions. All in under 60 seconds, all in your salon's voice, all under your no-show and reschedule policy.",
    ],
    actionList: [
      "Reads inbound DMs, emails and form messages in under 60 seconds.",
      "Books appointments directly in your calendar (Fresha, Booksy, Google Calendar).",
      "Takes the deposit through Stripe on high-value or high-no-show services.",
      "Sends prep instructions per treatment (fasting, product avoidance, arrival window).",
      "Handles reschedule and cancel requests with your policy applied.",
      "Confirms 24 hours ahead. Sends aftercare and rebook prompts.",
    ],
    workflows: [
      {
        inbound: "\"Can I book for a balayage on Saturday afternoon?\"",
        reply:
          "\"Yes we can do Saturday. I've got 1pm or 3:30pm open with our senior colourist. Balayage on medium-length hair is around 3 hours and £180. To confirm, I'll pop through a £50 deposit link. Which time works?\"",
        action:
          "Checks Fresha for live availability, offers two slots, sends Stripe deposit link on confirmation, sends prep instructions once paid.",
      },
      {
        inbound: "\"Do you do lip filler for under 18s?\"",
        reply:
          "\"Under UK law we can only treat clients 18 and over for aesthetic filler treatments. Happy to book you in once that's the case. In the meantime we do offer skin consultations and non-injectable treatments if that's useful. Want me to send our under-18 menu?\"",
        action:
          "Replies with the age policy, offers the compliant alternatives, does not book.",
      },
      {
        inbound: "\"Sorry, need to move my Thursday facial to next week.\"",
        reply:
          "\"No problem. Next available same-time slot is Thursday next week, 2pm. That would keep your deposit. Confirm to move it or reply CANCEL to release your slot (deposit is non-refundable within 48 hours per our policy).\"",
        action:
          "Reads the calendar, applies your reschedule policy, offers a live alternative, updates the booking on confirmation.",
      },
    ],
    roi: {
      setup:
        "Typical single-location salon: 30 miscalls and DMs a week, ~30% would have booked, average ticket £80.",
      loss: "That's roughly £720 a week or nearly £3,000 a month walking to the next salon.",
      recovery:
        "The Front Desk captures the ones that came in outside opening hours (evenings, Sundays, mid-treatment) which is where most miscalls happen. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "Fresha",
        url: "https://www.fresha.com",
        note:
          "The most-used salon software globally. Publishes industry reports on missed bookings and no-show rates.",
      },
      {
        name: "Booksy",
        url: "https://booksy.com",
        note:
          "Major salon and barbershop platform with UK and US market data.",
      },
      {
        name: "Save Face (UK aesthetics register)",
        url: "https://www.saveface.co.uk",
        note:
          "UK regulator resource for aesthetic-clinic policy and consumer expectations.",
      },
    ],
    faqs: [
      {
        question: "Can it handle deposits and no-show fees?",
        answer:
          "Yes, per your policy. The agent asks for the deposit before confirming the slot and applies your no-show fee where relevant.",
      },
      {
        question: "What if a client has a complaint about a treatment?",
        answer:
          "The agent flags emotional messages and drafts an empathetic reply. Nothing sends. You review, edit, send.",
      },
      {
        question: "Does it work with Fresha and Booksy?",
        answer:
          "Yes. Also Google Calendar, plain email, and most clinic-specific software via API or webhook.",
      },
    ],
    relatedSlugs: ["restaurants", "coaches"],
  },
  {
    slug: "ecom",
    shortName: "Ecom",
    fullName: "ecommerce brands (£200+ AOV)",
    kicker: "For ecom (£200+ AOV)",
    h1: "WISMO tickets are 40% of your inbox. They're also 90% solvable without you.",
    metaTitle:
      "AI Support Agent for Ecom | WISMO, Refunds, Returns Under Threshold",
    metaDescription:
      "The Front Desk reads your support inbox, pulls order status, drafts replies in your brand voice, refunds under threshold and files returns. Built for Shopify, Klaviyo and Gorgias brands.",
    ogTitle: "AI Support Agent for Ecom Brands",
    ogSub: "Tracks the order. Drafts the reply. Refunds under threshold.",
    intro: [
      "40 percent of your support tickets are the same three questions. Where's my order. How do I return this. Does this work with the other product I bought. Each one takes four minutes of your (or a VA's) time. Multiply by 200 tickets a week and support is eating a working day, five days a week.",
      "Ecom customer service is a well-worn workflow with clear finish lines: track the order, answer the size question, refund the small return, escalate the chargeback. The Front Desk reads every inbound ticket, pulls order data from ShipStation or Shopify, drafts the reply in your brand voice, and takes the next action under your rules. Refunds under threshold. Return labels sent. Edge cases surfaced.",
    ],
    actionList: [
      "Reads Shopify inbox, Gorgias, Klaviyo Inbox and plain email tickets.",
      "Pulls live order status from ShipStation, AfterShip or the Shopify API.",
      "Drafts every reply in your brand voice, trained on your last 100 messages.",
      "Refunds under your set threshold via the Shopify Admin API.",
      "Files returns, emails the return label, updates the order tag.",
      "Escalates chargebacks, complaints, VIP customers, and any request above your threshold.",
    ],
    workflows: [
      {
        inbound: "\"Where's my order? Placed it Monday, tracking hasn't moved.\"",
        reply:
          "\"Hi Sam, just checked. Your order shipped Tuesday and is currently in transit with Royal Mail (tracking RM12345678GB). Latest scan is at the Milton Keynes hub, estimated delivery Thursday. Sometimes RM tracking is a day behind reality — I'd expect it to update tomorrow. If it hasn't moved by Friday, reply here and I'll open a trace.\"",
        action:
          "Pulls tracking from ShipStation, checks last scan date, drafts a personalised reply with real data, tags the ticket \"WISMO-handled\".",
      },
      {
        inbound:
          "\"This didn't fit. Can I get a refund? Order #ABC123, £42 hoodie.\"",
        reply:
          "\"No problem. Refund of £42 is being processed to your original payment method now, should show up in 3-5 working days. I've also emailed you a free return label (no rush — you have 30 days). Sorry it wasn't the right fit.\"",
        action:
          "Verifies order is within return window and under refund threshold, processes refund via Shopify API, emails return label, tags the ticket.",
      },
      {
        inbound:
          "\"Your product broke after two weeks. This is unacceptable. I want a full refund and I'm posting about this.\"",
        reply:
          "[Draft held for your review] \"Hi Chris, I'm so sorry to hear that. That is not the experience we want you to have. I've flagged this to the owner, who will respond within a few hours. In the meantime, can you send a photo of the fault so we can process the resolution properly?\"",
        action:
          "Detects negative sentiment + threat of public post, drafts the empathetic reply but holds, alerts the owner immediately.",
      },
    ],
    roi: {
      setup:
        "Typical £500k-£3M ecom brand: 150 tickets a week, ~4 minutes human time each = 10 hours a week.",
      loss:
        "At £25 an hour that's £1,000 a month, before you factor in slower response killing CSAT and the chargebacks that come from ignored complaints.",
      recovery:
        "The Front Desk handles ~80% of tickets end-to-end and escalates the rest. Real recovery is time back plus higher CSAT plus faster refund resolution. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "Shopify blog",
        url: "https://www.shopify.com/blog",
        note:
          "Vast published research on ecom customer service benchmarks and CVR impact of response time.",
      },
      {
        name: "Klaviyo Learn",
        url: "https://www.klaviyo.com/learn",
        note: "Data on email flow performance and support-driven retention.",
      },
      {
        name: "Baymard Institute",
        url: "https://baymard.com/",
        note:
          "Independent UX research institute. Widely cited on cart abandonment and post-purchase support pain.",
      },
    ],
    faqs: [
      {
        question: "Can it refund without asking me?",
        answer:
          "Only under the threshold you set (default £50). Anything over holds for your yes. You'll never see a rogue refund from the agent.",
      },
      {
        question: "Does it know my brand voice?",
        answer:
          "Trained on your last 100 replies plus your product docs and returns policy. Voice match is measured in the eval set before we go live.",
      },
      {
        question: "Does it work with Gorgias, Klaviyo Inbox, and Shopify Inbox?",
        answer:
          "All three, plus plain email and Freshdesk. Any inbox with an API or forwarding address.",
      },
    ],
    relatedSlugs: ["coaches", "salons"],
  },
  {
    slug: "real-estate",
    shortName: "Real estate",
    fullName: "estate agents and mortgage brokers",
    kicker: "For real estate and mortgage",
    h1: "Buyers work with the first agent to respond. That's the research.",
    metaTitle:
      "AI Assistant for Estate Agents and Mortgage Brokers | Lead Response, Viewings, CRM",
    metaDescription:
      "The Front Desk qualifies every property enquiry in under 60 seconds, sends the brochure, schedules the viewing and updates your CRM. Built for estate agents and mortgage brokers.",
    ogTitle: "AI Assistant for Estate Agents and Mortgage Brokers",
    ogSub: "Qualifies the buyer. Sends the brochure. Books the viewing.",
    intro: [
      "A serious buyer sees your listing on Rightmove at 8pm on a Wednesday. They enquire. You see it Thursday morning between viewings. By then they've enquired on four other properties, been to a viewing with a competing agent, and made an offer on something else. Speed is the whole game in this industry and always has been.",
      "The Front Desk reads every Rightmove, Zoopla, and website enquiry the moment it lands. Qualifies the buyer (budget, timeline, cash or financed, area), sends the brochure or comparable properties, offers a viewing slot from your live calendar, and pushes the lead into your CRM (HubSpot, Follow Up Boss, Reapit, or plain Google Sheets). Priced under a single admin assistant.",
    ],
    actionList: [
      "Reads inbound enquiries from Rightmove, Zoopla, OnTheMarket and your website form.",
      "Qualifies the buyer: budget, timeline, cash or financed, area preferences.",
      "Sends the property brochure or 3 comparable listings if the property is gone.",
      "Books a viewing from your live calendar under your availability rules.",
      "Updates the CRM (HubSpot, Follow Up Boss, Reapit) with source and notes.",
      "Nurtures cold leads with weekly market updates and new listings that match their criteria.",
    ],
    workflows: [
      {
        inbound:
          "\"Interested in the 2-bed flat on Landor Road SW9. Chain-free buyer, first-time.\"",
        reply:
          "\"Great, thanks for reaching out. Quick check to send you the right info: is £550k roughly your top end and are you looking to complete before Christmas? If yes, I can send you the full brochure and book a viewing this weekend. Saturday 11am or Sunday 2pm both available.\"",
        action:
          "Sends 2 qualifying questions, offers 2 viewing slots, adds lead to Follow Up Boss with source Rightmove.",
      },
      {
        inbound:
          "\"Looking to move to Clapham in the next 3 months, budget around £700k. Anything similar to the Landor Road flat?\"",
        reply:
          "\"Perfect timing. That one's under offer but I've got three similar in Clapham right now: [link 1], [link 2], [link 3]. All 2-bed, all in your budget, one is a chain-free vendor. Want me to book viewings on any of them this weekend?\"",
        action:
          "Pulls 3 matching properties from your database, drafts the reply with links, offers viewings, tags lead \"active-search\".",
      },
      {
        inbound: "\"How does affordability work if I'm self-employed?\"",
        reply:
          "\"Great question. Most lenders want 2 years of self-employed accounts plus SA302s. If your partner is PAYE it can strengthen the application. I'll flag this to our mortgage broker Sarah, who will call you tomorrow morning to walk through it. If you'd rather book yourself: [Sarah's Calendly link].\"",
        action:
          "Drafts an informative but compliant reply, routes to the mortgage broker, sends the Calendly link.",
      },
    ],
    roi: {
      setup:
        "Typical estate agent branch: 40 enquiries a week, ~5% conversion at typical £3,000 commission.",
      loss:
        "Widely cited industry research (Zillow, NAR) suggests buyers work with the first agent to respond substantively. Late responses convert far worse. Moving your response from hours to under 60 seconds is the highest-leverage change available.",
      recovery:
        "Even a modest lift from 5% to 8% conversion on 40 weekly enquiries at £3,000 commission is £3,600 a week. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "National Association of Realtors (US)",
        url: "https://www.nar.realtor",
        note:
          "Publishes the annual Home Buyers and Sellers Generational Trends Report with widely cited data on buyer search behaviour.",
      },
      {
        name: "Zillow research",
        url: "https://www.zillow.com/research/",
        note: "Publishes home-buyer response-time and search-behaviour studies.",
      },
      {
        name: "Rightmove market data",
        url: "https://www.rightmove.co.uk/press-centre/",
        note: "UK property market data and buyer behaviour reports.",
      },
    ],
    faqs: [
      {
        question: "Will it book viewings without me?",
        answer:
          "Yes, from your open calendar slots. If the lead is above criteria you set (e.g. cash buyer, over-asking, chain-free), you can require approval before it books.",
      },
      {
        question: "Can it handle mortgage enquiries compliantly?",
        answer:
          "It qualifies and routes. Full advice sits with your regulated broker. The agent never gives regulated advice, only routes to the right human.",
      },
      {
        question: "Does it work with Reapit, Follow Up Boss and HubSpot?",
        answer:
          "Yes, via their APIs. Also plain Google Sheets and Airtable if you self-manage the pipeline.",
      },
    ],
    relatedSlugs: ["coaches", "plumbers"],
  },
  {
    slug: "restaurants",
    shortName: "Restaurants",
    fullName: "restaurants and hospitality",
    kicker: "For restaurants",
    h1: "Every ring you missed was a table you sold to someone else.",
    metaTitle:
      "AI Receptionist for Restaurants | Reservations, Menu Questions, Private Dining",
    metaDescription:
      "The Front Desk answers your phone and DMs during service, books the table, handles menu and allergen questions, and routes private dining enquiries. Built for restaurants and hospitality.",
    ogTitle: "AI Receptionist for Restaurants",
    ogSub: "Books the table. Answers hours + menu. Routes private dining.",
    intro: [
      "It's Friday, 7:15pm. Your host is seating a walk-in. The phone rings four times, goes to voicemail. That was a 4-top asking for 8pm. They ring the next place, get a real voice, and book. Multiply by every service and you've lost tables you can't see on the P&L, but they're there.",
      "Restaurants are the poster case for the AI Front Desk. Every service phase (booking, arrival window, allergen check, private dining routing) is a well-defined workflow. The Front Desk answers the phone and DMs in seconds, checks your booking system (OpenTable, Resy, Google Reserve), holds the table or waitlists them, and pings the FoH team on relevant details. Under your policy. Round the clock.",
    ],
    actionList: [
      "Answers the phone during service (via voice AI) and DMs and forms 24/7.",
      "Books the reservation in OpenTable, Resy or Google Reserve.",
      "Answers opening hours, menu and allergen questions from your published menu.",
      "Routes private dining and catering enquiries to the events team.",
      "Adds to waitlist and notifies when a table opens.",
      "Handles reschedule and cancel with your policy applied.",
    ],
    workflows: [
      {
        inbound: "\"Do you have a table for 4 tonight at 8?\"",
        reply:
          "\"Yes, we've got an 8:15pm 4-top by the window or 8:30pm on the terrace. Which do you prefer? Booking would be for 90 minutes.\"",
        action:
          "Checks OpenTable, offers two live slots with turn-time policy, confirms on selection, notifies FoH.",
      },
      {
        inbound: "\"Do you have a good vegan option? My partner is gluten-free too.\"",
        reply:
          "\"Yes to both. Our chef's vegan pasta is fully plant-based and can be made gluten-free with our rice-based pasta. We also have a squash risotto (vegan + GF) and roasted-cauliflower main. Kitchen is fully allergen-trained, we can walk through everything on arrival. Want me to book you in?\"",
        action:
          "Pulls the menu for allergen matches, drafts a detailed reply, offers the booking flow.",
      },
      {
        inbound:
          "\"Interested in booking your private dining room for a company Christmas dinner, 30 people.\"",
        reply:
          "\"Fantastic. Our private dining room seats 24-40 and we do a set menu at £65 or £85 per head. I've flagged this to our events manager Priya, who will call you tomorrow to talk dates and menus. If you'd rather set up the call yourself: [link].\"",
        action:
          "Detects private-dining keywords, routes to the events team via email and Slack, offers a booking link.",
      },
    ],
    roi: {
      setup:
        "Typical mid-sized restaurant: 40 missed calls a week during service, ~40% would have converted, average cover £30 per person for a table of 4.",
      loss:
        "That is roughly £1,900 a week or £7,500 a month in tables that went to the next restaurant on Google Maps.",
      recovery:
        "The Front Desk captures most of those, especially the ones outside service hours and the ones during peak when the host can't reach the phone. Your numbers will differ; we log the real ones on your account.",
    },
    authorities: [
      {
        name: "OpenTable",
        url: "https://restaurant.opentable.com",
        note:
          "The largest reservation platform globally. Publishes industry-wide booking behaviour data.",
      },
      {
        name: "Resy",
        url: "https://resy.com",
        note: "Major reservation platform with published market data.",
      },
      {
        name: "UKHospitality",
        url: "https://www.ukhospitality.org.uk",
        note:
          "UK trade body for hospitality operators. Publishes annual industry reports and cost-of-doing-business data.",
      },
    ],
    faqs: [
      {
        question: "Can it handle allergen questions safely?",
        answer:
          "Draft-only for anything allergen-related by default. Every allergen response holds for a human review before it sends. This is deliberate; the risk is not worth automating.",
      },
      {
        question: "Does it work with OpenTable and Resy?",
        answer:
          "Yes, plus Google Reserve and plain calendar if you self-host bookings.",
      },
      {
        question: "Can it answer the phone during service?",
        answer:
          "Yes via voice AI. The agent takes the call, offers real slots from your system, and either confirms or takes the booking request for FoH to confirm.",
      },
    ],
    relatedSlugs: ["salons", "plumbers"],
  },
];

export const VERTICAL_SLUGS = VERTICALS.map((v) => v.slug);

export function getVertical(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}

export function getRelatedVerticals(slug: string): Vertical[] {
  const current = getVertical(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getVertical(s))
    .filter((v): v is Vertical => Boolean(v));
}

export const VERTICAL_IMAGES: Record<string, { src: string; alt: string }> = {
  plumbers: {
    src: "/images/pages/for-plumbers-ai-receptionist.png",
    alt: "A plumber taking a job call on a lime-glowing phone at a residential job site, wrench in hand — AI receptionist for plumbers, HVAC contractors and roofers",
  },
  coaches: {
    src: "/images/pages/for-coaches-ai-assistant.png",
    alt: "A coach on a video call at a home office desk, laptop screen casting lime accent light — AI assistant for coaches and consultants",
  },
  salons: {
    src: "/images/pages/for-salons-ai-receptionist.png",
    alt: "A salon stylist checking a smartphone between clients, phone screen glowing lime — AI receptionist for salons, med-spas and clinics",
  },
  ecom: {
    src: "/images/pages/for-ecom-ai-support-agent.png",
    alt: "Ecom brand owner at a packing table with a laptop showing a lime notification — AI support agent for ecom brands",
  },
  "real-estate": {
    src: "/images/pages/for-real-estate-ai-lead-response.png",
    alt: "Estate agent standing on the path of a modern residential property with a lime enquiry glowing on their phone — AI first-response for real estate and mortgage brokers",
  },
  restaurants: {
    src: "/images/pages/for-restaurants-ai-receptionist.png",
    alt: "Restaurant host on a booking call at the podium during dinner service, phone glowing lime — AI receptionist for restaurants",
  },
};
