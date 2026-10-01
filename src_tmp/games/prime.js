import readlineSync from 'readline-sync';

// Función para verificar si un número es primo
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

export const playPrimeGame = () => {
  console.log('¡Bienvenido a Brain Games!');
  const name = readlineSync.question('Cual es tu nombre?: ');
  console.log(`¡Hola, ${name}!`);
  console.log('Responde "yes" si el número dado es primo. De lo contrario, responde "no".');

  let correctAnswers = 0;

  while (correctAnswers < 3) {
    const number = Math.floor(Math.random() * 100) + 1;
    console.log(`Pregunta: ${number}`);
    const answer = readlineSync.question('Tu respuesta: ');

    const correctAnswer = isPrime(number) ? 'yes' : 'no';

    if (answer === correctAnswer) {
      console.log('¡Correcto!');
      correctAnswers += 1;
    } else {
      console.log(`'${answer}' es una respuesta incorrecta ;(. La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentémoslo de nuevo, ${name}!`);
      return; // termina el juego en caso de error
    }
  }

  console.log(`¡Felicidades, ${name}!`);
};
