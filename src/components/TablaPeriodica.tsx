import { CeldaElemento } from './CeldaElemento'
import { estiloDe } from '../lib/categorias'
import type { Elemento } from '../types/elemento'

interface Props {
  elementos: Elemento[]
  coincidencias: Set<number> // números atómicos que cumplen el filtro actual
  onSeleccionar: (elemento: Elemento) => void
}

const GRUPOS = Array.from({ length: 18 }, (_, i) => i + 1)

// Filas de la cuadrícula:
//   1        → números de grupo (1 a 18)
//   2 a 8    → períodos 1 a 7
//   9        → espacio en blanco
//   10 y 11  → lantánidos y actínidos
const FILAS = '1.25rem repeat(7, 4.25rem) 0.75rem repeat(2, 4.25rem)'

export function TablaPeriodica({ elementos, coincidencias, onSeleccionar }: Props) {
  return (
    <div className="overflow-x-auto pb-3">
      <div
        className="grid min-w-[1100px] gap-1"
        style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: FILAS }}
      >
        {/* Números de grupo */}
        {GRUPOS.map((g) => (
          <div
            key={g}
            style={{ gridRow: 1, gridColumn: g }}
            className="text-center text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            {g}
          </div>
        ))}

        {/* Hueco de la tabla: aquí va el título */}
        <div
          style={{ gridRow: '2 / 5', gridColumn: '3 / 13' }}
          className="flex flex-col items-center justify-center text-center"
        >
          <p className="text-2xl font-semibold tracking-tight">Tabla periódica de los elementos</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            118 elementos · 18 grupos · 7 períodos
          </p>
        </div>

        {/* Los 118 elementos */}
        {elementos.map((e) => (
          <CeldaElemento
            key={e.numero_atomico}
            elemento={e}
            atenuado={!coincidencias.has(e.numero_atomico)}
            onSeleccionar={onSeleccionar}
          />
        ))}

        {/* Marcadores que indican dónde van los lantánidos y actínidos */}
        <Marcador fila={7} texto="57–71" clases={estiloDe('Lantánido').celda} />
        <Marcador fila={8} texto="89–103" clases={estiloDe('Actínido').celda} />

        {/* Nombres de las dos filas de abajo */}
        <Etiqueta fila={10} texto="Lantánidos" />
        <Etiqueta fila={11} texto="Actínidos" />
      </div>
    </div>
  )
}

function Marcador({ fila, texto, clases }: { fila: number; texto: string; clases: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ gridRow: fila, gridColumn: 3 }}
      className={`flex items-center justify-center rounded-md border border-dashed text-[10px] opacity-60 ${clases}`}
    >
      {texto}
    </div>
  )
}

function Etiqueta({ fila, texto }: { fila: number; texto: string }) {
  return (
    <div
      style={{ gridRow: fila, gridColumn: '1 / 3' }}
      className="flex items-center justify-end pr-2 text-xs font-medium text-slate-500 dark:text-slate-400"
    >
      {texto}
    </div>
  )
}
