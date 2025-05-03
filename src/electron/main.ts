import { BrowserWindow, app, dialog, ipcMain, shell } from 'electron';
import path from 'path';

import { getFilePath, getPreloadPath } from './pathResolver.js';
import { isDev } from './util.js';

let mainWindow: BrowserWindow | null = null;

if (process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient('morib', process.execPath, [path.resolve(process.argv[1])]);
	}
} else {
	app.setAsDefaultProtocolClient('morib');
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', (event: any, commandLine: string[], workingDirectory: string) => {
		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}

		// 안전하게 배열 체크 후 접근
		const lastArg = commandLine.length > 0 ? commandLine.pop()?.slice(0, -1) : '';
		dialog.showErrorBox('Welcome Back', `You arrived from: ${lastArg}`);
		createAuthenticatedWindow();
	});

	// Create mainWindow, load the rest of the app, etc...
	app.whenReady().then(() => {
		createWindow();
	});

	app.on('open-url', (event: any, url: string) => {
		dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`);
		createAuthenticatedWindow();
	});
}

function createWindow() {
	// mainWindow 할당 (변수 재선언 없이)
	mainWindow = new BrowserWindow({
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
}

function createAuthenticatedWindow() {
	const authenticatedWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		width: 1280,
		height: 920,
	});

	if (isDev()) {
		authenticatedWindow.loadURL('http://localhost:5123/#home');
	} else {
		authenticatedWindow.loadURL(`${getFilePath()}#home`);
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
	const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
	const pagePath = path.join('file://', pageDirectory, 'index.html');
	shell.openExternal(pagePath);
});
