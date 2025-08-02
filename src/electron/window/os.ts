import { BrowserWindow } from 'electron';

export const blockClose = (window: BrowserWindow | null, isAppQuitting: boolean, authWindow: BrowserWindow | null) => {
	if (!window) return;

	window.on('close', (event) => {
		if (!isAppQuitting && authWindow !== null && !authWindow.isDestroyed() && window && !window.isDestroyed()) {
			event.preventDefault();

			// 전체화면 상태인지 확인
			if (window.isFullScreen()) {
				// 전체화면 상태면 먼저 전체화면 해제 후 숨김
				window.setFullScreen(false);
				// 전체화면 해제 애니메이션 완료 후 숨김 처리
			} else {
				// 전체화면이 아니면 바로 숨김
				window.hide();
			}

			return false;
		}

		return true;
	});
};
