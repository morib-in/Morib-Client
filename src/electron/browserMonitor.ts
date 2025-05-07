import { execFileSync } from 'child_process';
import { BrowserWindow, Notification, app } from 'electron';
import path from 'path';

// 현재 활성화된 브라우저의 URL 가져오기 (AppleScript 사용)
function getFocusedBrowserURL(): string {
	try {
		// 현재 활성 앱 확인
		const activeApp = execFileSync('osascript', [
			'-e',
			'tell application "System Events" to return name of first process whose frontmost is true',
		])
			.toString()
			.trim();

		// 브라우저별 URL 추출 스크립트
		let url = '';
		switch (activeApp) {
			case 'Safari':
				url = execFileSync('osascript', ['-e', 'tell application "Safari" to return URL of front document'])
					.toString()
					.trim();
				break;

			case 'Google Chrome':
			case 'Microsoft Edge':
			case 'Brave Browser':
			case 'Vivaldi':
				url = execFileSync('osascript', [
					'-e',
					`tell application "${activeApp}" to return URL of active tab of front window`,
				])
					.toString()
					.trim();
				break;

			case 'Firefox':
				url = execFileSync('osascript', [
					'-e',
					`tell application "System Events"
            tell process "Firefox"
              set urlBox to text field 1 of toolbar 1 of window 1
              return value of attribute "AXValue" of urlBox
            end tell
          end tell`,
				])
					.toString()
					.trim();
				break;

			case 'Arc':
				url = execFileSync('osascript', [
					'-e',
					`tell application "System Events"
            tell process "Arc"
              set urlBox to first UI element of first group of first group of toolbar 1 of window 1
              return value of attribute "AXValue" of urlBox
            end tell
          end tell`,
				])
					.toString()
					.trim();
				break;
		}

		return url;
	} catch (error) {
		console.error('브라우저 URL 가져오기 오류:', error);
		return '';
	}
}

// URL이 허용된 서비스 목록에 있는지 확인
function isAllowedURL(url: string, allowedServices: string[]): boolean {
	try {
		if (!url || !allowedServices.length) return false;

		// 현재 URL 분석
		const currentUrl = new URL(url);
		const currentHostname = currentUrl.hostname.toLowerCase();
		const currentPathname = currentUrl.pathname.toLowerCase();
		const currentFullPath = currentHostname + currentPathname;

		// 디버깅용
		console.log('Checking URL:', url);
		console.log('Current hostname:', currentHostname);
		console.log('Current pathname:', currentPathname);
		console.log('Allowed services:', allowedServices);

		// 호스트명이나 전체 경로가 허용 서비스 목록과 일치하는지 확인
		return allowedServices.some((service) => {
			// 서비스 도메인 정규화
			const serviceDomain = service.toLowerCase().trim();

			// URL 형식인 경우 처리
			if (serviceDomain.startsWith('http://') || serviceDomain.startsWith('https://')) {
				try {
					// URL 객체로 파싱하여 호스트명과 경로 추출
					const serviceUrl = new URL(serviceDomain);
					const serviceHostname = serviceUrl.hostname;
					const servicePathname = serviceUrl.pathname;

					// 경로가 있는 경우 호스트명+경로까지 비교, 없는 경우 호스트명만 비교
					if (servicePathname && servicePathname !== '/') {
						return currentFullPath.includes(serviceHostname + servicePathname);
					} else {
						return currentHostname === serviceHostname || currentHostname.endsWith('.' + serviceHostname);
					}
				} catch (e) {
					console.warn('허용 서비스 URL 파싱 오류:', e);
				}
			} else if (serviceDomain.includes('/')) {
				// 프로토콜이 없지만 경로가 포함된 경우 (예: youtube.com/watch)
				return currentFullPath.includes(serviceDomain);
			}

			// 단순 도메인만 있는 경우 (예: youtube.com)
			return currentHostname === serviceDomain || currentHostname.endsWith('.' + serviceDomain);
		});
	} catch (error) {
		console.error('URL 검증 오류:', error);
		return false;
	}
}

// 상태 관리 변수
let monitoringInterval: ReturnType<typeof setInterval> | null = null;
let allowedServicesList: string[] = [];
let lastCheckedURL: string = '';
let mainWindow: BrowserWindow | null = null;

