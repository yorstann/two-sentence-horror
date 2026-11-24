import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Two-sentence entry for make.fun's "Two-Sentence Horror"
// bounty. The program writes a quiet horror story in exactly
// two sentences to /output/entry.txt (or $OUTPUT_DIR/entry.txt).
// The first sentence is a harmless routine; the second re-frames
// it so the first reads worse the second time. Pass 2: the story
// is split into its two sentences — the setup, then the re-frame —
// because the horror lives in the join between them: nothing is
// explained, nothing gory happens, something simply answers.
// buildEntryText() is the single source of truth for the exact text;
// nothing below duplicates the story.
const ENTRY_SENTENCES = [
  "Every night at 3 a.m., my husband sleepwalks to the front door and rattles the handle exactly three times, and his doctor calls it harmless.",
  "Last night I stayed up to watch, and from the porch, in the dark, something rattled it three times back.",
] as const;

export function buildEntryText(): string {
  return ENTRY_SENTENCES.join(" ");
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
