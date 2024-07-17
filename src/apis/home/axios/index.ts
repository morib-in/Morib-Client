import { nonAuthClient } from '@/apis/client';

import { PostCreateTaskProps } from '../types';

const HOME_URL = {
	GET_ALL_CATEGORY_TASK: 'api/v1/resources',
	POST_CREATE_CATEGORY: (categoryId: number) => `api/v1/tasks/${categoryId}`,
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
