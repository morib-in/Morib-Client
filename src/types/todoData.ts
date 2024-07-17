export interface Todo {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete: boolean;
}
