---
name: wrap
description: Wraps up a work session by checking plan completion, cleaning up backlog state, reviewing doc sync, and confirming a final commit.
---

# wrap

Use this skill when the user wants to close out a task or session after implementation work.

## Workflow

### Step 1: Plan Check

Search `.codex/plans/` for files with `status: in_progress`.

If one exists:

- confirm whether all ACs are checked
- if incomplete ACs remain, warn the user and ask whether to continue anyway
- after confirmation, delegate plan-file status updates to `worker`

If none exist, skip this step.

MUST: write `idle` to `.codex/state/mode`.

### Step 2: Backlog Cleanup

Check `docs/backlogs/doing/` for items related to the active task.

If a matching backlog file exists and all ACs are complete:

- move it to `docs/backlogs/done/`
- update `docs/backlogs/README.md`
- delegate file modifications to `worker`

If no related backlog exists, skip this step.

### Step 3: Doc Sync Check

Use `doc_sync_checker` to review whether current changes made documentation stale.

Primary sync targets:

- `docs/**/*.md`
- root `AGENTS.md`

The main caller should provide:

- changed files
- a concise change summary

Suggested call template:

```md
## Task
Check whether recent changes made documentation stale.

## Changed Files
- {path1}
- {path2}

## Change Summary
- {summary line 1}
- {summary line 2}

## Scope
Primary documentation targets:
- docs/**/*.md
- AGENTS.md

## Instructions
1. Use docs frontmatter first to shortlist relevant documents.
2. Check whether any document under `docs/**` is now stale, missing, or misleading.
3. Cross-check root `AGENTS.md` only if the change affects workflow, setup behavior, rules, routing, or documentation policy.
4. Report only real mismatches.
5. If metadata is missing on an important docs file, report it as a metadata gap.
6. Do not modify files. Analysis only.
```

If issues are found:

- show the user the recommended updates
- on confirmation, delegate edits to `worker`

If the checker fails, warn and continue.

### Step 4: Commit

Draft a commit message based on the current changes.

Rules:

- if the user provided a message, use it as the default suggestion
- otherwise derive a message from the changed files and diff summary
- always ask for confirmation before committing

Possible outcomes:

- commit as proposed
- edit the message and then commit
- skip commit and exit cleanly

## Constraints

- Do not perform work not in the plan
- Delegate file modifications to `worker` unless a stronger implementation agent is required
- Commit only after user confirmation
- Skip missing targets without treating them as errors

## Verification

Confirm all of the following before reporting completion:

- plan status is `done` or there was no active plan
- related backlog items were moved if applicable
- `docs/README.md` is up to date or there was nothing to sync
- commit behavior matched explicit user confirmation
- progress updates were shown throughout execution
