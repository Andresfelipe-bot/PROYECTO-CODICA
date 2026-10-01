import readlineSync from 'readline-sync';
import { greetUser } from '../cli.js';

// Función para generar una progresión aritmética
const generateProgression = (start, step, length) => {
  const progression = [];
  for (let i = 0; i < length; i++) {
    progression.push(start + step * i);
  }
  return progression;
};

export const playProgressionGame = () => {
  const name = greetUser();
  console.log('¿Qué número falta en la progresión?');

  let correctAnswers = 0;

  while (correctAnswers < 3) {
    const start = Math.floor(Math.random() * 10) + 1;
    const step = Math.floor(Math.random() * 5) + 2;
    const length = 10;

    const progression = generateProgression(start, step, length);
    const hiddenIndex = Math.floor(Math.random() * length);
    const correctAnswer = progression[hiddenIndex];
    progression[hiddenIndex] = '..';

    console.log(`Pregunta: ${progression.join(' ')}`);
    const answer = readlineSync.question('Tu respuesta: ');

    if (parseInt(answer, 10) === correctAnswer) {
      console.log('¡Correcto!');
      correctAnswers += 1;
    } else {
      console.log(`Respuesta incorrecta! La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentémoslo de nuevo, ${name}!`);
      return;
    }
  }

  console.log(`¡Felicidades, ${name}!`);
};
