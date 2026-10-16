#!/usr/bin/env node
// Copies the agent skill from a checkout of the core repository (slide.ng) into this repository and records where it came from.
//
//   node scripts/sync-from-core.mjs [<path of the core checkout>]     (default: ../slide.ng, next to this repository)
//
// Steps: 1. run the core's own drift check (scripts/check-skills-drift.mjs) and stop if it fails,
//        2. stop if the skill in the core has uncommitted changes (the recorded commit would not describe the copy),
//        3. replace skills/slide-ng with the core's skills/slide-ng (files that no longer exist there are deleted),
//        4. write SOURCE.json: source repository, commit, core version, content hash, date.
// The core is only read. Flags: --allow-dirty  skip step 2 (the commit is then recorded with "dirty": true).
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALGORITHM,
  SKILL_PATH,
  SOURCE_FILE,
  SOURCE_REPOSITORY,
  hashFolder,
} from './lib/skill-hash.mjs';

const here = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const git = (core, ...args) =>
  execFileSync('git', args, {
    cwd: core,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

/** Runs the core's drift check. Throws with the check's output when it fails. */
export function runCoreCheck(core) {
  const script = join(core, 'scripts/check-skills-drift.mjs');
  if (!existsSync(script))
    throw new Error(`${script} does not exist; ${core} is not a slide.ng checkout.`);
  try {
    execFileSync(process.execPath, [script, '--root', core], {
      cwd: core,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    throw new Error(
      `The skill drift check of the core failed, nothing was copied.\n${error.stdout ?? ''}${error.stderr ?? ''}`.trimEnd(),
    );
  }
}

/**
 * Syncs `target` (this repository) from `core`. Returns the SOURCE.json object that was written.
 * @param {{ allowDirty?: boolean, date?: string, check?: boolean }} options  `check: false` is for tests without a core check script.
 */
export function syncFromCore(core, target = here, { allowDirty = false, date, check = true } = {}) {
  core = resolve(core);
  const from = join(core, SKILL_PATH);
  if (!existsSync(join(from, 'SKILL.md')))
    throw new Error(`${from}/SKILL.md does not exist; ${core} is not a slide.ng checkout.`);
  if (check) runCoreCheck(core);

  let commit;
  try {
    commit = git(core, 'rev-parse', 'HEAD');
  } catch {
    throw new Error(`${core} is not a git checkout, so the source commit cannot be recorded.`);
  }
  const dirty = git(core, 'status', '--porcelain', '--', SKILL_PATH).length > 0;
  if (dirty && !allowDirty)
    throw new Error(
      `${SKILL_PATH} has uncommitted changes in ${core}. Commit them first, or pass --allow-dirty.`,
    );

  const to = join(target, SKILL_PATH);
  rmSync(to, { recursive: true, force: true });
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true, dereference: false });

  const { hash, files } = hashFolder(to);
  const coreHash = hashFolder(from).hash;
  if (hash !== coreHash) throw new Error('The copy does not match the core folder after copying.');
  let version = null;
  try {
    version = JSON.parse(readFileSync(join(core, 'package.json'), 'utf8')).version ?? null;
  } catch {
    // The version is informational.
  }
  const source = {
    source: {
      name: 'slide.ng',
      repository: SOURCE_REPOSITORY,
      path: SKILL_PATH,
      version,
      commit,
      ...(dirty ? { dirty: true } : {}),
    },
    skill: { path: SKILL_PATH, algorithm: ALGORITHM, hash, files: files.length },
    syncedAt: date ?? new Date().toISOString().slice(0, 10),
  };
  writeFileSync(join(target, SOURCE_FILE), `${JSON.stringify(source, null, 2)}\n`);
  return source;
}

function isMain() {
  return process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

if (isMain()) {
  const args = process.argv.slice(2);
  const allowDirty = args.includes('--allow-dirty');
  const core = resolve(args.find((a) => !a.startsWith('--')) ?? join(here, '../slide.ng'));
  try {
    const result = syncFromCore(core, here, { allowDirty });
    console.log(`Synced ${result.skill.files} files from ${core}`);
    console.log(
      `  commit ${result.source.commit}, version ${result.source.version}, hash ${result.skill.hash}`,
    );
    console.log(
      'Review with `git diff`, then commit as "chore(sync): ..." and tag the core version.',
    );
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
