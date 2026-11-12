import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  abierta: boolean
  onCerrar: () => void
}

export function Bibliografia({ abierta, onCerrar }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  // Mismo patrón que la ficha: abre o cierra el <dialog> nativo según el estado.
  useEffect(() => {
    const dialogo = ref.current
    if (!dialogo) return
    if (abierta && !dialogo.open) dialogo.showModal()
    if (!abierta && dialogo.open) dialogo.close()
  }, [abierta])

  return (
    <dialog
      ref={ref}
      onClose={onCerrar}
      onClick={(e) => {
        if (e.target === ref.current) onCerrar()
      }}
      aria-labelledby="titulo-bibliografia"
      className="m-auto max-h-[92vh] w-[min(46rem,94vw)] overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 dark:bg-slate-900 dark:text-slate-100"
    >
      <header className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 id="titulo-bibliografia" className="text-xl font-semibold tracking-tight">
          Bibliografía y glosario
        </h2>
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          ✕
        </button>
      </header>

      <div className="space-y-8 p-5 text-sm leading-relaxed">
        <Seccion titulo="De dónde salen los datos">
          <ul className="space-y-4">
            <Fuente titulo="Numeración, símbolos y estructura de la tabla">
              Los 118 elementos, sus números atómicos y símbolos, y la numeración de grupos del 1 al 18 siguen a la{' '}
              <Enlace href="https://iupac.org/what-we-do/periodic-table-of-elements/">
                IUPAC (Unión Internacional de Química Pura y Aplicada)
              </Enlace>
              . El lutecio y el lawrencio se ubican en el grupo 3 según el{' '}
              <Enlace href="https://www.degruyterbrill.com/document/doi/10.1515/ci-2021-0115/html">
                informe provisional de la IUPAC sobre el grupo 3 (2021)
              </Enlace>
              .
            </Fuente>

            <Fuente titulo="Masas atómicas">
              La referencia oficial es la{' '}
              <Enlace href="https://ciaaw.org/atomic-weights.htm">
                Comisión de Abundancias Isotópicas y Pesos Atómicos (CIAAW) de la IUPAC
              </Enlace>
              . Los valores de esta página llegan a través de la librería <em>mendeleev</em>, que cita esa comisión
              entre sus referencias.
            </Fuente>

            <Fuente titulo="Propiedades físicas y atómicas">
              Puntos de fusión y ebullición, densidad, electronegatividad, radio atómico, configuración electrónica,
              estados de oxidación, año de descubrimiento y número CAS provienen de la librería de Python{' '}
              <Enlace href="https://github.com/lmmentel/mendeleev">
                <em>mendeleev</em>
              </Enlace>{' '}
              (L. M. Mentel, licencia MIT). Su{' '}
              <Enlace href="https://mendeleev.readthedocs.io/en/stable/bibliography.html">bibliografía</Enlace> reúne
              fuentes como el <em>CRC Handbook of Chemistry and Physics</em>, el <em>NIST Chemistry WebBook</em> y a
              Pauling (1932) para la electronegatividad. La librería no indica qué fuente corresponde a cada
              propiedad, por eso aquí no se afirma una correspondencia exacta.
            </Fuente>

            <Fuente titulo="Nombres en español y categorías">
              Los nombres y las categorías (metales alcalinos, halógenos, gases nobles, etc.) siguen el dossier{' '}
              <em>«El ABC de la Tabla Periódica»</em>, del Foro Química y Sociedad (2019).
            </Fuente>
          </ul>
        </Seccion>

        <Seccion titulo="Cómo leer la ficha de cada elemento">
          <dl className="space-y-3">
            <Termino nombre="Número atómico">
              Cantidad de protones del núcleo. Identifica al elemento y ordena la tabla.
            </Termino>
            <Termino nombre="Masa atómica (u)">
              Masa promedio de los átomos del elemento, en unidades de masa atómica. En los elementos sin isótopos
              estables se usa la masa del isótopo más estable conocido.
            </Termino>
            <Termino nombre="Grupo y período">
              El grupo es la columna (1 a 18) y reúne elementos de propiedades químicas parecidas. El período es la fila
              (1 a 7) e indica cuántas capas de electrones tiene el átomo. Los lantánidos y actínidos (bloque f) no
              tienen grupo y se dibujan en filas aparte.
            </Termino>
            <Termino nombre="Bloque (s, p, d, f)">
              Tipo de subnivel donde se ubica el último electrón del átomo.
            </Termino>
            <Termino nombre="Configuración electrónica">
              Cómo se distribuyen los electrones en los orbitales. Entre corchetes va el gas noble anterior, como
              abreviatura.
            </Termino>
            <Termino nombre="Electronegatividad (Pauling)">
              Tendencia de un átomo a atraer electrones cuando forma un enlace. No tiene unidad.
            </Termino>
            <Termino nombre="Radio atómico (pm)">
              Tamaño del átomo, en picómetros (1 pm = 10⁻¹² m). Su valor depende del método con que se defina.
            </Termino>
            <Termino nombre="Estados de oxidación">
              Cargas que el elemento suele adoptar al combinarse, por ejemplo +2 o +3.
            </Termino>
            <Termino nombre="Punto de fusión y de ebullición (°C)">
              Temperaturas a las que pasa de sólido a líquido y de líquido a gas. Cuando aparece «—», el dato no existe
              o no está medido (por ejemplo, el helio no solidifica a presión atmosférica normal).
            </Termino>
            <Termino nombre="Densidad (g/cm³)">Masa por unidad de volumen.</Termino>
            <Termino nombre="Estado normal">
              Si es sólido, líquido o gas a temperatura ambiente (unos 20 °C) y presión normal.
            </Termino>
            <Termino nombre="Categoría y tipo">
              Clasificación convencional por propiedades (alcalino, halógeno, etc.) y su agrupación en metal,
              metaloide o no metal. La IUPAC no define categorías oficiales, y distintas tablas pueden clasificar
              algunos elementos de otra forma.
            </Termino>
            <Termino nombre="Radiactivo">
              Indica que la fuente de datos clasifica al elemento como radiactivo.
            </Termino>
            <Termino nombre="Descubrimiento">
              Año y persona o equipo al que se atribuye. «Conocido desde la antigüedad» se usa cuando no hay un
              descubridor registrado.
            </Termino>
            <Termino nombre="Número CAS">
              Identificador único de la sustancia en el registro del Chemical Abstracts Service.
            </Termino>
          </dl>
        </Seccion>

        <Seccion titulo="Una advertencia">
          <p>
            Este proyecto es educativo. Los valores pueden diferir levemente de otras tablas según la fuente y el
            método de medición. Para trabajos científicos, contrasta siempre con las fuentes primarias.
          </p>
        </Seccion>
      </div>
    </dialog>
  )
}

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {titulo}
      </h3>
      {children}
    </section>
  )
}

function Fuente({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <li>
      <p className="font-medium">{titulo}</p>
      <p className="text-slate-600 dark:text-slate-300">{children}</p>
    </li>
  )
}

function Termino({ nombre, children }: { nombre: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-medium">{nombre}</dt>
      <dd className="text-slate-600 dark:text-slate-300">{children}</dd>
    </div>
  )
}

// Enlace externo: se abre en otra pestaña y "noopener noreferrer" protege la página de origen.
function Enlace({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-700 underline underline-offset-2 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-300"
    >
      {children}
    </a>
  )
}
