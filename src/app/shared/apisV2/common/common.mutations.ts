import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GetUrlInfoReq, GetUrlInfoRes } from '@/shared/types/api/common';
import { ApiErrorResponseType } from '@/shared/types/api/error';

import { homeKeys } from '../home/home.keys';
import { timerKeys } from '../timer/timer.keys';
import { getUrlInfo, postToggleTaskStatus } from './common.api';

export const useGetUrlInfo = () => {
	return useMutation<GetUrlInfoRes, ApiErrorResponseType, GetUrlInfoReq>({
		mutationFn: getUrlInfo,
		onSuccess: (response) => {
			return response.data;
		},
	});
};

export const usePostToggleTaskStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postToggleTaskStatus,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: timerKeys.timer });
			queryClient.invalidateQueries({ queryKey: homeKeys.task });
		},
	});
};
