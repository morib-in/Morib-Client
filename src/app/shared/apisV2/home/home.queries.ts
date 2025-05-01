import { useQuery } from '@tanstack/react-query';

import type { GetCategoryTaskReq, GetWorkTimeReq } from '@/shared/types/api/home';

import { getCategoryTask, getWorkTime } from './home.api';
import { homeKeys } from './home.keys';

export const useGetCategoryTask = ({ startDate, endDate }: GetCategoryTaskReq) => {
	return useQuery({
		queryKey: homeKeys.categoryTask({ startDate, endDate }),
		queryFn: () => getCategoryTask({ startDate, endDate }),
	});
};

export const useGetWorkTime = ({ targetDate }: GetWorkTimeReq) => {
	return useQuery({
		queryKey: homeKeys.workTime({ targetDate }),
		queryFn: () => getWorkTime({ targetDate }),
	});
};
