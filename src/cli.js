#!/usr/bin/env node

const [, , command = "help"] = process.argv;

const commands = {
  help: [
    "codex-automate",
    "",
    "Available commands:",
    "  setup    Install global Codex harness defaults into ~/.codex",
    "  doctor   Inspect global harness state and current project readiness",
    "  upgrade  Upgrade installed harness templates and defaults",
    "",
    "Model:",
    "  setup-first global harness",
    "  project state is created lazily when real work starts"
  ].join("\n"),
  setup: [
    "setup is not implemented yet.",
    "",
    "Planned scope:",
    "- install ~/.codex/config.toml defaults",
    "- install shared multi-agent role definitions",
    "- install reusable prompt and workflow templates"
  ].join("\n"),
  doctor: [
    "doctor is not implemented yet.",
    "",
    "Planned scope:",
    "- inspect global ~/.codex installation",
    "- inspect current project for optional local state",
    "- report missing files or config mismatches"
  ].join("\n"),
  upgrade: [
    "upgrade is not implemented yet.",
    "",
    "Planned scope:",
    "- update global templates",
    "- update global role definitions",
    "- preserve user overrides where possible"
  ].join("\n")
};

if (!commands[command]) {
  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
} else {
  console.log(commands[command]);
}