// 모니터링 시작
export function startBrowserMonitoring(win: BrowserWindow, allowedServices: string[]) {
	// 기존 모니터링이 있다면 중지
	if (monitoringInterval) {
		clearInterval(monitoringInterval);
	}

	mainWindow = win;
	allowedServicesList = allowedServices;
	lastCheckedURL = '';

	console.log('브라우저 모니터링 시작. 허용 서비스 목록:', allowedServices);

	// 500ms 간격으로 브라우저 URL 확인
	monitoringInterval = setInterval(() => {
		const currentURL = getFocusedBrowserURL();

		// URL이 있고, 이전과 다른 경우만 처리
		if (currentURL && currentURL !== lastCheckedURL) {
			console.log('브라우저 URL 변경 감지:', currentURL);
			lastCheckedURL = currentURL;

			// 허용되지 않은 URL인 경우 알림 표시
			const isAllowed = isAllowedURL(currentURL, allowedServicesList);
			console.log('허용 여부:', isAllowed);

			if (!isAllowed) {
				console.log('허용되지 않은 URL 감지:', currentURL);

				// 검증에 실패한 모든 서비스 목록과 실패 이유 상세 로깅
				console.log('상세 검증 결과:');
				try {
					const currentUrl = new URL(currentURL);
					const currentHostname = currentUrl.hostname.toLowerCase();
					const currentPathname = currentUrl.pathname.toLowerCase();

					allowedServicesList.forEach((service) => {
						let result = '불일치';
						let reason = '';

						if (service.includes('/')) {
							// 경로 포함된 서비스
							const fullPath = currentHostname + currentPathname;
							const serviceMatches = fullPath.includes(service.toLowerCase());

							if (serviceMatches) {
								result = '일치';
							} else {
								reason = `"${fullPath}"에 "${service}"가 포함되지 않음`;
							}
						} else {
							// 도메인만 있는 서비스
							const hostnameMatches =
								currentHostname === service.toLowerCase() || currentHostname.endsWith('.' + service.toLowerCase());

							if (hostnameMatches) {
								result = '일치';
							} else {
								reason = `호스트명 "${currentHostname}"이 "${service}"와 일치하지 않음`;
							}
						}

						console.log(`검증: "${service}" - ${result}${reason ? ' (' + reason + ')' : ''}`);
					});
				} catch (error) {
					console.error('상세 검증 로깅 중 오류:', error);
				}

				// 알림 표시
				showNotification(currentURL);

				// 렌더러에 타이머 중지 이벤트 전송
				if (mainWindow && !mainWindow.isDestroyed()) {
					mainWindow.webContents.send('timer:stop-by-url', {
						url: currentURL,
						timestamp: Date.now(),
					});
					console.log('타이머 중지 신호 전송 완료');
				}
			}
		}
	}, 500);
}

// 모니터링 중지
export function stopBrowserMonitoring() {
	if (monitoringInterval) {
		clearInterval(monitoringInterval);
		monitoringInterval = null;
	}
}

// 시스템 알림 표시
function showNotification(url: string) {
	try {
		const hostname = new URL(url).hostname;
		const iconPath = path.join(app.getAppPath(), 'dist-electron/morib_logo.png');
		console.log('알림 아이콘 경로:', iconPath);

		const notification = new Notification({
			title: '허용 서비스에서 벗어나 타이머가 중지됩니다.',
			body: `이 사이트를 허용 서비스로 등록할까요?`,
			icon: iconPath,
			actions: [
				{ type: 'button', text: '타이머로 돌아가기' },
				{ type: 'button', text: '허용서비스 추가' },
			],
			silent: false,
			closeButtonText: '닫기',
		});

		// 알림 클릭 시 메인 윈도우 포커스
		notification.on('click', () => {
			focusMainWindow();
		});

		// 알림 액션 버튼 클릭 시 처리
		notification.on('action', (_, index) => {
			if (mainWindow && !mainWindow.isDestroyed()) {
				if (index === 0) {
					focusMainWindow();
					mainWindow.webContents.send('browser-monitor:notification-action', 'timer', url);
				} else if (index === 1) {
					mainWindow.webContents.send('browser-monitor:notification-action', 'register', url);
				}
			}
		});

		notification.show();
		console.log('알림 표시 완료');
	} catch (error) {
		console.error('알림 표시 오류:', error);
	}
}

// 메인 윈도우 포커스 함수 (코드 재사용을 위한 분리)
function focusMainWindow() {
	if (mainWindow && !mainWindow.isDestroyed()) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.focus();
	} else {
		console.warn('메인 윈도우가 없거나 파괴되어 포커스할 수 없습니다.');
	}
}
