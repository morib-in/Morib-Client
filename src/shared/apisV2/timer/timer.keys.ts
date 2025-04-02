import { GetTimerTodosReq, GetUpdateTimerInfoReq } from '@/shared/types/api/timer';

export const timerKeys = {
	timer: ['timer'] as const,
	todos: ({ targetDate }: GetTimerTodosReq) => [...timerKeys.timer, targetDate],
	friends: () => [...timerKeys.timer, 'friends'],
	popover: () => [...timerKeys.timer, 'popover'],
	updateTimerInfo: ({ taskId, elapsedTime, targetDate, timerStatus }: GetUpdateTimerInfoReq) => [
		...timerKeys.timer,
		'updateTimerInfo',
		taskId,
		elapsedTime,
		targetDate,
		timerStatus,
	],
};
