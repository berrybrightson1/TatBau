/**
 * Next.js 16 static export (especially on Windows) can emit RSC segment .txt files
 * under nested paths like __next.$d$locale/produkte/$d$slug.txt while the client
 * requests flat names like __next.$d$locale.produkte.$d$slug.txt. Duplicate each
 * nested payload next to the route as the flat filename the runtime expects.
 *
 * @see https://github.com/vercel/next.js/issues/92339
 * @see https://github.com/vercel/next.js/issues/85374
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(process.argv[2] ?? path.join(__dirname, "..", "out"));

function walkFiles(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walkFiles(full, out);
    else out.push(full);
  }
  return out;
}

let created = 0;
let skipped = 0;

for (const file of walkFiles(outDir)) {
  if (!file.endsWith(".txt")) continue;
  const rel = path.relative(outDir, file);
  const parts = rel.split(path.sep);
  const i = parts.findIndex((p) => p.startsWith("__next."));
  if (i < 0) continue;
  if (i === parts.length - 1) continue;

  const flatName = parts.slice(i).join(".");
  const dest = path.join(outDir, ...parts.slice(0, i), flatName);

  if (fs.existsSync(dest)) {
    skipped += 1;
    continue;
  }
  fs.copyFileSync(file, dest);
  created += 1;
}

console.log(
  `[fix-static-rsc-aliases] out=${outDir} created=${created} skippedExisting=${skipped}`,
);
