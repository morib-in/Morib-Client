import { useQuery } from '@tanstack/react-query';

import { getHeartBeat } from './common.api';
import { commonKeys } from './common.keys';

export const useGetHeartBeat = () => {
	return useQuery({
		queryKey: commonKeys.heartBeat(),
		queryFn: getHeartBeat,
		refetchInterval: 1000,
		refetchIntervalInBackground: true,
	});
};
