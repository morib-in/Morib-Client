import { Dayjs } from 'dayjs';

import { CategoryWithTasks, DailyData, Task } from '@/types/home';

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
	const completedTasks: Task[] = [];
	const ongoingTasks: Task[] = [];

	tasks.forEach((task) => {
		if (task.isComplete) {
			[...completedTasks, task];
		} else {
			[...ongoingTasks, task];
		}
	});

	return { completedTasks, ongoingTasks };
};
