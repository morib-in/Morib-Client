import { ColorPaletteType } from '../allowedService';
import { FieldType } from '../fileds';

export interface PostInterestAreaReq {
	name: string;
	colorCode: ColorPaletteType;
	interestArea: FieldType;
	allowedSites: { favicon: string; siteName: string; pageName: string; siteUrl: string }[];
}

export interface PostInterestAreaRes {
	status: number;
	message: string;
}
