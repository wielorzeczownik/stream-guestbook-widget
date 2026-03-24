# Contributing to stream-guestbook-widget

Thank you for considering a contribution. This document describes how to get started.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+

## Development setup

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run dev
```

## Before submitting a PR

Make sure these pass locally:

```bash
npm run format
npm run lint
npm run lint:scss
npm test
```

## Commit style

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages drive automatic changelog generation and version bumping.

Common prefixes:

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Maintenance, dependency updates |
| `refactor:` | Code change without behavior change |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `ci:` | CI/CD changes |

Breaking changes must include `BREAKING CHANGE:` in the commit footer.

## Pull requests

- Keep PRs focused on a single concern.
- Reference any related issue in the PR description.
- The CI workflow must pass.

## Reporting bugs

Open an [issue](https://github.com/wielorzeczownik/stream-guestbook-widget/issues) and include:
- What you did
- What you expected
- What actually happened
- Your browser and OBS version

> For security issues, please read [SECURITY.md](SECURITY.md) before opening a public issue.

## License

By contributing you agree that your changes will be licensed under the [MIT License](LICENSE).
