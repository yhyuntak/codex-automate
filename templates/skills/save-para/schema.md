# save-para Schema

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| content | string | Y | Content to save |
| category | string | Y | Category chosen from PARA docs |
| title | string | Y | Document title |
| tags | string[] | N | Optional tags |

## Output

| Field | Type | Description |
|-------|------|-------------|
| file_path | string | Created file path |
| category | string | Saved category |
| indexes_updated | string[] | Updated README files |

## File Template

```markdown
---
title: {title}
created: {YYYY-MM-DD}
tags: [{tags}]
source: claude-session
---

# {title}

{content}

---

## Related Documents

-
```

## Category Lookup

Do not hardcode categories.

Lookup path:

- `~/workspace/mynotes/Resources/README.md`

Lookup locations:

- `Categories` table
- `Classification Criteria` table

## Index Update Rules

### Category README

Add a new row to the document list table:

```markdown
| [[new-doc]] | First sentence | #tag1 #tag2 |
```

### Resources README

Add a new row to the top of the `Recently Added` table:

```markdown
| [[new-doc]] | {category} | #tag | {date} |
```

Update the category document count in the `Categories` table.
