# Plan File Rules

## Path

`.codex/plans/{YYYY-MM-DD}-{slug}.md`

Example:

`.codex/plans/2026-03-20-user-auth.md`

## Status Management

```text
draft       -> created during planning
in_progress -> set when implement starts
done        -> set when all ACs are completed
```

Do not use `abandoned`.

## File Structure

```markdown
---
status: draft
created: {YYYY-MM-DD}
slug: {feature-name}
test-command: {project test command}
---

# Plan: {feature-name}

## Requirements

### Context
- {background from conversation}

### What
- {core feature or change}

### Why
- {goal or value}

### Scope
- In: {what is included}
- Out: {what is excluded}

## Brain Update

- code-map: {structural notes}
- patterns: {patterns to capture}
- decisions: {decisions worth recording}

Write `none` when there is nothing to update.

## AC List

- [ ] AC-1: {work item}
  - TC: {verification condition}
  - TC: {verification condition}
- [ ] AC-2: {work item}
  - TC: {verification condition}
- [ ] AC-3: {work item} (no TC)

## Implementation Order

1. Brain update
2. [Parallel] AC-1 -> {file list} / AC-2 -> {file list}
3. [Sequential] AC-3 -> {file list}

## Test Plan

- {relevant local verification}
```

## Notes

- planning writes the plan file only
- brain updates are executed later during implement
- implementation order should reflect overlap and dependency risk
