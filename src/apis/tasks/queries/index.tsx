import { useMutation, useQuery } from '@tanstack/react-query';

import { getTabName, postCategory } from '@/apis/tasks/axios/index';

interface MSet {
	name: string | undefined;
	url: string;
}

interface CategoryDataProps {
	name: string;
	startDate: string;
	endDate: string;
	msets: MSet[];
}

export const usePostCategory = () => {
	return useMutation({
		mutationFn: (categoryData: CategoryDataProps) => postCategory(categoryData),
	});
};

export const useGetTabName = (requestUrl: string) => {
	return useQuery({
		queryKey: ['tabName', requestUrl],
		queryFn: () => getTabName(requestUrl),
		enabled: requestUrl !== '',
	});
};
