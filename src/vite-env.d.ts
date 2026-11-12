/// <reference types="vite/client" />

// Le dice a TypeScript qué variables de entorno existen y de qué tipo son.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
