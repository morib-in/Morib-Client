import { BrowserWindow, app, ipcMain, screen, shell } from 'electron';
import path from 'path';

import { startBrowserMonitoring, stopBrowserMonitoring } from './browserMonitor.js';
import { getAuthenticatedWindowPath, getPreloadPath, parseTokensFromUrl } from './pathResolver.js';
import { isDev } from './util.js';

let mainWindow: BrowserWindow | null = null;
let authWindow: BrowserWindow | null = null;
// 앱 종료 상태를 추적하는 변수
let isAppQuitting = false;

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
		if (mainWindow && !mainWindow.isDestroyed()) {
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

		// 인증 관련 IPC 핸들러 설정
		setupAuthHandlers();

		// macOS에서 dock 아이콘 클릭 시 창 복원
		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow();
			} else {
				// 숨겨진 창이 있다면 표시하기
				if (authWindow && !authWindow.isDestroyed() && !authWindow.isVisible()) {
					authWindow.show();
				} else if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
					mainWindow.show();
				}
			}
		});
	});

	app.on('open-url', (event: any, url: string) => {
		if (authWindow && !authWindow.isDestroyed()) {
			if (authWindow.isMinimized()) authWindow.restore();
			authWindow.focus();
		} else {
			if (mainWindow && !mainWindow.isDestroyed()) {
				mainWindow?.close();
			}

			event.preventDefault();
			const { accessToken, refreshToken, isOnboardingCompleted } = parseTokensFromUrl(url);

			// dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`); // NOTE: 디버깅용 Dialog 주석 처리
			createAuthenticatedWindow(accessToken, refreshToken, isOnboardingCompleted);
			// 브라우저 URL 모니터링을 위한 IPC 핸들러 등록
			setupBrowserMonitorHandlers();
		}
	});
}

