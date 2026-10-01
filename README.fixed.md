# Brain Games

Colección de 6 juegos de lógica para CLI en Node.js (ESM). Proyecto educativo de Hexlet.

[![Actions Status](https://github.com/Andresfelipe-bot/fullstack-javascript-project-98/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Andresfelipe-bot/fullstack-javascript-project-98/actions)
[![Node CI](https://github.com/Andresfelipe-bot/fullstack-javascript-project-98/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Andresfelipe-bot/fullstack-javascript-project-98/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)

---

## 🎮 Juegos incluidos

| Comando | Descripción |
|---------|-------------|
| `brain-games` | Menú principal interactivo |
| `brain-even` | ¿Es par? (responder yes/no) |
| `brain-calc` | Calculadora (operaciones básicas) |
| `brain-gcd` | Máximo común divisor |
| `brain-progression` | Progresión aritmética (encontrar número faltante) |
| `brain-prime` | ¿Es número primo? |
| `brain-square` | Cuadrado de un número |

---

## 🚀 Instalación

### Requisitos previos
- **Node.js ≥ 18** (soporte ESM nativo)
- npm (incluido con Node.js)

### Pasos
```bash
# Clonar repositorio
git clone https://github.com/Andresfelipe-bot/fullstack-javascript-project-98.git
cd fullstack-javascript-project-98

# Instalar dependencias
npm ci          # o: make install

# Verificar instalación
make lint       # ESLint
node --test     # Tests unitarios
```

---

## 🎮 Uso rápido

```bash
# Menú principal (selecciona juego)
brain-games

# Juegos individuales
brain-even
brain-calc
brain-gcd
brain-progression
brain-prime
brain-square
```

> **Nota:** Los comandos `brain-*` están disponibles tras `npm link` o usando `npx brain-even`, etc.

---

## 🎥 Demos

| Juego | Demo |
|-------|------|
| brain-even | [![asciicast](https://asciinema.org/a/wOSAeBs7saAR6PCC.svg)](https://asciinema.org/a/wOSAeBs7saAR6PCC) |
| brain-calc | [![asciicast](https://asciinema.org/a/lccjFkFITfZGe3e7.svg)](https://asciinema.org/a/lccjFkFITfZGe3e7) |
| brain-gcd | [![asciicast](https://asciinema.org/a/3rtHyLJzG11Uh4sj.svg)](https://asciinema.org/a/3rtHyLJzG11Uh4sj) |
| brain-progression | [![asciicast](https://asciinema.org/a/kKMPQj9WLklr9CWt.svg)](https://asciinema.org/a/kKMPQj9WLklr9CWt) |
| brain-prime | [![asciinema](https://asciinema.org/a/VahMnnHXKcrE8GGq.svg)](https://asciinema.org/a/VahMnnHXKcrE8GGq) |

---

## 🛠 Desarrollo

```bash
# Lint (ESLint flat config)
make lint
# o: npx eslint .

# Tests unitarios (Node.js test runner)
node --test
# o: npx node --test

# Verificar sintaxis sin ejecutar
node --check bin/brain-games.js
```

### Estructura del proyecto
```
.
├── bin/                    # Puntos de entrada CLI (7 archivos)
│   ├── brain-games.js     # Menú principal
│   ├── brain-even.js      # Juego: par/impar
│   ├── brain-calc.js      # Juego: calculadora
│   ├── brain-gcd.js       # Juego: MCD
│   ├── brain-progression.js # Juego: progresión
│   ├── brain-prime.js     # Juego: números primos
│   └── brain-square.js    # Juego: cuadrado
│
├── src/
│   ├── cli.js             # Utilidad compartida: greetUser(), farewellUser()
│   └── games/             # 6 implementaciones de juegos
│       ├── even.js
│       ├── calc.js
│       ├── gcd.js
│       ├── progression.js
│       ├── prime.js
│       └── square.js
│
├── test/                   # Tests unitarios
│   ├── brain-games.test.js
│   └── farewellUser.test.js
│
├── .opencode/              # Skills de OpenCode
│   └── skill/review-readme/
│
├── eslint.config.js        # Config ESLint plana
├── Makefile                # Comandos: install, lint, publish, brain-games
├── package.json
└── package-lock.json
```

---

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commits convencionales: `feat:`, `fix:`, `chore:`, `docs:`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📄 Licencia

MIT — Ver [LICENSE](LICENSE) para detalles.

---

## 👥 Autor

**Andresfelipe-bot** — *Trabajo inicial* — [@Andresfelipe-bot](https://github.com/Andresfelipe-bot)

---

> **Generado con `review-readme` skill** — Basado en plantilla estándar