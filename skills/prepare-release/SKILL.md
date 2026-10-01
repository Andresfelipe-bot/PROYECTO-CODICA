---
name: prepare-release
description: Pasos para preparar un release estable del proyecto
---

## Pasos

1. **Actualizar versión**
   - Edita `package.json` y sube el número de versión (ej. de 1.0.0 a 1.1.0).
   - Usa semántica clara: MAJOR.MINOR.PATCH.

2. **Generar changelog**
   - Revisa los commits recientes.
   - Resume cambios importantes en un archivo `CHANGELOG.md`.

3. **Crear tag en Git**
   - Ejecuta:
     ```bash
     git tag v1.1.0
     git push origin v1.1.0
     ```

4. **Publicar en GitHub**
   - Abre la sección de Releases.
   - Crea un nuevo release con el tag y el changelog.

5. **Publicar en npm (si aplica)**
   - Asegúrate de estar logueado:
     ```bash
     npm login
     ```
   - Publica:
     ```bash
     npm publish
     ```

6. **Verificación final**
   - Instala el paquete desde npm o clona el release desde GitHub.
   - Comprueba que funciona correctamente.
