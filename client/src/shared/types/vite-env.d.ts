/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly _API_URL_: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}