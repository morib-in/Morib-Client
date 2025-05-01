import { Dayjs } from 'dayjs';

import { GetCategoryTaskRes } from '@/shared/types/api/home';
import type { CategoriesType, TaskListType } from '@/shared/types/tasks';

export const getDailyCategoryTask = (selectedDate: Dayjs, data: GetCategoryTaskRes['data']) => {
	const formattedDate = selectedDate.format('YYYY-MM-DD');

	let matchingCategories: CategoriesType = [];

	data.forEach(({ date, categories }) => {
		if (date === formattedDate) {
			matchingCategories = categories;
		}
	});

	return matchingCategories;
};

export const splitTasksByCompletion = (tasks: TaskListType) => {
	let completedTasks: TaskListType = [];
	let ongoingTasks: TaskListType = [];

	tasks.forEach((task) => {
		if (task.isComplete) {
			completedTasks = [...completedTasks, task];
		} else {
			ongoingTasks = [...ongoingTasks, task];
		}
	});

	return { completedTasks, ongoingTasks };
};

export const isTaskExist = (dailyCategoryTask: CategoriesType) => {
	return dailyCategoryTask.some((categoryWithTasks) => categoryWithTasks.tasks.length > 0);
};
