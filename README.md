# codex-automate

Codex CLI multi-agent harness scaffold.

## Goal

- install reusable global Codex harness defaults into `~/.codex/`
- provide shared multi-agent roles, prompts, and templates
- keep project state lazy and local to the repo only when needed

## Model

`codex-automate` is setup-first.

- `setup` installs global harness defaults
- projects do not require explicit initialization
- project-local state can be created lazily during real work

## Commands

- `codex-automate setup`
- `codex-automate doctor`
- `codex-automate upgrade`

## Quick Start

For now, use this project directly from GitHub.

```bash
git clone https://github.com/yhyuntak/codex-automate.git
cd codex-automate
node src/cli.js setup
```

This currently installs global Codex guidance into `~/.codex/AGENTS.md`.

## Current Setup Behavior

`setup` currently installs and updates:

- `~/.codex/AGENTS.md`
- `~/.codex/AGENTS_POLICY.md`
- `~/.codex/references/*.md`
- `~/.codex/agents/*.toml`
- `~/.codex/config.toml`

Behavior:

- Existing installed files are backed up into `~/.codex/backups/<timestamp>/`
- `config.toml` is merged through TOML parsing rather than replaced wholesale
- Custom agent `config_file` paths are written as resolved absolute paths

## Publishing Status

Official npm publishing is planned, but not active yet.

When the CLI surface is more stable, this project will be installable without cloning the repository.

## Versioning

Versioning for this repository follows [VERSIONING.md](/home/yhyuntak/workspace/codex-automate/VERSIONING.md).
