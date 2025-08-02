import { ROUTES_CONFIG } from '@/router/routesConfig';

import { getAccessToken, getIsOnboardingCompleted, removeAllTokens } from '../utils/auth';

export const authConfig = {
	authUrl: {
		react: `${import.meta.env.VITE_MORIB_AUTH_URL}?type=web`,
		electron: `${import.meta.env.VITE_MORIB_AUTH_URL}?type=electron`,
	},

	isAuthenticated: () => {
		const accessToken = getAccessToken();
		return !!accessToken;
	},

	isOnboardingCompleted: () => {
		const isOnboardingCompleted = getIsOnboardingCompleted();
		return !!isOnboardingCompleted;
	},

	redirectToLogin: () => {
		removeAllTokens();
		if (window.electron) {
			// pathname은 프로토콜·호스트(scheme, host)와 쿼리(?...), **해시(#...)**를 제외한 경로
			// 일렉트론은 해쉬 라우터를 사용하고 있기 때문에 루트 패스로 이동이 가능함.
			window.location.replace(window.location.pathname);
		} else {
			window.location.replace(ROUTES_CONFIG.login.path);
		}
	},
	redirectToMoribAuth: () => {
		if (window.electron) {
			window.open(authConfig.authUrl.electron, '_blank');
		} else {
			window.location.href = authConfig.authUrl.react;
		}
	},
};
