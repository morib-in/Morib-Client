import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import FriendInfo from '@/components/atoms/FriendInfo';

import { Direction } from '@/types/global';

import { userFriendData } from '@/mocks/userFriendData';

const FriendInfoCarousel = () => {
	return (
		<div className="flex h-[15rem] w-[86.2rem] flex-wrap items-center justify-center gap-[4.2rem] bg-gray-bg-01">
			<ArrowSVGBtn className="mr-[1.6rem]" direction={Direction.LEFT} />
			{userFriendData.map((friend: any) => (
				<FriendInfo
					key={friend.id}
					image={friend.image}
					time={friend.time}
					name={friend.name}
					categoryname={friend.categoryname}
				/>
			))}
			<ArrowSVGBtn className="ml-[1.6rem]" direction={Direction.RIGHT} />
		</div>
	);
};

export default FriendInfoCarousel;
