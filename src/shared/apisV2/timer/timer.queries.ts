import { useQuery } from '@tanstack/react-query';

import { GetTimerTodosReq, GetUpdateTimerInfoReq } from '@/shared/types/api/timer';

import { getPopoverAllowedServiceList, getTimerFriends, getTimerTodos, getUpdateTimerInfo } from './timer.api';
import { timerKeys } from './timer.keys';

export const useGetTimerTodos = ({ targetDate }: GetTimerTodosReq) => {
	return useQuery({
		queryKey: timerKeys.todos({ targetDate }),
		queryFn: () => getTimerTodos({ targetDate }),
	});
};

export const useGetTimerFriends = () => {
	return useQuery({
		queryKey: timerKeys.friends(),
		queryFn: getTimerFriends,
		refetchInterval: 58000,
	});
};

export const useGetPopoverAllowedServiceList = () => {
	return useQuery({
		queryKey: timerKeys.popover(),
		queryFn: getPopoverAllowedServiceList,
	});
};

export const useGetUpdateTimerInfoPing = ({ taskId, elapsedTime, targetDate, timerStatus }: GetUpdateTimerInfoReq) => {
	return useQuery({
		queryKey: timerKeys.updateTimerInfo({ taskId, elapsedTime, targetDate, timerStatus }),
		queryFn: () => getUpdateTimerInfo({ taskId, elapsedTime, targetDate, timerStatus }),
		refetchInterval: 40000,
		refetchIntervalInBackground: true,
		enabled: !!taskId,
	});
};
