# Agent Model Policy

## Purpose

This document records the current model and sandbox policy for the first Codex harness agent set.

## Exploration Agents

### `explorer`

- model: `gpt-5.4-mini`
- reasoning effort: `medium`
- sandbox: `read-only`

### `explorer_deep`

- model: `gpt-5.4`
- reasoning effort: `high`
- sandbox: `read-only`

## Implementation Agents

### `worker`

- model: `gpt-5.4-mini`
- reasoning effort: `medium`
- sandbox: `workspace-write`

### `worker_high`

- model: `gpt-5.4`
- reasoning effort: `high`
- sandbox: `workspace-write`

## Thought Agents

### `angel`

- model: `gpt-5.4`
- reasoning effort: `high`
- sandbox: `read-only`

### `devil`

- planned model: `gpt-5.4`
- planned reasoning effort: `high`
- planned sandbox: `read-only`

## Working Principle

- Use mini models for default exploration and implementation when cost and speed matter.
- Use the flagship model for deeper architectural or critical-thinking roles.
- Keep non-implementation agents read-only unless there is a clear reason otherwise.
