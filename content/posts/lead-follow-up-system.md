---
title: "Lead Follow Up System: A Morning List of Who to Reply To"
cardLine: "Who's new, who's waiting, and a reply to start from."
date: "2026-11-11"
author: "oloye"
category: "Leads"
tags: ["lead follow up system", "lead follow up", "crm for coaches", "marketing automation for small business", "airtable"]
excerpt: "A simple lead follow up system: one morning list of who's new, who's waiting and a reply to start from, built with Airtable and Claude. You still hit send."
summary:
  - "What a morning list of leads shows, with a sample."
  - "How ours works, using Airtable and Claude."
  - "How to set up your own, with a prompt to copy."
  - "Why the replies stay as drafts until you send them."
faq:
  - question: "Do I need Claude for this?"
    answer: "No. A table sorted by who has waited longest gives you the same list. Claude adds a reply to start from."
  - question: "Does it send messages for me?"
    answer: "Ours doesn't. It writes a reply to start from, and we read it, change it and send it ourselves."
  - question: "What if I don't have a list yet?"
    answer: "Start with one table and one row per person. Our simple CRM post goes through the columns."
  - question: "How often should I check it?"
    answer: "Each morning is what this post sets out. If you get few enquiries, a few times a week may be enough, as long as nobody waits days."
coverImage: "/images/blog/lead-follow-up-system/cover.jpg"
---

You open your phone in the morning. There's a DM from last week, a form from Tuesday and an email you starred. You know someone's waiting. You just can't see who.

A lead follow up system fixes that with one short list: who's new, who's been waiting, and a reply to start from. You still send every message yourself.

> **In plain words:** a lead follow up system is a set way of making sure everyone who shows interest gets a reply. It can be as small as one table and five minutes each morning.

## What the morning list shows

This is the shape of ours, with sample details:

![A sample morning lead brief: two people waiting, one to reply to today. Sam came through the website form and has waited 3 days, Priya sent a TikTok message yesterday. Each has what they said, a reply to paste and a next step](/images/blog/lead-follow-up-system/sample-brief.png)

The order does the work. New people who haven't had a reply come first, then whoever has waited longest. Anyone waiting 3 days or more gets marked "reply today".

That's all you need from it. You don't have to think about who you've forgotten, because they're at the top.

## How our lead follow up system works

We built ours on 25 October. It has one table and one [Claude](https://www.anthropic.com/claude) skill, and it doesn't run on a timer. We start it when we ask.

![The morning follow-up: look at your list, make a short list of who to reply to with a reply to start from, reply in your own words, then move them to the next stage](/images/blog/lead-follow-up-system/morning-follow-up.png)

1. **Claude reads our Leads table.** It skips anyone marked as a client or "not now".
2. **It sorts them.** New people first, then whoever has waited longest.
3. **It writes one reply per person.** A sentence or two: thank them, answer what they asked, then ask one question about them.
4. **It saves the list as a Google Doc,** so we can read it on a phone.
5. **We reply.** Then we tell Claude who we've replied to, and it updates the row.

Our list is still small, so we can't tell you how this holds up with hundreds of names.

## Set up your own lead follow up system

**Step 1: Keep one table.** One row per person, with a stage. If you don't have one, start with [a simple CRM for small business](/blog/simple-crm-for-small-business). To fill it without copying, see [getting every sign-up into one list](/blog/make-com-automation-sign-ups-one-list).

**Step 2: Add a column for days waiting.** It counts the days since your last contact, or since they came in if you haven't replied yet. In [Airtable](https://support.airtable.com/docs/formula-field-reference), make a formula field with your own column names:

```
DATETIME_DIFF(TODAY(), IF({Last Contact}, {Last Contact}, {Date In}), 'days')
```

**Step 3: Sort it.** Biggest number at the top, and hide anyone who's already a client. That's your list, even with no Claude at all.

**Step 4: Ask Claude for the replies.** Paste your list in with this prompt:

> **Copy this:** Here is my list of leads. Put anyone new that I haven't replied to first, then whoever has waited longest. Mark anyone waiting 3 days or more as "reply today". For each person, write a reply I can start from: one or two short sentences, plain and warm. Thank them, answer what they asked, then ask one question about them. No pitch, no price, no links. Don't make anything up about them. If you can't tell what they meant, say so.

> **Good to know:** this is real people's information. Leave out anything Claude doesn't need, like phone numbers.

**Step 5: Reply, then update the row.** Change the stage and the last contact date, so tomorrow's list is right.

If you're not sure what to send to people who've gone quiet, we wrote [a follow-up plan you can copy](/blog/how-to-follow-up-with-leads).

## Why the replies stay as drafts

We could have let it send. We chose not to.

A reply to a real person can't be taken back, and Claude can misread what someone meant. So it never sends anything. It does the sorting and gives you a first draft, and the message that goes out is yours.

> **Try this:** tomorrow morning, before you open anything else, write down the three people who have waited longest for a reply. Answer those first.

Want to know where else people are slipping away? Take the free [Lead leak check](/tools/lead-leak-check?from=lead-follow-up-system). It's 6 quick questions, and you get a score out of 100, your 3 biggest leaks, and the first fix for each.
