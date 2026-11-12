import { useEffect, useMemo, useState } from 'react'
import { obtenerElementos } from './api/elementos'
import { Bibliografia } from './components/Bibliografia'
import { FichaElemento } from './components/FichaElemento'
import { Filtros } from './components/Filtros'
import { TablaPeriodica } from './components/TablaPeriodica'
import { normalizar } from './lib/formato'
import type { Categoria, Elemento } from './types/elemento'

type Estado = 'cargando' | 'listo' | 'error'

export default function App() {
  const [elementos, setElementos] = useState<Elemento[]>([])
  const [estado, setEstado] = useState<Estado>('cargando')
  const [mensajeError, setMensajeError] = useState('')
  const [intento, setIntento] = useState(0) // subirlo vuelve a pedir los datos

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [seleccionado, setSeleccionado] = useState<Elemento | null>(null)
  const [bibliografiaAbierta, setBibliografiaAbierta] = useState(false)

  // Pide los 118 elementos a la API (una sola vez, o al pulsar "Reintentar")
  useEffect(() => {
    const control = new AbortController()

    obtenerElementos(control.signal)
      .then((datos) => {
        setElementos(datos)
        setEstado('listo')
      })
      .catch((error: unknown) => {
        if (control.signal.aborted) return
        setMensajeError(error instanceof Error ? error.message : 'Error desconocido')
        setEstado('error')
      })

    return () => control.abort()
  }, [intento])

  // Números atómicos que cumplen el filtro (el resto se muestra apagado)
  const coincidencias = useMemo(() => {
    const q = normalizar(busqueda)
    const ok = new Set<number>()
    for (const e of elementos) {
      const cumpleCategoria = categoria === null || e.categoria === categoria
      const cumpleTexto =
        q === '' ||
        normalizar(e.nombre).includes(q) ||
        normalizar(e.nombre_ingles).includes(q) ||
        normalizar(e.simbolo) === q ||
        normalizar(e.simbolo).startsWith(q) ||
        String(e.numero_atomico) === q
      if (cumpleCategoria && cumpleTexto) ok.add(e.numero_atomico)
    }
    return ok
  }, [elementos, busqueda, categoria])

  // Navegación anterior / siguiente dentro de la ficha
  const posicion = seleccionado
    ? elementos.findIndex((e) => e.numero_atomico === seleccionado.numero_atomico)
    : -1
  const anterior = posicion > 0 ? elementos[posicion - 1] : undefined
  const siguiente = posicion >= 0 ? elementos[posicion + 1] : undefined

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tabla Periódica IUPAC</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Haz clic en un elemento para ver todas sus propiedades.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setBibliografiaAbierta(true)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-sky-500 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-sky-400"
        >
          Bibliografía
        </button>
      </header>

      {estado === 'cargando' && <Cargando />}

      {estado === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 p-5 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
        >
          <p className="font-semibold">No se pudieron cargar los elementos.</p>
          <p className="mt-1 text-sm">{mensajeError}</p>
          <button
            type="button"
            onClick={() => {
              setEstado('cargando')
              setIntento((n) => n + 1)
            }}
            className="mt-3 rounded-md bg-red-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-800"
          >
            Reintentar
          </button>
        </div>
      )}

      {estado === 'listo' && (
        <main className="space-y-6">
          <Filtros
            busqueda={busqueda}
            onBusqueda={setBusqueda}
            categoria={categoria}
            onCategoria={setCategoria}
            conteo={coincidencias.size}
          />
          <TablaPeriodica
            elementos={elementos}
            coincidencias={coincidencias}
            onSeleccionar={setSeleccionado}
          />
        </main>
      )}

      <FichaElemento
        elemento={seleccionado}
        onCerrar={() => setSeleccionado(null)}
        onAnterior={anterior ? () => setSeleccionado(anterior) : null}
        onSiguiente={siguiente ? () => setSeleccionado(siguiente) : null}
      />

      <Bibliografia abierta={bibliografiaAbierta} onCerrar={() => setBibliografiaAbierta(false)} />

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <p>
          Creado por{' '}
          <a
            href="https://github.com/monohibrido"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-700 underline underline-offset-2 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-300"
          >
            monohibrido
          </a>
        </p>
        <p>
          <a
            href="https://github.com/monohibrido/tabla-periodica-api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-sky-700 dark:hover:text-sky-400"
          >
            Código de la API en GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

function Cargando() {
  return (
    <div role="status" className="py-16 text-center text-slate-500 dark:text-slate-400">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-sky-500" />
      <p>Cargando elementos…</p>
      <p className="mt-1 text-xs">La primera carga puede tardar unos segundos si la base de datos estaba en reposo.</p>
    </div>
  )
}
