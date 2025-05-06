import { BrowserWindow, app, dialog, globalShortcut, ipcMain, shell } from 'electron';
import path from 'path';

import { getAuthenticatedWindowPath, getPreloadPath, parseTokensFromUrl } from './pathResolver.js';
import { isDev } from './util.js';

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;

// NOTE: 기본 프로토콜 설정 (morib://)
if (process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient('morib', process.execPath, [path.resolve(process.argv[1])]);
	}
} else {
	app.setAsDefaultProtocolClient('morib');
}

// NOTE: 싱글 인스턴스 Local Lock 설정
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

		// NOTE: 디버깅용 Dialog 주석 처리
		// const lastArg = commandLine.length > 0 ? commandLine.pop()?.slice(0, -1) : '';
		// dialog.showErrorBox('Welcome Back', `You arrived from: ${lastArg}`);
	});

	// Create mainWindow, load the rest of the app, etc...
	app.whenReady().then(() => {
		createWindow();
	});

	app.on('open-url', (event: any, url: string) => {
		if (authWindow) {
			if (authWindow.isMinimized()) authWindow.restore();
			authWindow.focus();
		} else {
			mainWindow?.close();

			event.preventDefault();
			const { accessToken, refreshToken, isOnboardingCompleted } = parseTokensFromUrl(url);

			// dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`); // NOTE: 디버깅용 Dialog 주석 처리
			createAuthenticatedWindow(accessToken, refreshToken, isOnboardingCompleted);
		}
	});
}

function createWindow() {
	// mainWindow 할당 (변수 재선언 없이)
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		width: 1440,
		height: 920,
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url); // Open URL in user's browser.
		return { action: 'deny' }; // Prevent the app from opening the URL.
	});

	if (isDev()) {
		mainWindow.loadURL('http://localhost:5123');
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
	}
}

function createAuthenticatedWindow(
	accessToken: string | null,
	refreshToken: string | null,
	isOnboardingCompleted: string | null,
) {
	authWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		width: 1440,
		height: 920,
	});

	authWindow.loadURL(getAuthenticatedWindowPath(accessToken || '', refreshToken || '', isOnboardingCompleted || ''));
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
