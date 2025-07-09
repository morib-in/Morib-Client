import { AllowedSiteType } from '@/shared/types/allowedSites';

import { ColorPaletteType } from '../allowedService';
import { FieldTypeMapped } from '../fileds';

export interface PostInterestAreaReq {
	name: string;
	colorCode: ColorPaletteType;
	interestArea: FieldTypeMapped;
	allowedSites: { favicon: string; siteName: string; pageName: string; siteUrl: string }[];
}

export interface PostInterestAreaRes {
	status: number;
	message: string;
}

export interface GetSuugestedSitesRes {
	status: number;
	message: string;
	data: Record<FieldTypeMapped, AllowedSiteType[]>;
}
