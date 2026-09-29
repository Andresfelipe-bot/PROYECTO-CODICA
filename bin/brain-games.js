#!/usr/bin/env node
// Fuerza salida en UTF-8
process.stdout.write('\uFEFF');
import { greetUser } from '../src/cli.js';

greetUser();

