# Versioning

`codex-automate` uses Semantic Versioning with a `0.x.y` policy during early development.

## Current Policy

- `0.y.0`: use for user-visible feature additions or behavior changes
- `0.y.z`: use for small fixes, documentation-only corrections, and non-breaking implementation cleanup

## How To Decide

Use a minor version bump when a change:

- adds a new CLI command
- changes what `setup` installs
- changes overwrite or backup behavior
- changes the expected user workflow

Use a patch version bump when a change:

- fixes a bug without changing the intended workflow
- improves messaging or documentation without changing behavior
- refactors internals without changing the external contract

## Release Expectations

Before bumping the version:

- confirm the user-visible change is understood
- update `README.md` if install or usage behavior changed
- update `CHANGELOG.md`

## Early-Stage Note

Until `1.0.0`, the CLI surface may still change.
Even so, version bumps should remain disciplined and explain real user impact.
