const { contextBridge, ipcRenderer } = require('electron');

// 렌더러 프로세스에 노출할 API 정의
contextBridge.exposeInMainWorld('electron', {
	// 브라우저 URL 모니터링 API 추가
	browserMonitor: {
		// 허용 서비스 목록 설정 및 모니터링 시작
		startMonitoring: (allowedServices: string[]) => {
			ipcRenderer.send('browser-monitor:start', allowedServices);
		},

		// 모니터링 중지
		stopMonitoring: () => {
			ipcRenderer.send('browser-monitor:stop');
		},

		// 허용되지 않은 URL 발견 시 이벤트 리스너
		onUnallowedUrl: (callback: (url: string, action?: string) => void) => {
			const handler = (_: any, url: string, action?: string) => callback(url, action);
			ipcRenderer.on('browser-monitor:unallowed-url', handler);
			return () => ipcRenderer.removeListener('browser-monitor:unallowed-url', handler);
		},

		// 알림 액션 이벤트 (타이머로 돌아가기, 허용 서비스 등록하기)
		onNotificationAction: (callback: (action: 'timer' | 'register', url: string) => void) => {
			const handler = (_: any, action: 'timer' | 'register', url: string) => callback(action, url);
			ipcRenderer.on('browser-monitor:notification-action', handler);
			return () => ipcRenderer.removeListener('browser-monitor:notification-action', handler);
		},

		// 타이머 정지 이벤트 리스너 - URL로 인한 타이머 정지
		onTimerStop: (callback: (data: { url: string; timestamp: number }) => void) => {
			const handler = (_: any, data: { url: string; timestamp: number }) => callback(data);
			ipcRenderer.on('timer:stop-by-url', handler);
			return () => ipcRenderer.removeListener('timer:stop-by-url', handler);
		},
	},

	// 인증 관련 API 추가
	auth: {
		// 로그인 페이지로 리디렉션하는 함수
		relogin: () => {
			ipcRenderer.send('auth:relogin');
		},
	},
});
