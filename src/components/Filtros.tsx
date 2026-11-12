import { CATEGORIAS } from '../lib/categorias'
import type { Categoria } from '../types/elemento'

interface Props {
  busqueda: string
  onBusqueda: (texto: string) => void
  categoria: Categoria | null
  onCategoria: (categoria: Categoria | null) => void
  conteo: number // cuántos elementos cumplen el filtro
}

export function Filtros({ busqueda, onBusqueda, categoria, onCategoria, conteo }: Props) {
  const hayFiltro = busqueda.trim() !== '' || categoria !== null

  return (
    <section aria-label="Filtros" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="buscador">
          Buscar elemento
        </label>
        <input
          id="buscador"
          type="search"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar por nombre, símbolo o número…"
          className="w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 dark:border-slate-700 dark:bg-slate-900"
        />
        <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
          {hayFiltro ? `${conteo} de 118 elementos` : '118 elementos'}
        </p>
        {hayFiltro && (
          <button
            type="button"
            onClick={() => {
              onBusqueda('')
              onCategoria(null)
            }}
            className="rounded-md px-2 py-1 text-sm text-sky-700 underline-offset-2 hover:underline dark:text-sky-400"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {CATEGORIAS.map((c) => {
          const activa = categoria === c.nombre
          return (
            <button
              key={c.nombre}
              type="button"
              aria-pressed={activa}
              onClick={() => onCategoria(activa ? null : c.nombre)}
              className={[
                'flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition',
                activa
                  ? 'border-sky-500 bg-sky-50 font-semibold dark:bg-sky-950'
                  : 'border-slate-300 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500',
              ].join(' ')}
            >
              <span className={`h-3 w-3 rounded-sm ${c.punto}`} aria-hidden="true" />
              {c.nombre}
            </button>
          )
        })}
      </div>
    </section>
  )
}
