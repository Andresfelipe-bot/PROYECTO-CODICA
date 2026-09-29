# AGENTS.md - Proyecto Brain Games (@hexlet/code)

## Descripción del Proyecto
Colección de 6 juegos CLI en Node.js ESM. Interfaz en español. Proyecto educativo de Hexlet.

## Comandos
| Comando | Descripción |
|---------|-------------|
| `npm ci` | Instalar dependencias (usa Makefile: `make install`) |
| `make brain-games` | Ejecuta menú principal (`node bin/brain-games.js`) |
| `brain-even` / `brain-calc` / `brain-gcd` / `brain-progression` / `brain-prime` / `brain-square` | Ejecuta juegos individuales (instalados via `npm link` o `npx`) |
| `make lint` | Ejecuta ESLint (`npx eslint .`) |
| `make publish` | Dry-run de npm publish |

## Arquitectura
- **Puntos de entrada**: `bin/brain-*.js` → importan desde `src/games/*.js`
- **Utilidad CLI compartida**: `src/cli.js` exporta `greetUser()` (no usada por algunos juegos)
- **Juegos**: cada uno exporta función `play<Nombre>Game()`
- **Dependencias**: solo `readline-sync` (sin framework de testing)

## Convenciones Clave
- **Solo ESM**: `"type": "module"` en package.json
- **Config ESLint plana**: `eslint.config.js` usa `globals.node`
- **Shebang + BOM UTF-8**: Archivos bin inician con `#!/usr/bin/env node` y `process.stdout.write('\uFEFF')`
- **Patrón de bucle de juego**: 3 respuestas correctas para ganar; respuesta incorrecta reinicia (even/square) o sale (otros)
- **Strings en español**: Todo el texto visible al usuario en español

## Problemas Conocidos
- No hay suite de tests configurada - verificar manualmente vía CLI
- `bin/brain-games.js` duplica lógica de saludo de `src/cli.js`
- Juegos inconsistentes: `even`/`square` reinician contador en error; `calc`/`gcd`/`progression`/`prime` salen inmediatamente
- No existe `index.js` a pesar de `"main": "index.js"` en package.json

## Estructura de Archivos
```
bin/           # Puntos de entrada CLI (7 archivos)
src/
  cli.js       # greetUser()
  games/       # 6 implementaciones de juegos
eslint.config.js
Makefile
package.json
```
## Comandos
- Linter: make lint
