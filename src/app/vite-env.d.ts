/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string;
	readonly VITE_GOOGLE_URL: string;
	readonly VITE_ELECTRON_URL: string;
	readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	electron?: {
		openExternal: (url: string) => void;
	};
}
