export interface GetFriendListRes {
	status: number;
	message: string;
	data: {
		id: number;
		name: string;
		email: string;
		imageUrl: string;
		isOnline: boolean;
		elapsedTime: number;
	}[];
}

export interface GetFriendRequestListRes {
	status: number;
	message: string;
	data: {
		send: {
			id: number;
			name: string;
			email: string;
			imageUrl: string;
		}[];
		receive: {
			id: number;
			name: string;
			email: string;
			imageUrl: string;
		}[];
	};
}

export interface PostSendFriendRequestReq {
	friendEmail: string;
}

export interface DeleteCancelFriendRequestReq {
	friendId: number;
}

export interface PostAcceptFriendRequestReq {
	friendId: number;
}

export interface DeleteRejectFriendRequestReq {
	friendId: number;
}

export interface DeleteFriendReq {
	friendId: number;
}
