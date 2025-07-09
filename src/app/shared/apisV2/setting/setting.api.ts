import { GetProfileRes, PutChangeProfileReq } from '@/shared/types/api/setting';

import { authClient } from '../client';

const SETTING_URL = {
	GET_PROFILE: 'api/v2/profiles',
	PUT_CHANGE_PROFILE: 'api/v2/profiles',
	DELETE_ACCOUNT: 'api/v2/users/withdraw',
};

export const getProfile = async (): Promise<GetProfileRes> => {
	const { data } = await authClient.get(SETTING_URL.GET_PROFILE);
	return data;
};

export const putChangeProfile = async ({ name, imageUrl, isPushEnabled }: PutChangeProfileReq): Promise<void> => {
	await authClient.put(SETTING_URL.PUT_CHANGE_PROFILE, { name, imageUrl, isPushEnabled });
};

export const deleteAccount = async () => {
	const { data } = await authClient.delete(SETTING_URL.DELETE_ACCOUNT);
	return data;
};
