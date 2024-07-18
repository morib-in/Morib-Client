import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getAllCategoryTask, postCreateTask, postCreateTodayTodosProps } from '../axios';

export const useGetAllCategoryTask = (startDate: string, endDate: string) => {
	return useQuery({
		queryKey: ['todo', startDate, endDate],
		queryFn: () => getAllCategoryTask(startDate, endDate),
	});
};

export const usePostCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postCreateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo'] });
		},
	});
};

export const usePostCreateTodayTodos = () => {
	return useMutation({
		mutationFn: postCreateTodayTodosProps,
	});
};
