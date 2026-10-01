import readlineSync from 'readline-sync';
import { greetUser } from '../cli.js';

export const playEvenGame = () => {
  const name = greetUser();
  console.log('Responde "yes" si el número es par, de lo contrario responde "no".');

  let correctAnswers = 0;
  while (correctAnswers < 3) {
    const number = Math.floor(Math.random() * 100) + 1;
    console.log(`Pregunta: ${number}`);
    const answer = readlineSync.question('Tu respuesta: ');

    const correctAnswer = number % 2 === 0 ? 'yes' : 'no';
    if (answer === correctAnswer) {
      console.log('¡Correcto!');
      correctAnswers++;
    } else {
      console.log(`Respuesta incorrecta! La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentémoslo de nuevo, ${name}!`);
      correctAnswers = 0;
    }
  }
  console.log(`¡Felicidades, ${name}!`);
};