import { GetAllowedServiceGroupDetailReq, GetAllowedServiceListReq } from '@/shared/types/api/allowedService';

export const allowedServiceKeys = {
	allowedService: ['allowedService'] as const,
	allowedServiceList: ({ connectType }: GetAllowedServiceListReq) =>
		[...allowedServiceKeys.allowedService, 'list', connectType] as const,
	allowedServiceGroupDetail: ({ allowedGroupId, connectType }: GetAllowedServiceGroupDetailReq) =>
		[...allowedServiceKeys.allowedService, 'group', allowedGroupId, connectType] as const,
	recommendedSites: () => [...allowedServiceKeys.allowedService, 'recommendedSites'] as const,
};
