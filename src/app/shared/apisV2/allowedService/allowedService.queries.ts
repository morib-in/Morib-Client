import { useQuery } from '@tanstack/react-query';

import {
	GetAllowedServiceGroupDetailReq,
	GetAllowedServiceListReq,
	GetRecommendedSitesReq,
} from '@/shared/types/api/allowedService';

import { getAllowedServiceGroupDetail, getAllowedServiceList, getRecommendedSites } from './allowedService.api';
import { allowedServiceKeys } from './allowedService.keys';

export const useGetAllowedServiceList = ({ connectType }: GetAllowedServiceListReq) => {
	return useQuery({
		queryKey: allowedServiceKeys.allowedServiceList({ connectType }),
		queryFn: () => getAllowedServiceList({ connectType }),
	});
};

export const useGetAllowedServiceGroupDetail = ({ allowedGroupId, connectType }: GetAllowedServiceGroupDetailReq) => {
	return useQuery({
		queryKey: allowedServiceKeys.allowedServiceGroupDetail({ allowedGroupId, connectType }),
		queryFn: () => getAllowedServiceGroupDetail({ allowedGroupId, connectType }),
		enabled: allowedGroupId !== null,
	});
};

export const useGetRecommendedSites = ({ allowedGroupId }: GetRecommendedSitesReq) => {
	return useQuery({
		queryKey: allowedServiceKeys.recommendedSites({ allowedGroupId }),
		queryFn: () => getRecommendedSites({ allowedGroupId }),
	});
};
