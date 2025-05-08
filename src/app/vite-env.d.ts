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
		browserMonitor?: {
			startMonitoring: (allowedServices: string[]) => void;
			stopMonitoring: () => void;
			onUnallowedUrl: (callback: (url: string, action?: string) => void) => (() => void) | undefined;
			onTimerStop: (callback: (data: { url: string; timestamp: number }) => void) => (() => void) | undefined;
			onNotificationAction: (callback: (action: 'timer' | 'register', url: string) => void) => (() => void) | undefined;
		};
		auth?: {
			relogin: () => void;
		};
	};
}
