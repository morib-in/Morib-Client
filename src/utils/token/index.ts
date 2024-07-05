export const getAccessTotken = () => {
	const accessToken = localStorage.getItem('accessToken');
	return accessToken;
};

export const getAllToken = () => {
	const accessToken = localStorage.getItem('accessToken');
	const refreshToken = localStorage.getItem('refreshToken');
	return { accessToken, refreshToken };
};

export const setAllToken = (accessToken: string, refreshToken: string) => {
	localStorage.setItem('accessToken', accessToken);
	localStorage.setItem('refreshToken', refreshToken);
};
