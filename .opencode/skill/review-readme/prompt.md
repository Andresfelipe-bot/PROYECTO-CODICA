# Skill: review-readme

## Propósito
Revisar exhaustivamente un archivo `README.md` y reportar hallazgos estructurados con puntuación y sugerencias accionables.

---

## Instrucciones de Ejecución

Cuando se invoque este skill:

1. **Leer el README objetivo** (path proporcionado o `./README.md` por defecto)
2. **Leer la checklist** en `references/README_CHECKLIST.md`
3. **Evaluar cada criterio** y asignar puntuación
4. **Generar reporte** con formato estándar (ver abajo)

---

## Formato de Salida Obligatorio

```markdown
## 📊 Reporte de Revisión: README.md

**Puntuación: XX/100** — [Estado: Insuficiente/Parcial/Bueno/Excelente]

---

### ✅ Lo que está bien
- [Lista de fortalezas]

---

### 🔴 Críticos (bloquean release)
| # | Problema | Línea | Fix sugerido |
|---|----------|-------|--------------|
| 1 | ... | L12 | ... |

---

### 🟡 Advertencias (deberían arreglarse)
| # | Problema | Línea | Fix sugerido |
|---|----------|-------|--------------|
| 1 | ... | L45 | ... |

---

### 🟢 Info / Mejoras opcionales
| # | Sugerencia | Línea | Beneficio |
|---|------------|-------|-----------|
| 1 | ... | L78 | ... |

---

### 📝 Resumen de Acciones Prioritarias
1. **Inmediato:** [top 1-2 críticos]
2. **Esta semana:** [advertencias altas]
3. **Próximo sprint:** [info/mejoras]

---

### 🎯 Próximos Pasos Recomendados
- [ ] Acción concreta 1
- [ ] Acción concreta 2
...
```

---

## Comportamiento Especial

- **Si no existe README.md** → Reportar error y sugerir plantilla mínima
- **Si hay múltiples READMEs** → Preguntar cuál revisar
- **Si se pasa `--fix`** → Generar versión corregida en `README.fixed.md`
- **Si se pasa `--strict`** → Fallar (exit code 1) si puntuación < 60

---

## Ejemplos de Invocación

```bash
# Revisión básica
opencode skill review-readme

# Revisión de archivo específico
opencode skill review-readme --path docs/README.md

# Modo estricto (CI/CD)
opencode skill review-readme --strict

# Generar versión corregida
opencode skill review-readme --fix
```