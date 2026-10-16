// The content hash of a skill folder, and the helpers that read and write SOURCE.json.
// The hash covers every file under the folder: its path (with `/`) and its content, in sorted order.
// Line endings of text files do not count, so a checkout with CRLF gives the same hash.
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const SKILL_PATH = 'skills/slide-ng';
export const SOURCE_FILE = 'SOURCE.json';
export const ALGORITHM = 'sha256';
export const SOURCE_REPOSITORY = 'https://github.com/slide-ng/slide.ng';

/** Every file below `dir` as a sorted list of paths relative to it, with `/`. Symbolic links are an error. */
export function listFiles(dir) {
  const found = [];
  const walk = (relative) => {
    for (const name of readdirSync(join(dir, relative)).sort()) {
      const path = relative ? `${relative}/${name}` : name;
      const stat = lstatSync(join(dir, path));
      if (stat.isSymbolicLink())
        throw new Error(
          `${join(dir, path)} is a symbolic link; the skill must hold plain files only.`,
        );
      if (stat.isDirectory()) walk(path);
      else found.push(path);
    }
  };
  walk('');
  return found.sort();
}

const normalize = (buffer) =>
  buffer.includes(0) ? buffer : Buffer.from(buffer.toString('utf8').replace(/\r\n/g, '\n'), 'utf8');

/** The hash of one file of a folder. */
export function hashFile(dir, file) {
  return createHash(ALGORITHM)
    .update(normalize(readFileSync(join(dir, file))))
    .digest('hex');
}

/** `{ hash, files }`: one SHA-256 for the whole folder and the list of its files. */
export function hashFolder(dir) {
  if (!existsSync(dir)) throw new Error(`The skill folder ${dir} does not exist.`);
  const files = listFiles(dir);
  const hash = createHash(ALGORITHM);
  for (const file of files) {
    hash.update(`${file}\0${hashFile(dir, file)}\0`);
  }
  return { hash: hash.digest('hex'), files };
}

/** The parsed SOURCE.json of a mirror; throws a readable error when it is missing or malformed. */
export function readSource(root) {
  const path = join(root, SOURCE_FILE);
  if (!existsSync(path))
    throw new Error(`${path} does not exist. Run scripts/sync-from-core.mjs first.`);
  let data;
  try {
    data = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`${path} is not valid JSON: ${error.message}`);
  }
  if (!data?.skill?.hash || !data?.source?.commit)
    throw new Error(`${path} lacks skill.hash or source.commit.`);
  return data;
}
