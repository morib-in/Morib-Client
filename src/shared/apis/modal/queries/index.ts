import { useQuery } from '@tanstack/react-query';

import { categoryLists, getMsets, getTabName } from '@/shared/apis/modal/axios';

interface MsetsList {
	createdAt: string;
	updatedAt: string;
	id: number;
	name: string;
	url: string;
}

export const useGetTabName = (requestUrl: string) => {
	return useQuery({
		queryKey: ['UrlTabName', requestUrl],
		queryFn: () => getTabName(requestUrl),
		enabled: requestUrl !== '',
	});
};

export const useCategoryLists = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: categoryLists,
	});
};

export const useGetMsets = (categoryId: number) => {
	return useQuery({
		queryKey: ['msets', categoryId],
		queryFn: () => getMsets(categoryId),
		enabled: categoryId !== 0,
		select: (data) => {
			return (
				data.data.msetList.map((item: MsetsList) => ({
					domain: item.name,
					favicon: `https://www.google.com/s2/favicons?domain=${item.url}`,
					url: item.url,
				})) || []
			);
		},
	});
};
