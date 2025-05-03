import { app } from 'electron';
import path from 'path';
import { pathToFileURL } from 'url';

import { isDev } from './util.js';

export function getPreloadPath() {
	return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist-electron/preload.cjs');
}

export function getFilePath() {
	const htmlPath = path.join(app.getAppPath(), 'dist-react', 'index.html');
	return pathToFileURL(htmlPath).toString();
}
