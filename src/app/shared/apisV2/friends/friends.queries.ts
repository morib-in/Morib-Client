import { useQuery } from '@tanstack/react-query';

import { getFriendList, getFriendRequestList } from './friends.api';
import { friendKeys } from './friends.keys';

export const useGetFriendList = () => {
	return useQuery({
		queryKey: friendKeys.friendList(),
		queryFn: getFriendList,
	});
};

export const useGetFriendRequestList = () => {
	return useQuery({
		queryKey: friendKeys.friendRequestList(),
		queryFn: getFriendRequestList,
	});
};
