import FriendInfo from '@/components/atoms/FriendInfo';

import { userFriendData } from '@/mocks/userFriendData';

const FriendInfoCarousel = () => {
	return (
		<div className="flex h-[15rem] w-[86.2rem] flex-wrap items-center justify-center gap-[4.2rem] bg-gray-bg-01">
			{userFriendData.map((friend: any) => (
				<FriendInfo
					key={friend.id}
					image={friend.image}
					time={friend.time}
					name={friend.name}
					categoryname={friend.categoryname}
				/>
			))}
		</div>
	);
};

export default FriendInfoCarousel;
