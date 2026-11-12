import type { Categoria } from '../types/elemento'

// Cada categoría tiene sus clases de Tailwind escritas COMPLETAS.
// (Tailwind solo incluye las clases que encuentra escritas tal cual en el código;
//  por eso no se construyen juntando pedazos de texto.)
export interface EstiloCategoria {
  nombre: Categoria
  celda: string // fondo, borde y texto de la casilla / ficha
  punto: string // color del cuadradito de la leyenda
}

export const CATEGORIAS: EstiloCategoria[] = [
  {
    nombre: 'Metal alcalino',
    celda: 'bg-rose-200 border-rose-400 text-rose-950 dark:bg-rose-900/70 dark:border-rose-600 dark:text-rose-50',
    punto: 'bg-rose-300 dark:bg-rose-700',
  },
  {
    nombre: 'Metal alcalinotérreo',
    celda: 'bg-orange-200 border-orange-400 text-orange-950 dark:bg-orange-900/70 dark:border-orange-600 dark:text-orange-50',
    punto: 'bg-orange-300 dark:bg-orange-700',
  },
  {
    nombre: 'Metal de transición',
    celda: 'bg-amber-200 border-amber-400 text-amber-950 dark:bg-amber-900/70 dark:border-amber-600 dark:text-amber-50',
    punto: 'bg-amber-300 dark:bg-amber-700',
  },
  {
    nombre: 'Otro metal',
    celda: 'bg-sky-200 border-sky-400 text-sky-950 dark:bg-sky-900/70 dark:border-sky-600 dark:text-sky-50',
    punto: 'bg-sky-300 dark:bg-sky-700',
  },
  {
    nombre: 'Metaloide',
    celda: 'bg-teal-200 border-teal-400 text-teal-950 dark:bg-teal-900/70 dark:border-teal-600 dark:text-teal-50',
    punto: 'bg-teal-300 dark:bg-teal-700',
  },
  {
    nombre: 'Otro no metal',
    celda: 'bg-lime-200 border-lime-400 text-lime-950 dark:bg-lime-900/70 dark:border-lime-600 dark:text-lime-50',
    punto: 'bg-lime-300 dark:bg-lime-700',
  },
  {
    nombre: 'Halógeno',
    celda: 'bg-violet-200 border-violet-400 text-violet-950 dark:bg-violet-900/70 dark:border-violet-600 dark:text-violet-50',
    punto: 'bg-violet-300 dark:bg-violet-700',
  },
  {
    nombre: 'Gas noble',
    celda: 'bg-fuchsia-200 border-fuchsia-400 text-fuchsia-950 dark:bg-fuchsia-900/70 dark:border-fuchsia-600 dark:text-fuchsia-50',
    punto: 'bg-fuchsia-300 dark:bg-fuchsia-700',
  },
  {
    nombre: 'Lantánido',
    celda: 'bg-emerald-200 border-emerald-400 text-emerald-950 dark:bg-emerald-900/70 dark:border-emerald-600 dark:text-emerald-50',
    punto: 'bg-emerald-300 dark:bg-emerald-700',
  },
  {
    nombre: 'Actínido',
    celda: 'bg-cyan-200 border-cyan-400 text-cyan-950 dark:bg-cyan-900/70 dark:border-cyan-600 dark:text-cyan-50',
    punto: 'bg-cyan-300 dark:bg-cyan-700',
  },
]

const DESCONOCIDA: EstiloCategoria = {
  nombre: 'Desconocida',
  celda: 'bg-slate-200 border-slate-400 text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-50',
  punto: 'bg-slate-300 dark:bg-slate-600',
}

export function estiloDe(categoria: Categoria): EstiloCategoria {
  return CATEGORIAS.find((c) => c.nombre === categoria) ?? DESCONOCIDA
}
