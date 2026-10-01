import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import readlineSync from 'readline-sync';
import { playProgressionGame } from '../../src/games/progression.js';

describe('playProgressionGame', () => {
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
    setupMocks(['Jugador'], [0.5, 0.5, 0.5, 0.5]);
    playProgressionGame();
    expect(logs).toContain('¡Bienvenido a Brain Games!');
  });

  it('should prompt for name with correct text', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5, 0.5]);
    playProgressionGame();
    expect(readlineSync.question).toHaveBeenCalledWith('¿Cuál es tu nombre? ');
  });

  it('should greet user after name input', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5, 0.5]);
    playProgressionGame();
    expect(logs).toContain('¡Hola, Jugador!');
  });

  it('should show game instruction', () => {
    setupMocks(['Jugador'], [0.5, 0.5, 0.5, 0.5]);
    playProgressionGame();
    expect(logs).toContain('¿Qué número falta en la progresión?');
  });

  it('should show "¡Correcto!" for correct answer', () => {
    // start=2 (0.1*10+1), step=3 (0.2*5+2), hiddenIndex=5 (0.5*10)
    // progression: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29
    // hidden index 5 -> 17
    setupMocks(['Jugador', '17'], [0.1, 0.2, 0.5, 0.5, 0.5, 0.5]);
    playProgressionGame();
    expect(logs).toContain('¡Correcto!');
  });

  it('should show error message and exit on incorrect answer', () => {
    setupMocks(['Jugador', 'wrong'], [0.1, 0.2, 0.5]);
    playProgressionGame();
    expect(logs).toContain("Respuesta incorrecta! La respuesta correcta era '17'.");
    expect(logs).toContain("¡Intentémoslo de nuevo, Jugador!");
  });

  it('should require 3 correct answers to win', () => {
    // Q1: start=2, step=3, hidden=5 -> 17
    // Q2: start=5, step=2, hidden=3 -> 11 (5,7,9,11,13,15,17,19,21,23)
    // Q3: start=3, step=4, hidden=7 -> 31 (3,7,11,15,19,23,27,31,35,39)
    setupMocks(['Jugador', '17', '11', '31'], [
      0.1, 0.2, 0.5,   // Q1
      0.4, 0.0, 0.3,   // Q2
      0.2, 0.4, 0.7    // Q3
    ]);
    playProgressionGame();
    expect(logs.filter(l => l === '¡Correcto!').length).toBe(3);
    expect(logs).toContain('¡Felicidades, Jugador!');
  });
});