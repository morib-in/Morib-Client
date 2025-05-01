export interface Task {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete: true;
}

export interface Category {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
}
export interface CategoryWithTasks {
	category: Category;
	tasks: Task[];
}

export interface DailyData {
	date: string;
	categories: CategoryWithTasks[] | [];
}
