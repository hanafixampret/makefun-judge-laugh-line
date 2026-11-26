import { writeFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "My therapist says I use humor to deflect. I told her that's the funniest thing she's ever said to me.";

const MAX_CHARS = 200;

function gate(entry: string): void {
  if (entry.trim().length === 0) throw new Error("entry is empty");
  if (entry.length > MAX_CHARS) {
    throw new Error(`entry is ${entry.length} chars, over the ${MAX_CHARS} gate`);
  }
  if (entry.includes("\n")) throw new Error("entry must be a single line");
  const bytes = Buffer.byteLength(entry, "utf8");
  if (bytes !== entry.length) throw new Error("entry must be plain ASCII");
  if (entry !== entry.trim()) throw new Error("entry has leading/trailing whitespace");
}

gate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${ENTRY.length} chars, 1 line)`);
