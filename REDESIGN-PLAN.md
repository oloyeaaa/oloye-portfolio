# Website redesign plan, version 3 (2026-10-27)

**Built on the StoryBrand website wireframe** (Marketing Made Simple, the PDF he shared 27 Oct). Same order of sections, our words, our look.

**What it's about:** process automation for any business. Save time, save money. Coaches, creators and local businesses are examples.

**The voice (Oloye, 27 Oct):** the site speaks as a business with a team: **"we", "us", "our team"**, never "I" or "me". It's true: Oloye leads a team of AI agents. Honest limits: no made-up staff names or stock team photos, and no "team of experts" claims. His face appears once, in the guide section, as the founder.

**The feel:** white page, big headings, few words, lots of space, a little animation. Lime is the only bright colour.

**The one-liner** (problem + solution = result, used everywhere):
> Most small businesses lose hours every week to the same small jobs. We build simple automations that do those jobs for you, so you save time, save money and get back to the real work.

---

## The page, in the wireframe's order

**1. Header** (what you offer, how life gets better, what to do next)
- **"Stop doing the same job twice."**
- *Simple automations that save your business time and money.*
- Two buttons: **direct** (book a free call) and **soft** (get the free thing). See question 1 and 2.
- Animation: a card types the jobs that eat a week (*"Chasing an unpaid invoice..."*, *"Sending the same welcome email again..."*). Each one gets a lime tick: **"Now automatic."**

**2. Stakes** (life if nothing changes)
- **"Still doing it all by hand?"** Five short ticks: typing leads into a sheet, chasing payments, the same email again, forgetting to follow up, evenings lost to admin.
- Then a lime band: **"There's a simpler way."**
- Animation: as you scroll, each one gets crossed out in lime.
- Below it, the slider: hours a week on repeat jobs, and the year total counts up. Marked "an example".

**3. Value** (three benefits, with icons)
- **Save time.** The repeat jobs run on their own.
- **Save money.** No extra hire, no pile of software.
- **Never miss a thing.** Every lead, invoice and reminder handled.
- Animation: the three icons draw themselves in.

**3b. See one at work** (the process animation)
- **"One job, start to finish, without you."** New enquiry, saved, reply sent, call booked, invoice sent, review asked.
- A lime dot runs the line, a screen shows the real thing at each step, each step shows its tool's logo, and a counter adds up the minutes saved. Tap a step to jump to it.

**4. Guide** (empathy + authority)
- Empathy: **"Admin after a long day is the worst part. It doesn't have to be yours."**
- Authority:
  - **"New to posting. Not new to building."** Over 3 years building marketing systems.
  - Rita's LinkedIn review (her own words) and her X post: **304 sign-ups in the first month**, counting up once.
  - **The tools, moving:** logos slide past in a loop, two rows going opposite ways (Claude, Airtable, Google Workspace, Make, ManyChat, Loom, fal).
  - **Case studies: "Real builds. Coming soon."** Three blank cards with a lime tag.

**5. Plan** (working together is easy)
- **"Three steps. That's it."**
  1. Tell us the job that eats your week.
  2. We build it with the tools you already use.
  3. You get the hours back.
- Animation: the numbers draw in one by one.

**6. The longer paragraph** (for people who want detail, and for Google). The BrandScript, in plain words:
> You want a business that runs well without doing every small job yourself. To get there, the repeat work needs doing for you. The problem is the same jobs, every day: copying, chasing, sending, reminding. It leaves you tired and behind before the real work starts. You didn't start a business to do admin. We know how that feels, and we've spent over 3 years building marketing systems that take those jobs away. Here's how it works: tell us the job that eats your week, we build it with the tools you already use, and you get the hours back. So book a free call. Or start with the free thing. Stop losing evenings to admin, and get back to the work, and the people, you love.

**7. Video and prices:** left out for now (the wireframe says optional). A Loom walkthrough can go here later.

**8. Last call + footer** ("junk drawer")
- **"What job would you hand over first?"** The two buttons again.
- Footer: blog, free things, skills, Instagram, TikTok, privacy.

---

## Images
- **Free (my pick):** his lime headshot, Rita's two screenshots, real screens from his builds (blurred where private, tinted lime), simple drawn icons in lime and black.
- **Paid only if he wants:** fal pictures in lime and black, price shown first.

## Tech
- Keep Next.js and Tailwind. No new libraries, nothing paid.
- Rebuild the home page, top menu and footer. Other pages stay and get the new menu.
- Animations switch off for people who turn motion off.

## Steps
1. He answers the two questions and says yes.
2. I build it.
3. I check it at desktop and phone size and send screenshots.
4. I save it (commit) on the PC only.
5. It goes live only when he says yes.

## Two questions
1. **The direct button:** "Book a free call"? If yes, what's the booking link (Calendly, TidyCal, Google)?
2. **The soft button** (the wireframe's lead generator): use one of the free guides already on the site, or a new one, "10 jobs to automate first" (a checklist I'd make)?

## Still to fix
- The live site names his past employers (home page, portfolio page, two blog posts). The new home page drops them; I'd take them off the others too.
- The retired Sprint section goes.

---

## Built (2026-10-27), on the PC only, not live
- Home page in the wireframe order above. New top menu and footer. New page `/free/10-jobs-to-automate-first`.
- **Booking link is a placeholder.** Every "Book a free call" button reads `BOOKING_URL` in `src/lib/site.ts` (or the `NEXT_PUBLIC_BOOKING_URL` setting). Swap it in one place.
- The process animation counts steps ("Done for you: 3 of 6"), not minutes, so no made-up time numbers.
- Employer names taken off the two blog posts. The portfolio page never named them, it only says "Tier-1 UK enterprise operations" (left as is, his call).
- Not touched yet: the old pages (portfolio, ventures, practical-ai-hub and so on) still use the old look inside the new menu.
