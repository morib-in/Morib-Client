import { nonAuthClient } from '@/apis/client';

import { PostCreateTaskProps, PostCreateTodayTodosProps } from '../types';

const HOME_URL = {
	GET_ALL_CATEGORY_TASK: 'api/v1/resources',
	POST_CREATE_CATEGORY: (categoryId: number) => `api/v1/tasks/${categoryId}`,
	POST_CREATE_TODAY_TODOS: 'api/v1/timer/start',
	DELETE_CATEGORY: (categoryId: number) => `api/v1/categories/${categoryId}`,
};

export const getAllCategoryTask = async (startDate: string, endDate: string) => {
	const { data } = await nonAuthClient.get(HOME_URL.GET_ALL_CATEGORY_TASK, {
		params: {
			startDate: startDate,
			endDate: endDate,
		},
	});

	return data;
};

export const postCreateTask = async ({ categoryId, taskData }: PostCreateTaskProps) => {
	await nonAuthClient.post(HOME_URL.POST_CREATE_CATEGORY(categoryId), taskData);
};

export const postCreateTodayTodosProps = async ({ todayDate, todayTodos }: PostCreateTodayTodosProps) => {
	await nonAuthClient.post(HOME_URL.POST_CREATE_TODAY_TODOS, todayTodos, { params: { targetDate: todayDate } });
};

export const deleteCategory = async (categoryId: number) => {
	await nonAuthClient.delete(HOME_URL.DELETE_CATEGORY(categoryId));
};
