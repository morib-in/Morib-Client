import { nonAuthClient } from '@/shared/apis/client';

const TIMER_URL = {
	GET_TODOLIST: `api/v1/timer/todo-card`,
	POST_TIMERSTOP: (taskId: number) => `api/v1/timer/stop/${taskId}`,
	GET_MORIBSET: (taskId: number) => `api/v1/mset/tasks/${taskId}`,
};

export const getTodoList = async (targetDate: string) => {
	const { data } = await nonAuthClient.get(TIMER_URL.GET_TODOLIST, {
		params: { targetDate: targetDate },
	});
	return data;
};

export const getMoribSet = async (taskId: number) => {
	const { data } = await nonAuthClient.get(TIMER_URL.GET_MORIBSET(taskId));
	return data;
};

export const postTimerStop = async (id: number, elapsedTime: number, targetDate: string) => {
	const { data } = await nonAuthClient.post(TIMER_URL.POST_TIMERSTOP(id), {
		targetDate: targetDate,
		elapsedTime: elapsedTime,
	});
	return data;
};
