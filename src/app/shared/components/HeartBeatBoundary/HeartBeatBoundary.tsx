import { Outlet } from 'react-router-dom';

import { useGetHeartBeat } from '@/shared/apisV2/common/common.queries';

const HeartBeatBoundary = () => {
	useGetHeartBeat();

	return <Outlet />;
};

export default HeartBeatBoundary;
