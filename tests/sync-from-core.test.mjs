import assert from 'node:assert/strict';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, it } from 'node:test';
import { hashFolder } from '../scripts/lib/skill-hash.mjs';
import { syncFromCore } from '../scripts/sync-from-core.mjs';
import { cleanup, commitAll, head, makeCore, temp, write } from './helpers.mjs';

const made = [];
const core = (options) => made.push(makeCore(options)) && made.at(-1);
const mirror = () => made.push(temp()) && made.at(-1);
afterEach(() => cleanup(...made.splice(0)));

describe('syncFromCore', () => {
  it('copies the skill folder and writes SOURCE.json', () => {
    const c = core();
    const m = mirror();
    const source = syncFromCore(c, m, { date: '2026-01-02' });
    assert.equal(
      readFileSync(join(m, 'skills/slide-ng/references/core-cli.md'), 'utf8'),
      '# CLI\n',
    );
    const written = JSON.parse(readFileSync(join(m, 'SOURCE.json'), 'utf8'));
    assert.deepEqual(written, source);
    assert.equal(written.source.commit, head(c));
    assert.equal(written.source.version, '1.2.3');
    assert.equal(written.source.repository, 'https://github.com/slide-ng/slide.ng');
    assert.equal(written.syncedAt, '2026-01-02');
    assert.equal(written.skill.files, 3);
    assert.equal(written.skill.hash, hashFolder(join(m, 'skills/slide-ng')).hash);
  });

  it('deletes files that disappeared in the core and keeps the rest identical', () => {
    const c = core();
    const m = mirror();
    syncFromCore(c, m);
    write(m, { 'skills/slide-ng/references/stale.md': 'left over\n' });
    rmSync(join(c, 'skills/slide-ng/references/not-supported.md'));
    write(c, { 'skills/slide-ng/references/new.md': '# New\n' });
    commitAll(c);
    syncFromCore(c, m);
    assert.equal(existsSync(join(m, 'skills/slide-ng/references/stale.md')), false);
    assert.equal(existsSync(join(m, 'skills/slide-ng/references/not-supported.md')), false);
    assert.equal(existsSync(join(m, 'skills/slide-ng/references/new.md')), true);
    assert.equal(
      hashFolder(join(m, 'skills/slide-ng')).hash,
      hashFolder(join(c, 'skills/slide-ng')).hash,
    );
  });

  it('refuses, and copies nothing, when the core drift check fails', () => {
    const c = core({ drift: true });
    const m = mirror();
    assert.throws(() => syncFromCore(c, m), /drift check of the core failed[\s\S]*stale/);
    assert.equal(existsSync(join(m, 'skills')), false);
    assert.equal(existsSync(join(m, 'SOURCE.json')), false);
  });

  it('leaves an earlier mirror untouched when the drift check fails', () => {
    const good = core();
    const m = mirror();
    syncFromCore(good, m);
    const before = readFileSync(join(m, 'SOURCE.json'), 'utf8');
    assert.throws(() => syncFromCore(core({ drift: true }), m), /drift check/);
    assert.equal(readFileSync(join(m, 'SOURCE.json'), 'utf8'), before);
    assert.equal(existsSync(join(m, 'skills/slide-ng/SKILL.md')), true);
  });

  it('refuses a skill with uncommitted changes unless allowDirty is set', () => {
    const c = core();
    write(c, { 'skills/slide-ng/SKILL.md': 'edited\n' });
    const m = mirror();
    assert.throws(() => syncFromCore(c, m), /uncommitted changes/);
    assert.equal(syncFromCore(c, m, { allowDirty: true }).source.dirty, true);
  });

  it('refuses a folder that is not a core checkout', () => {
    assert.throws(() => syncFromCore(temp(), mirror()), /not a slide\.ng checkout/);
  });

  it('refuses a core that is not a git checkout', () => {
    const c = core();
    rmSync(join(c, '.git'), { recursive: true });
    assert.throws(() => syncFromCore(c, mirror()), /not a git checkout|uncommitted|not a git/);
  });
});
