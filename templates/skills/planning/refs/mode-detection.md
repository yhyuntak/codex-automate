# Mode Detection Criteria

## Direct Mode

Use Direct mode when any of the following apply:

- a specific filename is mentioned
- a specific feature or bug is named
- the user described a clear action or expected behavior
- the current conversation already contains enough detail to plan

## Interview Mode

Use Interview mode when any of the following apply:

- the request is framed with vague verbs such as "improve", "refactor", or "optimize"
- the scope spans several areas with no clear center
- no specific file, feature, or behavior is named
- the user intent is directionally clear but not yet plan-ready

## No-Argument Handling

When the request has no clear target:

- use recent conversation context if it already defines a concrete task
- otherwise ask one concise question to distinguish between continuing the current topic and planning a new task
