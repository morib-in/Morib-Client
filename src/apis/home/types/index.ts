export interface TaskDataTypes {
	name: string;
	startDate: string;
	endDate: string | null;
}

export interface PostCreateTaskProps {
	categoryId: number;
	taskData: TaskDataTypes;
}
