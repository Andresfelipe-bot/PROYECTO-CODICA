import readlineSync from 'readline-sync';

export const playCalcGame = () => {
  console.log('¡Bienvenido a Brain Games!');
  const name = readlineSync.question('Cual es tu nombre?: ');
  console.log(`¡Hola, ${name}!`);
  console.log('Cual es el resultado de la expresión?');

  let correctAnswers = 0;

  while (correctAnswers < 3) {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let correctAnswer;
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
    }

    console.log(`Pregunta: ${num1} ${operator} ${num2}`);
    const answer = readlineSync.question('Tu respuesta: ');

    if (parseInt(answer, 10) === correctAnswer) {
      console.log('¡Correcto!');
      correctAnswers += 1;
    } else {
      console.log(`'${answer}' es una respuesta incorrecta ;(. La respuesta correcta era '${correctAnswer}'.`);
      console.log(`¡Intentemoslo de nuevo, ${name}!`);
      return; // termina el juego en caso de error
    }
  }

  console.log(`¡Felicidades, ${name}!`);
};
