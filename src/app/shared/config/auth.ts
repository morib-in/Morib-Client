import { redirect } from 'react-router-dom';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { getAccessToken, getIsOnboardingCompleted } from '../utils/auth';

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
		redirect(ROUTES_CONFIG.login.path);
	},
};
