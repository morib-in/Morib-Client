interface Task {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete: boolean;
	categoryName: string;
}

export const splitTasksByCompletion = (tasks: Task[]) => {
	let completedTodos: Task[] = [];
	let ongoingTodos: Task[] = [];

	tasks.forEach((task) => {
		if (task.isComplete) {
			completedTodos = [...completedTodos, task];
		} else {
			ongoingTodos = [...ongoingTodos, task];
		}
	});

	return { completedTodos, ongoingTodos };
};
