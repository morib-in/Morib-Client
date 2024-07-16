import { QueryClient, useMutation } from '@tanstack/react-query';

import { patchTaskStatus } from '../axios';

const queryClient = new QueryClient();

export const usePatchTaskStatus = (taskId: number) => {
	return useMutation({
		mutationFn: () => patchTaskStatus(taskId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['status'] });
		},
	});
};
