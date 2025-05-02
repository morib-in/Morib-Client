import Dropdown from '@/shared/components/Dropdown/Dropdown';

import { formatSecondsForFriendsList } from '@/shared/utils/time';

import { FriendListType, FriendType } from '@/shared/types/friend';

import DeleteBtn from '@/shared/assets/svgs/friend_delBtn.svg?react';

import { useDeleteFriend } from '@/shared/apisV2/friends/friends.mutations';

import FriendUserProfile from '../../FriendUserProfile/FriendUserProfile';

type FriendsInfoProp = {
	friendsData: FriendListType;
};

const FriendInfo = ({ friendsData }: FriendsInfoProp) => {
	const { mutate: deleteFriend } = useDeleteFriend();

	return (
		<>
			{friendsData.map((friend: FriendType) => {
				return (
					<li key={friend.id} className="flex items-center border-t-[1px] border-gray-bg-06 px-[1rem] py-[1.5rem]">
						<div className="flex w-[40rem] flex-shrink-0">
							<FriendUserProfile isConnecting={friend.isOnline} imgSrc={friend.imageUrl} />
							<div className="ml-[2rem] flex flex-col justify-center">
								<p className="w-[30rem] truncate text-white subhead-bold-20">{friend.name}</p>
								<p className="text-gray-04 body-reg-16">{friend.email}</p>
							</div>
						</div>
						<p className="flex w-[30rem] flex-shrink-0 pl-[0.8rem] text-white subhead-med-18">
							{friend.isOnline ? '온라인' : '오프라인'}
						</p>
						<p className="flex w-full self-center p-[0.8rem] text-white subhead-med-18">
							{formatSecondsForFriendsList(friend.elapsedTime)}
						</p>

						<Dropdown>
							<Dropdown.Trigger>
								<div className="flex flex-col items-center justify-center">
									<DeleteBtn />
								</div>
							</Dropdown.Trigger>
							<Dropdown.Content boxShadow="shadow-none" className="right-0 top-[26px]">
								<Dropdown.Item onClick={() => deleteFriend({ friendId: friend.id })} label="친구삭제" textColor="red" />
							</Dropdown.Content>
						</Dropdown>
					</li>
				);
			})}
		</>
	);
};

export default FriendInfo;
