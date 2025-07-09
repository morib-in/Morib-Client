import { ROUTES_CONFIG } from '@/router/routesConfig';

export const getAccessToken = () => {
	const accessToken = localStorage.getItem('accessToken');
	return accessToken;
};

export const setAccessToken = (accessToken: string) => {
	localStorage.setItem('accessToken', accessToken);
};

export const reloginWithoutLogout = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('isOnboardingCompleted');

	// electron 환경인지 확인
	if (window.electron?.auth) {
		// electron IPC 통신을 통해 메인 프로세스에 메시지 전송
		window.electron.auth.relogin();
	} else {
		// 일반 브라우저 환경인 경우 기존 방식대로 처리
		location.href = ROUTES_CONFIG.login.path;
	}
};

export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem('refreshToken');
	return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
	localStorage.setItem('refreshToken', refreshToken);
};
