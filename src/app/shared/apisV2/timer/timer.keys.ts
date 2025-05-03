import { GetSelectedTimerTaskReq, GetTimerHeartBeatReq, GetTimerTodosReq } from '@/shared/types/api/timer';

export const timerKeys = {
	timer: ['timer'] as const,
	todos: ({ targetDate }: GetTimerTodosReq) => [...timerKeys.timer, targetDate],
	friends: () => [...timerKeys.timer, 'friends'],
	popover: () => [...timerKeys.timer, 'popover'],
	selectedTimerTask: ({ targetDate }: GetSelectedTimerTaskReq) => [...timerKeys.timer, 'selectedTimerTask', targetDate],
	timerHeartBeat: ({ targetDate }: GetTimerHeartBeatReq) => [...timerKeys.timer, 'heartBeat', targetDate],
};
