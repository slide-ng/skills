import assert from 'node:assert/strict';
import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, it } from 'node:test';
import { checkSync } from '../scripts/check-sync.mjs';
import { syncFromCore } from '../scripts/sync-from-core.mjs';
import { cleanup, commitAll, makeCore, temp, write } from './helpers.mjs';

const made = [];
const setup = () => {
  const c = makeCore();
  const m = temp();
  made.push(c, m);
  syncFromCore(c, m);
  return { c, m };
};
afterEach(() => cleanup(...made.splice(0)));

describe('checkSync', () => {
  it('passes for an untouched mirror, with and without a core checkout', () => {
    const { c, m } = setup();
    assert.equal(checkSync(m, undefined).ok, true);
    const result = checkSync(m, c);
    assert.equal(result.ok, true);
    assert.match(result.notes.join('\n'), /identical/);
  });

  it('notes that no core was compared when CORE_DIR is not given', () => {
    const { m } = setup();
    assert.match(checkSync(m, undefined).notes.join('\n'), /CORE_DIR is not set/);
  });

  it('detects an edited file in the mirror', () => {
    const { m } = setup();
    writeFileSync(join(m, 'skills/slide-ng/SKILL.md'), 'edited by hand\n');
    const result = checkSync(m, undefined);
    assert.equal(result.ok, false);
    assert.match(result.problems[0], /edited by hand/);
  });

  it('detects an added and a removed file in the mirror', () => {
    const { m } = setup();
    write(m, { 'skills/slide-ng/references/extra.md': 'x\n' });
    assert.equal(checkSync(m, undefined).ok, false);
    const other = setup();
    rmSync(join(other.m, 'skills/slide-ng/references/core-cli.md'));
    assert.equal(checkSync(other.m, undefined).ok, false);
  });

  it('is not fooled by CRLF line endings', () => {
    const { m } = setup();
    writeFileSync(join(m, 'skills/slide-ng/references/core-cli.md'), '# CLI\r\n');
    assert.equal(checkSync(m, undefined).ok, true);
  });

  it('detects a mirror that is behind the core, and names the files', () => {
    const { c, m } = setup();
    write(c, {
      'skills/slide-ng/references/core-cli.md': '# CLI v2\n',
      'skills/slide-ng/references/new.md': 'n\n',
    });
    rmSync(join(c, 'skills/slide-ng/references/not-supported.md'));
    commitAll(c);
    const result = checkSync(m, c);
    assert.equal(result.ok, false);
    const text = result.problems.join('\n');
    assert.match(text, /out of date/);
    assert.match(text, /new in the core: references\/new\.md/);
    assert.match(text, /gone from the core: references\/not-supported\.md/);
    assert.match(text, /changed in the core: references\/core-cli\.md/);
  });

  it('passes again after a new sync', () => {
    const { c, m } = setup();
    write(c, { 'skills/slide-ng/SKILL.md': 'v2\n' });
    commitAll(c);
    assert.equal(checkSync(m, c).ok, false);
    syncFromCore(c, m);
    assert.equal(checkSync(m, c).ok, true);
  });

  it('fails when SOURCE.json is missing or malformed, and when CORE_DIR has no skill', () => {
    const { c, m } = setup();
    assert.equal(checkSync(m, temp()).ok, false);
    writeFileSync(join(m, 'SOURCE.json'), '{nope');
    assert.throws(() => checkSync(m, c), /not valid JSON/);
    rmSync(join(m, 'SOURCE.json'));
    assert.throws(() => checkSync(m, c), /does not exist/);
  });
});
