import { app } from 'electron';
import path from 'path';
import { pathToFileURL } from 'url';

import { isDev } from './util.js';

export const LOCAL_HOST = 'http://localhost:5123';
export const INDEX_PATH = path.join(app.getAppPath(), 'dist-react', 'index.html');

export function getPreloadPath() {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
}

export function getFilePath() {
	return pathToFileURL(INDEX_PATH).toString();
}

export function parseTokensFromUrl(raw: string) {
	try {
		const u = new URL(raw); // morib://callback?accessToken=…&…
		return {
			accessToken: u.searchParams.get('accessToken'),
			refreshToken: u.searchParams.get('refreshToken'),
			isOnboardingCompleted: u.searchParams.get('isOnboardingCompleted'),
		};
	} catch (e) {
		console.error('[parseTokensFromUrl]', e);
		return { accessToken: '', refreshToken: '', isOnboardingCompleted: '' };
	}
}

export function getTitleBarPath() {
	return path.join(isDev() ? '.' : '..', 'dist-electron/ui/titleBar.html');
}

export function getAuthenticatedWindowPath(accessToken: string, refreshToken: string, isOnboardingCompleted: string) {
	return isDev()
		? `${LOCAL_HOST}#/auth/redirect?accessToken=${encodeURIComponent(accessToken || '')}&refreshToken=${encodeURIComponent(refreshToken || '')}&isOnboardingCompleted=${encodeURIComponent(isOnboardingCompleted || '')}`
		: `${getFilePath()}#/auth/redirect?accessToken=${encodeURIComponent(accessToken || '')}&refreshToken=${encodeURIComponent(refreshToken || '')}&isOnboardingCompleted=${encodeURIComponent(isOnboardingCompleted || '')}`;
}
