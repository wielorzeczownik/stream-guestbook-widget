<h1 align="center">Stream Guestbook Widget</h1>

<p align="center">
  <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/actions/workflows/release.yml"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?style=flat-square&labelColor=2d333b&color=3fb950" alt="Build"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950" alt="Latest Release"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/License-MIT-2ea043?style=flat-square"/><img src="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b" alt="License: MIT"/></picture></a>
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <a href="https://github.com/sigma-cw/widget-io"><img src="https://img.shields.io/badge/widget--io-compatible-3fb950?style=flat-square&labelColor=2d333b" alt="widget-io compatible"/></a>
  <img src="https://img.shields.io/badge/StreamElements-FEB800?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNXoiLz48L3N2Zz4=&logoColor=white" alt="StreamElements"/>
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white" alt="Twitch"/>
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube"/>
  <img src="https://img.shields.io/badge/Kick-53FC18?style=flat-square&logo=kick&logoColor=black" alt="Kick"/>
</p>

<p align="center">
  A stream overlay widget where viewers sign the guestbook via chat command or Channel Points. Works with Twitch, YouTube, and Kick via StreamElements.
</p>

<p align="center">
  <img src="./assets/demo.webp" alt="Widget demo" width="600"/>
</p>

---

## What it does

Viewers type a chat command (or redeem a Channel Points reward on Twitch) to leave their mark in a book overlay that flips open on screen. Every signature is remembered across streams - viewers can track how many times they've signed and compete for top visitor spots.

---

## Features

- **Sign via chat command** or **Channel Points** (Twitch only)
- **Cross-platform** - Twitch, YouTube, Kick through StreamElements
- **Streak tracking** - streak resets after a configurable number of days without signing
- **Visit counter** - viewers can check how many times they've signed with `!visits`
- **Top visitors** - post a leaderboard to chat with `!top`
- **Fully customizable** chat messages with `{name}`, `{count}`, `{target}` placeholders
- **Mod tools** - reset individual users or clear all data
- **Appearance** - cover color, page color, stamp color, custom textures for all three
- **Flip animation** - three speed options, configurable display duration

---

## Installation

Two builds are available in [GitHub Releases](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest):

| File | For |
|---|---|
| `guestbook-widgetio.zip` | [widget.io](https://github.com/sigma-cw/widget-io) - import directly |
| `guestbook.zip` | StreamElements custom widget - manual import |

### widget.io

1. Download `guestbook-widgetio.zip`.
2. In widget.io, click **Import** and select the zip.
3. Configure and save.

### StreamElements

1. Download `guestbook.zip` and extract it.
2. Go to **My Overlays** → **New Overlay** → **Add Widget** → **Custom Widget**.
3. Click **Open Editor** and fill in each tab with the matching file from the zip:
   - **HTML** → `HTML.html`
   - **CSS** → `CSS.css`
   - **JS** → `SCRIPT.js`
   - **Fields** → `FIELDS.json`
4. Click **Done**, configure the widget fields to your liking, and save.

---

## Setup

### Twitch - Channel Points

1. Create a Channel Points reward named exactly **Sign Guestbook** (or whatever you set in the widget fields).
2. In the widget settings, enable **Enable Channel Points reward**.
3. Disable **Enable sign command on Twitch** if you don't want the chat command on Twitch.

### Twitch - chat command

Enable **Enable sign command on Twitch** in the widget settings. Viewers use `!sign` (or your custom command name) in chat.

### YouTube / Kick

Chat command is enabled by default for non-Twitch platforms. No extra setup needed.

---

## Commands

| Command         | Who can use | What it does                             |
| --------------- | ----------- | ---------------------------------------- |
| `!sign`         | Everyone    | Signs the guestbook                      |
| `!visits`       | Everyone    | Shows how many times the user has signed |
| `!visits @user` | Mods        | Shows visit count for another user       |
| `!top`          | Everyone    | Posts top visitors to chat               |
| `!reset`        | Mods        | Resets a user's guestbook entry          |

All command names are configurable in the widget settings.

---

## Building from source

Requirements: [Node.js](https://nodejs.org) 24+.

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run build
```

The built widget files land in `widget/compiled/`. The StreamElements-ready is in `widget/dist/`. For widgetIO, the export ZIP is in `widget/export/`.

---

## Credits

The book flip animation is adapted from a CodePen by [Nayara Alves](https://codepen.io/diemoritat) - [original pen](https://codepen.io/diemoritat/pen/LKROYZ).
