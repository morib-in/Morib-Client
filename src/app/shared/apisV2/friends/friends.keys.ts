export const friendKeys = {
	friend: ['friend'] as const,
	friendList: () => [...friendKeys.friend, 'list'] as const,
	friendRequestList: () => [...friendKeys.friend, 'requestList'] as const,
};
