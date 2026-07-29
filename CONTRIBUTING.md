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
├── tests/                  vitest suites, mirroring the widget/src/scripts layout
└── scripts/
    ├── bump-version.sh     determines and applies the next release version from git-cliff output
    └── security-audit.sh   runs npm audit, attempts a fix, and reports what is left
```

## Development setup

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm ci
npm run dev
```

## Running checks locally

CI runs exactly these commands. Anything that passes here passes there.

### With tools installed

```bash
# TypeScript, SCSS and formatting
npm run format:check     # prettier --check . (whole repo, honours .prettierignore)
npm run lint             # eslint, warnings are errors
npm run lint:scss        # stylelint
npm run typecheck        # tsc --noEmit
npm test                 # vitest run
npm run build
npm audit                # reported, never blocking

# Shell
shfmt --diff scripts/
shellcheck scripts/*.sh

# Workflows
actionlint

# Markdown
markdownlint-cli2 "**/*.md" '!node_modules/**' '!CHANGELOG.md'
```

`npm run fix` applies every autofixable finding from eslint, stylelint and prettier in one go.

### With Docker (no local installs required)

```bash
docker run --rm -v "$(pwd):/src" -w /src mvdan/shfmt --diff scripts/

docker run --rm -v "$(pwd):/mnt" -w /mnt koalaman/shellcheck:stable scripts/*.sh

docker run --rm -v "$(pwd):/repo" -w /repo rhysd/actionlint:1.7.12

docker run --rm -v "$(pwd):/workdir" davidanson/markdownlint-cli2 "**/*.md" '!node_modules/**' '!CHANGELOG.md'
```

## Commit style

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages drive automatic changelog generation and version bumping.

| Prefix      | When to use                                |
| ----------- | ------------------------------------------ |
| `feat:`     | New feature or behavior                    |
| `fix:`      | Bug fix                                    |
| `perf:`     | Performance improvement                    |
| `refactor:` | Code change without behavior change        |
| `test:`     | Tests only                                 |
| `docs:`     | Documentation only                         |
| `style:`    | Formatting, no logic change                |
| `build:`    | Build tooling and development dependencies |
| `ci:`       | Workflows and CI configuration             |
| `chore:`    | Maintenance that fits nothing above        |

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
