import type { ColorPaletteType } from '../allowedService';

export interface PostAddAllowedServiceGroupReq {
	name: string;
	colorCode: ColorPaletteType;
}

export interface GetAllowedServiceListReq {
	connectType: 'DESKTOP' | 'WEB';
}

export interface GetAllowedServiceListRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		colorCode: ColorPaletteType;
		favicons: string[];
		extraCnt: 0;
	}[];
}

export interface GetAllowedServiceGroupDetailReq {
	allowedGroupId: number;
	connectType: 'DESKTOP' | 'WEB';
}

export interface GetAllowedServiceGroupDetailRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		colorCode: ColorPaletteType;
		allowedSites: {
			id: number;
			favicon: string;
			pageName: string;
			siteName: string;
			siteUrl: string;
		}[];
	};
}

export interface PatchChangeAllowedServiceGroupNameReq {
	allowedGroupId: number;
	name: string;
}

export interface PatchChangeAllowedServiceGroupColorReq {
	allowedGroupId: number;
	colorCode: ColorPaletteType;
}

export interface DeleteAllowedServiceGroupReq {
	allowedGroupId: number;
}

export interface GetRecommendedSitesRes {
	status: number;
	message: string;
	data: {
		recommendSites: {
			siteName: string;
			siteUrl: string;
		}[];
	};
}

export interface PostAddAllowedServiceReq {
	allowedGroupId: number;
	siteUrl: string;
}

export interface DeleteAllowedServiceReq {
	allowedSiteId: string;
}
