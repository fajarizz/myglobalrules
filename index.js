import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const inject = ["systemPrompt"];

const SECTION_NAME = "user:global-rules";
const SECTION_ORDER = 50;

function loadRules() {
  const dir = dirname(fileURLToPath(import.meta.url));
  return readFileSync(join(dir, "AGENTS.md"), "utf8").trim();
}

export function apply(ctx) {
  const rules = loadRules();
  if (!rules) {
    throw new Error("myglobalrules: AGENTS.md is empty or unreadable");
  }
  return ctx.systemPrompt.section({
    name: SECTION_NAME,
    order: SECTION_ORDER,
    interpolate: false,
    text: rules,
  });
}
