import { BrowserWindow } from 'electron';

export const blockDevTools = (window: BrowserWindow | null) => {
	if (!window) return;

	window.webContents.on('before-input-event', (event, input) => {
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
			(input.key === 'j' && input.shift && (input.meta || input.control)) ||
			// 줌 관련 키 중 cmd+ 및 cmd- 외의 다른 키 차단 (ctrl+0 등)
			(input.key === '0' && (input.meta || input.control))
		) {
			// 기본 동작 차단
			event.preventDefault();
		}
	});
};
