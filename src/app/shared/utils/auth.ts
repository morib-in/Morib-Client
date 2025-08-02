export const getAccessToken = () => {
	const accessToken = localStorage.getItem('accessToken');
	return accessToken;
};

export const setAccessToken = (accessToken: string) => {
	localStorage.setItem('accessToken', accessToken);
};

export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem('refreshToken');
	return refreshToken;
};

export const setRefreshToken = (refreshToken: string) => {
	localStorage.setItem('refreshToken', refreshToken);
};

export const getIsOnboardingCompleted = () => {
	const isOnboardingCompleted = localStorage.getItem('isOnboardingCompleted');
	return isOnboardingCompleted;
};

export const setIsOnboardingCompleted = (isOnboardingCompleted: string) => {
	localStorage.setItem('isOnboardingCompleted', isOnboardingCompleted);
};

export const removeAllTokens = () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('isOnboardingCompleted');
};
