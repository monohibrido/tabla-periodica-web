import type { Elemento, RespuestaElementos } from '../types/elemento'

// La dirección viene de las variables de entorno (.env.development / .env.production).
// replace(...) quita una "/" final por si la escribes así.
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export async function obtenerElementos(signal?: AbortSignal): Promise<Elemento[]> {
  const respuesta = await fetch(`${API_URL}/api/v1/elementos`, { signal })

  if (!respuesta.ok) {
    throw new Error(`La API respondió con el código ${respuesta.status}`)
  }

  const json = (await respuesta.json()) as RespuestaElementos
  return json.datos
}
