import { nonAuthClient } from '@/apis/client';

const TIMER_URL = {
	GET_TODOLIST: `api/v1/timer/todo-card`,
	POST_TIMERSTOP: (taskId: number) => `api/v1/timer/stop/${taskId}`,
};

export const getTodoList = async (targetDate: string) => {
	const { data } = await nonAuthClient.get(TIMER_URL.GET_TODOLIST, {
		params: { targetDate: targetDate },
	});
	return data;
};

export const postTimerStop = async (id: number, elapsedTime: number) => {
	const { data } = await nonAuthClient.post(TIMER_URL.POST_TIMERSTOP(id), {
		targetDate: '2024-07-15',
		elapsedTime: elapsedTime,
	});
	return data;
};
