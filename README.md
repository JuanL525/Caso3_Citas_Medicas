
### 📝 Guía Rápida para Subir a GitHub desde Cero

**1. Preparar el terreno (¡No olvides esto!)**

* Crea un archivo llamado `.gitignore` en la raíz de tu proyecto.
* Escribe adentro:
```text
node_modules/
.env

```



**2. Empaquetar tu código (En la terminal de VS Code)**

* `git init` *(Crea la caja de rastreo)*
* `git add .` *(Mete todos tus archivos permitidos a la caja)*
* `git commit -m "mi primer commit"` *(Sella la caja con un mensaje)*

**3. Conectar y Subir**

* Ve a GitHub y crea un repositorio **completamente vacío** (no marques la casilla de README ni gitignore).
* Copia las 3 líneas de código que te da GitHub al final y pégalas en tu terminal. Son estas:
* `git remote add origin https://github.com/TU_USUARIO/TU_REPO.git` *(Apunta a la nube)*
* `git branch -M main` *(Nombra la rama principal)*
* `git push -u origin main` *(Sube los archivos)*



---
