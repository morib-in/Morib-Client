import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostApplyAllowedServiceGroupReq } from '@/shared/types/api/timer';

import { postApplyAllowedServiceGroup, postUpdateTimerInfo } from './timer.api';
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

export const usePostUpdateTimerInfo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postUpdateTimerInfo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
		},
	});
};
