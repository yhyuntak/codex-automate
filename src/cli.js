#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const [, , command = "help"] = process.argv;
const projectRoot = path.resolve(import.meta.dirname, "..");
const codexHome = path.join(os.homedir(), ".codex");
const templateAgentsPath = path.join(projectRoot, "templates", "AGENTS.md");

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function installAgentsFile() {
  const targetPath = path.join(codexHome, "AGENTS.md");
  const backupDir = path.join(codexHome, "backups", timestamp());

  fs.mkdirSync(codexHome, { recursive: true });

  let backupPath = null;
  if (fs.existsSync(targetPath)) {
    fs.mkdirSync(backupDir, { recursive: true });
    backupPath = path.join(backupDir, "AGENTS.md");
    fs.copyFileSync(targetPath, backupPath);
  }

  fs.copyFileSync(templateAgentsPath, targetPath);

  return { targetPath, backupPath };
}

function runSetup() {
  const { targetPath, backupPath } = installAgentsFile();
  const lines = [
    "Installed global Codex setup.",
    "",
    `- Installed: ${targetPath}`
  ];

  if (backupPath) {
    lines.push(`- Backup: ${backupPath}`);
    lines.push("- Existing AGENTS.md was backed up and replaced.");
  } else {
    lines.push("- No previous AGENTS.md was found.");
  }

  lines.push("");
  lines.push("config.toml is not managed yet in this version.");

  return lines.join("\n");
}

const commands = {
  help: [
    "codex-automate",
    "",
    "Available commands:",
    "  setup    Install ~/.codex/AGENTS.md and back up any existing file",
    "  doctor   Inspect global harness state and current project readiness",
    "  upgrade  Upgrade installed harness templates and defaults",
    "",
    "Model:",
    "  setup-first global harness",
    "  project state is created lazily when real work starts"
  ].join("\n"),
  setup: "",
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

if (!(command in commands)) {
  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
} else if (command === "setup") {
  console.log(runSetup());
} else {
  console.log(commands[command]);
}
