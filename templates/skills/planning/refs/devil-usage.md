# Devil Invocation Criteria

## Role

The `devil` agent validates the full AC list after expansion.

## Validation Targets

- ambiguous ACs
- untestable or weak TCs
- missing risks and edge cases
- contradictions or duplicates in the AC set

## Usage Timing

- invoke once during planning
- invoke after `angel` expansion
- use the result to tighten the plan before user confirmation
