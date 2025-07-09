import { useQuery } from '@tanstack/react-query';

import { getSuggestedSites } from './onboarding.api';
import { onboardingKeys } from './onboarding.keys';

export const useGetSuggestedSites = () => {
	return useQuery({
		queryKey: onboardingKeys.suggestedSites,
		queryFn: getSuggestedSites,
	});
};
