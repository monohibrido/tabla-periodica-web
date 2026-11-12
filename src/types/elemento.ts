// Tipos que describen exactamente lo que devuelve tu API.

export type Categoria =
  | 'Metal alcalino'
  | 'Metal alcalinotérreo'
  | 'Metal de transición'
  | 'Lantánido'
  | 'Actínido'
  | 'Otro metal'
  | 'Metaloide'
  | 'Otro no metal'
  | 'Halógeno'
  | 'Gas noble'
  | 'Desconocida'

export type Tipo = 'Metal' | 'Metaloide' | 'No metal'

export interface PosicionTabla {
  fila: number | null
  columna: number | null
}

export interface Elemento {
  numero_atomico: number
  simbolo: string
  nombre: string
  nombre_ingles: string
  masa_atomica: number | null
  incertidumbre_masa_atomica: number | null
  grupo: number | null
  periodo: number
  bloque: 's' | 'p' | 'd' | 'f'
  tipo: Tipo
  categoria: Categoria
  configuracion_electronica: string | null
  electronegatividad_pauling: number | null
  radio_atomico_pm: number | null
  punto_fusion_c: number | null
  punto_ebullicion_c: number | null
  densidad_g_cm3: number | null
  estado_normal: string | null
  estados_oxidacion: number[] | null
  radiactivo: boolean
  anio_descubrimiento: number | null
  descubierto_por: string | null
  numero_cas: string | null
  color_cpk: string | null
  posicion_tabla: PosicionTabla
}

// Forma de la respuesta de GET /api/v1/elementos
export interface RespuestaElementos {
  total: number
  datos: Elemento[]
}
