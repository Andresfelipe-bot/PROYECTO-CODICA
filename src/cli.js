import readlineSync from 'readline-sync';

export const greetUser = () => {
  console.log('¡Bienvenido a Brain Games!');
  const name = readlineSync.question('¿Cuál es tu nombre? ');
  console.log(`¡Hola, ${name}!`);
  return name;
};

export const farewellUser = (name) => {
  console.log(`¡Hasta luego, ${name}!`);
};