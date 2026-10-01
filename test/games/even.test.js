import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playEvenGame } from '../../src/games/even.js';

describe('playEvenGame', () => {
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
      // Return the answer if available, otherwise return 'yes' to avoid infinite loop
      if (answerIdx < answers.length) {
        return answers[answerIdx++];
      }
      return 'yes'; // Default to correct answer to let game finish
    });
    
    Math.random.mockImplementation(() => {
      if (randomIdx < randomValues.length) {
        return randomValues[randomIdx++];
      }
      return 0.01; // Default to even number
    });
  };

  it('should show welcome message', () => {
    setupMocks(['Jugador'], [0.5]);
    playEvenGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5]);
    playEvenGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5]);
    playEvenGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5]);
    playEvenGame();
    expect(logs).toContain('Responde "yes" si el número es par, de lo contrario responde "no".');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    setupMocks(['Jugador', 'yes'], [0.01, 0.5]);
    playEvenGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message for incorrect answer', () => {
    setupMocks(['Jugador', 'wrong'], [0.02, 0.5]);
    playEvenGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era 'no'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win', () => {
    setupMocks(['Jugador', 'yes', 'yes', 'yes'], [0.01, 0.01, 0.01]);
    playEvenGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});