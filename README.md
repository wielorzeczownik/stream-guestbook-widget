<h1 align="center">Stream Guestbook Widget</h1>

<p align="center">
  <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/actions/workflows/release.yml"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-guestbook-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950" alt="Build"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/v/release/wielorzeczownik/stream-guestbook-widget?style=flat-square&labelColor=2d333b&color=3fb950" alt="Latest Release"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-guestbook-widget/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/License-MIT-2ea043?style=flat-square"/><img src="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b" alt="License: MIT"/></picture></a>
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <a href="https://github.com/sigma-cw/widget-io"><img src="https://img.shields.io/badge/widget.io-compatible-3fb950?style=flat-square&labelColor=2d333b" alt="widget.io compatible"/></a>
  <img src="https://img.shields.io/badge/StreamElements-FEB800?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNXoiLz48L3N2Zz4=&logoColor=white" alt="StreamElements"/>
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white" alt="Twitch"/>
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube"/>
  <img src="https://img.shields.io/badge/Kick-53FC18?style=flat-square&logo=kick&logoColor=black" alt="Kick"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wielorzeczownik/stream-guestbook-widget/main/assets/demo.webp" alt="Stream Guestbook Widget demo – guestbook overlay animation in StreamElements" width="600"/>
</p>

<p align="center">🇬🇧 English | 🇵🇱 <a href="README.pl.md">Polski</a></p>

A free StreamElements widget for Twitch, YouTube, and Kick – viewers sign a virtual guestbook via chat command or Channel Points. Tracks visit counts and leaderboards.

## How it works

Viewers type a chat command or redeem a Channel Points reward on Twitch to sign the guestbook. A book overlay flips open on screen. Every signature is remembered across streams – viewers can check how many times they've signed and compete for the top visitor leaderboard.

## Features

- **Sign via chat command** or **Channel Points** (Twitch only)
- **Cross-platform** – Twitch, YouTube and Kick
- **Visit counter** – viewers check their sign count with `!visits`
- **Top visitors leaderboard** – post rankings to chat with `!top`
- **Fully customizable** chat responses with `{name}`, `{count}`, `{target}` placeholders
- **Mod tools** – reset individual users or wipe all data
- **Appearance** – cover color, page color, stamp color, custom textures for each
- **Flip animation** – three speed options, configurable display duration

## Installation

Download the latest release from [GitHub Releases](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest):

