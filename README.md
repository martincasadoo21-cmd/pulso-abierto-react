# Pulso Abierto

## Descripción

Pulso Abierto es una aplicación web que permite consultar los precios de Bitcoin, Ethereum y Solana en dólares mediante la API de CoinGecko.

El proyecto fue desarrollado durante las cuatro actividades prácticas de la materia Programación Web de Teclab.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- Vitest
- Testing Library
- ESLint
- Git y GitHub
- Vercel

## Funcionalidades

- Consulta de precios de criptomonedas.
- Búsqueda y filtrado por nombre.
- Formulario controlado con validación.
- Navegación entre el listado y las páginas de detalle.
- Gestión y persistencia de favoritos.
- Diseño adaptable a dispositivos móviles y de escritorio.

## Instalación

Clonar el repositorio:

    git clone https://github.com/martincasadoo21-cmd/pulso-abierto-react.git

Ingresar a la carpeta del proyecto:

    cd pulso-abierto-react

Instalar las dependencias:

    npm install

## Ejecución en desarrollo

    npm run dev

## Pruebas automatizadas

    npm run test

## Verificación del código

    npm run lint

## Build productivo

    npm run build

## Preview

    npm run preview

## Mejora de mantenibilidad

Se identificó código duplicado relacionado con el formato de precios en los archivos TarjetaCriptomoneda.tsx y DetalleCriptomoneda.tsx.

Para solucionar este problema, se creó la función reutilizable formatearPrecio dentro de src/utils/formatearPrecio.ts.

De esta manera, ambos componentes utilizan la misma función y se facilita el mantenimiento del código sin modificar el comportamiento de la aplicación.

Para comprobar que no se produjeron regresiones, se ejecutaron las pruebas automatizadas, ESLint, el build productivo y una verificación manual de los precios.

También se actualizó Vitest para resolver una incompatibilidad con la versión instalada de Vite.

## Despliegue

La aplicación se encuentra publicada en Vercel.

URL pública:
https://pulso-abierto-react-gilt.vercel.app/

Repositorio:
https://github.com/martincasadoo21-cmd/pulso-abierto-react

Se incorporó el archivo vercel.json para permitir el acceso directo y la recarga de las rutas de detalle.

## Verificación final

- Pruebas automatizadas: 7 de 7 aprobadas.
- ESLint: ejecutado sin errores.
- Build productivo: generado correctamente.
- Preview: comprobado correctamente.
- Despliegue en Vercel: realizado correctamente.
- Consulta a la API: comprobada.
- Diseño responsivo: comprobado.
- Fecha de verificación: 24/11/2026.
