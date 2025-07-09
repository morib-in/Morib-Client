import { GetFriendListRes, GetFriendRequestListRes } from './api/friends';

export type FriendListType = GetFriendListRes['data'];
export type FriendType = GetFriendListRes['data'][number];
export type FriendRequestListType = GetFriendRequestListRes['data']['send'];
export type FriendRequestListItemType = FriendRequestListType[number];
