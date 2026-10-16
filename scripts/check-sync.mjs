#!/usr/bin/env node
// Checks the mirror:
//   1. the hash of skills/slide-ng matches SOURCE.json (nobody edited the mirror by hand),
//   2. when the environment variable CORE_DIR names a checkout of the core repository, the folder is identical to the core's
//      skills/slide-ng (the mirror is not out of date).
// Exit code 1 when a check fails.   CORE_DIR=../slide.ng node scripts/check-sync.mjs
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SKILL_PATH, hashFile, hashFolder, listFiles, readSource } from './lib/skill-hash.mjs';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** The files that differ between two folders: `{ added, removed, changed }` as seen from `a` to `b`. */
function diffFolders(a, b) {
  const left = new Set(listFiles(a));
  const right = new Set(listFiles(b));
  const both = [...left].filter((f) => right.has(f));
  const same = (f) => hashFile(a, f) === hashFile(b, f);
  return {
    added: [...right].filter((f) => !left.has(f)),
    removed: [...left].filter((f) => !right.has(f)),
    changed: both.filter((f) => !same(f)),
  };
}

/**
 * @returns {{ ok: boolean, problems: string[], notes: string[] }}
 */
export function checkSync(root = here, coreDir = process.env.CORE_DIR) {
  const problems = [];
  const notes = [];
  const folder = join(root, SKILL_PATH);
  const recorded = readSource(root);
  const actual = hashFolder(folder);
  if (actual.hash !== recorded.skill.hash)
    problems.push(
      `${SKILL_PATH} does not match SOURCE.json (recorded ${recorded.skill.hash.slice(0, 12)}, now ${actual.hash.slice(0, 12)}). ` +
        'The mirror was edited by hand. Undo the edit and change the skill in the core repository, then run scripts/sync-from-core.mjs.',
    );
  if (recorded.skill.files !== undefined && recorded.skill.files !== actual.files.length)
    problems.push(
      `SOURCE.json lists ${recorded.skill.files} files, the folder has ${actual.files.length}.`,
    );

  if (coreDir) {
    const core = resolve(coreDir);
    const coreFolder = join(core, SKILL_PATH);
    if (!existsSync(coreFolder)) problems.push(`CORE_DIR ${core} has no ${SKILL_PATH}.`);
    else {
      const coreHash = hashFolder(coreFolder).hash;
      if (coreHash !== actual.hash) {
        const d = diffFolders(folder, coreFolder);
        const parts = [
          d.added.length && `new in the core: ${d.added.join(', ')}`,
          d.removed.length && `gone from the core: ${d.removed.join(', ')}`,
          d.changed.length && `changed in the core: ${d.changed.join(', ')}`,
        ].filter(Boolean);
        problems.push(
          `The mirror is out of date compared with ${core} (${parts.join('; ') || 'content differs'}). Run scripts/sync-from-core.mjs.`,
        );
      } else notes.push(`The mirror is identical to ${coreFolder}.`);
    }
  } else notes.push('CORE_DIR is not set: the mirror was not compared with a core checkout.');
  return { ok: problems.length === 0, problems, notes };
}

function isMain() {
  return process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isMain()) {
  try {
    const { ok, problems, notes } = checkSync();
    for (const note of notes) console.log(note);
    if (ok) console.log('The skill folder matches SOURCE.json.');
    else {
      for (const problem of problems) console.error(problem);
      process.exit(1);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
