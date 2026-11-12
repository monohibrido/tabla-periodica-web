# Tabla Periódica IUPAC (frontend)

Tabla periódica interactiva de los 118 elementos, en español. Consume la API
[`tabla-periodica-api`](https://github.com/monohibrido/tabla-periodica-api) (Express + PostgreSQL).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4

## Qué hace

- Dibuja la tabla en su posición real (18 grupos, 7 períodos, lantánidos y actínidos aparte) usando `posicion_tabla` de la API.
- Colores por categoría, que además funcionan como filtro.
- Búsqueda por nombre, símbolo o número (ignora tildes).
- Ficha de detalle con todas las propiedades y sus unidades. Se navega con ← → y se cierra con Escape.
- Botón **Bibliografía**: fuentes de los datos y glosario que explica cada propiedad de la ficha.
- Modo claro y oscuro automático, según el sistema. En pantallas pequeñas la tabla se desplaza horizontalmente.

## Estructura

```
src/
├── api/elementos.ts          ← pide los datos a la API
├── types/elemento.ts         ← tipos de TypeScript (forma de cada elemento)
├── lib/categorias.ts         ← colores por categoría
├── lib/formato.ts            ← formato de números en español y búsqueda sin tildes
├── components/
│   ├── TablaPeriodica.tsx    ← cuadrícula de 18 columnas
│   ├── CeldaElemento.tsx     ← cada casilla
│   ├── Filtros.tsx           ← buscador y categorías
│   ├── Bibliografia.tsx      ← fuentes de los datos y glosario
│   └── FichaElemento.tsx     ← ventana con el detalle
├── App.tsx                   ← estado general (carga, filtros, selección)
└── main.tsx
```

## Variables de entorno

La dirección de la API se define en archivos `.env` (no son secretos, es una dirección pública):

| Archivo | Cuándo se usa | Valor |
|---|---|---|
| `.env.development` | `npm run dev` | la API pública en línea |
| `.env.production` | `npm run build` (también en Vercel) | la API pública |

Para probar contra tu API **local** (por ejemplo, si estás cambiando la API), crea un archivo `.env.local`
(ignorado por Git, tiene prioridad sobre los demás) con:
```
VITE_API_URL=http://localhost:3000
```
y enciende la API local antes de `npm run dev`.

## Comandos

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # revisa los tipos y compila a dist/
npm run preview  # sirve la versión compilada
npm run lint     # revisa el código
```

## Despliegue

Se despliega en Vercel como un proyecto aparte de la API: se importa este repositorio y Vercel detecta Vite solo
(comando de build `npm run build`, carpeta de salida `dist`). No necesita variables de entorno en el panel,
porque la dirección de la API ya está en `.env.production`.
