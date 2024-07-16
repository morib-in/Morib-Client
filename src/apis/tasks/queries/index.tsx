import { useMutation } from '@tanstack/react-query';

import { postCategory } from '@/apis/tasks/axios/index';

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

export const usePostCategory = () => {
	return useMutation({
		mutationFn: (categoryData: CategoryDataProps) => postCategory(categoryData),
	});
};
