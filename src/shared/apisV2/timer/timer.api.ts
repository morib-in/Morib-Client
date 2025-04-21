import type {
	GetPopoverAllowedServiceListRes,
	GetSelectedTimerTaskReq,
	GetSelectedTimerTaskRes,
	GetTimerFriendsRes,
	GetTimerHeartBeatReq,
	GetTimerTodosReq,
	GetTimerTodosRes,
	PostApplyAllowedServiceGroupReq,
	PostSelectTimerTaskReq,
	PostTimerPauseReq,
	PostTimerRunReq,
} from '@/shared/types/api/timer';

import { authClient } from '../client';

const TIMER_ENDPOINT = {
	GET_TIMER_TODOS: 'api/v2/timer/todo-card',
	GET_TIMER_FRIENDS: 'api/v2/timer/friends',
	GET_POPOVER_ALLOWED_SERVICE_LIST: 'api/v2/timer/allowedGroups',
	POST_APPLY_ALLOWED_SERVICE_GROUP: 'api/v2/timer/allowedGroups',
	POST_TIMER_RUN: 'api/v2/timer/run',
	POST_TIMER_PAUSE: 'api/v2/timer/pause',
	POST_SELECT_TIMER_TASK: 'api/v2/timer/select',
	GET_TIMER_TASK_LIST: 'api/v2/timer/selected',
	GET_TIMER_HEART_BEAT: 'api/v2/timer/heart-beat',
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

export const postTimerRun = async ({ taskId, targetDate }: PostTimerRunReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_TIMER_RUN, { taskId, targetDate });
	return data;
};

export const postTimerPause = async ({ taskId, targetDate }: PostTimerPauseReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_TIMER_PAUSE, { taskId, targetDate });
	return data;
};

export const postSelectTimerTask = async ({ taskId, targetDate }: PostSelectTimerTaskReq) => {
	const { data } = await authClient.post(TIMER_ENDPOINT.POST_SELECT_TIMER_TASK, { taskId, targetDate });
	return data;
};

export const getSelectedTimerTask = async ({
	targetDate,
}: GetSelectedTimerTaskReq): Promise<GetSelectedTimerTaskRes> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_TASK_LIST, { params: { targetDate } });
	return data;
};

export const getTimerHeartBeat = async ({
	targetDate,
}: GetTimerHeartBeatReq): Promise<{ data: { elapsedTime: number } }> => {
	const { data } = await authClient.get(TIMER_ENDPOINT.GET_TIMER_HEART_BEAT, { params: { targetDate } });
	return data;
};
