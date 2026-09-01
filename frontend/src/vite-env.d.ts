/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // más variables aquí si las hay
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}