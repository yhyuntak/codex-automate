---
title: Agent Routing Rules
description: Routing guidance for exploration, implementation, and thought agents in the Codex harness.
doc_type: reference
scope:
  - routing
  - delegation
  - agents
covers:
  - templates/agents/
  - templates/skills/
---

# Agent Routing Rules

## Purpose

This document defines how work should be routed across the current Codex harness agents.

## Core Routing Policy

- Small and local lookups, straightforward edits, and narrow verification steps may be handled directly by the main agent when delegation overhead would add little value.
- Use the `explorer` family for non-trivial exploration, relationship mapping, pattern discovery, or wider codebase understanding.
- Use the `worker` family for direct implementation work, isolated write scopes, or edits that are broader, parallelizable, or otherwise better separated from the main caller.
- Use `worker_high` when the change is architecture-sensitive, security-sensitive, performance-sensitive, multi-file, or otherwise high risk.
- Non-implementation agents should remain `read-only` by default.

## Exploration Routing

Use `explorer` for:

- normal codebase exploration
- finding relevant files
- mapping local relationships
- identifying patterns before implementation when focused exploration would help

Use `explorer_deep` for:

- system-level architecture analysis
- complex dependency mapping
- unclear cross-module structure
- cases where a wrong mental model would be expensive

## Implementation Routing

Use `worker` for:

- normal implementation work when direct handling is not the better option
- focused file edits that are broader or better separated
- straightforward code changes that benefit from isolation
- standard verification-driven edits when the task is better split out

Use `worker_high` for:

- architecture-sensitive changes
- security-sensitive code
- multi-file or high-risk changes
- work that needs deeper design reasoning before editing

## Thought Routing

Use `angel` for:

- idea expansion
- assumption flipping
- generating alternatives
- reframing stuck problems

Use `devil` for:

- critical validation
- feasibility checking
- surfacing hidden risks
- pressure-testing plans and decisions
