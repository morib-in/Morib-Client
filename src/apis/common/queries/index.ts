import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTaskStatus } from '../axios';

export const usePatchTaskStatus = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => patchTaskStatus(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo'] });
		},
	});
};
