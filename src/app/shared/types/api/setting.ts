export interface GetProfileRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		email: string;
		imageUrl: string;
		isPushEnabled: boolean;
	};
}

export interface PutChangeProfileReq {
	name: string;
	imageUrl: string;
	isPushEnabled: boolean;
}
