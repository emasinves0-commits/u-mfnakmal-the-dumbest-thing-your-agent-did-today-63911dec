import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FILE_NAME = "entry.txt";
const DEFAULT_OUTPUT_DIR = "/output";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Real incident, 25 Nov 2026: while submitting a sibling revision, our
// builder hunted the remote HEAD SHA through the GitHub API for 120 rounds
// (09:53-11:27 UTC). GitHub answered "not found" all 120 times — and the
// builder kept asking.
const ENTRY =
  "My agent knocked on GitHub's door 120 times, got 'not found' 120 times, and kept knocking.";

// Throws unless text is 1-200 characters (code points), not only whitespace,
// and has no trailing newline.
function validateEntry(text: string): string {
  const length = [...text].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.endsWith("\n")) {
    throw new Error("entry must not end with a trailing newline");
  }
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, OUTPUT_FILE_NAME), validateEntry(ENTRY), "utf8");
}

main();
