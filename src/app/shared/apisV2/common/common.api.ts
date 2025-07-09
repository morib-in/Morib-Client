import { GetUrlInfoReq, GetUrlInfoRes } from '@/shared/types/api/common';
import { PostToggleTaskStatusReq } from '@/shared/types/api/home';

import { authClient } from '../client';

export const COMMON_ENDPOINT = {
	GET_URL_INFO: 'api/v2/onboard/allowedSite/info',
	POST_TOGGLE_TASK_STATUS: 'api/v2/tasks/:taskId/status',
	GET_HEART_BEAT: 'api/v2/heart-beat',
};

export const getUrlInfo = async ({ siteUrl }: GetUrlInfoReq): Promise<GetUrlInfoRes> => {
	const { data } = await authClient.get(COMMON_ENDPOINT.GET_URL_INFO, { params: { siteUrl } });
	return data;
};

export const postToggleTaskStatus = async ({ taskId }: PostToggleTaskStatusReq) => {
	const { data } = await authClient.post(COMMON_ENDPOINT.POST_TOGGLE_TASK_STATUS.replace(':taskId', String(taskId)));
	return data;
};

export const getHeartBeat = async () => {
	const { data } = await authClient.get(COMMON_ENDPOINT.GET_HEART_BEAT);
	return data;
};
