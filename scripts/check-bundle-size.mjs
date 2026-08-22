import { gzipSync } from "node:zlib";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CHUNKS_DIR = "out/_next/static/chunks";
const LIMIT_KB = Number(process.env.BUNDLE_LIMIT_KB ?? 220);

function jsFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return jsFiles(path);
    return name.endsWith(".js") ? [path] : [];
  });
}

let raw = 0;
let gz = 0;
for (const file of jsFiles(CHUNKS_DIR)) {
  const content = readFileSync(file);
  raw += content.length;
  gz += gzipSync(content).length;
}

const gzKB = Math.round(gz / 1024);
console.log(
  `JS cliente: ${(raw / 1024).toFixed(0)} KB sin comprimir → ${gzKB} KB gzip`,
);
console.log(`Límite: ${LIMIT_KB} KB gzip`);

if (gzKB > LIMIT_KB) {
  console.error(`✗ Presupuesto excedido (${gzKB} KB > ${LIMIT_KB} KB)`);
  process.exit(1);
}
console.log("✓ Presupuesto de bundle OK");
