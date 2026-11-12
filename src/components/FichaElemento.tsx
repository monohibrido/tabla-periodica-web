import { useEffect, useRef, type ReactNode } from 'react'
import { estiloDe } from '../lib/categorias'
import {
  cifras,
  descubrimiento,
  estadosOxidacion,
  numero,
  texto,
} from '../lib/formato'
import type { Elemento } from '../types/elemento'

interface Props {
  elemento: Elemento | null
  onCerrar: () => void
  onAnterior: (() => void) | null
  onSiguiente: (() => void) | null
}

export function FichaElemento({ elemento, onCerrar, onAnterior, onSiguiente }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  // Abre o cierra el <dialog> nativo según haya un elemento seleccionado.
  // El <dialog> ya trae: cierre con Escape, fondo oscuro y foco atrapado dentro.
  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (elemento && !dialogo.open) dialogo.showModal()
    if (!elemento && dialogo.open) dialogo.close()
  }, [elemento])

  return (
    <dialog
      ref={ref}
      onClose={onCerrar}
      onClick={(e) => {
        // Clic en el fondo oscuro (fuera de la ficha) = cerrar
        if (e.target === ref.current) onCerrar()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft' && onAnterior) onAnterior()
        if (e.key === 'ArrowRight' && onSiguiente) onSiguiente()
      }}
      className="m-auto max-h-[92vh] w-[min(42rem,94vw)] overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:bg-slate-900 dark:text-slate-100"
    >
      {elemento && (
        <Contenido
          elemento={elemento}
          onCerrar={onCerrar}
          onAnterior={onAnterior}
          onSiguiente={onSiguiente}
        />
      )}
    </dialog>
  )
}

function Contenido({
  elemento: e,
  onCerrar,
  onAnterior,
  onSiguiente,
}: {
  elemento: Elemento
  onCerrar: () => void
  onAnterior: (() => void) | null
  onSiguiente: (() => void) | null
}) {
  const estilo = estiloDe(e.categoria)

  return (
    <div>
      <header className="flex items-center gap-4 border-b border-slate-200 p-5 dark:border-slate-800">
        <div
          className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-xl border-2 ${estilo.celda}`}
        >
          <span className="self-start pl-2 text-xs opacity-70">{e.numero_atomico}</span>
          <span className="text-4xl font-bold leading-none">{e.simbolo}</span>
          <span className="mt-1 text-[11px]">{numero(e.masa_atomica, 3)}</span>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">{e.nombre}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{e.nombre_ingles}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <Etiqueta>{e.categoria}</Etiqueta>
            <Etiqueta>{e.tipo}</Etiqueta>
            {e.radiactivo && <Etiqueta>Radiactivo</Etiqueta>}
          </div>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="self-start rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          ✕
        </button>
      </header>

      <div className="space-y-5 p-5">
        <Seccion titulo="Posición en la tabla">
          <Dato etiqueta="Grupo" valor={e.grupo === null ? 'Bloque f (sin grupo)' : String(e.grupo)} />
          <Dato etiqueta="Período" valor={String(e.periodo)} />
          <Dato etiqueta="Bloque" valor={e.bloque} />
        </Seccion>

        <Seccion titulo="Propiedades">
          <Dato etiqueta="Masa atómica" valor={numero(e.masa_atomica, 4, 'u')} />
          <Dato etiqueta="Configuración electrónica" valor={texto(e.configuracion_electronica)} />
          <Dato etiqueta="Electronegatividad (Pauling)" valor={numero(e.electronegatividad_pauling, 2)} />
          <Dato etiqueta="Radio atómico" valor={numero(e.radio_atomico_pm, 0, 'pm')} />
          <Dato etiqueta="Estados de oxidación" valor={estadosOxidacion(e.estados_oxidacion)} />
        </Seccion>

        <Seccion titulo="Estado y temperaturas">
          <Dato etiqueta="Estado normal" valor={texto(e.estado_normal)} />
          <Dato etiqueta="Punto de fusión" valor={numero(e.punto_fusion_c, 2, '°C')} />
          <Dato etiqueta="Punto de ebullición" valor={numero(e.punto_ebullicion_c, 2, '°C')} />
          <Dato etiqueta="Densidad" valor={cifras(e.densidad_g_cm3, 4, 'g/cm³')} />
        </Seccion>

        <Seccion titulo="Otros datos">
          <Dato etiqueta="Descubrimiento" valor={descubrimiento(e.anio_descubrimiento, e.descubierto_por)} />
          <Dato etiqueta="Número CAS" valor={texto(e.numero_cas)} />
        </Seccion>
      </div>

      <footer className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800">
        <BotonNavegar onClick={onAnterior}>← Anterior</BotonNavegar>
        <span className="text-xs text-slate-400">Usa ← → del teclado</span>
        <BotonNavegar onClick={onSiguiente}>Siguiente →</BotonNavegar>
      </footer>
    </div>
  )
}

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {titulo}
      </h3>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">{children}</dl>
    </section>
  )
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-1 text-sm dark:border-slate-800">
      <dt className="text-slate-500 dark:text-slate-400">{etiqueta}</dt>
      <dd className="text-right font-medium">{valor}</dd>
    </div>
  )
}

function Etiqueta({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800">{children}</span>
  )
}

function BotonNavegar({ onClick, children }: { onClick: (() => void) | null; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick ?? undefined}
      disabled={onClick === null}
      className="rounded-md px-3 py-1.5 text-sm text-sky-700 hover:bg-sky-50 disabled:opacity-30 disabled:hover:bg-transparent dark:text-sky-400 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  )
}
