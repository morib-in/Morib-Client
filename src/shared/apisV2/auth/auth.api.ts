import axios from 'axios';

import { getAccessToken } from '@/shared/utils/auth';

import { reissueRes } from '@/shared/types/api/auth';

import { authClient } from '@/shared/apisV2/client';

const AUTH_ENDPOINT = {
	POST_REISSUE_TOKEN: 'api/v2/users/reissue',
	POST_LOGOUT: 'api/v2/users/logout',
};

export const patchReissueToken = async (): Promise<reissueRes> => {
	const accessToken = getAccessToken();

	const { data } = await axios.post(
		AUTH_ENDPOINT.POST_REISSUE_TOKEN,
		{},
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
