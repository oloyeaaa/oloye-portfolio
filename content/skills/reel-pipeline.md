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
  - open-source
version: "2026-07-23"
updated: "2026-07-23"
size: 24 KB
fileCount: 14
download: https://github.com/oloyeaaa/reel-pipeline
price: null
featured: true
order: 1
---

## What it does

You find a reel that is already getting engagement. This takes it apart, keeps the structure that made it work, and hands you back your own version: a script in your voice, three hook options, and a low-face shot list. It never copies the original's words and never invents your opinions.

## How it works

Paste a reel URL. It downloads the video, transcribes it locally with Whisper, and pulls a frame at every cut. Claude then splits the reel into two piles: structure to keep (the hook shape, the pacing, the beat order) and content slots to swap. You fill the slots with your takes. It writes the script, the hooks, the shot list, and a caption.

No API key and nothing to pay per run: the analysis and writing happen inside the Claude Code session you already have open.

## Install

Now open source on GitHub. One clone and an install script:

```
git clone https://github.com/oloyeaaa/reel-pipeline ~/.claude/skills/reel-pipeline
```

Then run `install.ps1` (Windows) or `install.sh` (Mac/Linux) and follow the cookies step in the README.

## When to reach for it

"Make my version of this reel." "Break this reel down." "Same format, my take." "Give me a shot list from this reel."

## The honest bit

Needs Python and ffmpeg, and a one-time 2GB Whisper download on the first run. Most Instagram reels need your own logged-in cookies exported once (the README shows how). It gives you the script, not the video: you still record it. That is the point.
