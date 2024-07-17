import { useQuery } from '@tanstack/react-query';

import { getTodoList } from '../axios';

export const useGetTodoList = (targetDate: string) => {
	return useQuery({
		queryKey: ['todo', targetDate],
		queryFn: () => getTodoList(targetDate),
	});
};
