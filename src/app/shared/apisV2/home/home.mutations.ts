import { useMutation, useQueryClient } from '@tanstack/react-query';

import { timerKeys } from '../timer/timer.keys';
import {
	deleteCategory,
	deleteTask,
	patchCategory,
	patchTask,
	postAddCategory,
	postAddTodayTodos,
	postCreateTask,
} from './home.api';
import { homeKeys } from './home.keys';

export const usePostAddTodayTodos = () => {
	return useMutation({
		mutationFn: postAddTodayTodos,
	});
};

export const usePostCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postCreateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useAddCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postAddCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};

export const usePatchCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};

export const usePatchTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};
