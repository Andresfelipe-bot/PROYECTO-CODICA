# Checklist de Revisión de README.md

## 📋 Estructura Obligatoria

| Sección | Requerida | Descripción |
|---------|-----------|-------------|
| Título del proyecto | ✅ Sí | Nombre claro y conciso |
| Descripción (1-2 párrafos) | ✅ Sí | Qué hace, para quién, problema que resuelve |
| Badges de estado | ✅ Sí | Build, tests, lint, versión, licencia |
| Instalación | ✅ Sí | Pasos claros, requisitos previos |
| Uso rápido / Quickstart | ✅ Sí | Comando mínimo para ver funcionando |
| Documentación / API | ⚠️ Opcional | Si es librería |
| Desarrollo / Contribuir | ✅ Sí | Tests, lint, scripts locales |
| Licencia | ✅ Sí | Tipo + link o archivo |
| Autor / Créditos | ⚠️ Opcional | |

---

## ✅ Criterios de Calidad

### Contenido
- [ ] **Sin placeholders** (`<TU_USUARIO>`, `TODO`, `FIXME`, `example.com`)
- [ ] **Sin duplicaciones** (secciones repetidas, badges duplicados)
- [ ] **Comandos verificables** (copiar-pegar y funcionan)
- [ ] **Versiones mínimas** (Node.js, Python, Go, etc.)
- [ ] **Enlaces válidos** (badges, demo, docs, issues)

### Formato
- [ ] **Markdown válido** (headings jerárquicos: # → ## → ###)
- [ ] **Code blocks** con language hint (`bash`, `js`, `json`)
- [ ] **Tablas** para opciones/comandos/matrices
- [ ] **Imágenes/GIFs** con alt text y ancho controlado
- [ ] **Sin HTML crudo** innecesario

### Badges (shields.io)
- [ ] Build: `github-actions`, `gitlab`, `circleci`, etc.
- [ ] Tests: `coverage`, `passing`
- [ ] Lint/Style: `eslint`, `prettier`, `ruff`, `golangci-lint`
- [ ] Version: `npm`, `pypi`, `crates.io`, `docker`
- [ ] License: `MIT`, `Apache-2.0`, `GPL-3.0`
- [ ] NO badges rotos (404) ni de servicios obsoletos

---

## 🔍 Errores Comunes a Detectar

| Error | Ejemplo | Fix |
|-------|---------|-----|
| Placeholder sin reemplazar | `<USER>/<REPO>` | Sustituir por valores reales |
| Badge 404 | ![Build](.../workflows/old.yml) | Actualizar workflow path |
| Instalación incompleta | `npm install` sin `npm run build` | Documentar todos los pasos |
| Comando inexistente | `make test` sin Makefile | Verificar scripts en package.json |
| Demo rota | asciinema/ID borrado | Regrabar o quitar |
| Licencia ausente | Sin LICENSE ni badge | Añadir `LICENSE` + badge |
| Requisitos implícitos | "Funciona en mi máquina" | Documentar versión mínima |

---

## 📊 Puntuación Sugerida

| Puntuación | Estado |
|------------|--------|
| 0-30 | ❌ Insuficiente — Falta lo básico |
| 31-60 | ⚠️ Parcial — Faltan secciones clave |
| 61-80 | ✅ Bueno — Completo, pulible |
| 81-100 | 🌟 Excelente — Listo para producción |

**Peso sugerido por sección:**
- Descripción + Instalación + Uso: 30 pts
- Badges válidos: 15 pts
- Desarrollo (tests/lint): 15 pts
- Licencia + Autor: 10 pts
- Formato/Calidad: 15 pts
- Extras (demo, FAQ, migración, changelog): 15 pts

---

## 🤖 Uso del Skill

```bash
# Invocar desde cualquier proyecto
opencode skill review-readme --path ./README.md

# O dentro de una conversación:
> Revisa el README de este proyecto con el skill review-readme
```

El skill debe:
1. Leer el README.md indicado
2. Evaluar contra el checklist
3. Reportar: **puntuación**, **lista de hallazgos** (críticos/advertencias/info), **sugerencias concretas**
4. Opcional: generar versión mejorada