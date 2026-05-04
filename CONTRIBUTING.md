# Contributing to stream-guestbook-widget

Thank you for considering a contribution. This document covers everything you need to get started.

## Overview

A free StreamElements browser-source widget for Twitch, YouTube, and Kick – viewers sign a virtual guestbook via chat command or Channel Points. Tracks visit counts and leaderboards.

## Project structure

```text
.
├── widget/src/
│   ├── index.html          widget entry point (HTML + bundled scripts and styles)
│   ├── scripts/            TypeScript source files
│   ├── styles/             SCSS source files
│   ├── fields.json         StreamElements widget field definitions
│   └── data.json           StreamElements widget data definitions
├── tests/                  unit tests (Vitest)
└── scripts/
    └── bump-version.sh     determines and applies the next release version from git-cliff output
```

## Development setup

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run dev
```

## Running checks locally

### With tools installed

```bash
# TypeScript
npm run format:check
npm run lint
npm run lint:scss
npm run typecheck
npm run test
npm run build
npm audit

# Shell
shfmt --diff scripts/

# Markdown
markdownlint-cli2 "**/*.md" '!node_modules/**'
```

### With Docker (no local installs required)

```bash
docker run --rm -v "$(pwd):/src" -w /src mvdan/shfmt --diff scripts/

docker run --rm -v "$(pwd):/workdir" davidanson/markdownlint-cli2 "**/*.md" '!node_modules/**'
```

## Commit style

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages drive automatic changelog generation and version bumping.

| Prefix      | When to use                         |
| ----------- | ----------------------------------- |
| `feat:`     | New feature or behavior             |
| `fix:`      | Bug fix                             |
| `test:`     | Adding or updating tests            |
| `chore:`    | Maintenance, dependency updates     |
| `refactor:` | Code change without behavior change |
| `docs:`     | Documentation only                  |
| `ci:`       | CI/CD changes                       |

Breaking changes must include `BREAKING CHANGE:` in the commit footer.

Keep commits focused on a single concern. If a change touches both logic and tests, a single commit is fine – if it touches unrelated areas, split it.

## Pull requests

- Keep PRs focused on a single concern.
- Reference any related issue in the PR description.
- All CI checks must pass before merging.

## Reporting bugs

Open an [issue](https://github.com/wielorzeczownik/stream-guestbook-widget/issues) and include:

- What you did
- What you expected
- What actually happened
- Your browser and OBS version

> For security issues, read [SECURITY.md](SECURITY.md) before opening a public issue.

## License

By contributing you agree that your changes will be licensed under the [MIT License](LICENSE).
