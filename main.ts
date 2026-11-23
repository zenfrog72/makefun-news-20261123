// Entry point for the news-image-20261123 submission.
//
// The deliverable is entry.png, a 1024x1024 front page. This program
// validates that file and, only if every check passes, publishes it
// byte-identically into the output directory as entry.png.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024; // 1 MiB size gate
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;
const PNG_SIGNATURE: readonly number[] = [
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
];

// Validation collects every problem it can find instead of stopping at
// the first one, so a broken entry reports all of its faults in one run.
function collectProblems(sourcePath: string): {
  data: Buffer | null;
  problems: string[];
} {
  if (!existsSync(sourcePath)) {
    return {
      data: null,
      problems: ["entry.png is missing from the repository root"],
    };
  }
  const data = readFileSync(sourcePath);
  const problems: string[] = [];

  if (data.length === 0) {
    problems.push("entry.png is empty");
  }
  if (data.length > MAX_BYTES) {
    problems.push(`entry.png is ${data.length} bytes, over the 1 MiB limit`);
  }
  const signatureOk =
    data.length >= PNG_SIGNATURE.length &&
    PNG_SIGNATURE.every((byte, index) => data[index] === byte);
  if (!signatureOk) {
    problems.push("entry.png does not begin with the PNG signature");
  }
  // Layout after the 8-byte signature: chunk length (4 bytes), then the
  // chunk type "IHDR", then width and height as big-endian uint32.
  if (data.length < 24 || data.toString("ascii", 12, 16) !== "IHDR") {
    problems.push("entry.png has no IHDR chunk where one is required");
  } else {
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
      problems.push(
        `entry.png measures ${width}x${height}, expected ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}`,
      );
    }
  }
  return { data: problems.length === 0 ? data : null, problems };
}

function main(): void {
  // The grader may run this program from any working directory, so the
  // source file is located relative to the program itself: MAKEFUN_BOT_DIR
  // names the mounted repository when the grader sets it, and otherwise
  // the directory holding this file is the repository root.
  const sourceDir =
    process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
  const { data, problems } = collectProblems(join(sourceDir, "entry.png"));
  if (data === null) {
    for (const problem of problems) {
      console.error(`entry check failed: ${problem}`);
    }
    process.exit(1);
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.png"), data);
}

main();
