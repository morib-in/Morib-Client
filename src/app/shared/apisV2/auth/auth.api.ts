import axios from 'axios';

import { getAccessToken, getRefreshToken } from '@/shared/utils/auth';

import { reissueRes } from '@/shared/types/api/auth';

import { authClient } from '@/shared/apisV2/client';

const AUTH_ENDPOINT = {
	POST_REISSUE_TOKEN: 'api/v2/users/reissue/tmp', // NOTE: 임시 토큰 해결방식
	POST_LOGOUT: 'api/v2/users/logout',
};

export const postReissueToken = async (): Promise<reissueRes> => {
	const accessToken = getAccessToken();

	const { data } = await axios.post(
		AUTH_ENDPOINT.POST_REISSUE_TOKEN,
		{
			refreshToken: getRefreshToken(),
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	return data;
};

export const postLogout = async () => {
	await authClient.post(AUTH_ENDPOINT.POST_LOGOUT);
};
