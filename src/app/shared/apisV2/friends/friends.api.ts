import {
	DeleteCancelFriendRequestReq,
	DeleteFriendReq,
	DeleteRejectFriendRequestReq,
	GetFriendListRes,
	GetFriendRequestListRes,
	PostAcceptFriendRequestReq,
	PostSendFriendRequestReq,
} from '@/shared/types/api/friends';

import { authClient } from '../client';

const FRIEND_ENDPOINT = {
	GET_FRIEND_LIST: 'api/v2/friends',
	GET_FRIEND_REQUEST_LIST: 'api/v2/friends/requests',
	POST_SEND_FRIEND_REQUEST: 'api/v2/friends/requests',
	DELETE_CANCEL_FRIEND_REQUEST: 'api/v2/friends/requests/:friendId',
	POST_ACCEPT_FRIEND_REQUEST: 'api/v2/friends/requests/:friendId/accept',
	POST_REJECT_FRIEND_REQUEST: 'api/v2/friends/requests/:friendId/reject',
	DELETE_FRIEND: 'api/v2/friends/:friendId',
};

export const getFriendList = async (): Promise<GetFriendListRes> => {
	const { data } = await authClient.get(FRIEND_ENDPOINT.GET_FRIEND_LIST);
	return data;
};

export const getFriendRequestList = async (): Promise<GetFriendRequestListRes> => {
	const { data } = await authClient.get(FRIEND_ENDPOINT.GET_FRIEND_REQUEST_LIST);
	return data;
};

export const postSendFriendRequestReq = async ({ friendEmail }: PostSendFriendRequestReq) => {
	const { data } = await authClient.post(FRIEND_ENDPOINT.POST_SEND_FRIEND_REQUEST, { friendEmail });

	return data;
};

export const deleteCancelFriendRequest = async ({ friendId }: DeleteCancelFriendRequestReq) => {
	const { data } = await authClient.delete(
		FRIEND_ENDPOINT.DELETE_CANCEL_FRIEND_REQUEST.replace(':friendId', String(friendId)),
	);
	return data;
};

export const postAcceptFriendRequest = async ({ friendId }: PostAcceptFriendRequestReq) => {
	const { data } = await authClient.post(
		FRIEND_ENDPOINT.POST_ACCEPT_FRIEND_REQUEST.replace(':friendId', String(friendId)),
	);
	return data;
};

export const deleteRejectFriendRequest = async ({ friendId }: DeleteRejectFriendRequestReq) => {
	const { data } = await authClient.delete(
		FRIEND_ENDPOINT.POST_REJECT_FRIEND_REQUEST.replace(':friendId', String(friendId)),
	);
	return data;
};

export const deleteFriend = async ({ friendId }: DeleteFriendReq) => {
	const { data } = await authClient.delete(FRIEND_ENDPOINT.DELETE_FRIEND.replace(':friendId', String(friendId)));
	return data;
};
