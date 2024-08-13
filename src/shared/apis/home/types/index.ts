export interface TaskDataTypes {
	name: string;
	startDate: string;
	endDate: string | null;
}

export interface PostCreateTaskProps {
	categoryId: number;
	taskData: TaskDataTypes;
}

export interface TodayTodosIds {
	taskIdList: number[];
}

export interface PostCreateTodayTodosProps {
	todayDate: string;
	todayTodos: TodayTodosIds;
}
