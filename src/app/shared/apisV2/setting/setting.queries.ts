import { useQuery } from '@tanstack/react-query';

import { getProfile } from './setting.api';
import { settingKeys } from './setting.keys';

export const useGetProfile = () => {
	return useQuery({
		queryKey: settingKeys.setting,
		queryFn: getProfile,
	});
};
