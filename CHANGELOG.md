# Changelog

## 0.11.0

- removed the standalone delegation reference from `setup` and consolidated delegation guidance into `AGENTS.md`
- relaxed skill-level delegation guidance so small, local work can stay direct when that is cheaper than routing through a subagent
- updated installed response-format guidance so workspace paths are shown relatively and out-of-workspace paths absolutely
- added frontmatter metadata to the documented agent routing reference under `docs/`

## 0.10.0

- updated global interaction guidance to require a fixed `사용자 의도 파악하기` section at the start of every response
- changed that section to include both `질문의 성격` and `내 1차 판단` instead of a single ambiguous judgment field

## 0.9.0

- added a bundled `docs` Codex skill template for document CRUD and index maintenance
- updated `setup` to install the docs skill into `~/.agents/skills/docs/`
- documented a concrete `wrap -> doc_sync_checker` call template for documentation review

## 0.8.0

- added a `doc_sync_checker` custom agent template for documentation sync review
- updated `wrap` to use the dedicated documentation sync checker instead of a generic fallback flow
- added always-on `docs/**/*.md` metadata rules to the installed global `AGENTS.md`

## 0.7.0

- added a bundled `wrap` Codex skill template
- updated `setup` to install the wrap skill into `~/.agents/skills/wrap/`
- carried forward session-close behavior for plan finalization, doc sync review, and commit confirmation

## 0.6.0

- added a bundled `implement` Codex skill template
- updated `setup` to install the implement skill into `~/.agents/skills/implement/`
- aligned implement workflow wording with the Codex worker and worker_high agent pair

## 0.5.0

- added a bundled `save-para` Codex skill template with schema guidance
- updated `setup` to install the save-para skill into `~/.agents/skills/save-para/`
- restored the expected PARA README/index structure in `mynotes` for save-para compatibility

## 0.4.0

- added a bundled `planning` Codex skill template with supporting reference files
- updated `setup` to install the planning skill into `~/.agents/skills/planning/`
- documented the expanded setup surface for global guidance plus bundled skills

## 0.3.2

- moved always-relevant interaction, delegation, and commit message rules into deployed `AGENTS.md`
- removed the global default branch strategy from deployed guidance
- kept `workflow.md` as a lighter companion reference focused on commit conventions

## 0.3.1

- replaced string-based `config.toml` managed block updates with TOML-based merge updates
- changed installed agent `config_file` entries to use resolved absolute paths for better Windows compatibility
- updated setup behavior so existing Codex config is preserved while custom agent entries are refreshed

## 0.3.0

- split deployed guidance into `AGENTS.md`, `AGENTS_POLICY.md`, and `references/` documents
- updated setup to install companion reference documents into `~/.codex/references/`
- changed deployed `AGENTS.md` into a lighter routing document that indexes companion files

## 0.2.1

- strengthened the internal repository `AGENTS.md` to require version-impact review before every commit
- clarified that commits should check for a required version bump and `CHANGELOG.md` update

## 0.2.0

- added `setup` support for installing global `~/.codex/AGENTS.md`
- added backup-before-overwrite behavior for an existing global `AGENTS.md`
- added the initial global `AGENTS.md` template

## 0.1.0

- bootstrapped the `codex-automate` repository and CLI scaffold
