---
name: implement
description: Runs a TDD-oriented implementation loop based on a plan file. Loads the active plan, updates brain state, executes ACs, updates plan status, and asks for the next step after completion.
---

# implement

Use this skill when the user wants to execute a plan file rather than design a new plan.

## Workflow

### Step 1: Load Plan

Load the plan from `.codex/plans/`.

Rules:

- if the user provided a slug, load that plan file
- otherwise search for plan files with `status: draft` or `status: in_progress`
- when execution begins, change the plan status to `in_progress`
- if the plan is already `in_progress`, resume from incomplete ACs

MUST: write `implement` to `.codex/state/mode`.

### Step 2: Update Brain

Execute the `Brain Update` section from the plan.

Rules:

- if the section is `none`, skip it
- otherwise delegate the update to the `worker` agent
- target files live under `.codex/brain/`
- always keep `.codex/brain/index.md` in sync with new or updated brain files

### Step 3: Iterate ACs

Process ACs in the plan's implementation order.

#### Parallel and Sequential Execution

Follow the implementation-order notation:

- `[Parallel]` means ACs can be delegated at the same time when file overlap is absent
- `[Sequential]` means ACs must run one at a time because files overlap or dependency order matters

#### AC with TC: TDD Loop

1. delegate test writing to `worker`
2. run the relevant tests and confirm an initial failing state when appropriate
3. delegate implementation to `worker`
4. run the relevant tests again
5. if tests pass, mark the AC complete
6. if tests fail, retry using the retry policy

#### Retry Policy

| Attempt | Action |
|---------|--------|
| 1-2 | retry with `worker` |
| 3 | escalate to `worker_high` |
| 4 | ask the user how to proceed |

#### AC without TC

1. delegate implementation to `worker`
2. mark the AC complete

#### AC Checkbox Update

When an AC is complete, update the plan checkbox to `- [x]`.

### Step 4: Update Plan Status

After all ACs are complete, change the plan frontmatter status to `done`.

### Step 5: Completion

Tell the user implementation is complete and ask what to do next.

Preferred next steps:

- wrap up with `wrap`
- continue working

## Constraints

- Execute only what is in the plan
- Delegate all file modifications to `worker` or `worker_high`
- If a new AC is discovered, add it to the plan before continuing
- Keep the user informed as execution advances

## Verification

Confirm all of the following before reporting completion:

- all AC checkboxes are complete
- tests for ACs with TCs pass
- the plan status is `done`
- progress updates were shown throughout execution
