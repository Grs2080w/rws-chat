/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_URL_SOCKET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
