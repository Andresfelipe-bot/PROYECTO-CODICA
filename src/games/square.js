import readlineSync from 'readline-sync';
import { greetUser } from '../cli.js';

export const playSquareGame = () => {
  const name = greetUser();
  console.log('Responde con el cuadrado del número mostrado.');

  let correctAnswers = 0;
  while (correctAnswers < 3) {
    const number = Math.floor(Math.random() * 10) + 1;
    console.log(`Pregunta: ${number}`);
    const answer = readlineSync.question('Tu respuesta: ');

    const correctAnswer = String(number * number);
    if (answer === correctAnswer) {
      console.log('¡Correcto!');
      correctAnswers++;
    } else {
      console.log(`Respuesta incorrecta! La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentémoslo de nuevo, ${name}!`);
      return;
    }
  }
  console.log(`¡Felicidades, ${name}!`);
};