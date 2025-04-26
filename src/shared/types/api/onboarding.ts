import { ColorPaletteType } from '../allowedService';
import { FieldType } from '../fileds';

export type PostInterestAreaReq =
	| {
			name: string;
			colorCode: ColorPaletteType;
			interestArea: FieldType;
			allowedSites: { favicon: string; siteName: string; pageName: string; siteUrl: string }[];
	  }
	| unknown;

export interface PostInterestAreaRes {
	status: number;
	message: string;
}
