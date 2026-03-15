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

## Planned Commands

- `codex-automate setup`
- `codex-automate doctor`
- `codex-automate upgrade`

## Current State

This repository is the initial scaffold only.
