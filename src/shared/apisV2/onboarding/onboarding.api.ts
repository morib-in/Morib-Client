import { GetSuugestedSitesRes, PostInterestAreaReq, PostInterestAreaRes } from '@/shared/types/api/onboarding';

import { authClient } from '../client';

export const ONBOARDING_URL = {
	POST_INTEREST_AREA: 'api/v2/onboard',
	GET_SUGGESTED_SITES: 'api/v2/onboard',
};

export const postInterestArea = async ({
	name,
	colorCode,
	allowedSites,
	interestArea,
}: PostInterestAreaReq): Promise<PostInterestAreaRes> => {
	const { data } = await authClient.post(
		ONBOARDING_URL.POST_INTEREST_AREA,
		{ name, colorCode, allowedSites },
		{
			params: { interestArea },
		},
	);
	return data;
};

export const getSuggestedSites = async (): Promise<GetSuugestedSitesRes> => {
	const { data } = await authClient.get(ONBOARDING_URL.GET_SUGGESTED_SITES);
	return data;
};
