import {
	DeleteAllowedServiceGroupReq,
	DeleteAllowedServiceReq,
	GetAllowedServiceGroupDetailReq,
	GetAllowedServiceGroupDetailRes,
	GetAllowedServiceListReq,
	GetAllowedServiceListRes,
	GetRecommendedSitesRes,
	PatchChangeAllowedServiceGroupColorReq,
	PatchChangeAllowedServiceGroupNameReq,
	PostAddAllowedServiceGroupReq,
	PostAddAllowedServiceReq,
} from '@/shared/types/api/allowedService';

import { authClient } from '../client';

const ALLOWED_SERVICE_ENDPOINT = {
	POST_ADD_ALLOWED_SERVICE_GROUP: 'api/v2/allowedGroup/customized',
	GET_ALLOWED_SERVICE_LIST: 'api/v2/allowedGroupList',
	GET_ALLOWED_SERVICE_GROUP_DETAIL: 'api/v2/allowedGroup/:allowedGroupId',
	PATCH_CHANGE_ALLOWED_SERVICE_GROUP_NAME: 'api/v2/allowedGroup/:allowedGroupId/name',
	PATCH_CHANGE_ALLOWED_SERVICE_GROUP_COLOR: 'api/v2/allowedGroup/:allowedGroupId/colorCode',
	DELETE_ALLOWED_SERVICE_GROUP: 'api/v2/allowedGroup/:allowedGroupId',
	GET_RECOMMENDED_STIES: 'api/v2/recommendSite',
	POST_ADD_ALLOWED_SERVICE: 'api/v2/allowedSite/:allowedGroupId',
	DELETE_ALLOWED_SERVICE: 'api/v2/allowedSite/:allowedSiteId',
};

export const postAddAllowedServiceGroup = async ({ name, colorCode }: PostAddAllowedServiceGroupReq) => {
	const { data } = await authClient.post(ALLOWED_SERVICE_ENDPOINT.POST_ADD_ALLOWED_SERVICE_GROUP, { name, colorCode });
	return data;
};

export const getAllowedServiceList = async ({
	connectType,
}: GetAllowedServiceListReq): Promise<GetAllowedServiceListRes> => {
	const { data } = await authClient.get(ALLOWED_SERVICE_ENDPOINT.GET_ALLOWED_SERVICE_LIST, { params: { connectType } });
	return data;
};

export const getAllowedServiceGroupDetail = async ({
	allowedGroupId,
	connectType,
}: GetAllowedServiceGroupDetailReq): Promise<GetAllowedServiceGroupDetailRes> => {
	const { data } = await authClient.get(
		ALLOWED_SERVICE_ENDPOINT.GET_ALLOWED_SERVICE_GROUP_DETAIL.replace(':allowedGroupId', String(allowedGroupId)),
		{ params: { connectType } },
	);
	return data;
};

export const patchChangeAllowedServiceGroupName = async ({
	allowedGroupId,
	name,
}: PatchChangeAllowedServiceGroupNameReq) => {
	const { data } = await authClient.patch(
		ALLOWED_SERVICE_ENDPOINT.PATCH_CHANGE_ALLOWED_SERVICE_GROUP_NAME.replace(':allowedGroupId', String(allowedGroupId)),
		{ name },
	);
	return data;
};

export const patchChangeAllowedServiceGroupColor = async ({
	allowedGroupId,
	colorCode,
}: PatchChangeAllowedServiceGroupColorReq) => {
	const { data } = await authClient.patch(
		ALLOWED_SERVICE_ENDPOINT.PATCH_CHANGE_ALLOWED_SERVICE_GROUP_COLOR.replace(
			':allowedGroupId',
			String(allowedGroupId),
		),
		{ colorCode },
	);
	return data;
};

export const deleteAllowedServiceGroup = async ({ allowedGroupId }: DeleteAllowedServiceGroupReq) => {
	const { data } = await authClient.delete(
		ALLOWED_SERVICE_ENDPOINT.DELETE_ALLOWED_SERVICE_GROUP.replace(':allowedGroupId', String(allowedGroupId)),
	);
	return data;
};

export const getRecommendedSites = async (): Promise<GetRecommendedSitesRes> => {
	const { data } = await authClient.get(ALLOWED_SERVICE_ENDPOINT.GET_RECOMMENDED_STIES);
	return data;
};

export const postAddAllowedService = async ({ siteUrl, allowedGroupId }: PostAddAllowedServiceReq) => {
	const { data } = await authClient.post(
		ALLOWED_SERVICE_ENDPOINT.POST_ADD_ALLOWED_SERVICE.replace(':allowedGroupId', String(allowedGroupId)),
		{ siteUrl },
	);
	return data;
};

export const deleteAllowedService = async ({ allowedSiteId }: DeleteAllowedServiceReq) => {
	const { data } = await authClient.delete(
		ALLOWED_SERVICE_ENDPOINT.DELETE_ALLOWED_SERVICE.replace(':allowedSiteId', String(allowedSiteId)),
	);
	return data;
};
