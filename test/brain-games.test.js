import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import readlineSync from 'readline-sync';

// Mock de readlineSync
const originalQuestion = readlineSync.question;

beforeEach(() => {
  readlineSync.question = () => 'Jugador';
});

afterEach(() => {
  readlineSync.question = originalQuestion;
});

// Captura de console.log
const originalLog = console.log;
let logs = [];

beforeEach(() => {
  logs = [];
  console.log = (...args) => logs.push(args.join(' '));
});

afterEach(() => {
  console.log = originalLog;
});

describe('brain-games.js - saludo sin duplicados', () => {
  it('debe mostrar el saludo solo una vez (no duplicado)', async () => {
    // Import dentro del test para que los mocks estén activos
    await import('../bin/brain-games.js');

    // Verificar que "¡Bienvenido a Brain Games!" aparece solo una vez
    const welcomeCount = logs.filter(l => l.includes('¡Bienvenido a Brain Games!')).length;
    assert.equal(welcomeCount, 1, `Saludo de bienvenida duplicado: aparece ${welcomeCount} veces`);

    // Verificar que "¡Hola, Jugador!" aparece solo una vez
    const helloCount = logs.filter(l => l.includes('¡Hola, Jugador!')).length;
    assert.equal(helloCount, 1, `Saludo personalizado duplicado: aparece ${helloCount} veces`);
  });
});