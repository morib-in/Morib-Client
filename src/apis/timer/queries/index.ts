import { useMutation, useQuery } from '@tanstack/react-query';

import { getMoribSet, postTimerStop } from '@/apis/timer/axios';

import { getTodoList } from '../axios';

export const useGetTodoList = (targetDate: string) => {
	return useQuery({
		queryKey: ['todo', targetDate],
		queryFn: () => getTodoList(targetDate),
	});
};

export const usePostTimerStop = () => {
	return useMutation({
		mutationFn: ({ id, elapsedTime, targetDate }: { id: number; elapsedTime: number; targetDate: string }) =>
			postTimerStop(id, elapsedTime, targetDate),
	});
};

export const useGetMoribSet = (taskId: number) => {
	return useQuery({
		queryKey: ['set', taskId],
		queryFn: () => getMoribSet(taskId),
		enabled: taskId !== 0,
	});
};
