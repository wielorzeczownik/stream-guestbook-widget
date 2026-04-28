# Contributing to stream-guestbook-widget

Thank you for considering a contribution. This document describes how to get started.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [shfmt](https://github.com/mvdan/sh)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)

## Project structure

- `widget/src/index.html` – widget entry point (HTML + bundled scripts and styles)
- `widget/src/scripts/` – TypeScript source files
- `widget/src/styles/` – SCSS source files
- `widget/src/fields.json` – StreamElements widget field definitions
- `widget/src/data.json` – StreamElements widget data definitions
- `tests/` – unit tests (Vitest)
- `scripts/bump-version.sh` – determines and applies the next release version from git-cliff output

## Development setup

```bash
git clone https://github.com/wielorzeczownik/stream-guestbook-widget.git
cd stream-guestbook-widget
npm install
npm run dev
```

## Before submitting a PR

Run all checks locally before opening a pull request.

### With tools installed locally

```bash
npm run format:check
npm run lint
npm run lint:scss
npm run typecheck
npm run test
npm run build
npm audit
shfmt --diff scripts/
markdownlint-cli2 "**/*.md" '!node_modules/**'
```

### With Docker (no local installs required)

```bash
docker run --rm -v "$(pwd):/src" -w /src mvdan/shfmt --diff scripts/

docker run --rm -v "$(pwd):/workdir" davidanson/markdownlint-cli2 "**/*.md" '!node_modules/**'
```

## Commit style

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages drive automatic changelog generation and version bumping.

Common prefixes:

| Prefix       | When to use                         |
| ------------ | ----------------------------------- |
| `feat:`      | New feature or behavior             |
| `fix:`       | Bug fix                             |
| `chore:`     | Maintenance, dependency updates     |
| `refactor:`  | Code change without behavior change |
| `docs:`      | Documentation only                  |
| `style:`     | Formatting, no logic change         |
| `ci:`        | CI/CD changes                       |

Breaking changes must include `BREAKING CHANGE:` in the commit footer.

## Pull requests

- Keep PRs focused on a single concern.
- Reference any related issue in the PR description.
- All CI checks must pass: linting, formatting, type checking, tests, build, shell formatting, and Markdown linting.

## Reporting bugs

Open an [issue](https://github.com/wielorzeczownik/stream-guestbook-widget/issues) and include:

- What you did
- What you expected
- What actually happened
- Your browser and OBS version

> For security issues, please read [SECURITY.md](SECURITY.md) before opening a public issue.

## License

By contributing you agree that your changes will be licensed under the [MIT License](LICENSE).
