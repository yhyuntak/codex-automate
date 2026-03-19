# Temporary Skill Migration Note

## Summary

The current high-priority migration targets from `claude-automate` into `codex-automate` are the six workflow skills below.

These skills cover the core loop:

- planning work
- executing work
- wrapping up work
- managing project documents
- saving reusable knowledge
- verifying UI behavior

## Priority Order

1. `planning`
2. `implement`
3. `wrap`
4. `docs`
5. `save-para`
6. `verify-web-ui`

## planning

Current role:
- turns a vague or specific request into an implementation plan
- mixes mode detection, exploration, AC drafting, angel expansion, devil validation, and plan-file creation

Likely Codex migration concern:
- Claude-specific `AskUserQuestion`, `.claude/state`, `.claude/brain`, and writer delegation patterns need to be remapped to Codex plan mode, `AGENTS.md`, skills, and subagents

## implement

Current role:
- loads a plan file and executes ACs through a TDD-oriented implementation loop
- updates plan state and progress while delegating file changes to writer agents

Likely Codex migration concern:
- the plan-file format and execution loop can carry over, but Claude-specific writer orchestration and retry flow need to be adapted to Codex worker agents and local verification flow

## wrap

Current role:
- closes the session by checking plan state, cleaning backlog, verifying docs sync, and preparing a commit

Likely Codex migration concern:
- this depends on Claude session state and backlog conventions, so the Codex version should be simplified around plan completion, verification, and commit confirmation first

## docs

Current role:
- handles document create/edit/delete flows and keeps `docs/README.md` in sync

Likely Codex migration concern:
- this is portable, but the interaction flow should be adjusted to Codex skill invocation and current repo document conventions rather than Claude command-style prompting

## save-para

Current role:
- saves reusable knowledge from conversations into the PARA notes workspace
- dynamically reads README files to infer category and structure

Likely Codex migration concern:
- this is coupled to the external `mynotes` layout, so path assumptions, confirmation flow, and write behavior should be validated before direct migration

## verify-web-ui

Current role:
- acts as a thin entry skill that immediately delegates to a dedicated verification orchestrator

Likely Codex migration concern:
- browser, MCP, and tool boundary behavior in Codex need to be confirmed first so the orchestrator split remains structurally safe

## Next Step

Set up `planning` first.

That skill is the highest-leverage migration target because it defines how future Codex work gets scoped, explored, validated, and handed off into implementation.
