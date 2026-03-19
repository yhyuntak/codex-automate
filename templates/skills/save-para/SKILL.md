---
name: save-para
description: Saves insights from conversations to PARA Resources. Auto-activated by keywords like "save to PARA", "save to resources", and "save knowledge".
---

# save-para

Save things learned during a conversation to PARA Resources.

## Progressive Disclosure Workflow

This skill operates without hardcoded category lists. Read the PARA README files in order and use them as the source of truth.

### Step 1: Confirm PARA Root

Read:

- `~/workspace/mynotes/README.md`

Understand the PARA structure:

- Projects
- Areas
- Resources
- Archive

Then continue into `Resources/`.

### Step 2: Understand Resources Structure

Read:

- `~/workspace/mynotes/Resources/README.md`

Use:

- the `Classification Criteria` table to understand category intent
- the `Categories` table to understand available folders

### Step 3: Ask the User

Confirm:

- what content should be saved
- which category to save into
- whether to create a new category

Category options should be generated from `Resources/README.md` at runtime.

### Step 4: Check Category README

Read:

- `~/workspace/mynotes/Resources/{selected-category}/README.md`

Use it to understand:

- that category's local format
- existing document list
- possible duplicates

### Step 5: Confirm Title and Filename

Suggest a title based on the content.

If the user declines it, ask for a better title and generate a slug from that title.

### Step 6: Save

Create:

- `~/workspace/mynotes/Resources/{category}/{slug}.md`

Apply the template from `schema.md`.

Then update:

- the category README index
- `Resources/README.md`

### Step 7: Completion

Report:

- saved file path
- selected category
- applied tags
- which indexes were updated

## When Creating a New Category

If the selected category does not exist:

1. create `Resources/{new-category}/`
2. create `Resources/{new-category}/README.md`
3. update the `Classification Criteria` and `Categories` tables in `Resources/README.md`

## Filename Rules

- use lowercase English letters
- convert spaces to hyphens
- generate an English slug for non-English titles when needed

## Constraints

- Do not hardcode category names
- Use the PARA README files as the source of truth
- Keep the saved content aligned with the existing PARA document structure
