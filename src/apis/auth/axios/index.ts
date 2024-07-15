import axios from 'axios';

import { nonAuthClient } from '@/apis/client';

import { getRefreshToken } from '@/utils/token';

const AUTH_URL = {
	SIGN_IN: 'api/v1/users/signin',
	SIGN_UP: 'api/v1/auth/google/callback',
	REISSUE_TOKEN: 'api/v1/users/reissue',
};

export const signIn = async () => {
	const { data } = await nonAuthClient.post(AUTH_URL.SIGN_IN);
	return data;
};

export const singUp = async (authorizationCode: string | null) => {
	const { data } = await nonAuthClient.post(AUTH_URL.SIGN_UP, {
		authorizationCode: authorizationCode,
	});
	return data;
};

export const reissueToken = async () => {
	const refreshToken = getRefreshToken();
	const { data } = await axios.patch(AUTH_URL.REISSUE_TOKEN, {
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	});
	return data;
};
