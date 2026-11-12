import { estiloDe } from '../lib/categorias'
import type { Elemento } from '../types/elemento'

interface Props {
  elemento: Elemento
  atenuado: boolean // true = no coincide con el filtro, se muestra apagado
  onSeleccionar: (elemento: Elemento) => void
}

export function CeldaElemento({ elemento, atenuado, onSeleccionar }: Props) {
  const { fila, columna } = elemento.posicion_tabla
  if (fila === null || columna === null) return null

  const estilo = estiloDe(elemento.categoria)

  return (
    <button
      type="button"
      onClick={() => onSeleccionar(elemento)}
      aria-label={`${elemento.nombre}, número atómico ${elemento.numero_atomico}`}
      title={elemento.nombre}
      // +1 porque la fila 1 de la cuadrícula es la fila con los números de grupo
      style={{ gridRow: fila + 1, gridColumn: columna }}
      className={[
        'relative flex flex-col items-center justify-center rounded-md border px-0.5',
        'transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500',
        estilo.celda,
        atenuado ? 'opacity-20' : 'hover:z-10 hover:scale-110 hover:shadow-lg',
      ].join(' ')}
    >
      <span className="absolute left-1 top-0.5 text-[10px] leading-none opacity-70">
        {elemento.numero_atomico}
      </span>
      <span className="text-lg font-bold leading-none">{elemento.simbolo}</span>
      <span className="mt-1 max-w-full truncate text-[9px] leading-none">{elemento.nombre}</span>
    </button>
  )
}
