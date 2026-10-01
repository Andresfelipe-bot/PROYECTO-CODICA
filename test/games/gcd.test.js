import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playGcdGame } from '../../src/games/gcd.js';

describe('playGcdGame', () => {
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
      return '1';
    });
    
    Math.random.mockImplementation(() => {
      if (randomIdx < randomValues.length) return randomValues[randomIdx++];
      return 0.5;
    });
  };

  it('should show welcome message', () => {
    setupMocks(['Jugador'], [0.5, 0.5]);
    playGcdGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5, 0.5]);
    playGcdGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5, 0.5]);
    playGcdGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5, 0.5]);
    playGcdGame();
    expect(logs).toContain('Encuentra el máximo común divisor de los números dados.');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    // num1=48 (0.47*100+1), num2=18 (0.17*100+1) -> gcd=6
    setupMocks(['Jugador', '6'], [0.47, 0.17, 0.5, 0.5]);
    playGcdGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message and exit on incorrect answer', () => {
    setupMocks(['Jugador', 'wrong'], [0.47, 0.17]);
    playGcdGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era '6'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win', () => {
    // Q1: 48, 18 -> gcd=6 (0.47, 0.17)
    // Q2: 100, 75 -> gcd=25 (0.99, 0.74)
    // Q3: 54, 24 -> gcd=6 (0.53, 0.23)
    setupMocks(['Jugador', '6', '25', '6'], [
      0.47, 0.17,   // Q1: 48, 18 -> 6
      0.99, 0.74,   // Q2: 100, 75 -> 25
      0.53, 0.23    // Q3: 54, 24 -> 6
    ]);
    playGcdGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});