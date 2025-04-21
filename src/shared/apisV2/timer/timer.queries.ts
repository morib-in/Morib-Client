import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import {
	GetSelectedTimerTaskReq,
	GetSelectedTimerTaskRes,
	GetTimerHeartBeatReq,
	GetTimerTodosReq,
	GetTimerTodosRes,
} from '@/shared/types/api/timer';

import {
	getPopoverAllowedServiceList,
	getSelectedTimerTask,
	getTimerFriends,
	getTimerHeartBeat,
	getTimerTodos,
} from './timer.api';
import { timerKeys } from './timer.keys';

export const useGetTimerTodos = (
	{ targetDate }: GetTimerTodosReq,
	options?: Omit<UseQueryOptions<GetTimerTodosRes, Error, GetTimerTodosRes>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<GetTimerTodosRes, Error>({
		queryKey: timerKeys.todos({ targetDate }),
		queryFn: () => getTimerTodos({ targetDate }),
		staleTime: 10000, // 10초 동안 캐시 데이터 사용
		gcTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
		refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 갱신 방지
		...options,
	});
};

export const useGetTimerFriends = () => {
	return useQuery({
		queryKey: timerKeys.friends(),
		queryFn: getTimerFriends,
		refetchInterval: 58000,
		staleTime: 30000, // 30초 동안 캐시 데이터 사용
	});
};

export const useGetPopoverAllowedServiceList = () => {
	return useQuery({
		queryKey: timerKeys.popover(),
		queryFn: getPopoverAllowedServiceList,
	});
};

export const useGetSelectedTimerTask = (
	{ targetDate }: GetSelectedTimerTaskReq,
	options?: Omit<UseQueryOptions<GetSelectedTimerTaskRes, Error, GetSelectedTimerTaskRes>, 'queryKey' | 'queryFn'>,
) => {
	return useQuery<GetSelectedTimerTaskRes, Error>({
		queryKey: timerKeys.selectedTimerTask({ targetDate }),
		queryFn: () => getSelectedTimerTask({ targetDate }),
		staleTime: 5000, // 5초 동안 캐시 데이터 사용
		...options,
	});
};

export const useGetTimerHeartBeat = (
	{ targetDate }: GetTimerHeartBeatReq,
	isPlaying: boolean = true,
	options?: Omit<
		UseQueryOptions<{ data: { elapsedTime: number } }, Error, { data: { elapsedTime: number } }>,
		'queryKey' | 'queryFn'
	>,
) => {
	return useQuery<{ data: { elapsedTime: number } }, Error>({
		queryKey: timerKeys.timerHeartBeat({ targetDate }),
		queryFn: () => getTimerHeartBeat({ targetDate }),
		refetchInterval: 10000,
		refetchIntervalInBackground: true,
		enabled: isPlaying,
		...options,
	});
};
