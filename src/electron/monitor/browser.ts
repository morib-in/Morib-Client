import { BrowserWindow, ipcMain } from 'electron';

import { startBrowserMonitoring, stopBrowserMonitoring } from '../browserMonitor.js';

const startBrowserMonitor = (window: BrowserWindow | null, allowedServices: string[]) => {
	if (!window) return;

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

	if (window && !window.isDestroyed()) {
		console.log(`${processedServices.length}개의 허용 서비스로 모니터링 시작:`, processedServices);
		startBrowserMonitoring(window, processedServices);
	} else {
		console.error('메인 창이 없어 모니터링을 시작할 수 없습니다.');
	}
};

export const addBrowserMonitorIpcHandler = (window: BrowserWindow | null) => {
	ipcMain.on('browser-monitor:start', (_, allowedServices: string[]) => {
		startBrowserMonitor(window, allowedServices);
	});

	ipcMain.on('browser-monitor:stop', () => {
		stopBrowserMonitoring();
	});
};
