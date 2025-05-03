import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostApplyAllowedServiceGroupReq } from '@/shared/types/api/timer';

import { postApplyAllowedServiceGroup, postSelectTimerTask, postTimerPause, postTimerRun } from './timer.api';
import { timerKeys } from './timer.keys';

export const usePostApplyAllowedServiceGroup = ({ allowedGroupIdList }: PostApplyAllowedServiceGroupReq) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => postApplyAllowedServiceGroup({ allowedGroupIdList }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.popover() });
		},
	});
};

export const usePostTimerRun = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postTimerRun,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};

export const usePostTimerPause = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postTimerPause,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};

export const usePostSelectTimerTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postSelectTimerTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};
