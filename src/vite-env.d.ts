/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** JSON array of demo login accounts: { email, password, name }. */
  readonly VITE_AUTH_USERS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
