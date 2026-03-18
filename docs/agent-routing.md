# Agent Routing Rules

## Purpose

This document defines how work should be routed across the current Codex harness agents.

## Core Routing Policy

- Small and local lookups may be handled directly by the main agent when delegation would add unnecessary overhead.
- Use the `explorer` family for non-trivial exploration, relationship mapping, pattern discovery, or wider codebase understanding.
- Code writing, code editing, file creation, and any file-writing task should use the `worker` family by default.
- Non-implementation agents should remain `read-only` by default.

## Exploration Routing

Use `explorer` for:

- normal codebase exploration
- finding relevant files
- mapping local relationships
- identifying patterns before implementation

Use `explorer_deep` for:

- system-level architecture analysis
- complex dependency mapping
- unclear cross-module structure
- cases where a wrong mental model would be expensive

## Implementation Routing

Use `worker` for:

- normal implementation work
- focused file edits
- straightforward code changes
- standard verification-driven edits

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
