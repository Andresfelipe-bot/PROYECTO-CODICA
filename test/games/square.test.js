import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playSquareGame } from '../../src/games/square.js';

describe('playSquareGame', () => {
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
      // Default: for random=0.5 -> number=6 -> square=36
      return '36';
    });
    
    Math.random.mockImplementation(() => {
      if (randomIdx < randomValues.length) return randomValues[randomIdx++];
      // Default: number=6 -> square=36
      return 0.5;
    });
  };

  it('should show welcome message', () => {
    setupMocks(['Jugador'], [0.5]);
    playSquareGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5]);
    playSquareGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5]);
    playSquareGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5]);
    playSquareGame();
    expect(logs).toContain('Responde con el cuadrado del número mostrado.');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    // number=5 (0.4*10+1) -> square=25
    setupMocks(['Jugador', '25'], [0.4, 0.5, 0.5, 0.5]);
    playSquareGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message for incorrect answer', () => {
    // number=5 -> square=25
    setupMocks(['Jugador', 'wrong', '25'], [0.4, 0.5, 0.5, 0.5]);
    playSquareGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era '25'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win (resets on error)', () => {
    // Q1: 5 -> 25 (0.4)
    // Q2: 3 -> 9 (0.2)
    // Q3: 7 -> 49 (0.6)
    setupMocks(['Jugador', '25', '9', '49'], [
      0.4,  // Q1: 5
      0.2,  // Q2: 3
      0.6   // Q3: 7
    ]);
    playSquareGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});