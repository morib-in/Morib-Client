import { nonAuthClient } from '@/apis/client';

const CATEGORY_URL = {
	TAB_NAME: 'api/v1/fetch-title?',
	CATEGORIES_LIST: 'api/v1/categories',
	MSETS_FROM_CATEGORY: 'api/v1/mset/categories/',
};

export const getTabName = async (requestUrl: string) => {
	const { data } = await nonAuthClient.get(`${CATEGORY_URL.TAB_NAME}requestUrl=${requestUrl}`, {
		params: {
			requestUrl: requestUrl,
		},
	});
	return data;
};

export const categoryLists = async () => {
	const { data } = await nonAuthClient.get(CATEGORY_URL.CATEGORIES_LIST);
	return data;
};

export const getMsets = async (categoryId: number | null) => {
	const { data } = await nonAuthClient.get(`${CATEGORY_URL.MSETS_FROM_CATEGORY}${categoryId}`, {
		params: {
			categoryId: categoryId,
		},
	});
	return data;
};
