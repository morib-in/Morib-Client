import { BrowserWindow, app } from 'electron';
import path from 'path';

import { getPreloadPath } from './pathResolver.js';
import { isDev } from './util.js';

app.whenReady().then(() => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		width: 1280,
		height: 920,
	});
	if (isDev()) {
		mainWindow.loadURL('http://localhost:5123');
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
	}
});
