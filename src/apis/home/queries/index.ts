import { useQuery } from '@tanstack/react-query';

import { getAllCategoryTask } from '../axios';

export const useGetAllCategoryTask = (startDate: string, endDate: string) => {
	return useQuery({
		queryKey: ['home', startDate, endDate],
		queryFn: () => getAllCategoryTask(startDate, endDate),
	});
};
