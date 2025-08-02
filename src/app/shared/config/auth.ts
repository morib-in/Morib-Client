import { redirect } from 'react-router-dom';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { getAccessToken, getIsOnboardingCompleted } from '../utils/auth';

export const authConfig = {
	authUrl: import.meta.env.VITE_MORIB_AUTH_URL,

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
