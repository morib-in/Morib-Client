import { BrowserWindow, app, ipcMain, shell } from 'electron';
import path from 'path';

import { startBrowserMonitoring, stopBrowserMonitoring } from './browserMonitor.js';
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
			// 브라우저 URL 모니터링을 위한 IPC 핸들러 등록
			setupBrowserMonitorHandlers();
		}
	});
}

// 브라우저 URL 모니터링 IPC 핸들러 설정
function setupBrowserMonitorHandlers() {
	// 모니터링 시작 요청
	ipcMain.on('browser-monitor:start', (_, allowedServices: string[]) => {
		console.log('브라우저 URL 모니터링 시작 요청 수신:', allowedServices);

		// 도메인 형식 확인 및 정제 (경로 정보 유지)
		const processedServices = allowedServices
			.map((service) => {
				// 빈 서비스 또는 유효하지 않은 형식 제외
				if (!service || service.trim() === '') {
					return '';
				}

				// URL 형식인 경우 프로토콜만 제거 (경로는 유지)
				if (service.startsWith('http://') || service.startsWith('https://')) {
					try {
						// URL 객체로 파싱
						const url = new URL(service);
						// 호스트명과 경로 유지 (프로토콜만 제거)
						return url.hostname + url.pathname;
					} catch (e) {
						console.warn('허용 서비스 URL 파싱 오류:', e);
						return service;
					}
				}
				return service;
			})
			.filter((s) => s.length > 0); // 빈 항목 제거

		if (authWindow) {
			console.log(`${processedServices.length}개의 허용 서비스로 모니터링 시작:`, processedServices);
			startBrowserMonitoring(authWindow, processedServices);
		} else {
			console.error('메인 창이 없어 모니터링을 시작할 수 없습니다.');
		}
	});

	// 모니터링 중지 요청
	ipcMain.on('browser-monitor:stop', () => {
		console.log('브라우저 URL 모니터링 중지 요청 수신');
		stopBrowserMonitoring();
	});
}

function createWindow() {
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

// 앱 종료 시 모니터링 중지
app.on('will-quit', () => {
	stopBrowserMonitoring();
});

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
	const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
	const pagePath = path.join('file://', pageDirectory, 'index.html');
	shell.openExternal(pagePath);
});
