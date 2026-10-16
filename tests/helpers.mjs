// Builds throw-away "core" and "mirror" checkouts in temp dirs for the tests.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

export const temp = () => mkdtempSync(join(tmpdir(), 'slide-ng-skills-test-'));
export const cleanup = (...dirs) =>
  dirs.forEach((d) => rmSync(d, { recursive: true, force: true }));

export function write(root, files) {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}

const git = (cwd, ...args) =>
  execFileSync('git', args, { cwd, stdio: 'pipe', encoding: 'utf8' }).trim();

/** A core checkout with a skill, a git commit, and a drift check script that exits with `drift ? 1 : 0`. */
export function makeCore({ drift = false, files } = {}) {
  const core = temp();
  write(core, {
    'package.json': '{"name":"slide-ng","version":"1.2.3"}\n',
    'scripts/check-skills-drift.mjs': drift
      ? "console.error('These skill files are stale'); process.exit(1);\n"
      : "console.log('ok');\n",
    ...(files ?? {
      'skills/slide-ng/SKILL.md': '---\nname: slide-ng\n---\n# Skill\n',
      'skills/slide-ng/references/core-cli.md': '# CLI\n',
      'skills/slide-ng/references/not-supported.md': '# No\n',
    }),
  });
  git(core, 'init', '-q', '-b', 'main');
  git(core, 'config', 'user.name', 'tester');
  git(core, 'config', 'user.email', 'tester@example.com');
  git(core, 'add', '-A');
  git(core, 'commit', '-q', '-m', 'init');
  return core;
}

export const commitAll = (core, message = 'change') => {
  git(core, 'add', '-A');
  git(core, 'commit', '-q', '-m', message);
  return git(core, 'rev-parse', 'HEAD');
};
export const head = (core) => git(core, 'rev-parse', 'HEAD');
