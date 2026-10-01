import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';

// Mock de readlineSync
const originalQuestion = readlineSync.question;

beforeEach(() => {
  readlineSync.question = vi.fn(() => 'Jugador');
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
    expect(welcomeCount).toBe(1);

    // Verificar que "¡Hola, Jugador!" aparece solo una vez
    const helloCount = logs.filter(l => l.includes('¡Hola, Jugador!')).length;
    expect(helloCount).toBe(1);
  });
});