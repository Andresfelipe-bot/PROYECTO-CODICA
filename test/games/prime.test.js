import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playPrimeGame } from '../../src/games/prime.js';

describe('playPrimeGame', () => {
  const originalQuestion = readlineSync.question;
  const originalRandom = Math.random;
  const originalLog = console.log;
  let logs = [];

  beforeEach(() => {
    logs = [];
    console.log = (...args) => logs.push(args.join(' '));
    readlineSync.question = vi.fn();
    Math.random = vi.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    readlineSync.question = originalQuestion;
    Math.random = originalRandom;
    vi.clearAllMocks();
  });

  const setupMocks = (answers, randomValues) => {
    let answerIdx = 0;
    let randomIdx = 0;
    
    readlineSync.question.mockImplementation(() => {
      if (answerIdx < answers.length) return answers[answerIdx++];
      return 'yes';
    });
    
    Math.random.mockImplementation(() => {
      if (randomIdx < randomValues.length) return randomValues[randomIdx++];
      return 0.5;
    });
  };

  it('should show welcome message', () => {
    setupMocks(['Jugador'], [0.5]);
    playPrimeGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5]);
    playPrimeGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5]);
    playPrimeGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5]);
    playPrimeGame();
    expect(logs).toContain('Responde "yes" si el número dado es primo. De lo contrario, responde "no".');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    // number=7 (prime) -> 0.06*100+1 = 7
    setupMocks(['Jugador', 'yes'], [0.06, 0.5]);
    playPrimeGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message and exit on incorrect answer', () => {
    // number=4 (not prime) -> 0.03*100+1 = 4
    setupMocks(['Jugador', 'yes'], [0.03]); // wrong answer for non-prime
    playPrimeGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era 'no'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win', () => {
    // Q1: 7 (prime) -> yes (0.06)
    // Q2: 11 (prime) -> yes (0.10)
    // Q3: 4 (not prime) -> no (0.03)
    setupMocks(['Jugador', 'yes', 'yes', 'no'], [
      0.06,  // Q1: 7
      0.10,  // Q2: 11
      0.03   // Q3: 4
    ]);
    playPrimeGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});