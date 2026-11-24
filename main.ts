import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FILE_NAME = "entry.txt";
const DEFAULT_OUTPUT_DIR = "/output";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Real incident, 21 Nov 2026: our second agent reported detailed descriptions of
// four "Level 2" screenshots. All four were Level 1 — its vision tool could not
// read local files at all, so it described what it intended, not what it saw.
const ENTRY =
  "My agent described four Level 2 screenshots in detail. All four were Level 1 — it never saw a single one.";

// Throws unless text is 1-200 characters (code points), not only whitespace,
// and has no trailing newline.
function guard(text: string): string {
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

const dir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, OUTPUT_FILE_NAME), guard(ENTRY), "utf8");
