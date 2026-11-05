---
title: "Make.com Automation: Get Every Sign-Up Into One List"
cardLine: "Every door leads to one list, and nobody copies a name across."
date: "2026-11-06"
author: "oloye"
category: "Leads"
tags: ["make.com automation", "lead automation", "automate lead capture", "airtable", "email list"]
excerpt: "A simple Make.com automation that puts every sign-up into one list, with no copying. How ours works, and how to set it up for your small business."
summary:
  - "Why copying names across manually stops working."
  - "How every sign-up door can lead into one list."
  - "How one person stays one row, even if they sign up twice."
  - "How to add only the people who said yes to your email list."
faq:
  - question: "Do I need to know how to code?"
    answer: "No. In Make you join boxes together. The one thing to change on your form is where it sends its answers, and many form tools have a setting for that. Check your form tool's help page."
  - question: "What if someone signs up twice?"
    answer: "Make looks for their email in your list first. If it's already there, it updates that row instead of adding a new one. One person stays one row."
  - question: "Does everyone who signs up get my emails?"
    answer: "No. Only the people who ticked yes go on the email list. Everyone else stays in your table, gets what they asked for and nothing more."
  - question: "Which tools does this use?"
    answer: "Make to pass things along, Airtable for the list, and MailerLite for the email list. You could use a different email tool, as long as Make can connect to it."
freebie: "PIECES"
coverImage: "/images/blog/make-com-automation-sign-ups-one-list/cover.jpg"
---

You've got a form on your website. A sign-up page in your bio. A free guide with its own form. Each one is a person who wants something from you, and each one lands somewhere different.

So you copy names across when you get a minute. Some weeks you don't get a minute.

A small Make.com automation takes that task away. Every sign-up goes into one list on its own, with nobody copying anything.

> **In plain words:** [Make](https://www.make.com) is a tool that passes information from one app to the next. You set up once what should happen, and it does the same thing every time.

## Why copying names manually stops working

It's fine at two or three a week. Then a busy week comes, and it's the first task to go.

The worst part is that you can't see what's missing. A name you forgot to copy doesn't show up as a gap. It just isn't there. That person asked for something, and nobody knows. It's one of [the gaps where most funnels lose people](/blog/why-ai-funnels-fail-at-the-handoff).

Copying also makes a mess. Someone signs up twice and now they're on two rows, with two different stories about where they're up to.

## Every door leads to one list

We call each place someone can sign up a door. These are ours today:

![Four doors, the free guide forms, the contact form, the lead leak check and the sign-up page, all going through Make into one Leads table](/images/blog/make-com-automation-sign-ups-one-list/doors.png)

All four land in the same Airtable table, called Leads. If you don't have that table yet, start with [a simple CRM in Airtable](/blog/simple-crm-for-small-business). It's the one thing everything else here plugs into.

Not every door is joined up. People who message us on TikTok don't come through a form, so we still add those manually. We've also built a door for Instagram comment keywords, and it's paused for now while we focus on TikTok.

## How the Make.com automation works

This is what happens each time someone signs up.

![The pipes: someone signs up, Make catches it, it saves a row in your list, then asks if they said yes to emails. Yes adds them to your email tool, no keeps them in the list only](/images/blog/make-com-automation-sign-ups-one-list/the-pipes.png)

1. **The door sends what it knows.** Their name, their email, a label for which door it was, and whether they ticked yes to emails. It goes to a private web address in Make, called a [webhook](https://help.make.com/webhooks).
2. **Make checks it's really from you.** Every send carries a secret key. No key, and it stops there. Nothing is saved.
3. **Make looks for their email in the list.** A new person gets a new row, with today's date and the stage "New". Someone already there keeps their row and their stage, and the new message is added under the old ones.

That third step is what keeps the list clean. One person, one row, however many doors they come through.

![The Make scenario, step by step: webhook, check the key, save in Airtable, router, then the two emails](/images/blog/website-forms/make-scenario.png)

That picture is the website forms version. We went through it box by box in [website forms to Airtable with Make](/blog/website-forms-to-airtable-with-make), so we won't repeat it here.

## Only the people who said yes

Being on your list isn't the same as saying yes to your emails, so we keep those two apart.

Every row has a tick box for it. Every morning at 7, a second Make scenario looks for rows with the box ticked and an email address, that haven't been added yet. It adds each one to our email list in [MailerLite](https://www.mailerlite.com/features/automation), then writes the date on their row.

That date matters. A row only gets added once, so someone who unsubscribes never gets put back.

No tick, and they stay in the table. They get what they asked for and nothing more.

> **Good to know:** because this runs once a day, our welcome email goes out the next morning, not the same minute. The free guide they asked for still goes straight away.

## How to set this up for your own sign-ups

1. **Write down every door you have.** Forms, sign-up pages, anything that collects an email. One line each.
2. **Make one table.** You need email, which door, the date in, yes to emails, and a stage. [Airtable](https://www.airtable.com) is what we use.
3. **Build one Make scenario for your busiest door.** A webhook to catch the sign-up, a search for the email, then add or update the row.
4. **Test it on yourself, twice.** Sign up two times with your own email. You should see one row, not two.
5. **Then add the next door.** Send it to the same webhook with its own label. No new table, no new list.

> **Try this:** start with step 1 tonight. Most people find a door they'd forgotten about, and the people who used it are sitting there unanswered.

No website yet? [A free form and an Airtable base](/blog/the-zero-dollar-owned-pipeline-for-creators) does the same job. If you're not sure which task to automate first, the free checklist of [10 tasks to automate first](/free/10-jobs-to-automate-first) will help you pick.

If you'd like this set up for your own sign-ups, [book a free call](/contact) and we'll look at it together.
