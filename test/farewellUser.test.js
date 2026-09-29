import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { farewellUser } from '../src/cli.js';

describe('farewellUser', () => {
  it('debe imprimir mensaje de despedida con el nombre', () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.join(' '));

    farewellUser('Ana');

    console.log = originalLog;

    assert.equal(logs.length, 1);
    assert.equal(logs[0], '¡Hasta luego, Ana!');
  });
});