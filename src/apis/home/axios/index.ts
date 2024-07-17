import { nonAuthClient } from '@/apis/client';

const HOME_URL = {
	GET_ALL_CATEGORY_TASK: 'api/v1/resources',
};

export const getAllCategoryTask = async (startDate: string, endDate: string) => {
	const { data } = await nonAuthClient.get(HOME_URL.GET_ALL_CATEGORY_TASK, {
		params: {
			startDate: startDate,
			endDate: endDate,
		},
	});

	return data;
};
