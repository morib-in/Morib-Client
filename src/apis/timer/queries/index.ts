import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { postTimerStop } from '@/apis/timer/axios';

import { getTodoList } from '../axios';

export const useGetTodoList = (targetDate: string) => {
	return useQuery({
		queryKey: ['todo', targetDate],
		queryFn: () => getTodoList(targetDate),
	});
};

export const usePostTimerStop = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, elapsedTime }: { id: number; elapsedTime: number }) => postTimerStop(id, elapsedTime),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo'] });
		},
	});
};
