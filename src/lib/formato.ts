// Funciones para mostrar números en español de Chile (coma decimal, punto de miles).

const SIN_DATO = '—'

function conDecimales(valor: number, maximo: number): string {
  return new Intl.NumberFormat('es-CL', { maximumFractionDigits: maximo }).format(valor)
}

function conCifras(valor: number, cifras: number): string {
  return new Intl.NumberFormat('es-CL', { maximumSignificantDigits: cifras }).format(valor)
}

export function numero(valor: number | null, decimales: number, unidad = ''): string {
  if (valor === null) return SIN_DATO
  return `${conDecimales(valor, decimales)}${unidad ? ` ${unidad}` : ''}`
}

// Para valores que pueden ser muy pequeños (ej. la densidad de un gas).
export function cifras(valor: number | null, cantidad: number, unidad = ''): string {
  if (valor === null) return SIN_DATO
  return `${conCifras(valor, cantidad)}${unidad ? ` ${unidad}` : ''}`
}

export function texto(valor: string | null): string {
  return valor && valor.trim() !== '' ? valor : SIN_DATO
}

export function estadosOxidacion(valores: number[] | null): string {
  if (!valores || valores.length === 0) return SIN_DATO
  return valores.map((v) => (v > 0 ? `+${v}` : String(v))).join(', ')
}

export function descubrimiento(anio: number | null, porQuien: string | null): string {
  if (anio === null && !porQuien) return SIN_DATO
  if (anio === null) return texto(porQuien)
  return porQuien ? `${anio} · ${porQuien}` : String(anio)
}

// Quita tildes y pasa a minúsculas, para que "hidrogeno" encuentre "Hidrógeno".
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
}
