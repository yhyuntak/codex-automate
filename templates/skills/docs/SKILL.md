---
name: docs
description: Handles document create, edit, delete, and index regeneration work under docs/. Keeps docs/README.md updated and maintains required documentation metadata.
---

# docs

Use this skill when the user wants to create, edit, delete, or reorganize project documentation under `docs/`.

## Workflow

### Step 1: Mode Detection

Determine whether the request is Direct or Interview mode.

- Direct: the target document, location, or content is already clear
- Interview: the user wants document help but the operation is still unclear

If the request is unclear, ask one concise question at a time until the operation is specific enough.

### Step 2: Select Operation Type

Identify one of:

- create
- edit
- delete
- regenerate index

If the operation type is unclear, confirm it before proceeding.

### Step 3: Explore docs Structure

Use the `explorer` agent to understand:

- the current `docs/` folder layout
- the current role of `docs/README.md`
- the best candidate location for new documents
- nearby documents that should be referenced or kept consistent

For new documents, recommend one to three suitable locations based on existing structure.

### Step 4: Execute

Delegate the file operation to `worker`.

Requirements by operation:

#### Create

- create the target markdown file under `docs/`
- include required frontmatter metadata:
  - `title`
  - `description`
  - `doc_type`
  - `scope`
  - `covers`
- follow existing local document style

#### Edit

- preserve existing structure unless the requested change needs a stronger rewrite
- preserve or improve required frontmatter metadata

#### Delete

- remove the target file under `docs/`
- keep related index entries in mind for the next step

#### Regenerate Index

- rebuild `docs/README.md` from the current file structure
- preserve the README's broader structure when possible

### Step 5: Update Index

Skip this step if Step 4 already regenerated the index.

After create, edit, or delete:

- update `docs/README.md`
- keep descriptions aligned with the document's current purpose
- make sure the index reflects the current location and existence of the document

## Constraints

- Operate only on documentation under `docs/`
- Delegate file modifications to `worker`
- Maintain required metadata for important `docs/**/*.md` documents
- Keep `docs/README.md` aligned with actual docs state

## Verification

Confirm all of the following before reporting completion:

- the target document operation succeeded
- required metadata is present when applicable
- `docs/README.md` is up to date
- progress updates were shown throughout the workflow
