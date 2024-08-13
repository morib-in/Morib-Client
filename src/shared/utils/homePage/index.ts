import { Dayjs } from 'dayjs';

import { CategoryWithTasks, DailyData, Task } from '@/shared/types/home';

export const getDailyCategoryTask = (selectedDate: Dayjs, data: DailyData[]) => {
	const formattedDate = selectedDate.format('YYYY-MM-DD');

	let matchingCategories: CategoryWithTasks[] = [];

	data.forEach(({ date, categories }) => {
		if (date === formattedDate) {
			matchingCategories = categories;
		}
	});

	return matchingCategories;
};

export const splitTasksByCompletion = (tasks: Task[]) => {
	let completedTasks: Task[] = [];
	let ongoingTasks: Task[] = [];

	tasks.forEach((task) => {
		if (task.isComplete) {
			completedTasks = [...completedTasks, task];
		} else {
			ongoingTasks = [...ongoingTasks, task];
		}
	});

	return { completedTasks, ongoingTasks };
};

export const isTaskExist = (dailyCategoryTask: CategoryWithTasks[]) => {
	return dailyCategoryTask.some((categoryWithTasks) => categoryWithTasks.tasks.length > 0);
};
