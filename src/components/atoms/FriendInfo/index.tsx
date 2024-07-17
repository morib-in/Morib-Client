import useCarouselTimer from '@/hooks/useCarouselTimer';

import { formatSeconds } from '@/utils/time';

import ClockIcon from '@/assets/svgs/icon_clock.svg?react';

interface UserFriendDataProps {
	image: string;
	name: string;
	time: number;
	categoryname: string;
	isPlaying: boolean;
}

const FriendInfo = ({ image, name, time, categoryname, isPlaying }: UserFriendDataProps) => {
	const timer = useCarouselTimer({ isPlaying, previousTime: time });
	const formattedTime = formatSeconds(timer);

	return (
		<div className="py-[0.5rem 0.7rem] flex h-[15rem] w-[9.8rem] flex-col items-center justify-center px-[0.8rem]">
			<img src={image} alt="유저 프로필" className="mb-[1rem] h-[7.4rem] w-[7.4rem]" />
			<div className="flex items-center justify-center">
				<ClockIcon />
				<span className="detail-reg-14 text-mint-01">{formattedTime}</span>
			</div>
			<span className="detail-semibold-14 text-white">{name}</span>
			<span className="detail-reg-12 text-gray-04">{categoryname}</span>
		</div>
	);
};

export default FriendInfo;