// 인증 관련 IPC 핸들러 설정
function setupAuthHandlers() {
	// 로그인 페이지로 리디렉션 요청
	ipcMain.on('auth:relogin', () => {
		console.log('로그인 페이지로 리디렉션 요청 수신');

		// authWindow가 있으면 닫음
		if (authWindow && !authWindow.isDestroyed()) {
			authWindow.close();
			authWindow = null;
		}

		// mainWindow가 없으면 생성, 있으면 로그인 페이지로 이동
		if (!mainWindow || mainWindow.isDestroyed()) {
			createWindow();
		} else {
			// 로그인 페이지로 이동
			if (isDev()) {
				mainWindow.loadURL('http://localhost:5173/');
			} else {
				mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
			}

			// 창이 숨겨져 있으면 표시
			if (!mainWindow.isVisible()) {
				mainWindow.show();
			}
			mainWindow.focus();
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

		if (authWindow && !authWindow.isDestroyed()) {
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

// 화면 해상도 확인 및 줌 레벨 설정 함수
function adjustZoomLevelIfNeeded(window: BrowserWindow | null) {
	if (!window) return;

	// 맥북 14인치 해상도 기준 (3024x1964)
	const MAC14_WIDTH = 3024;
	const MAC14_HEIGHT = 1964;

	const display = screen.getPrimaryDisplay();

	const pixelWidth = display.workAreaSize.width * display.scaleFactor;
	const pixelHeight = display.workAreaSize.height * display.scaleFactor;

	// 해상도가 맥북 14인치보다 작은 경우
	if (pixelWidth < MAC14_WIDTH || pixelHeight < MAC14_HEIGHT) {
		// 콘텐츠가 로드된 후 줌 레벨 설정
		window.webContents.once('did-finish-load', () => {
			// 화면 비율 80%로 설정 (줌 레벨 -1.0은 약 80%에 해당)
			window.webContents.setZoomLevel(-1.0);
		});
	}
}

function createWindow() {
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
			devTools: false, // 개발자 도구 비활성화
		},
		width: 1440,
		height: 920,
		show: false, // 초기에는 창을 표시하지 않음
		backgroundColor: '#181C22', // 배경색 설정 (어두운 색상 예시)
	});

	// 콘텐츠가 준비되면 창 표시
	mainWindow.once('ready-to-show', () => {
		mainWindow?.show();
	});

	// 화면 해상도에 따라 줌 레벨 조정
	adjustZoomLevelIfNeeded(mainWindow);

	// cmd + option + i 단축키 차단
	mainWindow.webContents.on('before-input-event', (event, input) => {
		// 개발자 도구를 열 수 있는 모든 단축키 차단
		if (
			// cmd + option + i (macOS)
			(input.key === 'i' && input.meta && input.alt) ||
			// F12
			input.key === 'F12' ||
			// cmd + shift + i (macOS), ctrl + shift + i (Windows/Linux)
			(input.key === 'i' && input.shift && (input.meta || input.control)) ||
			// cmd + shift + c (macOS), ctrl + shift + c (Windows/Linux)
			(input.key === 'c' && input.shift && (input.meta || input.control)) ||
			// cmd + shift + j (macOS), ctrl + shift + j (Windows/Linux)
			(input.key === 'j' && input.shift && (input.meta || input.control))
		) {
			event.preventDefault();
		}
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url); // Open URL in user's browser.
		return { action: 'deny' }; // Prevent the app from opening the URL.
	});

	// 닫기 버튼 클릭 시 앱을 종료하지 않고 숨김(hide) 처리
	mainWindow.on('close', (event) => {
		// 앱이 실제로 종료되려는 경우는 처리하지 않음
		if (!isAppQuitting && authWindow !== null && !authWindow.isDestroyed() && mainWindow && !mainWindow.isDestroyed()) {
			event.preventDefault();
			mainWindow.hide(); // 최소화 대신 숨김 처리
			return false;
		}

		return true;
	});

	if (isDev()) {
		mainWindow.loadURL('http://localhost:5173/');
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
			devTools: false, // 개발자 도구 비활성화
		},
		width: 1440,
		height: 920,
		show: false, // 초기에는 창을 표시하지 않음
		backgroundColor: '#181C22', // 배경색 설정 (어두운 색상 예시)
	});

	// 콘텐츠가 준비되면 창 표시
	authWindow.once('ready-to-show', () => {
		authWindow?.show();
	});

	// 화면 해상도에 따라 줌 레벨 조정
	adjustZoomLevelIfNeeded(authWindow);

	// cmd + option + i 단축키 차단
	authWindow.webContents.on('before-input-event', (event, input) => {
		// 개발자 도구를 열 수 있는 모든 단축키 차단
		if (
			// cmd + option + i (macOS)
			(input.key === 'i' && input.meta && input.alt) ||
			// F12
			input.key === 'F12' ||
			// cmd + shift + i (macOS), ctrl + shift + i (Windows/Linux)
			(input.key === 'i' && input.shift && (input.meta || input.control)) ||
			// cmd + shift + c (macOS), ctrl + shift + c (Windows/Linux)
			(input.key === 'c' && input.shift && (input.meta || input.control)) ||
			// cmd + shift + j (macOS), ctrl + shift + j (Windows/Linux)
			(input.key === 'j' && input.shift && (input.meta || input.control))
		) {
			event.preventDefault();
		}
	});

	// 닫기 버튼 클릭 시 앱을 종료하지 않고 숨김 처리
	authWindow.on('close', (event) => {
		// 앱이 실제로 종료되려는 경우는 처리하지 않음
		if (!isAppQuitting && authWindow && !authWindow.isDestroyed()) {
			event.preventDefault();
			authWindow.hide(); // 최소화 대신 숨김 처리
			return false;
		}

		return true;
	});

	authWindow.loadURL(getAuthenticatedWindowPath(accessToken || '', refreshToken || '', isOnboardingCompleted || ''));
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

// 실제 앱 종료 처리
app.on('before-quit', () => {
	// 앱 종료 플래그를 true로 설정
	isAppQuitting = true;
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
