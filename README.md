# Gestor de Biblioteca — Pruebas Cypress y Pull Requests

Página web sencilla (login + CRUD de libros en `localStorage`) cubierta con 4 pruebas de Cypress que corren en GitHub Actions.

- Usuario: `admin` / Contraseña: `admin123`
- Corre en `http://localhost:3000`

## Correr en local (opcional)

```bash
npm install
npm start                 # levanta la página en el puerto 3000
npx cypress run           # en otra terminal: corre las 4 pruebas
```

## Estructura

```
public/            index.html, app.js, styles.css  (la página)
cypress/e2e/       biblioteca.cy.js                (las 4 pruebas)
cypress.config.js  baseUrl + video
.github/workflows/cypress.yml   CI en GitHub
```

## Integrante 2 — PR con falla

```bash
git clone https://github.com/USUARIO/biblioteca.git
cd biblioteca
git checkout -b falla
```

En `public/app.js`, comentar el bloque de validación de copias:

```js
// if (isNaN(copias) || copias <= 0) {
//   formMsg.textContent = "El número de copias debe ser mayor a 0.";
//   return;
// }
```

```bash
git add .
git commit -m "Introduce falla en validacion"
git push -u origin falla
```

Abrir el PR → CI en rojo → descargar evidencia (Actions > corrida en rojo > Artifacts > evidencia-cypress) → Merge pull request.

## Integrante 3 — Arreglo

```bash
git clone https://github.com/USUARIO/biblioteca.git
cd biblioteca
git checkout main
git pull
git checkout -b arreglo
```

Descomentar el bloque de validación en `public/app.js`.

```bash
git add .
git commit -m "Corrige la validacion"
git push -u origin arreglo
```

Abrir el PR → CI en verde → Merge pull request.
