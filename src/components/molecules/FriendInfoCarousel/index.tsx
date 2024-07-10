import FriendInfo from '@/components/atoms/FriendInfo';

import { userFriendData } from '@/mocks/userFriendData';

const FriendInfoCarousel = () => {
	return (
		<div className="flex h-screen w-full flex-wrap items-center justify-center gap-[4.2rem] bg-gray-bg-01">
			{userFriendData.map((friend: any) => (
				<FriendInfo key={friend.id} image={friend.image} name={friend.name} categoryname={friend.categoryname} />
			))}
		</div>
	);
};

export default FriendInfoCarousel;
