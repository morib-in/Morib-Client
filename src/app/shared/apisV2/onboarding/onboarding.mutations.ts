import { useMutation } from '@tanstack/react-query';

import { ApiErrorResponseType } from '@/shared/types/api/error';
import { PostInterestAreaReq, PostInterestAreaRes } from '@/shared/types/api/onboarding';

import { postInterestArea } from './onboarding.api';

export const usePostInterestArea = () => {
	return useMutation<PostInterestAreaRes, ApiErrorResponseType, PostInterestAreaReq>({
		mutationFn: postInterestArea,
	});
};
