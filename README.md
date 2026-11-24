# Pulso Abierto — Consulta de criptomonedas

## Descripción

Pulso Abierto es una aplicación web desarrollada como parte de la Actividad Práctica Integradora 2 de la materia Programación Web de Teclab.

El proyecto continúa el desarrollo realizado en el Módulo 1, incorporando React, TypeScript, componentes reutilizables, validación de formularios y navegación entre páginas.

La aplicación permite consultar los precios de Bitcoin, Ethereum y Solana en dólares estadounidenses mediante la API pública de CoinGecko.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- HTML y CSS
- Zod
- React Router
- API CoinGecko
- ESLint
- Prettier

## Funcionalidades

- Consulta de precios de criptomonedas.
- Búsqueda por nombre.
- Selección de criptomoneda.
- Validación de formularios con Zod.
- Visualización de resultados mediante tarjetas.
- Marcado y desmarcado de favoritos.
- Navegación a páginas de detalle.
- Validación de identificadores en las rutas.
- Manejo de estados de carga, error y ausencia de resultados.
- Posibilidad de reintentar una consulta fallida.
- Diseño adaptable a dispositivos móviles.

Los favoritos se mantienen durante la sesión de la página, pero no se guardan permanentemente al recargar el navegador.

## Instalación

Requisitos:

- Node.js
- npm

Abrir una terminal en la carpeta del proyecto y ejecutar:

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm run dev
```

Abrir la dirección local indicada por Vite, normalmente:

http://localhost:5173/

## Verificaciones

Comprobar TypeScript:

```bash
npx tsc --noEmit -p tsconfig.app.json
```

Ejecutar ESLint:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

Los comandos de TypeScript, ESLint y compilación se ejecutaron correctamente durante el desarrollo.

## Estructura del proyecto

- `src/components/`: componentes reutilizables.
- `src/pages/`: páginas y navegación.
- `src/services/coingecko.ts`: consulta y procesamiento de datos externos.
- `src/schemas/consultaSchema.ts`: validación del formulario mediante Zod.
- `src/types/`: tipos de TypeScript.
- `src/App.tsx`: lógica y rutas principales.
- `src/App.css`: estilos de la aplicación.
- `capturas/`: evidencias de funcionamiento.

## Rutas

- `/`: página principal.
- `/criptomonedas/bitcoin`: detalle de Bitcoin.
- `/criptomonedas/ethereum`: detalle de Ethereum.
- `/criptomonedas/solana`: detalle de Solana.
- Otras rutas: página no encontrada.

## Pruebas realizadas

Se realizaron pruebas de consulta exitosa, validación de entradas, favoritos, navegación a páginas de detalle, identificadores incorrectos, errores de conexión, recuperación después de fallas, búsquedas sin resultados y diseño móvil.

Las evidencias están organizadas en la carpeta `capturas/`.

## Refactorización y uso de IA

La aplicación original del Módulo 1 estaba desarrollada principalmente con TypeScript y manipulación directa del DOM.

En el Módulo 2 se reorganizó utilizando componentes React, propiedades, estado, servicios y rutas.

Se utilizó ChatGPT como herramienta de asistencia para comprender los requisitos, organizar el desarrollo, implementar mejoras y orientar la resolución de errores y las pruebas. Las funcionalidades fueron comprobadas manualmente en Visual Studio Code y Chrome.

## Observaciones

Durante la revisión de dependencias, npm informó 12 vulnerabilidades moderadas relacionadas principalmente con herramientas de desarrollo y análisis estático.

Se registró esta situación para su revisión posterior. No se aplicaron actualizaciones forzadas.

La disponibilidad y actualización de los precios dependen de la API de CoinGecko y de la conexión a Internet.

## Autor

Martín Casado

Tecnicatura en Programación — Teclab

Actividad Práctica Integradora 2 — Programación Web
