import { PostInterestAreaReq } from './api/onboarding';

export type AllowedSitesType = PostInterestAreaReq['allowedSites'];

export type AllowedSiteType = AllowedSitesType[number];
