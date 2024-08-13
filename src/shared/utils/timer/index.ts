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
