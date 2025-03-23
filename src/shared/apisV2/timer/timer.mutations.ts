import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostApplyAllowedServiceGroupReq, PostUpdateTimerInfoReq } from '@/shared/types/api/timer';

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
			queryClient.invalidateQueries({ queryKey: timerKeys.friends() });
		},
	});
};

export const usePostUpdateTimerInfoWithPolling = ({
	taskId,
	elapsedTime,
	targetDate,
	timerStatus,
}: Omit<PostUpdateTimerInfoReq, 'taskId'> & { taskId: number | null }) => {
	const mutation = usePostUpdateTimerInfo();
	const { mutate: updateTimerInfo } = mutation;

	useEffect(() => {
		if (taskId) {
			const intervalId = setInterval(() => {
				updateTimerInfo({ taskId, elapsedTime, targetDate, timerStatus });
			}, 60000);

			return () => clearInterval(intervalId);
		}
	}, [taskId, elapsedTime, targetDate, timerStatus, updateTimerInfo]);

	return mutation;
};
