import readlineSync from 'readline-sync';
import { greetUser } from '../cli.js';

// Función para calcular el MCD usando el algoritmo de Euclides
const gcd = (a, b) => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

export const playGcdGame = () => {
  const name = greetUser();
  console.log('Encuentra el máximo común divisor de los números dados.');

  let correctAnswers = 0;

  while (correctAnswers < 3) {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 100) + 1;

    console.log(`Pregunta: ${num1} ${num2}`);
    const answer = readlineSync.question('Tu respuesta: ');

    const correctAnswer = gcd(num1, num2);

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
