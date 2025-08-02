import { BrowserWindow, app, ipcMain, shell } from 'electron';
import path from 'path';

import { stopBrowserMonitoring } from './browserMonitor.js';
import { DEFAULT_PROTOCOL } from './contants/protocol.js';
import { addBrowserMonitorIpcHandler } from './monitor/browser.js';
import { showNotification } from './notification/mac.js';
import { getAuthenticatedWindowPath, getPreloadPath, parseTokensFromUrl } from './pathResolver.js';
import { isDev } from './util.js';
import { blockDevTools } from './window/key.js';
import { calculateZoomLevel } from './window/resolution.js';

let mainWindow: BrowserWindow | null = null; // 메인 창 객체
let isAppQuitting = false; // 앱 종료 상태를 추적하는 변수

// ------------------------------------------------------------------------------------------------
// 프로토콜 설정 코드
// ------------------------------------------------------------------------------------------------

// NOTE: 기본 프로토콜 설정 (morib://)
if (process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient(DEFAULT_PROTOCOL, process.execPath, [path.resolve(process.argv[1])]);
	}
} else {
	app.setAsDefaultProtocolClient(DEFAULT_PROTOCOL);
}

// ------------------------------------------------------------------------------------------------
// 애플리케이션이 준비되었을 때 window를 생성하고 렌더러 프로세스를 처리하는 코드
// ------------------------------------------------------------------------------------------------

// NOTE: 싱글 인스턴스 Local Lock 설정
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', () => {
		// Someone tried to run a second instance, we should focus our window.
		if (mainWindow && !mainWindow.isDestroyed()) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});

	// Create mainWindow, load the rest of the app, etc...
	app.whenReady().then(() => {
		createWindow();

		ipcMain.on('auth:logout', () => {
			redirectToLoginPage();
		});

		ipcMain.on('auth:relogin', () => {
			redirectToLoginPage();
		});

		// macOS에서 dock 아이콘 클릭 시 창 복원
		app.on('activate', () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow();
			} else {
				// 숨겨진 창이 있다면 표시하기
				if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
					mainWindow.show();
				}
			}
		});
	});

	app.on('open-url', (event: any, url: string) => {
		if (mainWindow && !mainWindow.isDestroyed()) {
			const { accessToken, refreshToken, isOnboardingCompleted } = parseTokensFromUrl(url);

			// dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`); // NOTE: 디버깅용 Dialog 주석 처리

			mainWindow.loadURL(
				getAuthenticatedWindowPath(accessToken || '', refreshToken || '', isOnboardingCompleted || ''),
			);

			// 브라우저 URL 모니터링을 위한 IPC 핸들러 등록
			addBrowserMonitorIpcHandler(mainWindow);
		} else {
			createWindow();
		}
	});
}

// ------------------------------------------------------------------------------------------------
// 윈도우 생성 코드
// ------------------------------------------------------------------------------------------------

/**
 * 메인 창(mainWindow) 생성 함수
 */
export const createWindow = () => {
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		width: 1440,
		height: 920,
		// show: false, // 초기에는 창을 표시하지 않음
		backgroundColor: '#181C22', // 배경색 설정 (어두운 색상 예시)
	});

	mainWindow?.webContents.once('did-finish-load', () => {
		mainWindow?.webContents.setZoomLevel(calculateZoomLevel());
	});

	blockDevTools(mainWindow);

	// 콘텐츠가 준비되면 창 표시
	mainWindow.once('ready-to-show', () => {
		mainWindow?.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url); // Open URL in user's browser.
		return { action: 'deny' }; // Prevent the app from opening the URL.
	});

	// 닫기 버튼 클릭 시 앱을 종료하지 않고 숨김(hide) 처리
	mainWindow.on('close', (event) => {
		// 앱이 실제로 종료되려는 경우는 처리하지 않음
		if (!isAppQuitting && mainWindow && !mainWindow?.isDestroyed()) {
			event.preventDefault();

			// 전체화면 상태인지 확인
			if (mainWindow.isFullScreen()) {
				// 전체화면 상태면 먼저 전체화면 해제 후 숨김
				mainWindow.setFullScreen(false);
				// 전체화면 해제 애니메이션 완료 후 숨김 처리
			} else {
				// 전체화면이 아니면 바로 숨김
				mainWindow?.hide();
			}

			return false;
		}
	});

	if (isDev()) {
		mainWindow.loadURL('http://localhost:5173/');
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
	}
};

// ------------------------------------------------------------------------------------------------
// ipc 통신과 관련된 유틸 코드
// ------------------------------------------------------------------------------------------------

// NOTE(@10tacion) 윈도우 생성 관련 함수들은 따로 분리하지 않음 (메인 파일에 모두 작성) -> 함수의 인자로 윈도우를 받아 윈도우 객체 변경 사항을 추적하기 쉽지 않기 떄문

/**
 * 리로그인 / 로그아웃 관련 IPC 핸들러 유틸
 * mainWindow가 없으면 생성, 있으면 로그인 페이지로 이동
 */
const redirectToLoginPage = () => {
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
};

// ------------------------------------------------------------------------------------------------
// 애플리케이션 자체의 동작 관련 코드(앱이 닫힐 때, 앱에서 외부 창을 띄울 때 등)
// ------------------------------------------------------------------------------------------------

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

/**
 * dock에서 우측 마우스를 클릭해서 종료를 클릭할 때만 종료가 되기 위해서 isAppQuitting 플래그를 true로 설정
 */
app.on('before-quit', () => {
	isAppQuitting = true;
});

/**
 * ipc로 해당 함수가 호출 되면 모니터링 종료 (타이머가 정지되었을 경우)
 */
app.on('will-quit', () => {
	// NOTE(@10tacion): 이 함수 내부에서 사용되는 변수가 전역 스코프에 등록된것 같음 그래서 잘 실행되는듯.. -> 추후 직관적으로 변수 관리하는게 필요할듯
	stopBrowserMonitoring();
});

/**
 * Handle window controls via IPC
 * 이걸 설정해야 일렉트론 내부에서 외부 브라우저를 띄울 때 앱 외부에서 창이 열림 (설정 안하면 일렉트론 내 웹뷰가 열림)
 */
ipcMain.on('shell:open', () => {
	const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
	const pagePath = path.join('file://', pageDirectory, 'index.html');
	shell.openExternal(pagePath);
});

/**
 * 시스템 알림 표시 IPC 핸들러
 */
ipcMain.on('notification:show', (_, { title, body }) => {
	showNotification(title, body);
});
