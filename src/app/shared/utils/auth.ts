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
	location.href = ROUTES_CONFIG.login.path;
};

export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem('refreshToken');
	return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
	localStorage.setItem('refreshToken', refreshToken);
};