| File                                                                                                                                 | For                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [guestbook-widgetio.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook-widgetio.zip) | [widget.io](https://github.com/sigma-cw/widget-io) – import directly |
| [guestbook.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook.zip)                   | StreamElements custom widget – manual import                         |

### [widget.io](https://github.com/sigma-cw/widget-io)

1. Download [guestbook-widgetio.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook-widgetio.zip).
2. In [widget.io](https://github.com/sigma-cw/widget-io) , click **Import** and select the zip.
3. Configure and save.

### StreamElements custom widget

1. Download [guestbook.zip](https://github.com/wielorzeczownik/stream-guestbook-widget/releases/latest/download/guestbook.zip) and extract it.
2. Go to **My Overlays** → **New Overlay** → **Add Widget** → **Custom Widget**.
3. Click **Open Editor** and fill in each tab with the matching file from the zip:
   - **HTML** → `HTML.html`
   - **CSS** → `CSS.css`
   - **JS** → `SCRIPT.js`
   - **Fields** → `FIELDS.json`
4. Click **Done**, configure the widget fields, and save.

## Setup

### Twitch: Channel Points

1. Create a Channel Points reward named exactly **Sign Guestbook** (or whatever you set in the widget fields).
2. In the widget settings, enable **Enable Channel Points reward**.
3. Disable **Enable sign command on Twitch** if you don't want the chat command alongside it.

### Twitch: chat command

Enable **Enable sign command on Twitch** in the widget settings. Viewers use `!sign` (or your custom command name) in chat.

### YouTube / Kick

Chat command is enabled by default for non-Twitch platforms. No extra setup needed.

### StreamElements JWT token

The widget needs a JWT token to post messages to chat.

1. Go to [StreamElements Dashboard](https://streamelements.com/dashboard/account/channels).
2. Click **Copy** next to your channel's JWT token.
3. Paste it into the **StreamElements JWT token** field in the widget settings.

## Configuration

Every setting below is a field in the widget editor. Values outside the accepted range are clamped, not rejected – the widget always starts.

### General

| Field                          | Type     | Default   | Accepted             | Meaning                                                                                    |
| ------------------------------ | -------- | --------- | -------------------- | ------------------------------------------------------------------------------------------ |
| **StreamElements JWT token**   | text     | _(empty)_ | any                  | Required to post messages to chat. Without it the widget still animates, but stays silent. |
| **Display duration (seconds)** | number   | `5`       | `1`–`60`             | How long the book stays open. Values below `1` are raised to `1`.                          |
| **Flip speed**                 | dropdown | `Normal`  | Slow / Normal / Fast | Multiplies the animation timing: Slow is 2×, Fast is 0.5×.                                 |

### Signing

| Field                                                      | Type     | Default                                              | Accepted  | Meaning                                                                             |
| ---------------------------------------------------------- | -------- | ---------------------------------------------------- | --------- | ----------------------------------------------------------------------------------- |
| **Sign command name**                                      | text     | `sign`                                               | any       | Command viewers type, without the `!` prefix.                                       |
| **Enable sign command on Twitch**                          | checkbox | off                                                  | on / off  | Off by default so Channel Points is the only Twitch trigger. Turn on to allow both. |
| **Enable sign command on other platforms (YouTube, Kick)** | checkbox | on                                                   | on / off  | Those platforms have no Channel Points, so the command is the only trigger.         |
| **Enable Channel Points reward (Twitch only)**             | checkbox | on                                                   | on / off  | Ignored on YouTube and Kick.                                                        |
| **Channel Points reward name (Twitch)**                    | text     | `Sign Guestbook`                                     | any       | Must match the reward name on Twitch **exactly**, including capitalisation.         |
| **Enable sign animation**                                  | checkbox | on                                                   | on / off  | Off keeps the counters and chat replies but shows nothing on screen.                |
| **Enable sign message in chat**                            | checkbox | on                                                   | on / off  | Requires a JWT token.                                                               |
| **Sign message**                                           | text     | `@{name} signed the Guestbook for the {count} time!` | any       | `{name}` is the signer, `{count}` their new total.                                  |
| **Streak reset after X days without signing**              | number   | `7`                                                  | `1`–`365` | Days of absence that clear a viewer's streak. Values below `1` are raised to `1`.   |

### Reset

| Field                                | Type     | Default                                         | Accepted | Meaning                                                  |
| ------------------------------------ | -------- | ----------------------------------------------- | -------- | -------------------------------------------------------- |
| **Enable reset command**             | checkbox | off                                             | on / off | Off by default – resetting is destructive and mods-only. |
| **Allow users to reset themselves**  | checkbox | off                                             | on / off | On lets any viewer wipe their own entry.                 |
| **Reset command name**               | text     | `reset`                                         | any      | Command name, without the `!` prefix.                    |
| **Reset message (self)**             | text     | `@{name}, your Guestbook entry has been reset!` | any      | `{name}` is the viewer who reset themselves.             |
| **Reset message (mod resets other)** | text     | `@{target}'s Guestbook entry has been reset!`   | any      | `{target}` is the viewer that was reset.                 |
| **Reset message (user not found)**   | text     | `@{target} hasn't signed the Guestbook yet!`    | any      | Sent when the named viewer has no entry.                 |

### Visits

| Field                                                | Type     | Default                                                 | Accepted | Meaning                                       |
| ---------------------------------------------------- | -------- | ------------------------------------------------------- | -------- | --------------------------------------------- |
| **Enable visits command**                            | checkbox | on                                                      | on / off | Lets viewers query their own sign count.      |
| **Enable visits animation**                          | checkbox | on                                                      | on / off | Off replies in chat without opening the book. |
| **Visits command name**                              | text     | `visits`                                                | any      | Command name, without the `!` prefix.         |
| **Visits message (signed)**                          | text     | `@{name}, you've signed the Guestbook {count} time(s)!` | any      | `{name}`, `{count}`.                          |
| **Visits message (never signed)**                    | text     | `@{name}, you haven't signed the Guestbook yet!`        | any      | `{name}`.                                     |
| **Visits message for mods checking others (signed)** | text     | `@{target} has signed the Guestbook {count} time(s)!`   | any      | `{target}`, `{count}`.                        |
| **Visits message for mods checking others (never)**  | text     | `@{target} hasn't signed the Guestbook yet!`            | any      | `{target}`.                                   |

### Top

| Field                               | Type     | Default                                | Accepted | Meaning                                    |
| ----------------------------------- | -------- | -------------------------------------- | -------- | ------------------------------------------ |
| **Enable top command**              | checkbox | on                                     | on / off | Lets viewers post the leaderboard to chat. |
| **Top command name**                | text     | `top`                                  | any      | Command name, without the `!` prefix.      |
| **Number of top visitors to show**  | number   | `5`                                    | `1`–`20` | Values below `1` are raised to `1`.        |
| **Top message**                     | text     | `Top visitors: {list}`                 | any      | `{list}` is the rendered ranking.          |
| **Top message (nobody signed yet)** | text     | `Nobody has signed the Guestbook yet!` | any      | Sent when the guestbook is empty.          |

### Appearance

| Field                                     | Type         | Default   | Accepted      | Meaning                                     |
| ----------------------------------------- | ------------ | --------- | ------------- | ------------------------------------------- |
| **Stamps per page**                       | number       | `6`       | `1`–`50`      | Signatures drawn on a page before it flips. |
| **Cover color**                           | colourpicker | `#1b1920` | any colour    | Ignored when a cover texture is set.        |
| **Front cover texture (overrides color)** | image        | _(empty)_ | URL or upload | Replaces the front cover colour.            |
| **Back cover texture (overrides color)**  | image        | _(empty)_ | URL or upload | Replaces the back cover colour.             |
| **Page color**                            | colourpicker | `#ffffff` | any colour    | Ignored when a page texture is set.         |
| **Page texture (overrides page color)**   | image        | _(empty)_ | URL or upload | Replaces the page colour.                   |
| **Stamp color**                           | colourpicker | `#1b1920` | any colour    | Ignored when a stamp texture is set.        |
| **Stamp texture (empty = circle)**        | image        | _(empty)_ | URL or upload | Empty draws a plain filled circle.          |

## Commands

| Command         | Who can use | What it does                             |
| --------------- | ----------- | ---------------------------------------- |
| `!sign`         | Everyone    | Signs the guestbook                      |
| `!visits`       | Everyone    | Shows how many times the user has signed |
| `!visits @user` | Mods        | Shows visit count for another user       |
| `!top`          | Everyone    | Posts top visitors to chat               |
| `!reset`        | Mods        | Resets a user's guestbook entry          |

All command names are configurable in the widget settings.

## Building from source

Requirements: [Node.js](https://nodejs.org) 24+.

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run build
```

The built widget files land in `widget/compiled/`. The StreamElements-ready zip is in `widget/dist/`. For [widget.io](https://github.com/sigma-cw/widget-io), the export zip is in `widget/export/`.

## Credits

The book flip animation is adapted from a CodePen by [Nayara Alves](https://codepen.io/diemoritat) – [original pen](https://codepen.io/diemoritat/pen/LKROYZ).
