# Changelog

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
