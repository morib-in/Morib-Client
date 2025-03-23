import {
	DeleteCategoryReq,
	DeleteTaskReq,
	GetCategoryTaskReq,
	GetCategoryTaskRes,
	GetWorkTimeReq,
	GetWorkTimeRes,
	PatchCategoryReq,
	PostAddCategoryReq,
	PostCreateTaskReq,
	postAddTodayTodosReq,
} from '@/shared/types/api/home';

import { authClient } from '../client';

export const HOME_ENDPOINT = {
	GET_CATEGORY: 'api/v2/home',
	GET_WORK_TIME: 'api/v2/timer',
	POST_TIMER_START: 'api/v2/timer/enter',
	POST_CREATE_TASK: '/api/v2/tasks/:categoryId',
	POST_ADD_CATEGORY: 'api/v2/categories',
	DELETE_CATEGORY: 'api/v2/categories/:categoryId',
	DELETE_TASK: 'api/v2/tasks/:taskId',
	PATCH_CATEGORY: 'api/v2/categories/:categoryId',
};

export const getCategoryTask = async ({ startDate, endDate }: GetCategoryTaskReq): Promise<GetCategoryTaskRes> => {
	const { data } = await authClient.get(HOME_ENDPOINT.GET_CATEGORY, {
		params: { startDate, endDate },
	});
	return data;
};

export const getWorkTime = async ({ targetDate }: GetWorkTimeReq): Promise<GetWorkTimeRes> => {
	const { data } = await authClient.get(HOME_ENDPOINT.GET_WORK_TIME, {
		params: { targetDate },
	});
	return data;
};

export const postAddTodayTodos = async ({ targetDate, taskIdList }: postAddTodayTodosReq) => {
	const { data } = await authClient.post(HOME_ENDPOINT.POST_TIMER_START, { taskIdList }, { params: { targetDate } });
	return data;
};

export const postCreateTask = async ({ categoryId, name, startDate, endDate }: PostCreateTaskReq) => {
	const { data } = await authClient.post(HOME_ENDPOINT.POST_CREATE_TASK.replace(':categoryId', String(categoryId)), {
		name,
		startDate,
		endDate,
	});

	return data;
};

export const postAddCategory = async ({ name }: PostAddCategoryReq) => {
	const { data } = await authClient.post(HOME_ENDPOINT.POST_ADD_CATEGORY, { name });
	return data;
};

export const deleteCategory = async ({ categoryId }: DeleteCategoryReq) => {
	const { data } = await authClient.delete(HOME_ENDPOINT.DELETE_CATEGORY.replace(':categoryId', String(categoryId)));
	return data;
};

export const patchCategory = async ({ categoryId, name }: PatchCategoryReq) => {
	const { data } = await authClient.patch(HOME_ENDPOINT.PATCH_CATEGORY.replace(':categoryId', String(categoryId)), {
		name,
	});
	return data;
};

export const deleteTask = async ({ taskId }: DeleteTaskReq) => {
	const { data } = await authClient.delete(HOME_ENDPOINT.DELETE_TASK.replace(':taskId', String(taskId)));
	return data;
};
