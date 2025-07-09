import type { TimerTodoType } from '@/shared/types/tasks';

export const splitTasksByCompletion = (tasks: TimerTodoType[]) => {
	let completedTodos: TimerTodoType[] = [];
	let ongoingTodos: TimerTodoType[] = [];

	tasks.forEach((task) => {
		if (task.isComplete) {
			completedTodos = [...completedTodos, task];
		} else {
			ongoingTodos = [...ongoingTodos, task];
		}
	});

	return { completedTodos, ongoingTodos };
};
