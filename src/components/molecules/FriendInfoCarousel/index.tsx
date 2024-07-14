import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import FriendInfo from '@/components/atoms/FriendInfo';

import useFriendInfoCarousel from '@/hooks/useFriendInfoCarousel';

import { Direction } from '@/types/global';

const FriendInfoCarousel = () => {
	const { handlePrevClick, handleNextClick, visibleFriends } = useFriendInfoCarousel();

	return (
		<div className="mt-[4.8rem] flex h-[15rem] w-[86.2rem] items-center justify-center">
			<ArrowSVGBtn className="mr-[5.8rem]" direction={Direction.LEFT} onClick={handlePrevClick} />
			<div className="flex gap-[4.2rem] pl-[1rem] pr-[1rem]">
				{visibleFriends().map((friend) => (
					<FriendInfo
						key={friend.id}
						image={friend.image}
						time={friend.time}
						name={friend.name}
						categoryname={friend.categoryname}
					/>
				))}
			</div>
			<ArrowSVGBtn className="ml-[5.8rem]" direction={Direction.RIGHT} onClick={handleNextClick} />
		</div>
	);
};

export default FriendInfoCarousel;
