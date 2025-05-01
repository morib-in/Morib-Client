import type {
	GetPopoverAllowedServiceListRes,
	GetTimerFriendsRes,
	GetTimerTodosReq,
	GetTimerTodosRes,
	GetUpdateTimerInfoReq,
	PostApplyAllowedServiceGroupReq,
	PostUpdateTimerInfoReq,
} from '@/shared/types/api/timer';

import { authClient } from '../client';

const TIMER_ENDPOINT = {
	GET_TIMER_TODOS: 'api/v2/timer/todo-card',
	GET_TIMER_FRIENDS: 'api/v2/timer/friends',
	GET_POPOVER_ALLOWED_SERVICE_LIST: 'api/v2/timer/allowedGroups',
	POST_APPLY_ALLOWED_SERVICE_GROUP: 'api/v2/timer/allowedGroups',
	POST_TIMER_INFO_UPDATE: 'api/v2/timer/sync',
	GET_TIMER_INFO_UPDATE: 'api/v2/timer/ping',
};

export const getTimerTodos = async ({ targetDate }: GetTimerTodosReq): Promise<GetTimerTodosRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_TODOS, { params: { targetDate } });
	return data;
};

export const getTimerFriends = async (): Promise<GetTimerFriendsRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_FRIENDS);
	return data;
};

export const getPopoverAllowedServiceList = async (): Promise<GetPopoverAllowedServiceListRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_POPOVER_ALLOWED_SERVICE_LIST);
	return data;
};

export const postApplyAllowedServiceGroup = async ({ allowedGroupIdList }: PostApplyAllowedServiceGroupReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_APPLY_ALLOWED_SERVICE_GROUP, { allowedGroupIdList });
	return data;
};

export const postUpdateTimerInfo = async ({ taskId, elapsedTime, targetDate, timerStatus }: PostUpdateTimerInfoReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_TIMER_INFO_UPDATE, {
		taskId,
		elapsedTime,
		targetDate,
		timerStatus,
	});
	return data;
};

export const getUpdateTimerInfo = async ({ taskId, elapsedTime, targetDate, timerStatus }: GetUpdateTimerInfoReq) => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_INFO_UPDATE, {
		params: { taskId, elapsedTime, targetDate, timerStatus },
	});
	return data;
};
