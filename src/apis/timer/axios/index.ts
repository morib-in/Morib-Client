import { nonAuthClient } from '@/apis/client';

const TIMER_URL = {
	GET_TODOLIST: 'api/v1/timer/todo-card',
};

export const getTodoList = async (targetDate: string) => {
	const { data } = await nonAuthClient.get(TIMER_URL.GET_TODOLIST, {
		params: { targetDate: targetDate },
	});
	return data;
};
