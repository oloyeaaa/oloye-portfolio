---
title: reel-pipeline
slug: reel-pipeline
type: skill
category: Content
tagline: Turn a reel that already works into your own version, in your voice, in an afternoon.
requirements:
  - Claude Code
  - Python
  - ffmpeg
  - 2GB first-run download
tags:
  - reels
  - short-form
  - scripts
  - repurposing
version: "2026-07-10"
updated: "2026-07-10"
size: 44 KB
fileCount: 21
download: /downloads/reel-pipeline.zip
price: null
featured: true
order: 1
---

## What it does

You find a reel that is already getting engagement. This takes it apart, keeps the structure that made it work, and hands you back your own version: a script in your voice, three hook options, and a low-face shot list. It never invents your opinions.

## How it works

Paste a reel URL. It downloads the audio, transcribes it locally with Whisper, then uses Claude vision to split the reel into two piles: structure to keep (the hook shape, the pacing, the beat order) and content slots to swap. You fill the slots with your takes. It writes the script, runs a human check, and returns the hooks and the shot list.

There is a browser dashboard in the box too, if you would rather paste a link and download the finished script without touching the terminal.

## When to reach for it

"Make my version of this reel." "Break this reel down." "Same format, my take." "Give me a shot list from this reel."

## The honest bit

Needs Python and ffmpeg, and a one-time 2GB Whisper download on the first run. The writing runs on your own Claude Code subscription, so there is nothing extra to pay per run. You can feed it a local video file instead of a URL if you would rather not scrape.
