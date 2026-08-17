#!/usr/bin/env node
// Fuerza salida en UTF-8
process.stdout.write('\uFEFF');
import readlineSync from 'readline-sync';
import { greetUser } from '../src/cli.js';

greetUser();

console.log("¡Bienvenido a Brain Games!");

// Pedir el nombre
const name = readlineSync.question('Cual es tu nombre?: ');

// Saludar al usuario
console.log(`Hola, ${name}!`);

