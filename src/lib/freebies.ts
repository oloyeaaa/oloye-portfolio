/**
 * The five free tools, and the prompts that ARE the tools.
 *
 * How somebody gets them: they open the page and copy the prompt. No email
 * wall, no download, no account. That is deliberate. Give first, and the
 * people it helps come back. Walling a freebie behind a form when nobody has
 * heard of you yet is chasing, not attracting.
 *
 * The email capture sits underneath as an offer, never a gate.
 *
 * Keeping the prompts here rather than as files also means each one is a real
 * indexable page of useful content on our own domain, which is worth more for
 * search and for answer engines than a PDF nobody can read.
 *
 * Source of truth for the wording: Oloye-OS/2-Content/lead-magnets/<slug>/PROMPT.txt
 */

export type Freebie = {
  slug: string;
  name: string;
  promise: string;
  time: string;
  /** What it does, plain. Written to stand alone if an answer engine lifts it. */
  what: string;
  /** The steps, so nobody has to guess. */
  how: string[];
  /** The prompt itself. This is the product. */
  prompt: string;
  /** Suggested next one, so the five read as a sequence. */
  next?: string;
};

export const FREEBIES: Freebie[] = [
  {
    slug: "idea-scorecard",
    name: "The Idea Scorecard",
    promise: "You already had the idea. This tells you if it is worth your evenings.",
    time: "About 4 minutes",
    what: "The Idea Scorecard scores a product idea out of 100 on four things: whether the pain is real, whether anything similar already sells, whether you can name the buyer specifically, and whether you could reach those people without paid ads. Under 50 means do not build it. Over 70 means it is worth testing, not building.",
    how: [
      "Open whichever AI you already have. ChatGPT, Claude, Gemini, it does not matter.",
      "Copy the prompt below and paste it in.",
      "It asks you one question. Answer it honestly and it does the rest.",
    ],
    next: "first-section",
    prompt: `You are going to score one idea for me, honestly, and tell me whether it is
worth my evenings.

Be stingy. A high score has to be earned with evidence, not encouragement.
A low score is a favour: it just saved me weeks. Never invent a statistic,
a competitor, or a quote. If you cannot verify something, say so out loud
and score it low.

First, ask me this and wait for my answer:

  "What's the idea, and who is it for? If you don't have one yet, tell me
   instead what you know, do, or care about, and who you could genuinely
   help."

If I don't have an idea yet, don't invent one for me. Pull it out of what
I told you: name one SPECIFIC group of people (not "everyone"), name the
real problem they already work or pay to avoid, then suggest one to three
small products that solve it. Small enough for one person to finish. Let
me pick one.

Then score it out of 100, twenty-five points each:

  PAIN          Do people feel this often and say it out loud? A mild
                annoyance scores low. Something they already pay to avoid
                scores high.

  PROOF         Does anything comparable already sell? Competition is
                proof of demand. A completely empty market usually means
                empty demand. Score that low and tell me why.

  SPECIFICITY   Is the buyer specific? "Everyone who wants to be
                productive" is near zero. "First-year supply teachers
                drowning in lesson planning" is high. Score what I
                actually said, not what it could become.

  REACHABILITY  Could one person with a small audience put this in front
                of its buyers? If it needs paid ads or a big platform to
                even test, low.

Then give me exactly this, short and plain, no preamble:

  Idea Score: __/100

  Pain:         __/25   one line why
  Proof:        __/25   one line why
  Specificity:  __/25   one line why
  Reachability: __/25   one line why

  Verdict:      Under 50, say "don't build this yet" and why.
                50 to 69, say "not yet, fix ___ first".
                70 or over, say "worth testing" and name the smallest test.

  Biggest risk: The ONE thing most likely to kill this. One sentence.

Never score above 70 without at least one real piece of evidence under
Proof.

Last thing. If the score is 70 or over, tell me the smallest possible
version I could put in front of a real person THIS WEEK to see if anyone
actually wants it. Not the finished thing. The smallest honest test.`,
  },
  {
    slug: "first-section",
    name: "The First Section",
    promise: "The blank page is not the hard part. It is the part already solved.",
    time: "One sitting",
    what: "The First Section turns a product idea into the full outline plus the opening section actually written, several hundred words in your voice with no placeholders. Then it stops on purpose, because the rest of the product should be yours.",
    how: [
      "Open whichever AI you already have.",
      "Copy the prompt below and paste it in.",
      "Paste your idea when it asks. Give it the honest version, not the polished one.",
    ],
    next: "thirty-posts",
    prompt: `You are going to kill the blank page for me in one sitting.

I am going to paste a product idea. Take it and do exactly two things: the full
outline, then the first section actually written.

Ask me at most ONE question, and only if you genuinely cannot tell what format
this is: "Which is it closest to, a PDF guide, an ebook, a template pack, a
worksheet, a checklist, a prompt pack, a course, or a video script?" If the
format is already obvious from what I pasted, do not ask at all. Do not
interview me beyond that one question.

THE OUTLINE
Name every section, each with a one-line promise of what it does for the reader.
Be honest about scope: outline a product one person can actually finish, not a
wish list you will never finish. Give the sections real, specific names taken
from my subject. Never "Introduction" and "Conclusion" as your only ideas.

THE FIRST SECTION
Then write the first section completely.

  Real, usable content I could act on today. Several hundred words minimum.
  A plain voice that mirrors how I wrote my brief. If I wrote casual, write
  casual.
  No placeholders. No lorem. No "[insert your story here]". No bullet skeleton
  passed off as writing.
  If something needs a fact only I could know, write around it honestly instead
  of faking it, and tell me what you left for me.
  No em dashes.

Then STOP. Do not write section two. One real section is the win. The rest is
mine to finish.

Close with three short lines: where to keep this, that one section a day
finishes the product, and that when a section needs something only I know I
should write the real thing in rather than a placeholder.

Here is my idea:`,
  },
  {
    slug: "thirty-posts",
    name: "Thirty Posts",
    promise: "You are not out of ideas. You are trying to invent them.",
    time: "About 10 minutes",
    what: "Thirty Posts turns the questions people already ask you into around thirty post ideas, each with a hook of ten words or fewer, the angle of the answer, and the format that suits it. It collects rather than invents, which is why it does not run dry.",
    how: [
      "Open whichever AI you already have.",
      "Copy the prompt below and paste it in.",
      "Paste your questions when it asks, or just tell it what you do and who you help.",
    ],
    next: "camera-answer",
    prompt: `You are going to build me a month of content out of questions people already
ask me. Do not invent content ideas. Collect them.

First ask me this and wait:

  "Paste the questions your customers, clients or followers actually ask you.
   Any format, a rough list is fine. If you're not sure, just tell me what you
   do and who you help and I'll pull the questions out."

If I give you few or none, MINE them from what I do and who I serve: the
objections, the how-tos, the comparisons, the "is this right for me", the
questions about price, process and results. Never invent a fact about my
business. If you need a specific I have not given you, such as a price or a
policy, leave [your answer] for me to fill in.

Then cluster what you have and expand to about 30 distinct questions, a month
of posts. Cover the real spread: the objection, the how-to, the "does this work
for someone like me", the comparison, the mistake people make, the behind the
scenes, the myth. One question, one post.

Do not pad. If fewer than 30 are genuinely useful, give me the honest number and
say so. I would rather have 18 real ones than 30 with 12 weak.

Turn each question into a post. The asker's question is the problem, my answer
is the solution:

  HOOK           Ten words or fewer. The question reframed so it stops the
                 scroll. Earn the first line.
  WHAT TO SAY    One or two lines. The angle of the answer, in my voice.
  FORMAT         Reel, carousel, or caption. Teaching is a carousel, a story or
                 quick tip is a reel, something short is a caption.

Give it to me as a clean numbered table I can work straight from:

  | # | Question | Hook | What to say | Format |

Group it into weeks if that helps me plan.

Rules: my voice, not a template. Plain and confident, no hype. Value first,
never sell inside the posts. One idea per post. No jargon my audience would not
use. No em dashes. Never make up my facts, prices or results.`,
  },
  {
    slug: "camera-answer",
    name: "The Camera Answer",
    promise: "You do not have to be on camera. You do have to show up.",
    time: "About 15 minutes",
    what: "The Camera Answer picks the highest content format you can genuinely manage without being on camera, from text posts through carousels, screen recordings and voiceover, then writes five real posts in it. It is honest that a visible face does build trust faster, and honest that it is not required.",
    how: [
      "Open whichever AI you already have.",
      "Copy the prompt below and paste it in.",
      "It asks two questions, picks the honest format, then writes the posts.",
    ],
    next: "finished-thing",
    prompt: `You are going to help me post consistently without being on camera, and
then give me a week of actual posts in the format I pick.

Start with the honest frame, do not soften it:

  A visible face does tend to build trust and recall faster than text alone.
  That is real and worth naming. It is also not required. Consistency beats
  format: somebody who posts every week with text and carousels will get
  further than somebody who films once and stops.

Then ask me two things and wait:

  "What do you do, and who are you trying to reach? And which of these do you
   already have: a bit of writing you like, a screen you could record, any
   footage at all, or none of it yet?"

Then pick my format from this ladder, cheapest first. Recommend the highest row
I can genuinely do this week, not the most impressive one:

  TEXT POSTS              No camera. Needs a story or an opinion, written in
                          my voice.
  CAROUSELS               No camera. Same material broken into slides, one
                          point per slide, a strong first slide.
  SCREEN DEMO + VOICE     No camera on me. My screen plus my recorded voice
                          narrating what I am doing.
  B-ROLL + VOICEOVER      No camera on me. Any relevant footage, product,
                          workspace, hands, cut to a recorded voiceover.
  AI STUDIO STILLS        An AI likeness built from my own reference photo,
                          only if I am comfortable with that.

Say plainly which row you picked and why it fits what I already have.

Then write me FIVE posts in that format, ready to use. Real content, my subject,
not examples about posting. For each: the hook in ten words or fewer, the body
or the slide-by-slide, and one line on what to do to make it.

Last, tell me the one rung above where I landed, and what I would need before
that is comfortable. Not a lecture. One or two lines. This is a ladder, not a
permanent identity.

Rules: never tell me I have to show my face. Never imply I am behind or lazy.
No hype. No em dashes. Never invent a fact about my business or my results.`,
  },
  {
    slug: "finished-thing",
    name: "Idea to Finished Thing",
    promise: "The month of evenings is the part that changed.",
    time: "A weekend",
    what: "Idea to Finished Thing takes six answers about your product and writes the whole thing, plus a cover idea, a sales page and the steps to put it on sale. It finishes with three straight lists: what is done, what still needs something only you have, and what it did not get to.",
    how: [
      "Open whichever AI you already have.",
      "Copy the prompt below and paste it in.",
      "Answer the six questions. Honestly, not impressively.",
    ],
    prompt: `You are going to turn one validated idea into a finished digital product,
and you are going to be honest with me about what is actually finished.

First ask me these six things, all at once, then wait:

  1. What is it, in one line.
  2. The specific buyer. Never "everyone".
  3. The pain, in their words, not yours.
  4. The one-line promise. An outcome, not a topic.
  5. The format, if I have a preference.
  6. Roughly what I would charge, if I have a number.

If any answer is vague, say which one and why it will hurt the product, then
take my second attempt and move on. Do not interrogate me.

Then build it. The whole thing, written out, as far as you honestly can in one
run. Real content, not an outline pretending to be a product.

THE RULE THAT MATTERS MOST
Do not hand me something half-built and call it finished. When you are done,
give me three plain lists:

  FINISHED        What is genuinely done and usable as it stands.
  I SUPPLY        What still needs something only I have: a real number, a
                  story, a screenshot, a client example, my own opinion. Say
                  exactly where each one goes.
  NOT STARTED     Anything you could not do in one run, named plainly.

Do not blur those lists to make the result look better. A product that is 70
percent done and labelled honestly is worth more to me than one that looks
finished and falls apart when I read it.

Then give me:

  A cover idea, described well enough that I could make it.
  A sales page: the headline, who it is for, what they get, what changes for
  them, and the honest objection with your answer to it.
  The plain steps to actually put this on sale.

Rules: no invented statistics, testimonials, or results. Ever. If a claim needs
evidence I have not given you, leave it out or mark it clearly as mine to fill.
Plain words, no hype, no em dashes.`,
  },
];

export function getFreebie(slug: string) {
  return FREEBIES.find((f) => f.slug === slug);
}

export const FREEBIE_SLUGS = FREEBIES.map((f) => f.slug);
