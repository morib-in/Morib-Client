import { nonAuthClient } from '@/apis/client';

interface MSet {
	name: string;
	url: string;
}

interface CategoryDataProps {
	name: string;
	startDate: string;
	endDate: string;
	msets: MSet[];
}

const TASK_URL = {
	POST_CATEGORY: 'api/v1/categories',
	GET_TABNAME: 'api/v1/fetch-title',
};

export const postCategory = async (categoryData: CategoryDataProps) => {
	const { data } = await nonAuthClient.post(TASK_URL.POST_CATEGORY, categoryData);
	return data;
};

export const getTabName = async (requestUrl: string) => {
	const { data } = await nonAuthClient.get(TASK_URL.GET_TABNAME, {
		params: { requestUrl: requestUrl },
	});
	return data;
};
