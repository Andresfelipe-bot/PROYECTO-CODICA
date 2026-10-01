import { describe, it, expect } from 'vitest';
import { farewellUser } from '../src/cli.js';

describe('farewellUser', () => {
  it('debe imprimir mensaje de despedida con el nombre', () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.join(' '));

    farewellUser('Ana');

    console.log = originalLog;

    expect(logs.length).toBe(1);
    expect(logs[0]).toBe('¡Hasta luego, Ana!');
  });
});