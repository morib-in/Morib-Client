import axios from 'axios';

import { nonAuthClient } from '@/shared/apis/client';
import { getRefreshToken } from '@/shared/utils/token';

const AUTH_URL = {
	SIGN_IN: 'api/v1/users/signin',
	SIGN_UP: 'api/v1/auth/google/callback',
	REISSUE_TOKEN: 'api/v1/users/reissue',
	ADD_CATEGORY: 'api/v1/categories',
};

//Todo: 서버 이슈로 회원가입/로그인/토큰 관련 API는 앱잼 끝나고 사용
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
