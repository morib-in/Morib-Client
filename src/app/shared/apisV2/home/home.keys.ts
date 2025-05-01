import { GetCategoryTaskReq, GetWorkTimeReq } from '@/shared/types/api/home';

export const homeKeys = {
	task: ['task'] as const,
	categoryTask: ({ startDate, endDate }: GetCategoryTaskReq) => [...homeKeys.task, startDate, endDate] as const,
	workTime: ({ targetDate }: GetWorkTimeReq) => ['workTime', targetDate] as const,
};
