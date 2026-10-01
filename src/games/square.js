import readlineSync from 'readline-sync';

export const playSquareGame = () => {
  console.log('Responde con el cuadrado del número mostrado.');
  const name = readlineSync.question('Cual es tu nombre?: ');
  console.log(`¡Hola, ${name}!`);

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
      console.log(`'${answer}' es incorrecto ;(. La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentemoslo de nuevo, ${name}!`);
      correctAnswers = 0;
    }
  }
  console.log(`¡Felicidades, ${name}!`);
};