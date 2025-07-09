import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ApiErrorResponseType } from '@/shared/types/api/error';
import {
	DeleteCancelFriendRequestReq,
	DeleteFriendReq,
	DeleteRejectFriendRequestReq,
	PostAcceptFriendRequestReq,
	PostSendFriendRequestReq,
} from '@/shared/types/api/friends';

import {
	deleteCancelFriendRequest,
	deleteFriend,
	deleteRejectFriendRequest,
	postAcceptFriendRequest,
	postSendFriendRequestReq,
} from './friends.api';
import { friendKeys } from './friends.keys';

export const usePostSendFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, ApiErrorResponseType, PostSendFriendRequestReq>({
		mutationFn: postSendFriendRequestReq,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const useDeleteCancelFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, ApiErrorResponseType, DeleteCancelFriendRequestReq>({
		mutationFn: deleteCancelFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const usePostAcceptFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, ApiErrorResponseType, PostAcceptFriendRequestReq>({
		mutationFn: postAcceptFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friend });
		},
	});
};

export const usePostRejectFriendRequest = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, ApiErrorResponseType, DeleteRejectFriendRequestReq>({
		mutationFn: deleteRejectFriendRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendRequestList() });
		},
	});
};

export const useDeleteFriend = () => {
	const queryClient = useQueryClient();

	return useMutation<unknown, ApiErrorResponseType, DeleteFriendReq>({
		mutationFn: deleteFriend,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: friendKeys.friendList() });
		},
	});
};
