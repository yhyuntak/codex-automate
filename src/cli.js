#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import TOML from "@iarna/toml";

const [, , command = "help"] = process.argv;
const projectRoot = path.resolve(import.meta.dirname, "..");
const codexHome = path.join(os.homedir(), ".codex");
const templateAgentsPath = path.join(projectRoot, "templates", "AGENTS.md");
const templateAgentsPolicyPath = path.join(projectRoot, "templates", "AGENTS_POLICY.md");
const templateAgentConfigsDir = path.join(projectRoot, "templates", "agents");
const templateReferencesDir = path.join(projectRoot, "templates", "references");

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function normalizeConfigPath(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

function backupFile(targetPath) {
  const backupDir = path.join(codexHome, "backups", timestamp());
  const backupPath = path.join(backupDir, path.basename(targetPath));
  ensureDir(backupDir);
  fs.copyFileSync(targetPath, backupPath);
  return backupPath;
}

function installAgentsFile() {
  const targetPath = path.join(codexHome, "AGENTS.md");

  ensureDir(codexHome);

  let backupPath = null;
  if (fs.existsSync(targetPath)) {
    backupPath = backupFile(targetPath);
  }

  fs.copyFileSync(templateAgentsPath, targetPath);

  return { targetPath, backupPath };
}

function installAgentsPolicyFile() {
  const targetPath = path.join(codexHome, "AGENTS_POLICY.md");

  ensureDir(codexHome);

  let backupPath = null;
  if (fs.existsSync(targetPath)) {
    backupPath = backupFile(targetPath);
  }

  fs.copyFileSync(templateAgentsPolicyPath, targetPath);

  return { targetPath, backupPath };
}

function installAgentConfig(name) {
  const sourcePath = path.join(templateAgentConfigsDir, `${name}.toml`);
  const targetDir = path.join(codexHome, "agents");
  const targetPath = path.join(targetDir, `${name}.toml`);

  ensureDir(targetDir);

  let backupPath = null;
  if (fs.existsSync(targetPath)) {
    backupPath = backupFile(targetPath);
  }

  fs.copyFileSync(sourcePath, targetPath);

  return { targetPath, backupPath };
}

function installReferenceFile(name) {
  const sourcePath = path.join(templateReferencesDir, name);
  const targetDir = path.join(codexHome, "references");
  const targetPath = path.join(targetDir, name);

  ensureDir(targetDir);

  let backupPath = null;
  if (fs.existsSync(targetPath)) {
    backupPath = backupFile(targetPath);
  }

  fs.copyFileSync(sourcePath, targetPath);

  return { targetPath, backupPath };
}

function updateConfigFile(agentConfigs) {
  const targetPath = path.join(codexHome, "config.toml");
  let backupPath = null;
  let current = {};

  ensureDir(codexHome);

  if (fs.existsSync(targetPath)) {
    const currentRaw = fs.readFileSync(targetPath, "utf8");
    backupPath = backupFile(targetPath);
    current = currentRaw.trim() ? TOML.parse(currentRaw) : {};
  }

  current.model_reasoning_effort = "high";
  current.features ??= {};
  current.features.multi_agent = true;

  current.agents ??= {};
  current.agents.max_threads ??= 6;
  current.agents.max_depth ??= 1;

  for (const [name, config] of Object.entries(agentConfigs)) {
    current.agents[name] = {
      ...(current.agents[name] ?? {}),
      description: config.description,
      config_file: normalizeConfigPath(config.targetPath)
    };
  }

  fs.writeFileSync(targetPath, `${TOML.stringify(current)}`);

  return { targetPath, backupPath };
}

function runSetup() {
  const { targetPath, backupPath } = installAgentsFile();
  const agentsPolicy = installAgentsPolicyFile();
  const interactionRef = installReferenceFile("interaction.md");
  const delegationRef = installReferenceFile("delegation.md");
  const workflowRef = installReferenceFile("workflow.md");
  const explorerConfig = installAgentConfig("explorer");
  const explorerDeepConfig = installAgentConfig("explorer_deep");
  const workerConfig = installAgentConfig("worker");
  const workerHighConfig = installAgentConfig("worker_high");
  const angelConfig = installAgentConfig("angel");
  const devilConfig = installAgentConfig("devil");
  const configFile = updateConfigFile({
    explorer: {
      targetPath: explorerConfig.targetPath,
      description: "Codebase exploration and structure understanding for planning."
    },
    explorer_deep: {
      targetPath: explorerDeepConfig.targetPath,
      description: "Deep architectural exploration and system-level structure analysis."
    },
    worker: {
      targetPath: workerConfig.targetPath,
      description: "Focused code writing and modification agent for direct implementation work."
    },
    worker_high: {
      targetPath: workerHighConfig.targetPath,
      description: "Complex implementation agent for architecture-sensitive or high-risk changes."
    },
    angel: {
      targetPath: angelConfig.targetPath,
      description: "Idea expansion agent for reframing assumptions and exploring new possibilities. Aliases: angel, 엔젤, 천사."
    },
    devil: {
      targetPath: devilConfig.targetPath,
      description: "Critical validation agent for pressure-testing plans, decisions, and hidden risks. Aliases: devil, 데빌, 악마."
    }
  });
  const lines = [
    "Installed global Codex setup.",
    "",
    `- Installed: ${targetPath}`,
    `- Installed: ${agentsPolicy.targetPath}`,
    `- Installed: ${interactionRef.targetPath}`,
    `- Installed: ${delegationRef.targetPath}`,
    `- Installed: ${workflowRef.targetPath}`,
    `- Installed: ${explorerConfig.targetPath}`,
    `- Installed: ${explorerDeepConfig.targetPath}`,
    `- Installed: ${workerConfig.targetPath}`,
    `- Installed: ${workerHighConfig.targetPath}`,
    `- Installed: ${angelConfig.targetPath}`,
    `- Installed: ${devilConfig.targetPath}`,
    `- Updated: ${configFile.targetPath}`
  ];

  if (backupPath) {
    lines.push(`- Backup: ${backupPath}`);
    lines.push("- Existing AGENTS.md was backed up and replaced.");
  } else {
    lines.push("- No previous AGENTS.md was found.");
  }

  if (agentsPolicy.backupPath) {
    lines.push(`- Backup: ${agentsPolicy.backupPath}`);
    lines.push("- Existing AGENTS_POLICY.md was backed up and replaced.");
  }

  for (const [label, result] of [
    ["interaction reference", interactionRef],
    ["delegation reference", delegationRef],
    ["workflow reference", workflowRef]
  ]) {
    if (result.backupPath) {
      lines.push(`- Backup: ${result.backupPath}`);
      lines.push(`- Existing ${label} was backed up and replaced.`);
    }
  }

  if (explorerConfig.backupPath) {
    lines.push(`- Backup: ${explorerConfig.backupPath}`);
    lines.push("- Existing explorer agent config was backed up and replaced.");
  }

  if (explorerDeepConfig.backupPath) {
    lines.push(`- Backup: ${explorerDeepConfig.backupPath}`);
    lines.push("- Existing explorer_deep agent config was backed up and replaced.");
  }

  if (workerConfig.backupPath) {
    lines.push(`- Backup: ${workerConfig.backupPath}`);
    lines.push("- Existing worker agent config was backed up and replaced.");
  }

  if (workerHighConfig.backupPath) {
    lines.push(`- Backup: ${workerHighConfig.backupPath}`);
    lines.push("- Existing worker_high agent config was backed up and replaced.");
  }

  if (angelConfig.backupPath) {
    lines.push(`- Backup: ${angelConfig.backupPath}`);
    lines.push("- Existing angel agent config was backed up and replaced.");
  }

  if (devilConfig.backupPath) {
    lines.push(`- Backup: ${devilConfig.backupPath}`);
    lines.push("- Existing devil agent config was backed up and replaced.");
  }

  if (configFile.backupPath) {
    lines.push(`- Backup: ${configFile.backupPath}`);
    lines.push("- Existing config.toml was backed up before TOML merge updates.");
  }

  return lines.join("\n");
}

const commands = {
  help: [
    "codex-automate",
    "",
    "Available commands:",
    "  setup    Install ~/.codex/AGENTS.md, custom agents, and config wiring",
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
