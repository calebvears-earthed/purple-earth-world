import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "lib"];
const files = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (/\.(tsx|ts)$/.test(name)) files.push(path);
  }
}

for (const root of roots) walk(root);

function copyFrom(text) {
  const parts = [];
  const stringRe = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|[^`\\])*)`/g;
  let match;
  while ((match = stringRe.exec(text))) {
    parts.push(match[1] ?? match[2] ?? match[3] ?? "");
  }
  const jsxRe = />([^<>{}\n]+)</g;
  while ((match = jsxRe.exec(text))) {
    const bit = match[1].trim();
    if (!bit || !/[A-Za-z]/.test(bit)) continue;
    if (/[=;{}()]|=>|\b(const|return|function|if|import|export)\b/.test(bit)) continue;
    parts.push(bit);
  }
  return parts.join("\n");
}

const rules = [
  { name: "em or en dash", re: /[—–]/ },
  { name: "exclamation", re: /!/ },
  { name: "Earthed co-brand", re: /Earthed/ },
  { name: "grounding", re: /grounding/i },
  { name: "EMF", re: /\bEMF\b/ },
  { name: "inflammation", re: /inflammation/i },
  { name: "sleep", re: /\bsleep\b/i },
  { name: "stress", re: /\bstress\b/i },
  { name: "mood", re: /\bmood\b/i },
  { name: "healing", re: /healing/i },
  { name: "conductive", re: /conductive/i },
  { name: "saffron or dose", re: /saffron|\bdose\b|\bdosage\b/i },
  { name: "forbidden type", re: /Montserrat|Poppins|\bInter\b|Caveat/ },
  { name: "white page", re: /#fff\b|#ffffff/i },
];

let failed = 0;
for (const file of files) {
  const copy = copyFrom(readFileSync(file, "utf8"));
  for (const rule of rules) {
    if (rule.re.test(copy)) {
      failed += 1;
      const line = copy.split("\n").find((row) => rule.re.test(row)) ?? "";
      console.error(`${file}  ${rule.name}  ${line.slice(0, 160)}`);
    }
  }
}

if (failed) {
  console.error(`\n${failed} copy check(s) failed.`);
  process.exit(1);
}
console.log(`Copy check passed (${files.length} files).`);
