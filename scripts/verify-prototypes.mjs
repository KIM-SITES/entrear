import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseline = JSON.parse(await readFile(resolve(root, 'docs/referencias/prototipos.sha256.json'), 'utf8'));

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : entry.isFile() ? [path] : [];
  }));
  return nested.flat();
}

const paths = await filesIn(resolve(root, 'prototipos'));
const current = Object.fromEntries(await Promise.all(paths.map(async path => [
  relative(root, path).split(sep).join('/'),
  createHash('sha256').update(await readFile(path)).digest('hex'),
])));
const differences = [...new Set([...Object.keys(baseline), ...Object.keys(current)])]
  .filter(path => baseline[path] !== current[path]);

if (differences.length) {
  console.error('A pasta prototipos/ difere da referência anterior à Etapa 1:', differences);
  process.exitCode = 1;
} else {
  console.log(`prototipos/: ${paths.length} arquivos preservados integralmente (SHA-256 e inventário).`);
}
