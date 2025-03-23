export interface GetCategoryTaskReq {
	startDate: string;
	endDate: string;
}

export interface GetCategoryTaskRes {
	status: number;
	message: string;
	data: {
		date: string;
		categories: {
			category: { id: number; name: string };
			tasks: {
				id: number;
				name: string;
				startDate: string;
				endDate: string | null;
				elapsedTime: number;
				isComplete: boolean;
			}[];
		}[];
	}[];
}

export interface GetWorkTimeReq {
	targetDate: string;
}

export interface GetWorkTimeRes {
	status: number;
	message: string;
	data: {
		targetDate: string;
		sumTodayElapsedTime: number;
	};
}

export interface postAddTodayTodosReq {
	targetDate: string;
	taskIdList: number[];
}

export interface PostCreateTaskReq {
	categoryId: number;
	name: string;
	startDate: string;
	endDate: string | null;
}

export interface PostToggleTaskStatusReq {
	taskId: number;
}

export interface PostAddCategoryReq {
	name: string;
}

export interface DeleteCategoryReq {
	categoryId: number;
}

export interface DeleteTaskReq {
	taskId: number;
}

export interface PatchCategoryReq {
	categoryId: number;
	name: string;
}
