import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playCalcGame } from '../../src/games/calc.js';

describe('playCalcGame', () => {
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
      return '0';
    });
    
    Math.random.mockImplementation(() => {
      if (randomIdx < randomValues.length) return randomValues[randomIdx++];
      return 0.5;
    });
  };

  it('should show welcome message', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5]);
    playCalcGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5]);
    playCalcGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5]);
    playCalcGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5]);
    playCalcGame();
    expect(logs).toContain('¿Cuál es el resultado de la expresión?');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    // Use random values that give predictable numbers
    // Math.random() * 50 + 1 = 1-50
    // Let's use values that give num1=10, num2=5, operator=+
    // 10: random = 9/50 = 0.18
    // 5: random = 4/50 = 0.08
    // operator +: random = 0/3 = 0.0
    setupMocks(['Jugador', '15'], [0.18, 0.08, 0.0, 0.5, 0.5, 0.5]);
    playCalcGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message and exit on incorrect answer', () => {
    setupMocks(['Jugador', 'wrong'], [0.18, 0.08, 0.0]);
    playCalcGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era '15'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win', () => {
    // Three questions with known answers:
    // Q1: 10 + 5 = 15 (random: 0.18, 0.08, 0.0)
    // Q2: 20 + 3 = 23 (random: 0.38, 0.04, 0.0)
    // Q3: 7 + 8 = 15 (random: 0.12, 0.14, 0.0)
    setupMocks(['Jugador', '15', '23', '15'], [
      0.18, 0.08, 0.0,   // Q1
      0.38, 0.04, 0.0,   // Q2
      0.12, 0.14, 0.0    // Q3
    ]);
    playCalcGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});