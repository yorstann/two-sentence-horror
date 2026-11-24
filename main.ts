import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// two-sentence entry for make.fun's "Two-Sentence Horror" bounty: a quiet horror story in exactly two sentences, where the second re-frames the first.
// Pass 2: split into the two sentences — the setup, then the re-frame that makes the first sentence read worse.
const ENTRY_BEATS = [
  "Every night at 3 a.m., my husband sleepwalks to the front door and rattles the handle exactly three times, and his doctor calls it harmless.",
  "Last night I stayed up to watch, and from the porch, in the dark, something rattled it three times back.",
] as const;


export function buildEntryText(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_TEXT = buildEntryText();

const MAX_CHARS = 400;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_TEXT)) {
  throw new Error(
    `entry must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_TEXT)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
