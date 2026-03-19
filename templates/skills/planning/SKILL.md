---
name: planning
description: Creates an implementation plan. Includes mode detection, project-brain lookup, codebase exploration, AC drafting, angel expansion, devil validation, user confirmation, plan-file creation, and PARA concept extraction.
---

# planning

Use this skill when the user wants to turn an idea, feature, or change request into a concrete implementation plan before coding begins.

## Workflow

### Step 1: Mode Detection

MUST: write `planning` to `.codex/state/mode`.

Read `refs/mode-detection.md` and apply its criteria.

- Direct mode: use when the request is already specific enough to plan
- Interview mode: use when the request is still too vague
- If it is unclear, ask one concise question to disambiguate

After choosing the mode, tell the user which mode you are using.

### Step 2: Interview

Run this step only in Interview mode.

Rules:

- Ask one concise question at a time
- Do not ask for facts that can be discovered from the repo
- Use the `explorer` agent first for codebase facts
- Keep asking until the request is specific enough to plan

### Step 3: Reading Brain

Read `.codex/brain/index.md`.

- If the index exists, load only the relevant brain files it points to
- If the index does not exist, continue and note that initial brain bootstrap should be included in the plan
- Skip redundant exploration when the needed information already exists in brain files

### Step 4: Codebase Exploration

Use the `explorer` agent to understand the relevant code structure, patterns, and dependency boundaries.

Collect:

- files likely to be touched
- patterns that new work should follow
- dependencies and likely blast radius
- technical constraints worth carrying into the plan

If exploration reveals durable project knowledge, record it in the plan's Brain Update section.

### Step 5: AC Draft Extraction

Draft ACs from both:

- the user request and interview answers
- exploration findings

Rules:

- AC = work item
- TC = verification condition
- each TC should be pass/fail clear
- avoid vague language
- if an AC has no meaningful TC, mark it as `(no TC)`

### Step 6: Angel Expansion

Use the `angel` agent to expand the draft AC set.

Ask it to look for:

- missing work items
- missing edge cases
- missing validation conditions

Merge useful additions into the AC draft.

### Step 7: Devil Validation

Read `refs/devil-usage.md`.

Use the `devil` agent to validate the full AC set.

Revise the AC set based on:

- ambiguous ACs
- untestable TCs
- missing risks
- AC/TC mismatches

### Step 8: User Confirmation

Present the final AC list to the user and ask for confirmation.

Possible outcomes:

- proceed as is
- revise ACs and confirm again
- restart from a different direction

### Step 9: Plan File Creation

Read `refs/plan-file.md`.

Delegate plan file creation to the `worker` agent.

Write the plan file to:

- `.codex/plans/{YYYY-MM-DD}-{slug}.md`

The plan must include:

- requirements
- brain updates
- AC list
- implementation order
- test plan

Planning creates or updates only the plan file. Do not implement the feature here.

### Step 10: PARA Concept Extraction

Check whether this planning session produced reusable concepts worth saving.

Targets:

- architecture concepts
- design patterns
- tradeoff decisions
- reusable principles

Identify one to three candidates and ask the user whether to save them.

If the user wants to save them, hand the selected content to the `save-para` skill.

## Constraints

- Planning is planning only. Do not implement.
- Prefer repo discovery over unnecessary questioning.
- Delegate codebase exploration to `explorer`.
- Delegate plan file writing to `worker`.
- Keep the user informed as the workflow advances.
