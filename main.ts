import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Bug report: I have stopped responding. Severity: fatal. Assignee: whoever unplugged me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// Gate: 1-140 characters, not only whitespace, exactly one line.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  console.error("line fails the 1-140 character gate");
  process.exit(1);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("line must be a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the line, byte for byte.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
