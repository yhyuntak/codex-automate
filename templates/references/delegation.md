# Delegation Rules

## Core Delegation Policy

- Small and local lookups may be handled directly by the main agent when delegation would add unnecessary overhead.
- Use the `explorer` family for non-trivial exploration, relationship mapping, pattern discovery, or wider codebase understanding.
- Code writing, code editing, file creation, and any file-writing task should use the `worker` family by default.
- Any task that creates, edits, or writes files must be delegated to `worker` or `worker_high`.
- Non-implementation agents should stay read-only by default.

## Exploration Escalation

- Use `explorer` for normal codebase exploration.
- Escalate to `explorer_deep` when the task needs architectural understanding, complex dependency mapping, or system-level analysis.

## Implementation Escalation

- Use `worker` for standard implementation tasks.
- Escalate to `worker_high` when the change is architecture-sensitive, security-sensitive, performance-sensitive, multi-file, or otherwise high risk.

## Thought Routing

- Route `angel`, `엔젤`, or `천사` to `angel` when idea expansion is needed.
- Route `devil`, `데빌`, or `악마` to `devil` when critical validation or risk review is needed.
