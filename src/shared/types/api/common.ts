export interface GetUrlInfoReq {
	siteUrl: string;
}

export interface GetUrlInfoRes {
	status: number;
	message: string;
	data: {
		favicon: string;
		siteName: string;
		pageName: string;
		siteUrl: string;
	};
}

export interface PostToggleTaskStatusReq {
	taskId: number;
}
