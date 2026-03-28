# codex-automate Working Agreement

This repository is the source for the `codex-automate` harness itself.
It is not the installed global `~/.codex/AGENTS.md` file.

## Terminology

- When this project refers to the plugin, the installer, the install templates, the installed global guidance, or "the plugin's `AGENTS.md`", interpret that as the install-template side under `templates/`, especially `templates/AGENTS.md`, unless a different path is named explicitly.
- When this project refers to the root, this project, this repo, or the local/workspace harness, interpret that as the workspace-local files for this repository, not the install templates and not the installed global files under `~/.codex/` or `~/.agents/`.
- Examples:
  - "root `AGENTS.md`" means `./AGENTS.md`
  - "root skills" means project-local skills such as `./.codex/skills/...` when present
  - "root agents" means project-local agent configs such as `./.codex/agents/...` when present
- Treat the repository-root `AGENTS.md` as a contributor/workspace routing document for this repo itself, not as the file that gets installed into `~/.codex/`.

## Purpose

- build and maintain the Codex harness installer
- keep setup behavior predictable and easy to reason about
- avoid shipping unstable workflow assumptions too early

## Working Rules

- prefer small, reviewable changes
- keep setup behavior explicit
- do not silently expand the install surface
- document user-facing behavior in `README.md`
- treat version impact as a default review item before every commit
- before committing, check whether the change needs a version bump and `CHANGELOG.md` update

## AGENTS.md Management Policy

- treat `AGENTS.md` as an indexing and routing document whenever possible
- keep detailed operating rules in focused companion documents
- do not turn `AGENTS.md` into a large monolithic rules file unless there is a clear reason
- when adding new instruction areas, prefer linking from `AGENTS.md` to dedicated documents

## Indexed Documents

Use the following documents as the primary references for current harness-agent policy:

- agent routing rules: [`docs/agent-routing.md`](/home/yhyuntak/workspace/codex-automate/docs/agent-routing.md)
- agent model and sandbox policy: [`docs/agent-model-policy.md`](/home/yhyuntak/workspace/codex-automate/docs/agent-model-policy.md)
- agent alias policy: [`docs/agent-aliases.md`](/home/yhyuntak/workspace/codex-automate/docs/agent-aliases.md)
- session progress log: [`docs/session-2026-03-19.md`](/home/yhyuntak/workspace/codex-automate/docs/session-2026-03-19.md)

## Versioning

Versioning and release decisions must follow [`VERSIONING.md`](/home/yhyuntak/workspace/codex-automate/VERSIONING.md).

When a change affects user-visible setup behavior, installation flow, or CLI semantics:

- update the package version as needed
- record the change in `CHANGELOG.md`
- keep the versioning rationale aligned with `VERSIONING.md`
